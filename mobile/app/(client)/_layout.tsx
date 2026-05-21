import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const tabs: Array<{ name: string; label: string; icon: IconName; iconActive: IconName }> = [
  { name: 'index', label: 'Início', icon: 'home-outline', iconActive: 'home' },
  { name: 'search', label: 'Buscar', icon: 'search-outline', iconActive: 'search' },
  { name: 'bookings', label: 'Pedidos', icon: 'list-outline', iconActive: 'list' },
  { name: 'favorites', label: 'Favoritos', icon: 'heart-outline', iconActive: 'heart' },
  { name: 'profile', label: 'Perfil', icon: 'person-outline', iconActive: 'person' },
];

export default function ClientLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
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
