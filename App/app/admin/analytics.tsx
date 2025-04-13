import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { TrendingUp, ShoppingBag, UserCheck, AlertTriangle } from 'lucide-react-native';

// Mock analytics data
const ANALYTICS_DATA = {
  totalOrders: 248,
  completedOrders: 192,
  pendingOrders: 32,
  issueReports: 24,
  recentGrowth: '+18%',
  activeRiders: 12,
  topAreas: [
    { name: 'South Delhi', orders: 89 },
    { name: 'North Delhi', orders: 72 },
    { name: 'Noida', orders: 43 },
    { name: 'Gurgaon', orders: 37 },
  ],
  weeklyStats: [
    { day: 'Mon', orders: 28 },
    { day: 'Tue', orders: 32 },
    { day: 'Wed', orders: 42 },
    { day: 'Thu', orders: 38 },
    { day: 'Fri', orders: 45 },
    { day: 'Sat', orders: 36 },
    { day: 'Sun', orders: 27 },
  ],
};

export default function AdminAnalyticsScreen() {
  // Find the max value for weekly stats to normalize bar heights
  const maxWeeklyOrders = Math.max(...ANALYTICS_DATA.weeklyStats.map(day => day.orders));
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics Dashboard</Text>
        <View style={styles.growthBadge}>
          <TrendingUp size={16} color={colors.success} />
          <Text style={styles.growthText}>{ANALYTICS_DATA.recentGrowth}</Text>
        </View>
      </View>
      
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statsCard}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
            <ShoppingBag size={20} color={colors.primary} />
          </View>
          <Text style={styles.statsValue}>{ANALYTICS_DATA.totalOrders}</Text>
          <Text style={styles.statsLabel}>Total Orders</Text>
        </View>
        
        <View style={styles.statsCard}>
          <View style={[styles.iconContainer, { backgroundColor: colors.successLight }]}>
            <UserCheck size={20} color={colors.success} />
          </View>
          <Text style={styles.statsValue}>{ANALYTICS_DATA.completedOrders}</Text>
          <Text style={styles.statsLabel}>Completed</Text>
        </View>
        
        <View style={styles.statsCard}>
          <View style={[styles.iconContainer, { backgroundColor: colors.warningLight }]}>
            <ShoppingBag size={20} color={colors.warning} />
          </View>
          <Text style={styles.statsValue}>{ANALYTICS_DATA.pendingOrders}</Text>
          <Text style={styles.statsLabel}>Pending</Text>
        </View>
        
        <View style={styles.statsCard}>
          <View style={[styles.iconContainer, { backgroundColor: colors.errorLight }]}>
            <AlertTriangle size={20} color={colors.error} />
          </View>
          <Text style={styles.statsValue}>{ANALYTICS_DATA.issueReports}</Text>
          <Text style={styles.statsLabel}>Issues</Text>
        </View>
      </View>
      
      {/* Weekly Chart */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Weekly Order Statistics</Text>
        <View style={styles.chartContainer}>
          {ANALYTICS_DATA.weeklyStats.map((day, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barLabelContainer}>
                <Text style={styles.barValue}>{day.orders}</Text>
              </View>
              <View 
                style={[
                  styles.bar,
                  { 
                    height: `${(day.orders / maxWeeklyOrders) * 100}%`,
                    backgroundColor: day.orders === maxWeeklyOrders ? colors.primary : colors.primaryLight
                  }
                ]} 
              />
              <Text style={styles.barLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Top Areas */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Top Areas</Text>
        {ANALYTICS_DATA.topAreas.map((area, index) => (
          <View key={index} style={styles.areaItem}>
            <Text style={styles.areaName}>{area.name}</Text>
            <View style={styles.areaStatsContainer}>
              <Text style={styles.areaOrderCount}>{area.orders} orders</Text>
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${(area.orders / ANALYTICS_DATA.topAreas[0].orders) * 100}%`,
                      backgroundColor: index === 0 ? colors.primary : colors.primaryLight 
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        ))}
      </View>
      
      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Quick Summary</Text>
        <Text style={styles.summaryText}>
          Currently operating with {ANALYTICS_DATA.activeRiders} active riders.
          The platform has completed {ANALYTICS_DATA.completedOrders} deliveries 
          with {ANALYTICS_DATA.recentGrowth} growth in the past week.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  growthText: {
    color: colors.success,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '47%',
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: colors.text,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingTop: 30,
  },
  barContainer: {
    alignItems: 'center',
    width: '12%',
  },
  barLabelContainer: {
    position: 'absolute',
    top: -25,
    width: '100%',
    alignItems: 'center',
  },
  barValue: {
    fontSize: 12,
    color: colors.text,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 5,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: colors.text,
  },
  areaItem: {
    marginBottom: 16,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 8,
  },
  areaStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaOrderCount: {
    fontSize: 14,
    color: colors.text,
    width: 80,
  },
  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  summaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
}); 