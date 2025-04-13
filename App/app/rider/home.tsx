import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Package, TrendingUp, Shield } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';

export default function RiderHomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isAvailable, setIsAvailable] = useState(true);

  const handleAcceptOrder = () => {
    // Navigate to available orders screen
    router.push('/rider/available-orders');
  };

  const handleCheckStatus = () => {
    // Navigate to status screen
    router.push('/rider/status');
  };

  const toggleAvailability = () => {
    setIsAvailable(prev => !prev);
    // Here we would update the rider's availability status in a real app
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeTitle}>
          Welcome, {user?.name || 'Rider'}!
        </Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAcceptOrder}
          >
            <Package size={24} color={colors.white} />
            <Text style={styles.buttonText}>Accept Order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleCheckStatus}
          >
            <TrendingUp size={24} color={colors.white} />
            <Text style={styles.buttonText}>Check Status</Text>
          </TouchableOpacity>
          
          <View style={styles.availabilityContainer}>
            <View style={styles.availabilityTextContainer}>
              <Shield size={24} color={isAvailable ? colors.primary : colors.gray} />
              <Text style={styles.availabilityLabel}>
                {isAvailable ? 'Available' : 'Unavailable'}
              </Text>
            </View>
            <Switch
              trackColor={{ false: colors.gray2, true: `${colors.primary}50` }}
              thumbColor={isAvailable ? colors.primary : colors.gray}
              ios_backgroundColor={colors.gray2}
              onValueChange={toggleAvailability}
              value={isAvailable}
            />
          </View>
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
    padding: 24,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 60,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 48,
  },
  actionButtons: {
    gap: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    height: 60,
    marginTop: 10,
  },
  availabilityTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 12,
  },
}); 