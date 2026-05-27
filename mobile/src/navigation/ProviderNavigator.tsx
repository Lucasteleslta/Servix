import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

import { ProviderHomeScreen } from '../screens/provider/HomeScreen';
import { RequestsScreen } from '../screens/provider/RequestsScreen';
import { RequestDetailScreen } from '../screens/provider/RequestDetailScreen';
import { ProposalScreen } from '../screens/provider/ProposalScreen';
import { EarningsScreen } from '../screens/provider/EarningsScreen';
import { ProviderScheduleScreen } from '../screens/provider/ScheduleScreen';
import { ProviderProfileScreen } from '../screens/provider/ProfileScreen';
import { ProviderChatScreen } from '../screens/provider/ChatScreen';

export type ProviderRootParamList = {
  Tabs: undefined;
  RequestDetail: { requestId: string };
  Proposal: { requestId: string };
  ProviderChat: { requestId: string; clientName: string };
};

const RootStack = createNativeStackNavigator<ProviderRootParamList>();
const Tab = createBottomTabNavigator();

type TabIconName = keyof typeof Ionicons.glyphMap;

function tabIcon(focused: boolean, name: TabIconName, outlineName: TabIconName) {
  return (
    <Ionicons
      name={focused ? name : outlineName}
      size={24}
      color={focused ? Colors.secondary : Colors.textMuted}
    />
  );
}

function ProviderTabs() {
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
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProviderHomeScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'home', 'home-outline') }}
      />
      <Tab.Screen
        name="Pedidos"
        component={RequestsScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'list', 'list-outline') }}
      />
      <Tab.Screen
        name="Agenda"
        component={ProviderScheduleScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'calendar', 'calendar-outline') }}
      />
      <Tab.Screen
        name="Ganhos"
        component={EarningsScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'wallet', 'wallet-outline') }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProviderProfileScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon(focused, 'person', 'person-outline') }}
      />
    </Tab.Navigator>
  );
}

export function ProviderNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Tabs" component={ProviderTabs} />
      <RootStack.Screen name="RequestDetail" component={RequestDetailScreen} />
      <RootStack.Screen name="Proposal" component={ProposalScreen} />
      <RootStack.Screen name="ProviderChat" component={ProviderChatScreen} />
    </RootStack.Navigator>
  );
}
