import { apiClient, ApiError } from './api-client';

// Types
export interface FormAnalyticsOverview {
  overview: {
    totalViews: number;
    totalSubmissions: number;
    completedSubmissions: number;
    conversionRate: number;
    completionRate: number;
    avgCompletionTime: number;
  };
  deviceBreakdown: Record<string, number>;
}

export interface DailyAnalytics {
  date: string;
  views: number;
  submissions: number;
  completed: number;
}

export interface DailyAnalyticsResponse {
  dailyStats: DailyAnalytics[];
}

export interface FieldStats {
  totalResponses: number;
  emptyResponses: number;
  completionRate: string;
  uniqueValues: number;
  topValues: Array<{
    value: string;
    count: number;
  }>;
}

export interface FieldAnalyticsResponse {
  fieldStats: Record<string, FieldStats>;
}

export interface DashboardAnalytics {
  overview: {
    totalForms: number;
    totalViews: number;
    totalSubmissions: number;
    avgConversionRate: string;
  };
  recentActivity: Array<{
    eventType: string;
    formId: string;
    formTitle: string;
    createdAt: string;
  }>;
  topForms: Array<{
    id: string;
    title: string;
    viewCount: number;
    submissionCount: number;
    conversionRate: number;
  }>;
}

export interface AnalyticsQueryParams {
  days?: number;
  startDate?: string;
  endDate?: string;
}

// Analytics service
export class AnalyticsService {
  // Get analytics overview for a form
  async getFormOverview(formId: string): Promise<FormAnalyticsOverview> {
    try {
      const response = await apiClient.get<FormAnalyticsOverview>(`/analytics/form/${formId}/overview`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get daily analytics for a form
  async getFormDailyAnalytics(formId: string, params?: AnalyticsQueryParams): Promise<DailyAnalyticsResponse> {
    try {
      const response = await apiClient.get<DailyAnalyticsResponse>(`/analytics/form/${formId}/daily`, params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get field analytics for a form
  async getFormFieldAnalytics(formId: string): Promise<FieldAnalyticsResponse> {
    try {
      const response = await apiClient.get<FieldAnalyticsResponse>(`/analytics/form/${formId}/fields`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get user's dashboard analytics
  async getDashboardAnalytics(): Promise<DashboardAnalytics> {
    try {
      const response = await apiClient.get<DashboardAnalytics>('/analytics/dashboard');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get conversion rate trends
  async getConversionTrends(formId: string, params?: AnalyticsQueryParams): Promise<DailyAnalyticsResponse> {
    try {
      const response = await apiClient.get<DailyAnalyticsResponse>(`/analytics/form/${formId}/trends`, params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get geographic analytics (if implemented)
  async getGeographicAnalytics(formId: string): Promise<Record<string, number>> {
    try {
      const response = await apiClient.get<Record<string, number>>(`/analytics/form/${formId}/geography`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get device analytics breakdown
  async getDeviceAnalytics(formId: string): Promise<Record<string, number>> {
    try {
      const response = await apiClient.get<Record<string, number>>(`/analytics/form/${formId}/devices`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get time-based analytics (hourly, weekly patterns)
  async getTimeAnalytics(formId: string): Promise<{
    hourly: Record<string, number>;
    weekly: Record<string, number>;
  }> {
    try {
      const response = await apiClient.get(`/analytics/form/${formId}/time`) as {
        hourly: Record<string, number>;
        weekly: Record<string, number>;
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Calculate form performance metrics
  calculateFormMetrics(overview: FormAnalyticsOverview): {
    performance: 'excellent' | 'good' | 'average' | 'poor';
    score: number;
    insights: string[];
  } {
    const { conversionRate, completionRate, avgCompletionTime } = overview.overview;
    let score = 0;
    const insights: string[] = [];

    // Conversion rate scoring (max 40 points)
    if (conversionRate >= 50) {
      score += 40;
      insights.push('Excellent conversion rate');
    } else if (conversionRate >= 30) {
      score += 30;
      insights.push('Good conversion rate');
    } else if (conversionRate >= 15) {
      score += 20;
      insights.push('Average conversion rate');
    } else {
      score += 10;
      insights.push('Low conversion rate - consider optimizing form');
    }

    // Completion rate scoring (max 30 points)
    if (completionRate >= 90) {
      score += 30;
      insights.push('Excellent completion rate');
    } else if (completionRate >= 75) {
      score += 25;
      insights.push('Good completion rate');
    } else if (completionRate >= 60) {
      score += 20;
      insights.push('Average completion rate');
    } else {
      score += 10;
      insights.push('Low completion rate - form may be too long or complex');
    }

    // Completion time scoring (max 30 points)
    if (avgCompletionTime <= 120) { // 2 minutes
      score += 30;
      insights.push('Quick completion time');
    } else if (avgCompletionTime <= 300) { // 5 minutes
      score += 25;
      insights.push('Reasonable completion time');
    } else if (avgCompletionTime <= 600) { // 10 minutes
      score += 15;
      insights.push('Long completion time - consider simplifying');
    } else {
      score += 5;
      insights.push('Very long completion time - form needs optimization');
    }

    let performance: 'excellent' | 'good' | 'average' | 'poor';
    if (score >= 80) performance = 'excellent';
    else if (score >= 60) performance = 'good';
    else if (score >= 40) performance = 'average';
    else performance = 'poor';

    return { performance, score, insights };
  }

  // Generate analytics report
  generateReport(overview: FormAnalyticsOverview, dailyStats: DailyAnalytics[]): {
    summary: string;
    recommendations: string[];
    keyMetrics: Array<{
      label: string;
      value: string | number;
      trend: 'up' | 'down' | 'stable';
    }>;
  } {
    const { totalViews, totalSubmissions, conversionRate, completionRate } = overview.overview;
    const recommendations: string[] = [];
    const keyMetrics = [];

    // Generate recommendations
    if (conversionRate < 20) {
      recommendations.push('Consider simplifying your form to improve conversion rate');
    }
    if (completionRate < 70) {
      recommendations.push('Review form length and complexity to reduce abandonment');
    }
    if (totalViews < 100) {
      recommendations.push('Promote your form more to increase visibility');
    }

    // Calculate trends
    const recentSubmissions = dailyStats.slice(-7);
    const olderSubmissions = dailyStats.slice(-14, -7);
    
    const recentTotal = recentSubmissions.reduce((sum, day) => sum + day.submissions, 0);
    const olderTotal = olderSubmissions.reduce((sum, day) => sum + day.submissions, 0);
    
    const submissionTrend: 'up' | 'down' | 'stable' = recentTotal > olderTotal ? 'up' : recentTotal < olderTotal ? 'down' : 'stable';

    keyMetrics.push(
      { label: 'Total Views', value: totalViews, trend: 'stable' as const },
      { label: 'Total Submissions', value: totalSubmissions, trend: submissionTrend },
      { label: 'Conversion Rate', value: `${conversionRate}%`, trend: 'stable' as const },
      { label: 'Completion Rate', value: `${completionRate}%`, trend: 'stable' as const }
    );

    const summary = `Your form has received ${totalViews} views with ${totalSubmissions} submissions, resulting in a ${conversionRate}% conversion rate and ${completionRate}% completion rate.`;

    return {
      summary,
      recommendations,
      keyMetrics
    };
  }
}

// Create singleton instance
export const analyticsService = new AnalyticsService();

// React hook for form analytics
import { useState, useEffect, useCallback } from 'react';
import { handleApiError } from './api-client';

export const useFormAnalytics = (formId: string) => {
  const [overview, setOverview] = useState<FormAnalyticsOverview | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyAnalytics[]>([]);
  const [fieldStats, setFieldStats] = useState<FieldAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    if (!formId) return;
    
    try {
      setError(null);
      const data = await analyticsService.getFormOverview(formId);
      setOverview(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    }
  }, [formId]);

  const fetchDailyStats = useCallback(async (params?: AnalyticsQueryParams) => {
    if (!formId) return;
    
    try {
      setError(null);
      const data = await analyticsService.getFormDailyAnalytics(formId, params);
      setDailyStats(data.dailyStats);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    }
  }, [formId]);

  const fetchFieldStats = useCallback(async () => {
    if (!formId) return;
    
    try {
      setError(null);
      const data = await analyticsService.getFormFieldAnalytics(formId);
      setFieldStats(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    }
  }, [formId]);

  const fetchAllAnalytics = useCallback(async (params?: AnalyticsQueryParams) => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([
        fetchOverview(),
        fetchDailyStats(params),
        fetchFieldStats()
      ]);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchOverview, fetchDailyStats, fetchFieldStats]);

  useEffect(() => {
    fetchAllAnalytics();
  }, [fetchAllAnalytics]);

  const generateReport = useCallback(() => {
    if (!overview || !dailyStats.length) return null;
    return analyticsService.generateReport(overview, dailyStats);
  }, [overview, dailyStats]);

  const calculateMetrics = useCallback(() => {
    if (!overview) return null;
    return analyticsService.calculateFormMetrics(overview);
  }, [overview]);

  return {
    overview,
    dailyStats,
    fieldStats,
    loading,
    error,
    fetchOverview,
    fetchDailyStats,
    fetchFieldStats,
    fetchAllAnalytics,
    generateReport,
    calculateMetrics,
  };
};

// React hook for dashboard analytics
export const useDashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyticsService.getDashboardAnalytics();
      setAnalytics(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardAnalytics();
  }, [fetchDashboardAnalytics]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchDashboardAnalytics,
  };
};
