import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function VendorLayout() {
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
        name="dashboard"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-order"
        options={{
          title: "Add New Order",
        }}
      />
      <Stack.Screen
        name="track-orders"
        options={{
          title: "Track Orders",
        }}
      />
    </Stack>
  );
} 