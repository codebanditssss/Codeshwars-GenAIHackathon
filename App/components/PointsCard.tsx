import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award, TrendingUp } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

interface PointsCardProps {
  points: number;
  completedOrders: number;
}

export const PointsCard: React.FC<PointsCardProps> = ({ points, completedOrders }) => {
  return (
    <LinearGradient
      colors={[colors.primary, '#FF8C40']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.pointsContainer}>
          <Award size={24} color={colors.white} />
          <Text style={styles.pointsLabel}>Your Points</Text>
          <Text style={styles.pointsValue}>{points}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.ordersContainer}>
          <TrendingUp size={24} color={colors.white} />
          <Text style={styles.ordersLabel}>Completed Orders</Text>
          <Text style={styles.ordersValue}>{completedOrders}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  pointsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pointsLabel: {
    color: colors.white,
    fontSize: 14,
    marginTop: 8,
    opacity: 0.9,
  },
  pointsValue: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  ordersContainer: {
    flex: 1,
    alignItems: 'center',
  },
  ordersLabel: {
    color: colors.white,
    fontSize: 14,
    marginTop: 8,
    opacity: 0.9,
  },
  ordersValue: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
});