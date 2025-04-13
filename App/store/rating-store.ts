import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from '@/types';
import { useAuthStore } from './auth-store';

interface RatingState {
  ratings: Rating[];
  
  // Actions
  addRating: (orderId: string, toId: string, rating: number, comment?: string) => Promise<boolean>;
  getRatingsByUser: (userId: string) => Rating[];
  getAverageRating: (userId: string) => number;
}

export const useRatingStore = create<RatingState>()(
  persist(
    (set, get) => ({
      ratings: [
        {
          id: 'rating1',
          orderId: 'order4',
          fromId: 'business1',
          toId: 'rider1',
          rating: 4.5,
          comment: "Very prompt delivery, thank you!",
          createdAt: '2023-04-10T10:20:00Z'
        },
        {
          id: 'rating2',
          orderId: 'order5',
          fromId: 'business2',
          toId: 'rider1',
          rating: 5,
          comment: "Excellent service, very professional",
          createdAt: '2023-04-10T11:45:00Z'
        }
      ],
      
      addRating: async (orderId, toId, rating, comment) => {
        try {
          const user = useAuthStore.getState().user;
          if (!user) return false;
          
          const newRating: Rating = {
            id: `rating${Date.now()}`,
            orderId,
            fromId: user.id,
            toId,
            rating,
            comment,
            createdAt: new Date().toISOString()
          };
          
          set(state => ({
            ratings: [...state.ratings, newRating]
          }));
          
          return true;
        } catch (error) {
          console.error('Add rating error:', error);
          return false;
        }
      },
      
      getRatingsByUser: (userId) => {
        return get().ratings.filter(rating => rating.toId === userId);
      },
      
      getAverageRating: (userId) => {
        const userRatings = get().getRatingsByUser(userId);
        
        if (userRatings.length === 0) return 0;
        
        const sum = userRatings.reduce((acc, curr) => acc + curr.rating, 0);
        return sum / userRatings.length;
      }
    }),
    {
      name: 'rating-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);