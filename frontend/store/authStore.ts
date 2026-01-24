'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '@/lib/api';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'USER' | 'PROVIDER' | 'ADMIN';
    provider?: {
        id: string;
        specialization: string;
        rating: number;
    };
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                try {
                    const response = await api.post('/auth/login', { email, password });
                    const { user, accessToken, refreshToken } = response.data;

                    // Store in localStorage
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', refreshToken);
                    }

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                    });
                } catch (error: any) {
                    throw new Error(error.response?.data?.error || 'Login failed');
                }
            },

            register: async (data: any) => {
                try {
                    const response = await api.post('/auth/register', data);
                    const { user, accessToken, refreshToken } = response.data;

                    // Store in localStorage
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', refreshToken);
                    }

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                    });
                } catch (error: any) {
                    throw new Error(error.response?.data?.error || 'Registration failed');
                }
            },

            logout: () => {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }

                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                });
            },

            updateUser: (user: User) => {
                set({ user });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
