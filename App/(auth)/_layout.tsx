import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function AuthLayout() {
  console.log('AuthLayout rendered');
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack screenOptions={{ headerShown: true }} />
    </View>
  );
}