import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { useAuthStore } from '@/store/auth-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();
  const { login } = useAuthStore();
  
  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Special handling for admin and vendor accounts
    if (email === 'admin@connectsphere.com') {
      // Create an admin user
      const adminUser = {
        id: 'admin-' + Date.now(),
        name: 'Admin',
        email,
        phone: '',
        role: 'admin',
      };
      
      login(adminUser);
      router.replace('/admin/dashboard');
      return;
    }
    
    if (email === 'vendor@connectsphere.com') {
      // Create a vendor user
      const vendorUser = {
        id: 'vendor-' + Date.now(),
        name: 'Vendor',
        email,
        phone: '',
        role: 'vendor',
      };
      
      login(vendorUser);
      router.replace('/vendor/dashboard');
      return;
    }

    // For normal users, determine their role (mock logic)
    // In a real app, we would get this from the server response
    const isRider = email.includes('rider');
    
    // Here you would typically make an API call to authenticate the user
    // For now, we'll just simulate a successful login
    const user = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email,
      phone: '',
      role: isRider ? 'rider' : 'customer',
    };
      
    login(user);
    
    // Navigate based on role
    if (isRider) {
      router.replace('/rider/home');
    } else {
      router.replace('/(customer)/home');
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In
    console.log('Google Sign In pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

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

      <TouchableOpacity 
        style={styles.forgotPassword}
        onPress={() => router.push('/forgot-password')}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
            >
        <Text style={styles.loginButtonText}>Sign In</Text>
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

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
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
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: colors.text,
  },
  signUpLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});