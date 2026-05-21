import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuthStore } from '@/store/auth.store';

export default function RootLayout() {
  const { token, user } = useAuthStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="(auth)" />
        ) : user?.role === 'PROVIDER' ? (
          <Stack.Screen name="(provider)" />
        ) : (
          <Stack.Screen name="(client)" />
        )}
      </Stack>
    </GestureHandlerRootView>
  );
}
