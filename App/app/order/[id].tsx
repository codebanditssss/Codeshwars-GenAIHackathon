import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Package, Phone, IndianRupee, Navigation, User, Clock, CheckCheck, MessageCircle, Layers } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { MapView } from '@/components/MapView';
import { StatusStepper } from '@/components/StatusStepper';
import { RatingModal } from '@/components/RatingModal';
import { useAuthStore } from '@/store/auth-store';
import { useOrderStore } from '@/store/order-store';
import { useRatingStore } from '@/store/rating-store';
import { useNotificationStore } from '@/store/notification-store';
import { Order, OrderStatus } from '@/types';
import { formatDateTime, formatDistance } from '@/utils/formatters';

export default function OrderDetailScreen() {
  const { id, accept, batch } = useLocalSearchParams();
  const router = useRouter();
  const { user, userRole } = useAuthStore();
  const { availableOrders, myOrders, completedOrders, batchedOrders, acceptOrder, updateOrderStatus } = useOrderStore();
  const { addRating } = useRatingStore();
  const { addNotification } = useNotificationStore();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showLandmarkModal, setShowLandmarkModal] = useState(false);
  const [landmark, setLandmark] = useState('');
  const [showMapFullscreen, setShowMapFullscreen] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isBatchOrder, setIsBatchOrder] = useState(batch === 'true');
  
  const isRider = userRole === 'rider';
  const isCompleted = order?.status === 'delivered';
  
  useEffect(() => {
    // Find the order in all possible places
    const foundOrder = 
      availableOrders.find(o => o.id === id) || 
      myOrders.find(o => o.id === id) || 
      completedOrders.find(o => o.id === id) ||
      batchedOrders.find(o => o.id === id);
    
    if (foundOrder) {
      setOrder(foundOrder);
      
      // If the order has a landmark, set it
      if (foundOrder.customerLandmark) {
        setLandmark(foundOrder.customerLandmark);
      }
    }
    
    // If the accept param is true, automatically accept the order
    if (accept === 'true' && foundOrder && isRider) {
      handleAcceptOrder();
    }
  }, [id, availableOrders, myOrders, completedOrders, batchedOrders]);
  
  const handleAcceptOrder = async () => {
    if (!order) return;
    
    setLoading(true);
    try {
      const success = await acceptOrder(order.id);
      if (success) {
        Alert.alert('Success', 'Order accepted successfully!');
        
        // Add notification
        addNotification({
          type: 'order',
          title: 'Order Accepted',
          message: `You have accepted an order from ${order.businessName}. Head to the pickup location.`,
          data: { orderId: order.id }
        });
        
        // Refresh the order
        const updatedOrder = myOrders.find(o => o.id === id);
        if (updatedOrder) {
          setOrder(updatedOrder);
        }
      } else {
        Alert.alert('Error', 'Failed to accept order. Please try again.');
      }
    } catch (error) {
      console.error('Accept order error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateStatus = async (status: OrderStatus) => {
    if (!order) return;
    
    if (status === 'picked_up') {
      // Show success message
      Alert.alert('Success', 'Pickup confirmed! Head to the delivery location.');
      
      // Add notification
      addNotification({
        type: 'order',
        title: 'Order Picked Up',
        message: `You have picked up the order from ${order.businessName}. Head to the delivery location.`,
        data: { orderId: order.id }
      });
    } else if (status === 'in_transit') {
      // Show OTP modal for delivery
      setShowOtpModal(true);
      return;
    }
    
    setLoading(true);
    try {
      const success = await updateOrderStatus(order.id, status);
      if (success) {
        // Refresh the order
        if (status === 'delivered') {
          const updatedOrder = completedOrders.find(o => o.id === id);
          if (updatedOrder) {
            setOrder(updatedOrder);
            setShowRatingModal(true);
            
            // Add notification
            addNotification({
              type: 'order',
              title: 'Order Delivered',
              message: `You have successfully delivered the order to ${order.customerName}.`,
              data: { orderId: order.id }
            });
            
            // Add points notification
            const points = isBatchOrder ? 25 : 10;
            addNotification({
              type: 'reward',
              title: 'Points Earned!',
              message: `You earned ${points} points for your delivery. Keep it up!`,
              data: { points }
            });
          }
        } else {
          const updatedOrder = myOrders.find(o => o.id === id);
          if (updatedOrder) {
            setOrder(updatedOrder);
          }
        }
      } else {
        Alert.alert('Error', 'Failed to update order status. Please try again.');
      }
    } catch (error) {
      console.error('Update status error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOtp = () => {
    // For demo, any 4-digit OTP works
    if (otp.length === 4) {
      setShowOtpModal(false);
      setOtp('');
      handleUpdateStatus('delivered');
    } else {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
    }
  };
  
  const handleAddLandmark = () => {
    if (!landmark.trim()) {
      Alert.alert('Error', 'Please enter a landmark');
      return;
    }
    
    // In a real app, we would update the order in the backend
    // For demo, just update the local state
    if (order) {
      const updatedOrder = { ...order, customerLandmark: landmark };
      setOrder(updatedOrder);
      setShowLandmarkModal(false);
      
      Alert.alert('Success', 'Landmark added successfully!');
    }
  };
  
  const handleSubmitRating = async (rating: number, comment: string) => {
    if (!order) return;
    
    try {
      // For rider, rate the business
      // For business, rate the rider
      const toId = isRider ? order.businessId : order.riderId || '';
      
      if (!toId) {
        Alert.alert('Error', 'Cannot find user to rate.');
        return;
      }
      
      const success = await addRating(order.id, toId, rating, comment);
      
      if (success) {
        Alert.alert('Success', 'Rating submitted successfully!');
        setShowRatingModal(false);
        
        // If this is a rider and they've completed a batch order, show badge notification
        if (isRider && isBatchOrder) {
          // Add badge notification
          addNotification({
            type: 'reward',
            title: 'New Badge Earned!',
            message: 'Congratulations! You\'ve earned the "Efficient Rider" badge for completing a batch delivery.',
            data: { badge: 'efficient_rider' }
          });
          
          // Navigate to rewards page to show the badge
          router.push('/(tabs)/earnings');
        }
      } else {
        Alert.alert('Error', 'Failed to submit rating. Please try again.');
      }
    } catch (error) {
      console.error('Submit rating error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  
  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading order details...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>Order #{order.id.substring(order.id.length - 6)}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(order.status) }
            ]}>
              <Text style={styles.statusText}>
                {order.status.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
          </View>
          
          <Text style={styles.dateTime}>{formatDateTime(order.createdAt)}</Text>
          
          {isBatchOrder && (
            <View style={styles.batchBadge}>
              <Layers size={16} color={colors.white} />
              <Text style={styles.batchText}>Batch Order</Text>
            </View>
          )}
        </View>
        
        {order.status !== 'pending' && (
          <View style={styles.stepperContainer}>
            <StatusStepper status={order.status as OrderStatus} />
          </View>
        )}
        
        <View style={styles.mapContainer}>
          <MapView
            pickupLocation={order.businessLocation}
            deliveryLocation={order.customerLocation}
            height={200}
          />
          
          <TouchableOpacity 
            style={styles.viewMapButton}
            onPress={() => setShowMapFullscreen(true)}
          >
            <Text style={styles.viewMapText}>View Full Map</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Details</Text>
          
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MapPin size={20} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Business</Text>
                <Text style={styles.detailText}>{order.businessName}</Text>
                <Text style={styles.detailSubtext}>{order.businessId}</Text>
              </View>
            </View>
            
            <View style={styles.detailDivider} />
            
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Package size={20} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Items</Text>
                <Text style={styles.detailText}>{order.items}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <User size={20} color={colors.accent} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Customer</Text>
                <Text style={styles.detailText}>{order.customerName}</Text>
              </View>
            </View>
            
            <View style={styles.detailDivider} />
            
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Phone size={20} color={colors.accent} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailText}>{order.customerPhone}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.callButton}
                activeOpacity={0.7}
                onPress={() => {
                  // In a real app, we would make a phone call
                  // For demo, just show an alert
                  Alert.alert('Call', `Calling ${order.customerPhone}...`);
                }}
              >
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailDivider} />
            
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MapPin size={20} color={colors.accent} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailText}>{order.customerAddress}</Text>
                {order.customerLandmark && (
                  <Text style={styles.landmarkText}>Near: {order.customerLandmark}</Text>
                )}
              </View>
              
              {isRider && order.status !== 'delivered' && (
                <TouchableOpacity 
                  style={styles.addLandmarkButton}
                  onPress={() => setShowLandmarkModal(true)}
                >
                  <Text style={styles.addLandmarkText}>
                    {order.customerLandmark ? 'Edit' : 'Add'} Landmark
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <IndianRupee size={20} color={colors.primary} />
                <Text style={styles.summaryText}>₹{order.price}</Text>
                <Text style={styles.summaryLabel}>Price</Text>
              </View>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryItem}>
                <Navigation size={20} color={colors.accent} />
                <Text style={styles.summaryText}>{formatDistance(order.distance)}</Text>
                <Text style={styles.summaryLabel}>Distance</Text>
              </View>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryItem}>
                <Clock size={20} color={colors.secondary} />
                <Text style={styles.summaryText}>~25 min</Text>
                <Text style={styles.summaryLabel}>Est. Time</Text>
              </View>
            </View>
            
            {isBatchOrder && (
              <View style={styles.batchBonus}>
                <Text style={styles.batchBonusText}>
                  Batch Bonus: +₹15 and +15 points!
                </Text>
              </View>
            )}
          </View>
        </View>
        
        {isRider && order.status === 'pending' && (
          <Button
            title="Accept Order"
            onPress={handleAcceptOrder}
            type="primary"
            size="large"
            loading={loading}
            style={styles.actionButton}
          />
        )}
        
        {isRider && order.status === 'accepted' && (
          <Button
            title="Confirm Pickup"
            onPress={() => handleUpdateStatus('picked_up')}
            type="primary"
            size="large"
            loading={loading}
            style={styles.actionButton}
            icon={<CheckCheck size={20} color={colors.white} />}
          />
        )}
        
        {isRider && order.status === 'picked_up' && (
          <Button
            title="Confirm Delivery"
            onPress={() => handleUpdateStatus('in_transit')}
            type="primary"
            size="large"
            loading={loading}
            style={styles.actionButton}
            icon={<CheckCheck size={20} color={colors.white} />}
          />
        )}
        
        {isCompleted && (
          <Button
            title="Rate"
            onPress={() => setShowRatingModal(true)}
            type="outline"
            size="large"
            icon={<Star size={20} color={colors.primary} />}
            style={styles.actionButton}
          />
        )}
        
        {isRider && order.status !== 'pending' && order.status !== 'delivered' && (
          <TouchableOpacity 
            style={styles.messageCustomer}
            onPress={() => {
              // In a real app, we would open a chat
              // For demo, just show an alert
              Alert.alert('Message', `Sending message to ${order.customerName}...`);
            }}
          >
            <MessageCircle size={20} color={colors.accent} />
            <Text style={styles.messageCustomerText}>Message Customer</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      
      {/* Rating Modal */}
      <RatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleSubmitRating}
        title={isRider ? `Rate ${order.businessName}` : `Rate ${order.riderName || 'Rider'}`}
      />
      
      {/* Landmark Modal */}
      <Modal
        visible={showLandmarkModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLandmarkModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Landmark</Text>
            <Text style={styles.modalSubtitle}>
              Add a nearby landmark to help with navigation
            </Text>
            
            <TextInput
              style={styles.landmarkInput}
              placeholder="e.g., near Shiv Temple, blue building"
              placeholderTextColor={colors.text}
              value={landmark}
              onChangeText={setLandmark}
              multiline
            />
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancel}
                onPress={() => setShowLandmarkModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalSave}
                onPress={handleAddLandmark}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Fullscreen Map Modal */}
      <Modal
        visible={showMapFullscreen}
        animationType="slide"
        onRequestClose={() => setShowMapFullscreen(false)}
      >
        <SafeAreaView style={styles.fullscreenContainer}>
          <View style={styles.fullscreenHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowMapFullscreen(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.fullscreenTitle}>Route Map</Text>
          </View>
          
          <MapView
            pickupLocation={order.businessLocation}
            deliveryLocation={order.customerLocation}
            height={Platform.OS === 'web' ? 500 : undefined}
            showLabels
          />
          
          {order.customerLandmark && (
            <View style={styles.fullscreenLandmark}>
              <MapPin size={16} color={colors.accent} />
              <Text style={styles.fullscreenLandmarkText}>
                Landmark: {order.customerLandmark}
              </Text>
            </View>
          )}
        </SafeAreaView>
      </Modal>
      
      {/* OTP Modal */}
      <Modal
        visible={showOtpModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOtpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delivery Verification</Text>
            <Text style={styles.modalSubtitle}>
              Enter the 4-digit OTP provided by the customer
            </Text>
            
            <TextInput
              style={styles.otpInput}
              placeholder="Enter 4-digit OTP"
              placeholderTextColor={colors.text}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={4}
            />
            
            <Text style={styles.otpHint}>
              For demo, enter any 4 digits
            </Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancel}
                onPress={() => setShowOtpModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalSave}
                onPress={handleVerifyOtp}
              >
                <Text style={styles.modalSaveText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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

const Star = ({ size, color }: { size: number; color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color, fontSize: size * 0.8 }}>★</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.text,
  },
  header: {
    marginBottom: 20,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  statusBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  dateTime: {
    fontSize: 14,
    color: colors.text,
  },
  batchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
    gap: 4,
  },
  batchText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  stepperContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  mapContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  viewMapButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  viewMapText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 12,
  },
  detailCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    color: colors.textDark,
  },
  detailSubtext: {
    fontSize: 12,
    color: colors.text,
    marginTop: 2,
  },
  landmarkText: {
    fontSize: 14,
    color: colors.accent,
    fontStyle: 'italic',
    marginTop: 4,
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  callButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  addLandmarkButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLandmarkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.text,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  batchBonus: {
    backgroundColor: colors.secondary + '20',
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  batchBonusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
  },
  actionButton: {
    marginVertical: 20,
  },
  messageCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  messageCustomerText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 20,
  },
  landmarkInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.textDark,
    textAlignVertical: 'top',
    minHeight: 80,
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 20,
    color: colors.textDark,
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 8,
  },
  otpHint: {
    fontSize: 12,
    color: colors.text,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancel: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
  modalCancelText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  modalSave: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalSaveText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fullscreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    position: 'relative',
  },
  fullscreenTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  fullscreenLandmark: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  fullscreenLandmarkText: {
    fontSize: 16,
    color: colors.textDark,
  },
});