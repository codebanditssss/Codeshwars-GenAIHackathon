import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { OrderStatus } from '@/types';

interface StatusStepperProps {
  status: OrderStatus;
}

export const StatusStepper: React.FC<StatusStepperProps> = ({ status }) => {
  const steps = [
    { key: 'accepted', label: 'Accepted' },
    { key: 'picked_up', label: 'Picked Up' },
    { key: 'in_transit', label: 'In Transit' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getStepStatus = (stepKey: string) => {
    const statusOrder = ['accepted', 'picked_up', 'in_transit', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);
    const stepIndex = statusOrder.indexOf(stepKey);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const stepStatus = getStepStatus(step.key);
        const isLast = index === steps.length - 1;
        
        return (
          <View key={step.key} style={styles.stepContainer}>
            <View style={styles.stepContent}>
              <View style={[
                styles.stepCircle,
                stepStatus === 'completed' && styles.completedCircle,
                stepStatus === 'current' && styles.currentCircle
              ]}>
                {stepStatus === 'completed' ? (
                  <Check size={16} color={colors.white} />
                ) : stepStatus === 'current' ? (
                  <Clock size={16} color={colors.white} />
                ) : null}
              </View>
              <Text style={[
                styles.stepLabel,
                stepStatus === 'completed' && styles.completedLabel,
                stepStatus === 'current' && styles.currentLabel
              ]}>
                {step.label}
              </Text>
            </View>
            
            {!isLast && (
              <View style={[
                styles.connector,
                stepStatus === 'completed' && styles.completedConnector
              ]} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepContent: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedCircle: {
    backgroundColor: colors.secondary,
  },
  currentCircle: {
    backgroundColor: colors.primary,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  completedLabel: {
    color: colors.secondary,
    fontWeight: '500',
  },
  currentLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
  connector: {
    position: 'absolute',
    top: 12,
    right: -50 + '%',
    width: '100%',
    height: 2,
    backgroundColor: colors.lightGray,
    zIndex: -1,
  },
  completedConnector: {
    backgroundColor: colors.secondary,
  },
});