import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Button } from '@/components/Button';
import { colors } from '../../constants/colors';
import { useAuthStore } from '@/store/auth-store';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { isAuthenticated, userRole } = useAuthStore();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Set navigation ready state when component mounts
    const unsubscribe = navigation.addListener('state', () => {
      setIsNavigationReady(true);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Only attempt to navigate if the user is logged in AND navigation is ready
    if (isAuthenticated && isNavigationReady) {
      if (userRole === 'rider') {
        router.replace('/(tabs)');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, isNavigationReady, userRole]);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/GHAR (1).png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Your needs, Our speed
        </Text>

        <View style={styles.tagline}>
          <Text style={styles.taglineText}>
            Join our community of customers and delivery partners
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Create Account"
          onPress={handleSignUp}
          type="primary"
          size="large"
          style={styles.signupButton}
        />
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Login</Text>
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
  header: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 32,
  },
  tagline: {
    marginTop: 20,
    backgroundColor: colors.neutral,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  taglineText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    padding: 24,
    paddingBottom: 36,
  },
  signupButton: {
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
    color: colors.text,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 5,
  },
});