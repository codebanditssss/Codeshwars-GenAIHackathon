import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { BarChart3, TrendingUp, Clock, Package, LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { Header } from '@/components/Header';
import { useAuthStore } from '@/store/auth-store';
import { useOrderStore } from '@/store/order-store';
import { formatCurrency } from '@/utils/formatters';

export default function AnalyticsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { orders, getOrdersByBusiness } = useOrderStore();
  
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const businessOrders = user ? getOrdersByBusiness(user.id) : [];
  const completedOrders = businessOrders.filter(order => order.status === 'delivered');
  const pendingOrders = businessOrders.filter(order => 
    ['pending', 'assigned', 'accepted', 'picked_up', 'in_transit'].includes(order.status)
  );
  
  // Mock analytics data
  const dailyData = {
    orders: completedOrders.length > 0 ? completedOrders.length : 5,
    revenue: completedOrders.reduce((sum, order) => sum + order.price, 0) || 450,
    avgTime: '28 mins',
    savings: 120,
  };
  
  const weeklyData = {
    orders: dailyData.orders * 6,
    revenue: dailyData.revenue * 6,
    avgTime: '32 mins',
    savings: dailyData.savings * 6,
  };
  
  const monthlyData = {
    orders: dailyData.orders * 25,
    revenue: dailyData.revenue * 25,
    avgTime: '30 mins',
    savings: dailyData.savings * 25,
  };
  
  const getActiveData = () => {
    switch (activeTab) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
    }
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
  
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Analytics" 
        showNotification
        onNotificationPress={() => router.push('/notifications')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'daily' && styles.activeTab
            ]}
            onPress={() => setActiveTab('daily')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'daily' && styles.activeTabText
              ]}
            >
              Daily
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'weekly' && styles.activeTab
            ]}
            onPress={() => setActiveTab('weekly')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'weekly' && styles.activeTabText
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'monthly' && styles.activeTab
            ]}
            onPress={() => setActiveTab('monthly')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'monthly' && styles.activeTabText
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
              <Package size={24} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{getActiveData().orders}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.secondary + '20' }]}>
              <TrendingUp size={24} color={colors.secondary} />
            </View>
            <Text style={styles.statValue}>{formatCurrency(getActiveData().revenue)}</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.accent + '20' }]}>
              <Clock size={24} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>{getActiveData().avgTime}</Text>
            <Text style={styles.statLabel}>Avg Time</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.error + '20' }]}>
              <BarChart3 size={24} color={colors.error} />
            </View>
            <Text style={styles.statValue}>{formatCurrency(getActiveData().savings)}</Text>
            <Text style={styles.statLabel}>Savings</Text>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Order Trends</Text>
          
          <View style={styles.chartPlaceholder}>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 120 }]} />
              <Text style={styles.barLabel}>Mon</Text>
            </View>
            
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 80 }]} />
              <Text style={styles.barLabel}>Tue</Text>
            </View>
            
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 150 }]} />
              <Text style={styles.barLabel}>Wed</Text>
            </View>
            
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 100 }]} />
              <Text style={styles.barLabel}>Thu</Text>
            </View>
            
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 180 }]} />
              <Text style={styles.barLabel}>Fri</Text>
            </View>
            
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 200 }]} />
              <Text style={styles.barLabel}>Sat</Text>
            </View>
            
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 160 }]} />
              <Text style={styles.barLabel}>Sun</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.insightsContainer}>
          <Text style={styles.sectionTitle}>Insights</Text>
          
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Peak Hours</Text>
            <Text style={styles.insightDescription}>
              Your busiest delivery times are between 6:00 PM and 8:00 PM. Consider preparing more orders during this time.
            </Text>
          </View>
          
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Batch Savings</Text>
            <Text style={styles.insightDescription}>
              You saved {formatCurrency(getActiveData().savings)} through order batching. This is a 15% reduction in delivery costs.
            </Text>
          </View>
          
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Delivery Performance</Text>
            <Text style={styles.insightDescription}>
              Average delivery time is {getActiveData().avgTime}, which is 10% faster than the previous period.
            </Text>
          </View>
        </View>
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text,
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 250,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  barContainer: {
    alignItems: 'center',
    width: '12%',
  },
  bar: {
    width: '80%',
    backgroundColor: colors.primary,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: colors.text,
  },
  insightsContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  insightCard: {
    backgroundColor: colors.neutral,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
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