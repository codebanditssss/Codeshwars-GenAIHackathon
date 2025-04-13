import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Package, User, Phone, Clock, DollarSign, Info, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { useOrderStore } from '@/store/order-store';
import { useAuthStore } from '@/store/auth-store';
import { formatCurrency } from '@/utils/formatters';
import { Order } from '@/types';

export default function CreateOrderScreen() {
  const router = useRouter();
  const { createOrder } = useOrderStore();
  const { user } = useAuthStore();
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [packageSize, setPackageSize] = useState<'small' | 'medium' | 'large'>('small');
  const [packageDescription, setPackageDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Calculate estimated cost based on package size and urgency
  const getEstimatedCost = () => {
    let baseCost = 0;
    
    switch (packageSize) {
      case 'small':
        baseCost = 40;
        break;
      case 'medium':
        baseCost = 60;
        break;
      case 'large':
        baseCost = 80;
        break;
    }
    
    // Add urgent fee if applicable
    if (isUrgent) {
      baseCost += 20;
    }
    
    return baseCost;
  };
  
  // Calculate estimated delivery time
  const getEstimatedTime = () => {
    if (isUrgent) {
      return '20-30 minutes';
    }
    
    return '45-60 minutes';
  };
  
  const handleCreateOrder = async () => {
    // Validate inputs
    if (!customerName || !customerPhone || !customerAddress || !packageDescription) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }
    
    if (customerPhone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      return;
    }
    
    setLoading(true);
    
    try {
      // Create new order with all required properties
      const newOrder: Order = {
        id: `ORD${Math.floor(Math.random() * 10000)}`,
        businessId: user?.id || 'unknown',
        businessName: user?.name || 'Unknown Business',
        businessLocation: {
          latitude: (user?.role === 'business' ? (user as any).location?.latitude : 0) || 28.6139,
          longitude: (user?.role === 'business' ? (user as any).location?.longitude : 0) || 77.2090,
        },
        customerName,
        customerPhone,
        customerAddress,
        customerLandmark: landmark,
        customerLocation: {
          // Mock location for demo purposes
          latitude: 28.6129,
          longitude: 77.2295,
        },
        items: packageDescription,
        status: 'pending',
        riderId: undefined,
        riderName: undefined,
        createdAt: new Date().toISOString(),
        pickupTime: undefined,
        deliveryTime: undefined,
        price: getEstimatedCost(),
        distance: 2.5, // Mock distance in km
        batchId: undefined,
      };
      
      await createOrder(newOrder);
      
      Alert.alert(
        'Order Created',
        'Your order has been created successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert('Error', 'Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    router.back();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create New Order</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color={colors.textDark} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          
          <View style={styles.inputContainer}>
            <User size={20} color={colors.text} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              value={customerName}
              onChangeText={setCustomerName}
              placeholderTextColor={colors.text}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Phone size={20} color={colors.text} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Customer Phone"
              value={customerPhone}
              onChangeText={setCustomerPhone}
              keyboardType="phone-pad"
              placeholderTextColor={colors.text}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <MapPin size={20} color={colors.text} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Delivery Address"
              value={customerAddress}
              onChangeText={setCustomerAddress}
              placeholderTextColor={colors.text}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Info size={20} color={colors.text} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Landmark (optional)"
              value={landmark}
              onChangeText={setLandmark}
              placeholderTextColor={colors.text}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Details</Text>
          
          <Text style={styles.label}>Package Size</Text>
          <View style={styles.packageSizeContainer}>
            <TouchableOpacity
              style={[
                styles.packageSizeButton,
                packageSize === 'small' && styles.packageSizeButtonActive
              ]}
              onPress={() => setPackageSize('small')}
            >
              <Package size={20} color={packageSize === 'small' ? colors.white : colors.text} />
              <Text
                style={[
                  styles.packageSizeText,
                  packageSize === 'small' && styles.packageSizeTextActive
                ]}
              >
                Small
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.packageSizeButton,
                packageSize === 'medium' && styles.packageSizeButtonActive
              ]}
              onPress={() => setPackageSize('medium')}
            >
              <Package size={24} color={packageSize === 'medium' ? colors.white : colors.text} />
              <Text
                style={[
                  styles.packageSizeText,
                  packageSize === 'medium' && styles.packageSizeTextActive
                ]}
              >
                Medium
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.packageSizeButton,
                packageSize === 'large' && styles.packageSizeButtonActive
              ]}
              onPress={() => setPackageSize('large')}
            >
              <Package size={28} color={packageSize === 'large' ? colors.white : colors.text} />
              <Text
                style={[
                  styles.packageSizeText,
                  packageSize === 'large' && styles.packageSizeTextActive
                ]}
              >
                Large
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <Info size={20} color={colors.text} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Package Description"
              value={packageDescription}
              onChangeText={setPackageDescription}
              placeholderTextColor={colors.text}
            />
          </View>
          
          <TouchableOpacity
            style={styles.urgentContainer}
            onPress={() => setIsUrgent(!isUrgent)}
          >
            <View style={[styles.checkbox, isUrgent && styles.checkboxActive]}>
              {isUrgent && <View style={styles.checkboxInner} />}
            </View>
            <View style={styles.urgentTextContainer}>
              <Text style={styles.urgentTitle}>Urgent Delivery</Text>
              <Text style={styles.urgentDescription}>
                Priority assignment to the nearest rider (+₹20)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <DollarSign size={20} color={colors.primary} />
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Estimated Cost</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(getEstimatedCost())}
                </Text>
              </View>
            </View>
            
            <View style={styles.summaryItem}>
              <Clock size={20} color={colors.primary} />
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Estimated Time</Text>
                <Text style={styles.summaryValue}>{getEstimatedTime()}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <Button
          title="Create Order"
          onPress={handleCreateOrder}
          type="primary"
          size="large"
          loading={loading}
          style={styles.createButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textDark,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 8,
  },
  packageSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  packageSizeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  packageSizeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  packageSizeText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  packageSizeTextActive: {
    color: colors.white,
  },
  urgentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  urgentTextContainer: {
    flex: 1,
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
  urgentDescription: {
    fontSize: 14,
    color: colors.text,
  },
  summaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryTextContainer: {
    marginLeft: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  createButton: {
    marginBottom: 24,
  },
});