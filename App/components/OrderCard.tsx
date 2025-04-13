import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Package, Clock, IndianRupee, Navigation } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Order } from '@/types';
import { formatDistance, formatTime } from '@/utils/formatters';

interface OrderCardProps {
  order: Order;
  onPress?: () => void;
  showActions?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  compact?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPress,
  showActions = false,
  onAccept,
  onReject,
  compact = false
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.accent;
      case 'assigned':
      case 'accepted':
        return colors.primary;
      case 'picked_up':
      case 'in_transit':
        return colors.accent;
      case 'delivered':
        return colors.secondary;
      case 'cancelled':
        return colors.error;
      default:
        return colors.text;
    }
  };

  const renderStatus = () => (
    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
      <Text style={styles.statusText}>
        {order.status.replace('_', ' ').toUpperCase()}
      </Text>
    </View>
  );

  if (compact) {
    return (
      <TouchableOpacity 
        style={styles.compactContainer} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.compactHeader}>
          <Text style={styles.businessName} numberOfLines={1}>
            {order.businessName}
          </Text>
          {renderStatus()}
        </View>
        
        <View style={styles.compactDetails}>
          <View style={styles.infoRow}>
            <MapPin size={16} color={colors.text} />
            <Text style={styles.infoText} numberOfLines={1}>
              {order.customerAddress}
            </Text>
          </View>
          
          <View style={styles.compactFooter}>
            <View style={styles.infoRow}>
              <IndianRupee size={16} color={colors.primary} />
              <Text style={[styles.infoText, styles.price]}>₹{order.price}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Navigation size={16} color={colors.accent} />
              <Text style={styles.infoText}>{formatDistance(order.distance)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.businessName}>{order.businessName}</Text>
        {renderStatus()}
      </View>
      
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <MapPin size={18} color={colors.text} />
          <Text style={styles.infoText}>{order.customerAddress}</Text>
        </View>
        
        {order.customerLandmark && (
          <View style={styles.infoRow}>
            <MapPin size={18} color={colors.text} style={styles.invisible} />
            <Text style={styles.landmarkText}>Near: {order.customerLandmark}</Text>
          </View>
        )}
        
        <View style={styles.infoRow}>
          <Package size={18} color={colors.text} />
          <Text style={styles.infoText} numberOfLines={2}>{order.items}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={18} color={colors.text} />
          <Text style={styles.infoText}>
            {order.createdAt ? formatTime(new Date(order.createdAt)) : 'Just now'}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.priceDistance}>
          <View style={styles.priceContainer}>
            <IndianRupee size={18} color={colors.primary} />
            <Text style={styles.price}>₹{order.price}</Text>
          </View>
          
          <View style={styles.distanceContainer}>
            <Navigation size={18} color={colors.accent} />
            <Text style={styles.distance}>{formatDistance(order.distance)}</Text>
          </View>
        </View>
        
        {showActions && (
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
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  compactContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    marginBottom: 12,
  },
  compactDetails: {
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  landmarkText: {
    fontSize: 14,
    color: colors.accent,
    fontStyle: 'italic',
    flex: 1,
  },
  invisible: {
    opacity: 0,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  compactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceDistance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    fontSize: 16,
    color: colors.accent,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  acceptButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
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
    paddingVertical: 10,
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