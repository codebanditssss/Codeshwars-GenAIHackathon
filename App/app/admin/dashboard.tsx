import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Users, ClipboardList, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function AdminDashboardScreen() {
  const router = useRouter();

  const handleViewRiders = () => {
    // Navigate to riders list screen
    router.push('/admin/riders');
  };

  const handleViewOrders = () => {
    // Navigate to orders overview screen
    router.push('/admin/orders');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Admin Panel</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleViewRiders}
          >
            <Users size={24} color={colors.white} />
            <Text style={styles.buttonText}>View Riders</Text>
            <ChevronRight size={20} color={colors.white} style={styles.arrowIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleViewOrders}
          >
            <ClipboardList size={24} color={colors.white} />
            <Text style={styles.buttonText}>View Orders</Text>
            <ChevronRight size={20} color={colors.white} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Riders</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Businesses</Text>
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
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
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
}); 