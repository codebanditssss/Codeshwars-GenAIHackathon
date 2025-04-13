import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';

type RoleSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectRole: (role: 'customer' | 'rider') => void;
};

export default function RoleSelectionModal({ visible, onClose, onSelectRole }: RoleSelectionModalProps) {
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const { height } = Dimensions.get('window');

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 10,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.modalContent,
            { transform: [{ translateY }] }
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Select Your Role</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => onSelectRole('customer')}
            >
              <Text style={styles.optionText}>Customer</Text>
              <Text style={styles.optionDescription}>
                Order and receive deliveries
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => onSelectRole('rider')}
            >
              <Text style={styles.optionText}>Rider</Text>
              <Text style={styles.optionDescription}>
                Deliver orders and earn money
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.text,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.white,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.text,
  },
}); 