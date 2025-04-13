import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { PlusCircle, Truck, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function VendorDashboardScreen() {
  const router = useRouter();

  const handleAddOrder = () => {
    // Navigate to add order screen
    router.push('/vendor/add-order');
  };

  const handleTrackOrders = () => {
    // Navigate to track orders screen
    router.push('/vendor/track-orders');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Vendor Panel</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddOrder}
          >
            <PlusCircle size={24} color={colors.white} />
            <Text style={styles.buttonText}>Add Order</Text>
            <ChevronRight size={20} color={colors.white} style={styles.arrowIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleTrackOrders}
          >
            <Truck size={24} color={colors.white} />
            <Text style={styles.buttonText}>Track Orders</Text>
            <ChevronRight size={20} color={colors.white} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Orders Summary</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Orders Today</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>In Progress</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
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
    paddingTop: 60,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 48,
  },
  actionButtons: {
    gap: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
}); 