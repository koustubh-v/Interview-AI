// src/lib/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// API Configuration
// FIX 1: Set the fallback to match your backend's EXACT URL from the log
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

// Create axios instance
export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to auth
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  email: string;
  name: string | null;
  target_role: string | null;
  experience_level: string | null;
  free_interviews: number;
  paid_interviews: number;
  is_verified: boolean;
}

export interface Interview {
  id: string;
  created_at: string;
  user_data: any;
  mode: string;
  overall_score: number | null;
  turns: InterviewTurn[];
}

export interface InterviewTurn {
  turn_no: number;
  q: string;
  a: string | null;
  topic: string | null;
  wpm: number | null;
  filler_count: number | null;
  score: number | null;
}

export interface FeedbackResponse {
  detailed_feedback: string;
  overall_score: number;
}

// Auth API (This was already correct)
export const authAPI = {
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    return { token, user };
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    window.location.href = '/auth';
  },

  verifyEmail: async (token: string) => {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};

// User API (This was already correct)
export const userAPI = {
  getMe: async (): Promise<User> => {
    const response = await api.get('/user/me');
    return response.data;
  },

  updateMe: async (data: Partial<User>) => {
    const response = await api.put('/user/me', data);
    return response.data;
  },

  extractResume: async (resumeText: string) => {
    const response = await api.post('/user/resume/extract', { resume_text: resumeText });
    return response.data;
  },
};

// Interview API (This was already correct)
export const interviewAPI = {
  createSession: async (mode: string = 'normal') => {
    const response = await api.post('/interviews/create-session', { mode });
    return response.data;
  },

  prepare: async (jdText?: string, jdUrl?: string, role?: string) => {
    const response = await api.post('/interviews/prepare', {
      jd_text: jdText,
      jd_url: jdUrl,
      role,
    });
    return response.data;
  },

  startInterview: async (
    sessionId: string,
    userData: any,
    interviewerPersonality?: string
  ) => {
    const response = await api.post('/interviews/start-interview', {
      session_id: sessionId,
      user_data: userData,
      interviewer_personality: interviewerPersonality,
    });
    return response.data;
  },

  submitAnswer: async (
    sessionId: string,
    answer?: string,
    audioData?: string
  ) => {
    const response = await api.post('/interviews/submit-answer', {
      session_id: sessionId,
      answer,
      audio_data: audioData,
    });
    return response.data;
  },

  skipQuestion: async (sessionId: string) => {
    const response = await api.post('/interviews/skip-question', {
      session_id: sessionId,
    });
    return response.data;
  },

  cancelInterview: async (sessionId: string) => {
    const response = await api.post('/interviews/cancel-interview', {
      session_id: sessionId,
    });
    return response.data;
  },

  getFeedback: async (sessionId: string): Promise<FeedbackResponse> => {
    const response = await api.post('/interviews/get-feedback', {
      session_id: sessionId,
    });
    return response.data;
  },

  getHistory: async (): Promise<Interview[]> => {
    const response = await api.get('/interviews/history');
    return response.data;
  },

  getDetail: async (sessionId: string) => {
    const response = await api.get(`/interviews/detail?session_id=${sessionId}`);
    return response.data;
  },
};

// Payment API
export const paymentAPI = {
  // FIX 2: Removed 'amount' from here. The backend calculates it.
  createOrder: async () => {
    const response = await api.post('/payments/create-order', {});
    return response.data;
  },

  verifyPayment: async (
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) => {
    // FIX 3: Changed URL to '/verify-payment' to match your backend route
    const response = await api.post('/payments/verify-payment', {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    });
    return response.data;
  },
};

// Helper to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

// Helper to get stored user data
export const getStoredUser = (): User | null => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};