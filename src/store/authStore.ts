import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'agent';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, role?: 'user' | 'agent') => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (email, role = 'user') => {
        // Mock login
        const mockUser: User = {
            id: '1',
            name: email.split('@')[0],
            email,
            role,
        };
        set({ user: mockUser, isAuthenticated: true });
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));
