import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationType } from '@/components/NotificationCard';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  data?: any;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [
        {
          id: 'notif1',
          type: 'order',
          title: 'New Order Available',
          message: 'A new order from MediQuick Pharmacy is available for pickup.',
          time: new Date().toISOString(),
          read: false,
          data: { orderId: 'order1' }
        },
        {
          id: 'notif2',
          type: 'reward',
          title: 'Points Earned!',
          message: 'You earned 10 points for your last delivery. Keep it up!',
          time: new Date(Date.now() - 3600000).toISOString(),
          read: false,
          data: { points: 10 }
        },
        {
          id: 'notif3',
          type: 'payment',
          title: 'Payment Received',
          message: 'You received ₹45 for your delivery to Meena Kumari.',
          time: new Date(Date.now() - 86400000).toISOString(),
          read: true,
          data: { amount: 45 }
        }
      ],
      unreadCount: 2,
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `notif${Date.now()}`,
          time: new Date().toISOString(),
          read: false
        };
        
        set(state => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }));
      },
      
      markAsRead: (id) => {
        set(state => {
          const notifications = state.notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
          );
          
          const unreadCount = notifications.filter(notif => !notif.read).length;
          
          return { notifications, unreadCount };
        });
      },
      
      markAllAsRead: () => {
        set(state => ({
          notifications: state.notifications.map(notif => ({ ...notif, read: true })),
          unreadCount: 0
        }));
      },
      
      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      }
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);