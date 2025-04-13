import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Package, Clock, TrendingUp, LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { Header } from '@/components/Header';
import { MapView } from '@/components/MapView';
import { OrderCard } from '@/components/OrderCard';
import { PointsCard } from '@/components/PointsCard';
import { Badge } from '@/components/Badge';
import { useAuthStore } from '@/store/auth-store';
import { useOrderStore } from '@/store/order-store';
import { Rider, Business, Order } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const { user, userRole, toggleRiderAvailability, logout } = useAuthStore();
  const { orders, getOrdersByStatus, getOrdersByRider, getOrdersByBusiness } = useOrderStore();
  
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    let filteredOrders: Order[] = [];
    
    if (userRole === 'rider' && user?.id) {
      filteredOrders = getOrdersByRider(user.id)?.slice(0, 3) || [];
    } else if (userRole === 'business' && user?.id) {
      filteredOrders = getOrdersByBusiness(user.id)?.slice(0, 3) || [];
    }
    
    setRecentOrders(filteredOrders);
  }, [user, userRole, orders]);
  
  const handleAvailabilityToggle = () => {
    toggleRiderAvailability();
  };
  
  const handleCreateOrder = () => {
    router.push('/business/create-order');
  };
  
  const handleOrderPress = (order: Order) => {
    router.push(`/order/${order.id}`);
  };
  
  const handleViewAllOrders = () => {
    router.push('/(tabs)/orders');
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  if (!user) return null;

  const renderRiderHome = () => {
    const rider = user as Rider;
    
    return (
      <>
        <View style={styles.mapContainer}>
          <MapView />
          
          <View style={styles.availabilityContainer}>
            <TouchableOpacity
              style={[
                styles.availabilityButton,
                rider.isAvailable ? styles.availabilityButtonActive : {}
              ]}
              onPress={handleAvailabilityToggle}
              activeOpacity={0.8}
            >
              <Text style={styles.availabilityText}>
                {rider.isAvailable ? 'Available' : 'Unavailable'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <PointsCard points={rider.points} />
          
          <View style={styles.badgesContainer}>
            <Text style={styles.badgesTitle}>Your Badges</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesList}
            >
              {rider.badges.map((badge) => (
                <Badge key={badge.id} badge={badge} />
              ))}
            </ScrollView>
          </View>
        </View>
        
        <View style={styles.ordersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={handleViewAllOrders}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={() => handleOrderPress(order)}
              />
            ))
          ) : (
            <View style={styles.emptyOrdersContainer}>
              <Package size={40} color={colors.text} />
              <Text style={styles.emptyOrdersText}>No recent orders</Text>
            </View>
          )}
        </View>
      </>
    );
  };
  
  const renderBusinessHome = () => {
    const business = user as Business;
    
    return (
      <>
        <View style={styles.businessStatsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Package size={24} color={colors.primary} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>
                {orders.filter(o => o.businessId === business.id).length}
              </Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Clock size={24} color={colors.secondary} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>
                {orders.filter(o => o.businessId === business.id && o.status === 'pending').length}
              </Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <TrendingUp size={24} color={colors.accent} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>
                {orders.filter(o => o.businessId === business.id && o.status === 'delivered').length}
              </Text>
              <Text style={styles.statLabel}>Delivered</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.businessActionsContainer}>
          <TouchableOpacity 
            style={styles.createOrderButton}
            onPress={handleCreateOrder}
            activeOpacity={0.8}
          >
            <Text style={styles.createOrderText}>Create New Order</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.ordersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={handleViewAllOrders}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={() => handleOrderPress(order)}
              />
            ))
          ) : (
            <View style={styles.emptyOrdersContainer}>
              <Package size={40} color={colors.text} />
              <Text style={styles.emptyOrdersText}>No orders yet</Text>
              <Text style={styles.emptyOrdersSubtext}>Create your first order to get started</Text>
            </View>
          )}
        </View>
      </>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="ConnectSphere" 
        showNotification
        showLogout
        onNotificationPress={() => router.push('/notifications')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {userRole === 'rider' ? renderRiderHome() : renderBusinessHome()}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <LogOut size={24} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  availabilityContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  availabilityButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  availabilityButtonActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  statsContainer: {
    marginBottom: 16,
  },
  badgesContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  badgesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  badgesList: {
    paddingVertical: 8,
  },
  ordersContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  emptyOrdersContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyOrdersText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 12,
  },
  emptyOrdersSubtext: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
    textAlign: 'center',
  },
  businessStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.neutral,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
  businessActionsContainer: {
    marginBottom: 16,
  },
  createOrderButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  createOrderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});