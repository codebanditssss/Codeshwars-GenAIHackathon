import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { ChevronLeft, X } from 'lucide-react-native';
import { colors } from '../../constants/colors';

export default function VerifyOTPScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNumberPress = (num: string) => {
    if (otp.length < 4) {
      setOtp(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setOtp(prev => prev.slice(0, -1));
  };

  const handleResend = () => {
    setTimeLeft(300);
    // Implement resend logic here
  };

  const handleContinue = () => {
    if (otp.length === 4) {
      // In a real app, you would verify the OTP with your backend here
      console.log('Verifying OTP:', otp);
      router.push('/reset-password');
    }
  };

  const handleOtpChange = (value: string) => {
    // Only allow numbers and limit to 4 digits
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 4) {
      setOtp(numericValue);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const maskedEmail = email ? email.replace(/(.{3}).*(@.*)/, '$1*****$2') : '';

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'OTP',
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
        <Text style={styles.title}>Email verification</Text>
        <Text style={styles.subtitle}>
          Enter the verification code we send you on:{'\n'}
          {maskedEmail}
        </Text>

        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <View key={index} style={styles.otpBox}>
              <Text style={styles.otpText}>{otp[index] || ''}</Text>
            </View>
          ))}
        </View>
        <TextInput
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType="numeric"
          maxLength={4}
          style={styles.hiddenInput}
          autoFocus
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive code?{' '}
            <Text 
              style={[
                styles.resendLink,
                timeLeft > 0 && styles.resendLinkDisabled
              ]}
              onPress={timeLeft === 0 ? handleResend : undefined}
            >
              Resend
            </Text>
          </Text>
        </View>

        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

        <TouchableOpacity
          style={[
            styles.continueButton,
            otp.length !== 4 && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={otp.length !== 4}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.keypadContainer}>
        <View style={styles.keypadRow}>
          {['1', '2', '3'].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keypadButton}
              onPress={() => handleNumberPress(num)}
            >
              <Text style={styles.keypadButtonText}>{num}</Text>
              {num === '2' && <Text style={styles.keypadButtonSubtext}>ABC</Text>}
              {num === '3' && <Text style={styles.keypadButtonSubtext}>DEF</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keypadRow}>
          {['4', '5', '6'].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keypadButton}
              onPress={() => handleNumberPress(num)}
            >
              <Text style={styles.keypadButtonText}>{num}</Text>
              {num === '4' && <Text style={styles.keypadButtonSubtext}>GHI</Text>}
              {num === '5' && <Text style={styles.keypadButtonSubtext}>JKL</Text>}
              {num === '6' && <Text style={styles.keypadButtonSubtext}>MNO</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keypadRow}>
          {['7', '8', '9'].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keypadButton}
              onPress={() => handleNumberPress(num)}
            >
              <Text style={styles.keypadButtonText}>{num}</Text>
              {num === '7' && <Text style={styles.keypadButtonSubtext}>PQRS</Text>}
              {num === '8' && <Text style={styles.keypadButtonSubtext}>TUV</Text>}
              {num === '9' && <Text style={styles.keypadButtonSubtext}>WXYZ</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keypadRow}>
          <View style={styles.keypadButton} />
          <TouchableOpacity
            style={styles.keypadButton}
            onPress={() => handleNumberPress('0')}
          >
            <Text style={styles.keypadButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keypadButton}
            onPress={handleBackspace}
          >
            <X size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  otpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  resendText: {
    fontSize: 14,
    color: colors.text,
  },
  resendLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: colors.text,
  },
  timer: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.border,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  keypadContainer: {
    padding: 16,
    backgroundColor: colors.neutral,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  keypadButton: {
    flex: 1,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textDark,
  },
  keypadButtonSubtext: {
    fontSize: 12,
    color: colors.text,
    marginTop: 2,
  },
}); 