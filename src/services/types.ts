// API Types for microservices

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher';
  avatar?: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Teacher {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  avatar: string;
  bio: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  languages: string[];
  experience: number;
  availability: string[];
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  verified: boolean;
  totalStudents?: number;
  responseTime?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantDetails: Array<{
    userId: string;
    name: string;
    avatar: string;
    role: string;
  }>;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: Record<string, number>;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Session {
  id: string;
  teacherId: string;
  studentId: string;
  subject: string;
  date: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
  location: string;
}

// API Request/Response types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher';
}

export interface TeacherFilters {
  subjects?: string[];
  location?: string;
  minRating?: number;
  maxPrice?: number;
  availability?: string[];
}

export interface BookSessionData {
  teacherId: string;
  studentId: string;
  subject: string;
  date: string;
  duration: number;
  notes?: string;
}

export interface AvailabilitySlot {
  date: string;
  slots: Array<{
    start: string;
    end: string;
    available: boolean;
  }>;
}

export interface SearchFilters {
  priceRanges: Array<{
    min: number;
    max: number;
    label: string;
  }>;
  ratingFilters: Array<{
    value: number;
    label: string;
  }>;
  experienceLevels: Array<{
    min: number;
    max: number;
    label: string;
  }>;
}

export interface SendMessageData {
  conversationId: string;
  content: string;
  senderId: string;
}