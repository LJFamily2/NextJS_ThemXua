// API client with automatic token refresh and error handling

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  status: number;
}

class ApiClient {
  private baseURL = 'http://localhost:5000/api';

  private getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const currentToken = this.getToken();
      if (!currentToken) return false;

      const response = await fetch(`${this.baseURL}/admin/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);

        // Calculate expiry time
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        const expiry = payload.exp * 1000;
        localStorage.setItem('adminTokenExpiry', expiry.toString());

        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  private async request<T = unknown>(
    endpoint: string,
    method: RequestMethod = 'GET',
    data?: unknown,
    isFormData = false
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers: Record<string, string> = {
        ...this.getAuthHeaders(),
      };

      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      const config: RequestInit = {
        method,
        headers,
      };

      if (data) {
        if (isFormData && data instanceof FormData) {
          config.body = data;
        } else if (!isFormData) {
          config.body = JSON.stringify(data);
        } else {
          config.body = undefined;
        }
      }

      let response = await fetch(url, config);

      // If unauthorized, try to refresh token once
      if (response.status === 401 && endpoint !== '/admin/auth/refresh') {
        const refreshed = await this.refreshToken();

        if (refreshed) {
          // Retry the request with new token
          config.headers = {
            ...config.headers,
            ...this.getAuthHeaders(),
          };
          response = await fetch(url, config);
        } else {
          // Refresh failed, dispatch logout event
          window.dispatchEvent(
            new CustomEvent('apiError', { detail: { status: 401 } })
          );
          return {
            success: false,
            message: 'Authentication failed',
            status: 401,
          };
        }
      }

      const responseData = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: responseData,
          status: response.status,
        };
      } else {
        return {
          success: false,
          message: responseData.message || 'Request failed',
          status: response.status,
        };
      }
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: 'Network error',
        status: 0,
      };
    }
  }

  // Convenience methods
  async get<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET');
  }

  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    isFormData = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', data, isFormData);
  }
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    isFormData = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', data, isFormData);
  }

  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    isFormData = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', data, isFormData);
  }

  async delete<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE');
  }
}

export const apiClient = new ApiClient();

// Auth API methods
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/admin/auth/login', { email, password }),

  getProfile: () => apiClient.get('/admin/auth/profile'),

  updateProfile: (data: { name: string; email: string }) =>
    apiClient.put('/admin/auth/profile', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.put('/admin/auth/change-password', data),

  refresh: () => apiClient.post('/admin/auth/refresh'),
};

// Users API methods
export const usersAPI = {
  getAll: () => apiClient.get('/admin/users'),

  approve: (userId: string) => apiClient.post(`/admin/users/${userId}/approve`),

  update: (
    userId: string,
    data: { name: string; email: string; role: string }
  ) => apiClient.put(`/admin/users/${userId}`, data),

  delete: (userId: string) => apiClient.delete(`/admin/users/${userId}`),
};

// Spotlight API methods
export const spotlightAPI = {
  getAll: () => apiClient.get('/admin/spotlight'),

  create: (formData: FormData) =>
    apiClient.post('/admin/spotlight', formData, true),

  update: (id: string, formData: FormData) =>
    apiClient.put(`/admin/spotlight/${id}`, formData, true),

  delete: (id: string) => apiClient.delete(`/admin/spotlight/${id}`),

  deleteAll: () => apiClient.post('/admin/spotlight/deleteAll'),
};

// Hero API methods
export const heroAPI = {
  getAll: () => apiClient.get('/admin/hero'),

  create: (formData: FormData) => apiClient.post('/admin/hero', formData, true),

  update: (id: string, formData: FormData) =>
    apiClient.put(`/admin/hero/${id}`, formData, true),

  delete: (id: string) => apiClient.delete(`/admin/hero/${id}`),
};

// SEO API methods
export const seoAPI = {
  get: () => apiClient.get('/admin/seo'),

  create: (data: unknown) => apiClient.post('/admin/seo', data),

  update: (id: string, data: unknown) =>
    apiClient.put(`/admin/seo/${id}`, data),
};

// Booking API methods
export const bookingAPI = {
  getAll: () => apiClient.get('/admin/booking'),

  update: (id: string, data: unknown) =>
    apiClient.put(`/admin/booking/${id}`, data),

  delete: (id: string) => apiClient.delete(`/admin/booking/${id}`),

  bulkUpdate: (data: { ids: string[]; status: string }) =>
    apiClient.put('/admin/booking/bulk-update', data),
};

// Booking History API methods
export const bookingHistoryAPI = {
  getAll: () => apiClient.get('/admin/booking/history'),

  getById: (id: string) => apiClient.get(`/admin/booking/history/${id}`),

  restore: (id: string) =>
    apiClient.post(`/admin/booking/history/${id}/restore`),

  delete: (id: string) => apiClient.delete(`/admin/booking/history/${id}`),

  restoreAll: () => apiClient.post('/admin/booking/history/restore-all'),

  deleteAll: () => apiClient.delete('/admin/booking/history'),
};

// Accepted Booking API methods
export const acceptedBookingAPI = {
  getAll: () => apiClient.get('/admin/booking/accepted'),

  getById: (id: string) => apiClient.get(`/admin/booking/accepted/${id}`),

  updateNote: (id: string, note: string) =>
    apiClient.patch(`/admin/booking/accepted/${id}/note`, { note }),

  complete: (id: string) =>
    apiClient.post(`/admin/booking/accepted/${id}/completed`),

  delete: (id: string) => apiClient.delete(`/admin/booking/accepted/${id}`),

  completeAll: () => apiClient.post('/admin/booking/accepted/complete-all'),

  deleteAll: () => apiClient.delete('/admin/booking/accepted'),
};

// Menu API methods
export const menuAPI = {
  getAll: () => apiClient.get('/admin/menu'),

  create: (formData: FormData) => apiClient.post('/admin/menu', formData, true),

  update: (id: string, formData: FormData) =>
    apiClient.put(`/admin/menu/${id}`, formData, true),

  delete: (id: string) => apiClient.delete(`/admin/menu/${id}`),
};

// News API methods
export const newsAPI = {
  getAll: () => apiClient.get('/admin/news'),

  create: (formData: FormData) => apiClient.post('/admin/news', formData, true),

  update: (id: string, formData: FormData) =>
    apiClient.put(`/admin/news/${id}`, formData, true),

  delete: (id: string) => apiClient.delete(`/admin/news/${id}`),
};

// Events API methods
export const eventsAPI = {
  getAll: () => apiClient.get('/admin/events'),

  create: (formData: FormData) =>
    apiClient.post('/admin/events', formData, true),

  update: (id: string, formData: FormData) =>
    apiClient.put(`/admin/events/${id}`, formData, true),

  delete: (id: string) => apiClient.delete(`/admin/events/${id}`),
};

// Public Events API methods (no auth required)
export const publicEventsAPI = {
  getAll: () => apiClient.get('/events'),
  getBySlug: (slug: string) => apiClient.get(`/events/${slug}`),
};

export default apiClient;
