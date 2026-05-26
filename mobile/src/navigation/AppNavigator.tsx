import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/auth.store';
import { AuthNavigator } from './AuthNavigator';
import { ClientNavigator } from './ClientNavigator';
import { ProviderNavigator } from './ProviderNavigator';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const { token, user } = useAuthStore();

  if (!token) {
    return <AuthNavigator />;
  }

  if (user?.role === 'PROVIDER') {
    return <ProviderNavigator />;
  }

  return <ClientNavigator />;
}
