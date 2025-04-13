import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rider, Business, User } from '@/types';
import { mockRiders, mockBusinesses } from '@/mocks/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  userRole: 'rider' | 'business' | 'customer' | null;
  
  // Actions
  login: (userData: User) => void;
  updateUser: (userData: Partial<User>) => void;
  updateRiderLocation: (latitude: number, longitude: number) => void;
  toggleRiderAvailability: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      userRole: null,
      
      login: (userData: User) => {
        set((state) => ({
          ...state,
          user: userData,
          isAuthenticated: true,
          userRole: userData.role || 'customer'
        }));
      },
      
      setUser: (user: User | null) => {
        set((state) => ({
          ...state,
          user: user,
          isAuthenticated: !!user,
          userRole: user?.role || 'customer'
        }));
      },
      
      logout: () => {
        set((state) => ({
          ...state,
          user: null,
          isAuthenticated: false,
          userRole: 'customer'
        }));
      },
      
      updateUser: (userData) => {
        const currentUser = get().user;
        if (!currentUser) return;
        
        set({ user: { ...currentUser, ...userData } });
      },
      
      updateRiderLocation: (latitude, longitude) => {
        const currentUser = get().user;
        if (!currentUser || currentUser.role !== 'rider') return;
        
        const rider = currentUser as Rider;
        set({
          user: {
            ...rider,
            location: { latitude, longitude }
          }
        });
      },
      
      toggleRiderAvailability: () => {
        set((state) => {
          if (!state.user) return state;
          return {
            ...state,
            user: {
              ...state.user,
              isAvailable: !state.user.isAvailable
            }
          };
        });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);