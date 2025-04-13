import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { Header } from '@/components/Header';
import { OrderCard } from '@/components/OrderCard';
import { EmptyState } from '@/components/EmptyState';
import { useOrderStore } from '@/store/order-store';
import { useAuthStore } from '@/store/auth-store';
import { Order } from '@/types';

export default function OrdersScreen() {
  const router = useRouter();
  const { user, userRole, logout } = useAuthStore();
  const { orders, getOrdersByBusiness, getOrdersByRider } = useOrderStore();
  
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  
  useEffect(() => {
    if (!user) return;
    
    let filteredOrders: Order[] = [];
    
    if (userRole === 'business') {
      filteredOrders = getOrdersByBusiness(user.id);
    } else if (userRole === 'rider') {
      filteredOrders = getOrdersByRider(user.id);
    }
    
    setUserOrders(filteredOrders);
  }, [user, userRole, orders]);
  
  const getFilteredOrders = () => {
    if (activeTab === 'all') {
      return userOrders;
    } else if (activeTab === 'active') {
      return userOrders.filter(order => 
        ['pending', 'assigned', 'accepted', 'picked_up', 'in_transit'].includes(order.status)
      );
    } else {
      return userOrders.filter(order => 
        ['delivered', 'cancelled'].includes(order.status)
      );
    }
  };
  
  const handleCreateOrder = () => {
    router.push('/business/create-order');
  };
  
  const handleOrderPress = (order: Order) => {
    router.push(`/order/${order.id}`);
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
  
  const renderEmptyState = () => {
    return (
      <EmptyState
        title="No Orders Yet"
        description={
          userRole === 'business'
            ? "You haven't created any orders yet. Create your first order to get started."
            : "You don't have any orders assigned yet. Check back later."
        }
        icon="package"
      />
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={userRole === 'rider' ? 'My Orders' : 'Orders'} 
        showNotification
        onNotificationPress={() => router.push('/notifications')}
      />
      
      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'all' && styles.activeTab
            ]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.activeTabText
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'active' && styles.activeTab
            ]}
            onPress={() => setActiveTab('active')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'active' && styles.activeTabText
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'completed' && styles.activeTab
            ]}
            onPress={() => setActiveTab('completed')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'completed' && styles.activeTabText
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={getFilteredOrders()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() => handleOrderPress(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
        
        {userRole === 'business' && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateOrder}
            activeOpacity={0.8}
          >
            <Plus size={24} color={colors.white} />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  activeTabText: {
    color: colors.white,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  createButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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