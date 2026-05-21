import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const tabs: Array<{ name: string; label: string; icon: IconName; iconActive: IconName }> = [
  { name: 'index',    label: 'Início',    icon: 'home-outline',     iconActive: 'home' },
  { name: 'requests', label: 'Pedidos',   icon: 'list-outline',     iconActive: 'list' },
  { name: 'schedule', label: 'Agenda',    icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'earnings', label: 'Ganhos',    icon: 'wallet-outline',   iconActive: 'wallet' },
  { name: 'profile',  label: 'Perfil',    icon: 'person-outline',   iconActive: 'person' },
];

export default function ProviderLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          borderTopColor: Colors.gray100,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      {tabs.map(({ name, label, icon, iconActive }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? iconActive : icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
