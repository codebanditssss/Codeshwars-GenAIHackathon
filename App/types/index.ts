export type UserRole = 'rider' | 'business' | 'customer';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  rating?: number;
  totalRatings?: number;
  createdAt?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  isAvailable?: boolean;
}

export interface Rider extends User {
  role: 'rider';
  vehicleType: 'bike' | 'scooter';
  isAvailable: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
  points: number;
  badges: Badge[];
  completedOrders: number;
}

export interface Business extends User {
  role: 'business';
  address: string;
  businessType: 'kirana' | 'pharmacy' | 'restaurant' | 'other';
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Order {
  id: string;
  businessId: string;
  businessName: string;
  businessLocation: {
    latitude: number;
    longitude: number;
  };
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerLandmark?: string;
  customerLocation: {
    latitude: number;
    longitude: number;
  };
  items: string;
  status: OrderStatus;
  riderId?: string;
  riderName?: string;
  createdAt: string;
  pickupTime?: string;
  deliveryTime?: string;
  price: number;
  distance: number;
  batchId?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'assigned' 
  | 'accepted' 
  | 'picked_up' 
  | 'in_transit' 
  | 'delivered' 
  | 'cancelled';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Rating {
  id: string;
  orderId: string;
  fromId: string;
  toId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Batch {
  id: string;
  riderId: string;
  orderIds: string[];
  status: 'active' | 'completed';
  createdAt: string;
  completedAt?: string;
  totalDistance: number;
  totalPrice: number;
  savings: number;
}