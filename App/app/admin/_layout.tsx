import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function AdminLayout() {
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
        name="riders"
        options={{
          title: "Riders List",
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: "Orders Overview",
        }}
      />
    </Stack>
  );
} 