import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function RiderLayout() {
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
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="available-orders"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="status"
        options={{
          title: "Order Status",
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 