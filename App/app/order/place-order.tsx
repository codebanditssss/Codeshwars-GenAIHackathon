import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Package, Truck } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function PlaceOrderScreen() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState({
    itemName: '',
    pickupAddress: '',
    deliveryAddress: '',
    notes: '',
  });
  
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Submit order
      handleSubmitOrder();
    }
  };

  const handleSubmitOrder = () => {
    // Here we would typically send the order to the backend
    // For now, we'll just simulate a successful submission
    alert('Order placed successfully!');
    router.replace('/(customer)/home');
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Item Details';
      case 2:
        return 'Pickup & Delivery';
      case 3:
        return 'Confirm Order';
      default:
        return 'Place Order';
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.label}>What are you sending?</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.itemName}
              onChangeText={(text) => setOrderDetails({ ...orderDetails, itemName: text })}
              placeholder="e.g., Small Package, Food, Documents"
            />
            
            <Text style={styles.label}>Additional Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={orderDetails.notes}
              onChangeText={(text) => setOrderDetails({ ...orderDetails, notes: text })}
              placeholder="e.g., Fragile items, special handling instructions"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Pickup Address</Text>
            <View style={styles.addressInputContainer}>
              <MapPin size={20} color={colors.text} style={styles.inputIcon} />
              <TextInput
                style={styles.addressInput}
                value={orderDetails.pickupAddress}
                onChangeText={(text) => setOrderDetails({ ...orderDetails, pickupAddress: text })}
                placeholder="Enter pickup location"
              />
            </View>
            
            <Text style={styles.label}>Delivery Address</Text>
            <View style={styles.addressInputContainer}>
              <MapPin size={20} color={colors.text} style={styles.inputIcon} />
              <TextInput
                style={styles.addressInput}
                value={orderDetails.deliveryAddress}
                onChangeText={(text) => setOrderDetails({ ...orderDetails, deliveryAddress: text })}
                placeholder="Enter delivery location"
              />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.confirmTitle}>Order Summary</Text>
            
            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Package size={20} color={colors.text} />
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryLabel}>Item</Text>
                  <Text style={styles.summaryValue}>{orderDetails.itemName || 'Not specified'}</Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryItem}>
                <MapPin size={20} color={colors.text} />
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryLabel}>Pickup From</Text>
                  <Text style={styles.summaryValue}>{orderDetails.pickupAddress || 'Not specified'}</Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryItem}>
                <Truck size={20} color={colors.text} />
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryLabel}>Deliver To</Text>
                  <Text style={styles.summaryValue}>{orderDetails.deliveryAddress || 'Not specified'}</Text>
                </View>
              </View>
              
              {orderDetails.notes && (
                <>
                  <View style={styles.divider} />
                  <View style={styles.summaryItem}>
                    <Text style={styles.notesLabel}>Notes:</Text>
                    <Text style={styles.notesText}>{orderDetails.notes}</Text>
                  </View>
                </>
              )}
            </View>
            
            <View style={styles.pricingContainer}>
              <Text style={styles.priceLabel}>Estimated Price</Text>
              <Text style={styles.price}>₹120</Text>
              <Text style={styles.priceNote}>Cash on Delivery</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{getStepTitle()}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.stepIndicator}>
        {Array(totalSteps).fill(0).map((_, index) => (
          <View 
            key={index}
            style={[
              styles.stepDot,
              index < step ? styles.stepDotActive : null
            ]}
          />
        ))}
      </View>
      
      <ScrollView style={styles.content}>
        {renderStepContent()}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {step === totalSteps ? 'Place Order' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray2,
    marginHorizontal: 4,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 20,
  },
  inputIcon: {
    marginLeft: 12,
  },
  addressInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  summaryTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  notesLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: colors.textDark,
  },
  pricingContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  priceNote: {
    fontSize: 12,
    color: colors.text,
  },
}); 