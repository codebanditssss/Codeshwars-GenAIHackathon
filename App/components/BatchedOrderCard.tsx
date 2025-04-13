import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Package, Clock, IndianRupee, Navigation, Layers } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Order } from '@/types';
import { formatDistance } from '@/utils/formatters';
import { LinearGradient } from 'expo-linear-gradient';

interface BatchedOrderCardProps {
  orders: Order[];
  onAccept: () => void;
  onReject: () => void;
}

export const BatchedOrderCard: React.FC<BatchedOrderCardProps> = ({
  orders,
  onAccept,
  onReject
}) => {
  // Calculate total distance and price
  const totalDistance = orders.reduce((sum, order) => sum + order.distance, 0);
  const totalPrice = orders.reduce((sum, order) => sum + order.price, 0);
  
  // Calculate savings (assume 20% for batched orders)
  const savings = Math.round(totalPrice * 0.2);
  const bonusPoints = 15;

  return (
    <LinearGradient
      colors={[colors.primary + '20', colors.secondary + '20']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Layers size={24} color={colors.primary} />
          <Text style={styles.title}>Batch of {orders.length} Orders</Text>
        </View>
        <View style={styles.savingsBadge}>
          <Text style={styles.savingsText}>+₹{savings} Bonus</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        {orders.map((order, index) => (
          <View key={order.id} style={styles.orderItem}>
            <View style={styles.orderNumber}>
              <Text style={styles.orderNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.businessName}>{order.businessName}</Text>
              <View style={styles.infoRow}>
                <MapPin size={14} color={colors.text} />
                <Text style={styles.infoText} numberOfLines={1}>
                  {order.customerAddress}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Navigation size={18} color={colors.accent} />
          <Text style={styles.statValue}>{formatDistance(totalDistance)}</Text>
          <Text style={styles.statLabel}>Total Distance</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <IndianRupee size={18} color={colors.primary} />
          <Text style={styles.statValue}>₹{totalPrice + savings}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Clock size={18} color={colors.secondary} />
          <Text style={styles.statValue}>+{bonusPoints}</Text>
          <Text style={styles.statLabel}>Bonus Points</Text>
        </View>
      </View>
      
      <View style={styles.optimizedRoute}>
        <Text style={styles.optimizedRouteText}>
          Optimized route saves you {Math.round(totalDistance * 0.3)} km!
        </Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.rejectButton} 
          onPress={onReject}
          activeOpacity={0.7}
        >
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.acceptButton} 
          onPress={onAccept}
          activeOpacity={0.7}
        >
          <Text style={styles.acceptText}>Accept Batch</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginLeft: 8,
  },
  savingsBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  orderNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderNumberText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  orderDetails: {
    flex: 1,
  },
  businessName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.text,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 10,
    color: colors.text,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  optimizedRoute: {
    backgroundColor: colors.secondary + '20',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  optimizedRouteText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  acceptButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },
  acceptText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  rejectButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  rejectText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
});