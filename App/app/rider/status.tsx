import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MapPin, Package, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function RiderStatusScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.activeOrderCard}>
          <View style={styles.orderHeader}>
            <View style={styles.headerLeft}>
              <Package size={24} color={colors.primary} />
              <Text style={styles.orderTitle}>Active Order</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>In Progress</Text>
            </View>
          </View>
          
          <View style={styles.orderDetails}>
            <View style={styles.addressItem}>
              <MapPin size={20} color={colors.text} />
              <Text style={styles.addressText}>
                Pickup: SuperMart, Main Market
              </Text>
            </View>
            
            <View style={styles.addressItem}>
              <MapPin size={20} color={colors.primary} />
              <Text style={styles.addressText}>
                Deliver to: 789 Residential Blvd, Apartment 12
              </Text>
            </View>
            
            <View style={styles.timeItem}>
              <Clock size={20} color={colors.text} />
              <Text style={styles.timeText}>
                Estimated delivery time: 30 min
              </Text>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Earnings</Text>
            <Text style={styles.price}>₹120</Text>
          </View>
        </View>
        
        <View style={styles.noActiveOrderContainer}>
          <Text style={styles.noActiveOrderText}>
            You have no other active orders
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  activeOrderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 12,
  },
  statusBadge: {
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    marginBottom: 16,
  },
  addressItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  addressText: {
    fontSize: 15,
    color: colors.textDark,
    marginLeft: 12,
    flex: 1,
  },
  timeItem: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 15,
    color: colors.textDark,
    marginLeft: 12,
  },
  priceContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    color: colors.text,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  noActiveOrderContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  noActiveOrderText: {
    fontSize: 16,
    color: colors.text,
  },
}); 