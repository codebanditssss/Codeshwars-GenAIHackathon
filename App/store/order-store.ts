import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from '@/types';
import { mockOrders } from '@/mocks/orders';

interface OrderState {
  orders: Order[];
  activeOrder: Order | null;
  
  // Actions
  createOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  assignRider: (orderId: string, riderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  getOrdersByRider: (riderId: string) => Order[];
  getOrdersByBusiness: (businessId: string) => Order[];
  setActiveOrder: (order: Order | null) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: mockOrders,
      activeOrder: null,
      
      createOrder: async (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },
      
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) => 
            order.id === orderId ? { ...order, status } : order
          )
        }));
      },
      
      assignRider: (orderId, riderId) => {
        set((state) => ({
          orders: state.orders.map((order) => 
            order.id === orderId ? { ...order, riderId, status: 'assigned' } : order
          )
        }));
      },
      
      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
      
      getOrdersByStatus: (status) => {
        const orders = get().orders;
        if (!orders) return [];
        return orders.filter((order) => order.status === status);
      },
      
      getOrdersByRider: (riderId) => {
        const orders = get().orders;
        if (!orders) return [];
        return orders.filter((order) => order.riderId === riderId);
      },
      
      getOrdersByBusiness: (businessId) => {
        const orders = get().orders;
        if (!orders) return [];
        return orders.filter((order) => order.businessId === businessId);
      },
      
      setActiveOrder: (order) => {
        set({ activeOrder: order });
      }
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);