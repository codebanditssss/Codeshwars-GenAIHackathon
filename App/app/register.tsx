import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';
import RoleSelectionModal from '@/components/RoleSelectionModal';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  
  const router = useRouter();
  const { login } = useAuthStore();

  const handleRegister = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!termsAccepted) {
      alert('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    // Show the role selection modal instead of directly registering
    setShowRoleModal(true);
  };

  const handleRoleSelection = (role: 'customer' | 'rider') => {
    // Close the modal
    setShowRoleModal(false);
    
    // Create the user with the selected role
    const newUser = {
      id: 'new-user-' + Date.now(),
      name: email.split('@')[0],
      email,
      phone: '',
      role,
    };

    // Log in the user and navigate to the appropriate screen
    login(newUser);
    
    // Navigate based on role
    if (role === 'rider') {
      router.replace('/rider/dashboard');
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In
    console.log('Google Sign In pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your new account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.text} />
            ) : (
              <Eye size={20} color={colors.text} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <View style={[
            styles.checkboxInner,
            termsAccepted && styles.checkboxChecked
          ]} />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I Agree with{' '}
          <Text style={styles.link}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or sign in with</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <View style={styles.googleIconContainer}>
          <Text style={styles.googleIcon}>G</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Don't have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
      
      {/* Role Selection Modal */}
      <RoleSelectionModal
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSelectRole={handleRoleSelection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    marginTop: 60,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  link: {
    color: colors.primary,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.text,
    marginHorizontal: 16,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: colors.text,
  },
  signInLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
}); 