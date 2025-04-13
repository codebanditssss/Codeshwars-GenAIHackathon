import { useEffect } from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    console.log('RootLayout mounted');
    // Add error event listener
    const errorHandler = (error: ErrorEvent) => {
      console.error('Global error:', error);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
} 