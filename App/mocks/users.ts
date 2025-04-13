import { Rider, Business } from '@/types';

export const mockRiders: Rider[] = [
  {
    id: 'rider1',
    name: 'Ravi Kumar',
    phone: '+919876543210',
    role: 'rider',
    vehicleType: 'bike',
    isAvailable: true,
    location: {
      latitude: 25.594095,
      longitude: 85.137566
    },
    rating: 4.8,
    totalRatings: 24,
    points: 120,
    badges: [
      {
        id: 'badge1',
        name: 'Trusted Rider',
        description: 'Completed 10+ deliveries with 4.5+ rating',
        icon: 'award',
        earnedAt: '2023-04-01T10:30:00Z'
      }
    ],
    completedOrders: 12,
    createdAt: '2023-03-15T08:30:00Z'
  },
  {
    id: 'rider2',
    name: 'Priya Singh',
    phone: '+919876543211',
    role: 'rider',
    vehicleType: 'scooter',
    isAvailable: true,
    location: {
      latitude: 25.596095,
      longitude: 85.139566
    },
    rating: 4.5,
    totalRatings: 18,
    points: 90,
    badges: [],
    completedOrders: 9,
    createdAt: '2023-03-20T09:15:00Z'
  },
  {
    id: 'rider3',
    name: 'Amit Sharma',
    phone: '+919876543212',
    role: 'rider',
    vehicleType: 'bike',
    isAvailable: false,
    location: {
      latitude: 25.592095,
      longitude: 85.135566
    },
    rating: 4.2,
    totalRatings: 15,
    points: 75,
    badges: [],
    completedOrders: 7,
    createdAt: '2023-03-25T11:45:00Z'
  }
];

export const mockBusinesses: Business[] = [
  {
    id: 'business1',
    name: 'MediQuick Pharmacy',
    phone: '+919876543220',
    role: 'business',
    businessType: 'pharmacy',
    address: '123 Gandhi Road, Patna',
    location: {
      latitude: 25.595095,
      longitude: 85.138566
    },
    rating: 4.6,
    totalRatings: 32,
    createdAt: '2023-02-10T10:00:00Z'
  },
  {
    id: 'business2',
    name: 'Fresh Grocery Store',
    phone: '+919876543221',
    role: 'business',
    businessType: 'kirana',
    address: '45 Market Street, near Shiv Temple, Patna',
    location: {
      latitude: 25.597095,
      longitude: 85.140566
    },
    rating: 4.4,
    totalRatings: 28,
    createdAt: '2023-02-15T11:30:00Z'
  },
  {
    id: 'business3',
    name: 'Spice Junction Restaurant',
    phone: '+919876543222',
    role: 'business',
    businessType: 'restaurant',
    address: '78 Food Lane, Patna',
    location: {
      latitude: 25.593095,
      longitude: 85.136566
    },
    rating: 4.7,
    totalRatings: 45,
    createdAt: '2023-02-05T09:45:00Z'
  }
];

export const currentUser: Rider = mockRiders[0];