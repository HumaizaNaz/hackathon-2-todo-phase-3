import { getAuthToken } from './auth-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface ApiOptions extends RequestInit {
  url: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(options: ApiOptions): Promise<T> {
    // Get the token from sessionStorage
    const token = getAuthToken();

    const headers = new Headers(options.headers);

    // Set content type if not already set
    if (!headers.get('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // Attach JWT token to Authorization header
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include' // Include cookies in requests
    };

    const response = await fetch(`${this.baseUrl}${options.url}`, config);

    // Handle 401 Unauthorized responses
    if (response.status === 401) {
      // Remove the invalid token
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('access_token');
      }
      // Optionally redirect to login page
      window.location.href = '/login';
      throw new Error('Unauthorized: Please log in again');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    // For successful responses that have content
    if (response.status !== 204) { // 204 No Content
      return await response.json();
    }

    // For 204 responses, return empty object or void
    return {} as T;
  }

  async get<T>(url: string, options?: Omit<ApiOptions, 'url' | 'method'>): Promise<T> {
    return this.request<T>({ ...options, url, method: 'GET' });
  }

  async post<T>(url: string, data?: any, options?: Omit<ApiOptions, 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      ...options,
      url,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async put<T>(url: string, data?: any, options?: Omit<ApiOptions, 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      ...options,
      url,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async patch<T>(url: string, data?: any, options?: Omit<ApiOptions, 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      ...options,
      url,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async delete<T>(url: string, options?: Omit<ApiOptions, 'url' | 'method'>): Promise<T> {
    return this.request<T>({ ...options, url, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Convenience functions for specific endpoints
export const taskApi = {
  getTasks: () => apiClient.get<any[]>('/api/tasks'),
  createTask: (taskData: { title: string; description?: string }) =>
    apiClient.post<any>('/api/tasks', taskData),
  updateTask: (id: number, taskData: { title?: string; description?: string; completed?: boolean }) =>
    apiClient.put<any>(`/api/tasks/${id}`, taskData),
  deleteTask: (id: number) => apiClient.delete<any>(`/api/tasks/${id}`),
  toggleTaskComplete: (id: number, completed: boolean) =>
    apiClient.patch<any>(`/api/tasks/${id}/toggle-complete`, { completed })
};

// Chat API functions
export const chatApi = {
  sendMessage: (userId: string, message: string, conversationId?: number | null) =>
    apiClient.post<any>(`/api/chat/${userId}`, {
      message,
      conversation_id: conversationId
    }),
  getConversationHistory: (conversationId: number) =>
    apiClient.get<any[]>(`/api/chat/${conversationId}/history`),
  getConversations: () => apiClient.get<any[]>('/api/chat/conversations')
};