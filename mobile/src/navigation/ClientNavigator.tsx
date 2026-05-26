import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

import { HomeScreen } from '../screens/client/HomeScreen';
import { SearchScreen } from '../screens/client/SearchScreen';
import { BookingsScreen } from '../screens/client/BookingsScreen';
import { FavoritesScreen } from '../screens/client/FavoritesScreen';
import { ProfileScreen } from '../screens/client/ProfileScreen';
import { ProviderProfileScreen } from '../screens/client/ProviderProfileScreen';
import { BookingScreen } from '../screens/client/BookingScreen';
import { ScheduleScreen } from '../screens/client/ScheduleScreen';
import { PaymentScreen } from '../screens/client/PaymentScreen';
import { ConfirmationScreen } from '../screens/client/ConfirmationScreen';
import { TrackingScreen } from '../screens/client/TrackingScreen';
import { ChatScreen } from '../screens/client/ChatScreen';
import { NotificationsScreen } from '../screens/client/NotificationsScreen';

export type ClientStackParamList = {
  HomeMain: undefined;
  Search: undefined;
  ProviderProfile: { providerId: string };
  Booking: { providerId: string };
  Schedule: { providerId?: string };
  Payment: undefined;
  Confirmation: undefined;
  Tracking: { requestId: string };
  Chat: { requestId: string; providerName: string };
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<ClientStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

type TabIconName = keyof typeof Ionicons.glyphMap;

function tabIcon(focused: boolean, name: TabIconName, outlineName: TabIconName) {
  return <Ionicons name={focused ? name : outlineName} size={24} color={focused ? Colors.primary : Colors.textMuted} />;
}

export function ClientNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeStack}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'home', 'home-outline') }}
      />
      <Tab.Screen
        name="Buscar"
        component={SearchScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'search', 'search-outline') }}
      />
      <Tab.Screen
        name="Serviços"
        component={BookingsScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'list', 'list-outline') }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'heart', 'heart-outline') }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'person', 'person-outline') }}
      />
    </Tab.Navigator>
  );
}
