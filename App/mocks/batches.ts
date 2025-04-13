import { Batch } from '@/types';
import { batchedOrders } from './orders';

export const mockBatches: Batch[] = [
  {
    id: 'batch1',
    riderId: 'rider1',
    orderIds: batchedOrders.map(order => order.id),
    status: 'active',
    createdAt: new Date().toISOString(),
    totalDistance: 3.5, // Combined optimized distance
    totalPrice: 60, // Combined price
    savings: 20 // Savings compared to individual deliveries
  }
];