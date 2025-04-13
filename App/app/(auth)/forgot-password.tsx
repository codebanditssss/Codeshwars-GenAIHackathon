import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ChevronLeft, Mail, Check } from 'lucide-react-native';
import { colors } from '../../constants/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const showSuccessSheet = () => {
    setShowSuccess(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    // Here you would typically make an API call to send the reset email
    console.log('Sending reset email to:', email);
    showSuccessSheet();
  };

  const handleVerifyOTP = () => {
    router.push('/verify-otp');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Forgot Password',
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
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address to receive a verification code
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.emailContainer}>
            <Mail size={20} color={colors.text} style={styles.mailIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            !email && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!email}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
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
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successMessage}>
              We have sent a verification code to your email address. Please check your inbox and enter the code to continue.
            </Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={handleVerifyOTP}
            >
              <Text style={styles.successButtonText}>Enter OTP</Text>
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
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
  },
  mailIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: colors.textDark,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  submitButtonDisabled: {
    backgroundColor: colors.border,
  },
  submitButtonText: {
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