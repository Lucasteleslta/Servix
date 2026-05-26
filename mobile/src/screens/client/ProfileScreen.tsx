import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth.store';

export function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const STATS = [
    { label: 'Serviços', value: '12' },
    { label: 'Favoritos', value: '5' },
    { label: 'Avaliações', value: '8' },
  ];

  const OPTIONS = [
    { icon: 'time-outline', label: 'Histórico de serviços' },
    { icon: 'notifications-outline', label: 'Notificações' },
    { icon: 'settings-outline', label: 'Configurações' },
    { icon: 'help-circle-outline', label: 'Ajuda e suporte' },
    { icon: 'shield-outline', label: 'Privacidade' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() ?? 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.name ?? 'Usuário'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
        {user?.phone && <Text style={styles.phone}>{user.phone}</Text>}
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        {STATS.map((s) => (
          <View key={s.label} style={styles.statItem}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.optionsList}>
        {OPTIONS.map((opt) => (
          <TouchableOpacity key={opt.label} style={styles.optionItem}>
            <View style={styles.optionIcon}>
              <Ionicons name={opt.icon as any} size={20} color={Colors.primary} />
            </View>
            <Text style={styles.optionLabel}>{opt.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={Colors.error} />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: Colors.border,
  },
  avatarText: { color: Colors.white, fontSize: 36, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: Colors.white },
  email: { fontSize: 14, color: Colors.textMuted, marginTop: 4 },
  phone: { fontSize: 14, color: Colors.textMuted, marginTop: 2 },
  editBtn: {
    marginTop: 14,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editBtnText: { color: Colors.textSecondary, fontSize: 14 },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '700', color: Colors.primary },
  statLabel: { fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  optionsList: { paddingHorizontal: 20, paddingTop: 16, gap: 4 },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(37,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: { flex: 1, fontSize: 15, color: Colors.textSecondary },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.error + '44',
    gap: 10,
  },
  logoutText: { color: Colors.error, fontSize: 15, fontWeight: '500' },
});
