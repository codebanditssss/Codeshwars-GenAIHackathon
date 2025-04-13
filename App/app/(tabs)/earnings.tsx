import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, TrendingUp, DollarSign, Award, LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { Header } from '@/components/Header';
import { useAuthStore } from '@/store/auth-store';
import { useOrderStore } from '@/store/order-store';
import { formatCurrency, formatDate } from '@/utils/formatters';

export default function EarningsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { orders, getOrdersByRider } = useOrderStore();
  
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  // Mock earnings data
  const dailyEarnings = 450;
  const weeklyEarnings = 2800;
  const monthlyEarnings = 12000;
  
  const riderOrders = user ? getOrdersByRider(user.id) : [];
  const completedOrders = riderOrders.filter(order => order.status === 'delivered');
  
  const getActiveEarnings = () => {
    switch (activeTab) {
      case 'daily':
        return dailyEarnings;
      case 'weekly':
        return weeklyEarnings;
      case 'monthly':
        return monthlyEarnings;
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
        title="Earnings" 
        showNotification
        onNotificationPress={() => router.push('/notifications')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.earningsCard}>
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
          
          <View style={styles.earningsAmount}>
            <Text style={styles.earningsLabel}>Total Earnings</Text>
            <Text style={styles.earningsValue}>
              {formatCurrency(getActiveEarnings())}
            </Text>
          </View>
          
          <View style={styles.earningsStats}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
                <Calendar size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.statValue}>{completedOrders.length}</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.secondary + '20' }]}>
                <TrendingUp size={20} color={colors.secondary} />
              </View>
              <View>
                <Text style={styles.statValue}>₹{activeTab === 'daily' ? '40' : activeTab === 'weekly' ? '45' : '42'}</Text>
                <Text style={styles.statLabel}>Avg/Order</Text>
              </View>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.accent + '20' }]}>
                <Award size={20} color={colors.accent} />
              </View>
              <View>
                <Text style={styles.statValue}>{activeTab === 'daily' ? '120' : activeTab === 'weekly' ? '750' : '3200'}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          {completedOrders.length > 0 ? (
            completedOrders.slice(0, 5).map((order) => (
              <View key={order.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionIcon}>
                    <DollarSign size={20} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>Order #{order.id.slice(-4)}</Text>
                    <Text style={styles.transactionDate}>{formatDate(order.deliveryTime || order.createdAt)}</Text>
                  </View>
                </View>
                <Text style={styles.transactionAmount}>+{formatCurrency(order.price)}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyTransactions}>
              <Text style={styles.emptyText}>No transactions yet</Text>
            </View>
          )}
        </View>
        
        <View style={styles.incentivesContainer}>
          <Text style={styles.sectionTitle}>Incentives & Bonuses</Text>
          
          <View style={styles.incentiveCard}>
            <View style={styles.incentiveHeader}>
              <Text style={styles.incentiveTitle}>Complete 5 Orders</Text>
              <Text style={styles.incentiveReward}>+₹100</Text>
            </View>
            <View style={styles.progressContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${Math.min((completedOrders.length / 5) * 100, 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {completedOrders.length}/5 orders completed
            </Text>
          </View>
          
          <View style={styles.incentiveCard}>
            <View style={styles.incentiveHeader}>
              <Text style={styles.incentiveTitle}>Weekend Bonus</Text>
              <Text style={styles.incentiveReward}>+₹50/order</Text>
            </View>
            <Text style={styles.incentiveDescription}>
              Get extra ₹50 per order on weekends (Sat-Sun)
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
  earningsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
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
  earningsAmount: {
    alignItems: 'center',
    marginBottom: 24,
  },
  earningsLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  earningsValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textDark,
  },
  earningsStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  transactionsContainer: {
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
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.text,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },
  emptyTransactions: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
  },
  incentivesContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  incentiveCard: {
    backgroundColor: colors.neutral,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  incentiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incentiveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  incentiveReward: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  incentiveDescription: {
    fontSize: 14,
    color: colors.text,
  },
  progressContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.text,
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