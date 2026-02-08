import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, role?: User['role']) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (email, role = 'user') => {
        // Mock login logic
        let assignedRole = role;

        // Special logic for admin email or explicit role
        if (email.toLowerCase().includes('admin')) {
            assignedRole = 'admin';
        }

        const mockUser: User = {
            id: '1',
            name: email.split('@')[0],
            email,
            role: assignedRole as User['role'],
        };
        set({ user: mockUser, isAuthenticated: true });
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));
