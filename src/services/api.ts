// API Service Layer for microservices architecture
import type {
  User,
  Teacher,
  Conversation,
  Message,
  Session,
  LoginCredentials,
  LoginResponse,
  RegisterData,
  TeacherFilters,
  BookSessionData,
  AvailabilitySlot,
  SearchFilters,
  SendMessageData,
} from './types';

const API_BASE_URL = 'http://localhost:3000';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // User Service
  users = {
    getAll: (): Promise<User[]> =>
      this.request<User[]>('/users'),

    login: (credentials: LoginCredentials): Promise<LoginResponse> =>
      this.request<LoginResponse>('/users', {
        method: 'POST',
        body: JSON.stringify({ action: 'login', ...credentials }),
      }),

    register: (userData: RegisterData): Promise<User> =>
      this.request<User>('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),

    getProfile: (userId: string): Promise<User> =>
      this.request<User>(`/users/${userId}`),

    getCurrentUser: (): Promise<User> =>
      this.request<User>('/users/1'), // Mock current user
  };

  // Teacher Service
  teachers = {
    getAll: (filters?: TeacherFilters): Promise<Teacher[]> => {
      const queryParams = filters ? `?${new URLSearchParams(filters as Record<string, string>)}` : '';
      return this.request<Teacher[]>(`/teachers${queryParams}`);
    },

    getPopular: (): Promise<Teacher[]> =>
      this.request<Teacher[]>('/teachers?_sort=rating&_order=desc&_limit=3'),

    getById: (id: string): Promise<Teacher> =>
      this.request<Teacher>(`/teachers/${id}`),

    getAvailability: (teacherId: string): Promise<AvailabilitySlot[]> =>
      this.request<AvailabilitySlot[]>(`/availability?teacherId=${teacherId}`),
  };

  // Search Service
  search = {
    teachers: (query: string, filters?: Partial<TeacherFilters>): Promise<Teacher[]> => {
      const params = new URLSearchParams({ q: query, ...(filters as Record<string, string>) });
      return this.request<Teacher[]>(`/teacherSearchIndex?${params}`);
    },

    getFilters: (): Promise<SearchFilters> =>
      this.request<SearchFilters>('/searchFilters'),

    getSubjects: (): Promise<{id: string, name: string}[]> =>
      this.request<{id: string, name: string}[]>('/subjects'),

    getLevels: (): Promise<{id: string, name: string}[]> =>
      this.request<{id: string, name: string}[]>('/levels'),

    getLocations: (): Promise<{id: string, name: string}[]> =>
      this.request<{id: string, name: string}[]>('/locations'),
  };

  // Messaging Service
  messaging = {
    getConversations: (): Promise<Conversation[]> =>
      this.request<Conversation[]>('/conversations'),

    getMessages: (conversationId: string): Promise<Message[]> =>
      this.request<Message[]>(`/messages?conversationId=${conversationId}`),

    sendMessage: (message: SendMessageData): Promise<Message> =>
      this.request<Message>('/messages', {
        method: 'POST',
        body: JSON.stringify(message),
      }),
  };

  // Sessions Service
  sessions = {
    getUpcoming: (): Promise<Session[]> =>
      this.request<Session[]>('/sessions?status=scheduled&_sort=date'),

    getHistory: (): Promise<Session[]> =>
      this.request<Session[]>('/sessions?status=completed&_sort=date&_order=desc'),

    bookSession: (sessionData: BookSessionData): Promise<Session> =>
      this.request<Session>('/sessions', {
        method: 'POST',
        body: JSON.stringify(sessionData),
      }),

    getAvailability: (teacherId: string): Promise<AvailabilitySlot[]> =>
      this.request<AvailabilitySlot[]>(`/availability?teacherId=${teacherId}`),
  };
}

export const api = new ApiClient();