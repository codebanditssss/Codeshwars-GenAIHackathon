import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { colors } from "@/constants/colors";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(customer)" options={{ headerShown: false }} />
          <Stack.Screen name="rider" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
          <Stack.Screen name="vendor" options={{ headerShown: false }} />
          <Stack.Screen name="order" options={{ headerShown: false }} />
          <Stack.Screen name="business" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerTitle: 'Profile' }} />
          <Stack.Screen name="notifications" options={{ headerTitle: 'Notifications' }} />
          <Stack.Screen name="register" options={{ headerTitle: 'Register' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

// This layout is used for screens that don't have a specific layout
export function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textDark,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.neutral,
        },
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="order/[id]" 
        options={{ 
          title: "Order Details",
          presentation: Platform.OS === 'ios' ? 'card' : 'transparentModal',
        }} 
      />
      <Stack.Screen 
        name="notifications" 
        options={{ 
          title: "Notifications",
          animation: 'slide_from_right',
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: "My Profile",
          animation: 'slide_from_right',
        }} 
      />
      <Stack.Screen 
        name="business/create-order" 
        options={{ 
          title: "Create Order",
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}