import { apiClient, ApiError } from './api-client';
import { FormData, FormElement, FormPage, FormSection } from '@/types/form';

// Types
export interface FormListItem {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  public: boolean;
  slug: string;
  viewCount: number;
  submissionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFormRequest {
  title: string;
  description?: string;
  formData: FormData;
  settings?: Record<string, any>;
  status?: 'draft' | 'published' | 'archived';
  public?: boolean;
}

export interface UpdateFormRequest {
  title?: string;
  description?: string;
  formData?: FormData;
  settings?: Record<string, any>;
  status?: 'draft' | 'published' | 'archived';
  public?: boolean;
}

export interface PublicForm {
  id: string;
  title: string;
  description?: string;
  formData: FormData;
  settings: Record<string, any>;
  slug: string;
}

export interface FormsResponse {
  forms: FormListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FormsQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

// Form service
export class FormService {
  private toFormData(row: any): FormData {
    return {
      id: row.id,
      title: row.title,
      description: row.description || '',
      pages: row.form_data?.pages || [],
      settings: row.settings || {
        theme: 'modern',
        headerStyle: 'gradient',
        showLogo: false,
        backgroundColor: '#ffffff',
        textColor: '#000000',
      },
    };
  }

  private toFormListItem(row: any): FormListItem {
    return {
      id: row.id,
      title: row.title,
      description: row.description || '',
      status: row.status,
      public: row.public,
      slug: row.slug,
      viewCount: row.view_count || 0,
      submissionCount: row.submission_count || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  // Get all forms for current user
  async getForms(params?: FormsQueryParams): Promise<FormsResponse> {
    try {
      const response = await apiClient.get<{ forms: any[]; pagination: FormsResponse['pagination'] }>('/forms', params);
      return {
        forms: response.forms.map((f: any) => this.toFormListItem(f)),
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }

  // Get form by ID
  async getForm(id: string): Promise<FormData> {
    try {
      const response = await apiClient.get<any>(`/forms/${id}`);
      return this.toFormData(response);
    } catch (error) {
      throw error;
    }
  }

  // Create new form
  async createForm(data: CreateFormRequest): Promise<FormData> {
    try {
      const response = await apiClient.post<{ message: string; form: any }>('/forms', data);
      return this.toFormData(response.form);
    } catch (error) {
      throw error;
    }
  }

  // Update form
  async updateForm(id: string, data: UpdateFormRequest): Promise<FormData> {
    try {
      const response = await apiClient.put<{ message: string; form: any }>(`/forms/${id}`, data);
      return this.toFormData(response.form);
    } catch (error) {
      throw error;
    }
  }

  // Delete form
  async deleteForm(id: string): Promise<void> {
    try {
      await apiClient.delete(`/forms/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Duplicate form
  async duplicateForm(id: string): Promise<FormData> {
    try {
      const response = await apiClient.post<{ message: string; form: any }>(`/forms/${id}/duplicate`);
      return this.toFormData(response.form);
    } catch (error) {
      throw error;
    }
  }

  // Get public form by slug
  async getPublicForm(slug: string): Promise<PublicForm> {
    try {
      const response = await apiClient.get<any>(`/forms/public/${slug}`);
      return {
        id: response.id,
        title: response.title,
        description: response.description || '',
        formData: response.form_data,
        settings: response.settings || {},
        slug: response.slug,
      };
    } catch (error) {
      throw error;
    }
  }

  // Publish form (change status to published)
  async publishForm(id: string): Promise<FormData> {
    try {
      const response = await apiClient.put<{ message: string; form: any }>(`/forms/${id}`, {
        status: 'published'
      });
      return this.toFormData(response.form);
    } catch (error) {
      throw error;
    }
  }

  // Archive form
  async archiveForm(id: string): Promise<FormData> {
    try {
      const response = await apiClient.put<{ message: string; form: any }>(`/forms/${id}`, {
        status: 'archived'
      });
      return this.toFormData(response.form);
    } catch (error) {
      throw error;
    }
  }

  // Make form public
  async makeFormPublic(id: string, isPublic: boolean = true): Promise<FormData> {
    try {
      const response = await apiClient.put<{ message: string; form: any }>(`/forms/${id}`, {
        public: isPublic
      });
      return this.toFormData(response.form);
    } catch (error) {
      throw error;
    }
  }

  // Create form from template
  async createFromTemplate(templateId: string, title: string): Promise<FormData> {
    try {
      // This would need to be implemented on the backend
      const response = await apiClient.post<FormData>('/forms/from-template', {
        templateId,
        title
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Auto-save form draft
  async autoSaveForm(id: string, formData: FormData): Promise<void> {
    try {
      await apiClient.put(`/forms/${id}`, {
        formData,
        status: 'draft'
      });
    } catch (error) {
      // Don't throw error for auto-save failures
      console.error('Auto-save failed:', error);
    }
  }

  // Validate form structure
  validateForm(formData: FormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData.title || formData.title.trim().length === 0) {
      errors.push('Form title is required');
    }

    if (!formData.pages || formData.pages.length === 0) {
      errors.push('Form must have at least one page');
    }

    if (formData.pages) {
      formData.pages.forEach((page, pageIndex) => {
        if (!page.sections || page.sections.length === 0) {
          errors.push(`Page ${pageIndex + 1} must have at least one section`);
        }

        if (page.sections) {
          page.sections.forEach((section, sectionIndex) => {
            if (section.elements && section.elements.length > 0) {
              section.elements.forEach((element, elementIndex) => {
                if (!element.type) {
                  errors.push(`Element ${elementIndex + 1} in section ${sectionIndex + 1} of page ${pageIndex + 1} must have a type`);
                }
                if (!element.label || element.label.trim().length === 0) {
                  errors.push(`Element ${elementIndex + 1} in section ${sectionIndex + 1} of page ${pageIndex + 1} must have a label`);
                }
              });
            }
          });
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Create singleton instance
export const formService = new FormService();

// React hook for forms
import { useState, useEffect, useCallback } from 'react';
import { handleApiError } from './api-client';

export const useForms = (params?: FormsQueryParams) => {
  const [forms, setForms] = useState<FormListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchForms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await formService.getForms(params);
      setForms(response.forms);
      setPagination(response.pagination);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const createForm = async (data: CreateFormRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newForm = await formService.createForm(data);
      // Convert FormData to FormListItem for list
      const formListItem: FormListItem = {
        id: newForm.id,
        title: newForm.title,
        description: newForm.description,
        status: data.status || 'draft',
        public: data.public || false,
        slug: newForm.id, // Temporary slug until backend generates one
        viewCount: 0,
        submissionCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setForms(prev => [formListItem, ...prev]);
      return newForm;
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateForm = async (id: string, data: UpdateFormRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updatedForm = await formService.updateForm(id, data);
      setForms(prev => prev.map(form => 
        form.id === id ? { ...form, ...updatedForm } : form
      ));
      return updatedForm;
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await formService.deleteForm(id);
      setForms(prev => prev.filter(form => form.id !== id));
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const duplicateForm = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const duplicatedForm = await formService.duplicateForm(id);
      // Convert FormData to FormListItem for list
      const formListItem: FormListItem = {
        id: duplicatedForm.id,
        title: duplicatedForm.title,
        description: duplicatedForm.description,
        status: 'draft',
        public: false,
        slug: duplicatedForm.id,
        viewCount: 0,
        submissionCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setForms(prev => [formListItem, ...prev]);
      return duplicatedForm;
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    forms,
    loading,
    error,
    pagination,
    fetchForms,
    createForm,
    updateForm,
    deleteForm,
    duplicateForm,
  };
};
