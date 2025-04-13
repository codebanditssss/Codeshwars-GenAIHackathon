import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Package, Clock, CheckCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';

// Mock data
const MOCK_ORDERS = [
  {
    id: '1',
    itemName: 'Food Delivery',
    pickupAddress: '123 Restaurant St, City Center',
    deliveryAddress: '456 Customer Rd, Suburb',
    distance: 3.5,
    estimatedTime: '20 min',
    price: 80,
  },
  {
    id: '2',
    itemName: 'Grocery Package',
    pickupAddress: 'SuperMart, Main Market',
    deliveryAddress: '789 Residential Blvd, Apartment 12',
    distance: 5.2,
    estimatedTime: '30 min',
    price: 120,
  },
  {
    id: '3',
    itemName: 'Document Envelope',
    pickupAddress: 'Business Office, Commercial Zone',
    deliveryAddress: 'Residential Colony, Block B',
    distance: 2.8,
    estimatedTime: '15 min',
    price: 60,
  },
];

export default function AvailableOrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState(MOCK_ORDERS);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleAcceptOrder = (orderId) => {
    Alert.alert(
      'Accept Order',
      'Are you sure you want to accept this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () => {
            // Here we would typically update the order status in the backend
            // For now, we'll just remove it from the list
            setOrders(orders.filter(order => order.id !== orderId));
            Alert.alert(
              'Order Accepted',
              'You have successfully accepted the order. Navigate to the pickup location.',
              [
                {
                  text: 'OK',
                  onPress: () => router.push('/rider/status'),
                },
              ]
            );
          },
        },
      ]
    );
  };
  
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.packageIconContainer}>
          <Package size={24} color={colors.primary} />
        </View>
        <Text style={styles.orderTitle}>{item.itemName}</Text>
      </View>
      
      <View style={styles.addressContainer}>
        <View style={styles.addressItem}>
          <MapPin size={18} color={colors.text} />
          <Text style={styles.addressText}>
            Pickup: {item.pickupAddress}
          </Text>
        </View>
        
        <View style={styles.addressItem}>
          <MapPin size={18} color={colors.primary} />
          <Text style={styles.addressText}>
            Deliver to: {item.deliveryAddress}
          </Text>
        </View>
      </View>
      
      <View style={styles.orderDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Distance</Text>
          <Text style={styles.detailValue}>{item.distance} km</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Est. Time</Text>
          <Text style={styles.detailValue}>{item.estimatedTime}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Earnings</Text>
          <Text style={styles.detailValue}>₹{item.price}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() => handleAcceptOrder(item.id)}
      >
        <CheckCircle size={20} color={colors.white} />
        <Text style={styles.acceptButtonText}>Accept Order</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Clock size={50} color={colors.gray} />
      <Text style={styles.emptyTitle}>No Available Orders</Text>
      <Text style={styles.emptySubtitle}>
        Check back soon! New orders will appear here.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Available Orders</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  orderCard: {
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
    marginBottom: 12,
  },
  packageIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  addressContainer: {
    marginBottom: 16,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  acceptButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  acceptButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
}); 