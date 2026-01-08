import { apiClient, ApiError } from './api-client';

// Types
export interface FormSubmission {
  id: string;
  formId: string;
  submissionData: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  completionTimeSeconds?: number;
  isCompleted: boolean;
  createdAt: string;
}

export interface SubmitFormRequest {
  submissionData: Record<string, any>;
  isCompleted?: boolean;
  completionTimeSeconds?: number;
}

export interface SubmissionsResponse {
  submissions: FormSubmission[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SubmissionsQueryParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  completed?: boolean;
}

export interface ExportOptions {
  format?: 'csv' | 'json';
}

// Submission service
export class SubmissionService {
  // Submit form (public endpoint)
  async submitForm(formId: string, data: SubmitFormRequest): Promise<{ submissionId: string; createdAt: string }> {
    try {
      const response = await apiClient.post<{ submissionId: string; createdAt: string }>(
        `/submissions/form/${formId}`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get all submissions for a form (form owner only)
  async getSubmissions(formId: string, params?: SubmissionsQueryParams): Promise<SubmissionsResponse> {
    try {
      const response = await apiClient.get<SubmissionsResponse>(`/submissions/form/${formId}`, params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get single submission
  async getSubmission(id: string): Promise<FormSubmission> {
    try {
      const response = await apiClient.get<FormSubmission>(`/submissions/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete submission
  async deleteSubmission(id: string): Promise<void> {
    try {
      await apiClient.delete(`/submissions/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Export submissions
  async exportSubmissions(formId: string, options: ExportOptions = {}): Promise<Blob | any> {
    try {
      const response = await apiClient.get(`/submissions/form/${formId}/export`, options);
      
      if (options.format === 'csv') {
        // Convert response to blob for CSV download
        return new Blob([response], { type: 'text/csv' });
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Download submissions as CSV file
  async downloadSubmissionsCSV(formId: string, filename?: string): Promise<void> {
    try {
      const blob = await this.exportSubmissions(formId, { format: 'csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `form-submissions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw error;
    }
  }

  // Get submission statistics
  async getSubmissionStats(formId: string): Promise<{
    total: number;
    completed: number;
    incomplete: number;
    averageCompletionTime: number;
    completionRate: number;
  }> {
    try {
      const response = await apiClient.get(`/submissions/form/${formId}/stats`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Validate submission data
  validateSubmissionData(formData: any, submissionData: Record<string, any>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData || !formData.pages) {
      errors.push('Invalid form structure');
      return { isValid: false, errors };
    }

    // Check required fields
    formData.pages.forEach((page: any) => {
      if (page.sections) {
        page.sections.forEach((section: any) => {
          if (section.elements) {
            section.elements.forEach((element: any) => {
              const fieldValue = submissionData[element.id];
              
              // Check required fields
              if (element.required && (!fieldValue || fieldValue === '')) {
                errors.push(`${element.label} is required`);
              }

              // Validate field types
              if (fieldValue && fieldValue !== '') {
                switch (element.type) {
                  case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(fieldValue)) {
                      errors.push(`${element.label} must be a valid email address`);
                    }
                    break;
                  
                  case 'number':
                    if (isNaN(Number(fieldValue))) {
                      errors.push(`${element.label} must be a valid number`);
                    }
                    break;
                  
                  case 'url':
                    try {
                      new URL(fieldValue);
                    } catch {
                      errors.push(`${element.label} must be a valid URL`);
                    }
                    break;
                  
                  case 'tel':
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    if (!phoneRegex.test(fieldValue)) {
                      errors.push(`${element.label} must be a valid phone number`);
                    }
                    break;
                }

                // Check min/max validation
                if (element.validation) {
                  const value = Number(fieldValue);
                  if (!isNaN(value)) {
                    if (element.validation.min !== undefined && value < element.validation.min) {
                      errors.push(`${element.label} must be at least ${element.validation.min}`);
                    }
                    if (element.validation.max !== undefined && value > element.validation.max) {
                      errors.push(`${element.label} must be at most ${element.validation.max}`);
                    }
                  }
                }

                // Check pattern validation
                if (element.validation && element.validation.pattern) {
                  const regex = new RegExp(element.validation.pattern);
                  if (!regex.test(fieldValue)) {
                    errors.push(`${element.label} format is invalid`);
                  }
                }
              }
            });
          }
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Create singleton instance
export const submissionService = new SubmissionService();

// React hook for submissions
import { useState, useEffect, useCallback } from 'react';
import { handleApiError } from './api-client';

export const useSubmissions = (formId: string, params?: SubmissionsQueryParams) => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchSubmissions = useCallback(async () => {
    if (!formId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await submissionService.getSubmissions(formId, params);
      setSubmissions(response.submissions);
      setPagination(response.pagination);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [formId, params]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const deleteSubmission = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await submissionService.deleteSubmission(id);
      setSubmissions(prev => prev.filter(submission => submission.id !== id));
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async (filename?: string) => {
    try {
      await submissionService.downloadSubmissionsCSV(formId, filename);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    }
  };

  return {
    submissions,
    loading,
    error,
    pagination,
    fetchSubmissions,
    deleteSubmission,
    downloadCSV,
  };
};

// React hook for form submission (public forms)
export const useFormSubmission = (formId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submitForm = async (data: SubmitFormRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionService.submitForm(formId, data);
      setSubmitted(true);
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setError(null);
  };

  return {
    submitForm,
    loading,
    error,
    submitted,
    reset,
  };
};
