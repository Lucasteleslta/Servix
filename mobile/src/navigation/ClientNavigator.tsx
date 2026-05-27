import React from 'react';
import { Platform } from 'react-native';
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

export type ClientRootParamList = {
  Tabs: undefined;
  Search: { category?: string } | undefined;
  ProviderProfile: { providerId: string };
  Booking: { providerId: string };
  Schedule: { providerId?: string };
  Payment: undefined;
  Confirmation: undefined;
  Tracking: { requestId: string };
  Chat: { requestId: string; providerName: string };
  Notifications: undefined;
};

const RootStack = createNativeStackNavigator<ClientRootParamList>();
const Tab = createBottomTabNavigator();

type TabIconName = keyof typeof Ionicons.glyphMap;

function tabIcon(focused: boolean, name: TabIconName, outlineName: TabIconName) {
  return (
    <Ionicons
      name={focused ? name : outlineName}
      size={24}
      color={focused ? Colors.primary : Colors.textMuted}
    />
  );
}

function ClientTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
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

export function ClientNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Tabs" component={ClientTabs} />
      <RootStack.Screen name="Search" component={SearchScreen} />
      <RootStack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
      <RootStack.Screen name="Booking" component={BookingScreen} />
      <RootStack.Screen name="Schedule" component={ScheduleScreen} />
      <RootStack.Screen name="Payment" component={PaymentScreen} />
      <RootStack.Screen name="Confirmation" component={ConfirmationScreen} />
      <RootStack.Screen name="Tracking" component={TrackingScreen} />
      <RootStack.Screen name="Chat" component={ChatScreen} />
      <RootStack.Screen name="Notifications" component={NotificationsScreen} />
    </RootStack.Navigator>
  );
}
