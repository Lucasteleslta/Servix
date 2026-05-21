import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/auth.store';
import { Colors } from '@/constants/colors';

export default function ProviderProfileScreen() {
  const { user, logout } = useAuthStore();

  const onLogout = () => {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Prestador</Text>
        </View>
      </View>

      <View style={styles.section}>
        {[
          { icon: 'person-outline', label: 'Editar perfil' },
          { icon: 'briefcase-outline', label: 'Meus serviços' },
          { icon: 'notifications-outline', label: 'Notificações' },
          { icon: 'star-outline', label: 'Avaliações recebidas' },
          { icon: 'help-circle-outline', label: 'Ajuda' },
        ].map(({ icon, label }) => (
          <TouchableOpacity key={label} style={styles.item}>
            <Ionicons name={icon as any} size={22} color={Colors.gray600} />
            <Text style={styles.itemLabel}>{label}</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.gray300} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={22} color={Colors.error} />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.white, alignItems: 'center', paddingTop: 60, paddingBottom: 24, gap: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.secondary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: Colors.white, fontSize: 32, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: Colors.gray900 },
  email: { fontSize: 14, color: Colors.gray500 },
  badge: { backgroundColor: Colors.secondaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: Colors.secondary, fontWeight: '600', fontSize: 12 },
  section: { backgroundColor: Colors.white, marginTop: 12, paddingHorizontal: 20 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.gray100, gap: 14 },
  itemLabel: { flex: 1, fontSize: 15, color: Colors.gray700 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white, marginTop: 12, paddingHorizontal: 20, paddingVertical: 16 },
  logoutText: { fontSize: 15, color: Colors.error, fontWeight: '500' },
});
