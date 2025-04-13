import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ChevronLeft, Eye, EyeOff, Check } from 'lucide-react-native';
import { colors } from '../../constants/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const showSuccessSheet = () => {
    setShowSuccess(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleVerifyAccount = () => {
    if (!newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Here you would typically make an API call to update the password
    console.log('Updating password...');
    showSuccessSheet();
  };

  const handleSuccessButtonPress = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Reset Password',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerShadowVisible: false,
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from the previously used password
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff size={20} color={colors.text} />
              ) : (
                <Eye size={20} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>Must be at least 8 character</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color={colors.text} />
              ) : (
                <Eye size={20} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>Both password must match</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.verifyButton,
            (!newPassword || !confirmPassword) && styles.verifyButtonDisabled
          ]}
          onPress={handleVerifyAccount}
          disabled={!newPassword || !confirmPassword}
        >
          <Text style={styles.verifyButtonText}>Verify Account</Text>
        </TouchableOpacity>
      </View>

      {showSuccess && (
        <Animated.View 
          style={[
            styles.successSheet,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.successContent}>
            <View style={styles.successIcon}>
              <Check size={32} color={colors.white} />
            </View>
            <Text style={styles.successTitle}>Password Changed</Text>
            <Text style={styles.successMessage}>
              Password changed successfully, you can login again with a new password
            </Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={handleSuccessButtonPress}
            >
              <Text style={styles.successButtonText}>Verify Account</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: colors.textDark,
  },
  eyeIcon: {
    padding: 12,
  },
  helperText: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
  },
  verifyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  verifyButtonDisabled: {
    backgroundColor: colors.border,
  },
  verifyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  successSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  successContent: {
    padding: 24,
    alignItems: 'center',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  successButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  successButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 