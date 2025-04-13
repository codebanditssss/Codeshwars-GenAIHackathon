import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';

export default function RoleSelectionScreen() {
  const [role, setRole] = useState<'customer' | 'rider' | null>(null);
  const router = useRouter();
  const { setUserRole } = useAuthStore();

  const handleRoleSelection = (selectedRole: 'customer' | 'rider') => {
    setRole(selectedRole);
  };

  const handleContinue = () => {
    if (!role) {
      // Show error or toast that role selection is required
      return;
    }

    // Set the role in the auth store
    setUserRole(role);

    // Navigate to the next step of registration based on role
    if (role === 'rider') {
      router.push('/rider-registration');
    } else {
      router.push('/customer-registration');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Select Your Role</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Choose how you want to use our app</Text>
        
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'customer' && styles.roleButtonSelected
            ]}
            onPress={() => handleRoleSelection('customer')}
          >
            <Text style={styles.roleEmoji}>🛍️</Text>
            <Text style={styles.roleTitle}>Customer</Text>
            <Text style={styles.roleDescription}>
              Order goods from local businesses and get them delivered to your door
            </Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>View details</Text>
              <ChevronRight size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'rider' && styles.roleButtonSelected
            ]}
            onPress={() => handleRoleSelection('rider')}
          >
            <Text style={styles.roleEmoji}>🛵</Text>
            <Text style={styles.roleTitle}>Rider</Text>
            <Text style={styles.roleDescription}>
              Deliver goods to customers and earn money on your own schedule
            </Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>View details</Text>
              <ChevronRight size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !role && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!role}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },
  roleButton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  roleButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  roleEmoji: {
    fontSize: 40,
    marginBottom: 15,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 10,
  },
  roleDescription: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 