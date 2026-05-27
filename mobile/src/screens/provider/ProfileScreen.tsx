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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth.store';

export function ProviderProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const STATS = [
    { label: 'Serviços', value: '47' },
    { label: 'Avaliação', value: '4.9' },
    { label: 'Clientes', value: '38' },
  ];

  const OPTIONS = [
    { icon: 'star-outline', label: 'Avaliações recebidas' },
    { icon: 'construct-outline', label: 'Meus serviços' },
    { icon: 'camera-outline', label: 'Portfólio' },
    { icon: 'notifications-outline', label: 'Notificações' },
    { icon: 'settings-outline', label: 'Configurações' },
    { icon: 'help-circle-outline', label: 'Ajuda e suporte' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() ?? 'P'}</Text>
        </View>
        <Text style={styles.name}>{user?.name ?? 'Prestador'}</Text>
        <Text style={styles.role}>Prestador de serviços</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
        <View style={styles.availableBadge}>
          <View style={styles.availableDot} />
          <Text style={styles.availableText}>Disponível para trabalhos</Text>
        </View>
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
              <Ionicons name={opt.icon as any} size={20} color={Colors.secondary} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
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
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: Colors.border,
  },
  avatarText: { color: Colors.white, fontSize: 36, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: Colors.white },
  role: { fontSize: 14, color: Colors.secondary, marginTop: 2 },
  email: { fontSize: 13, color: Colors.textMuted, marginTop: 4 },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: 'rgba(0,200,150,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  availableDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.secondary },
  availableText: { color: Colors.secondary, fontSize: 13, fontWeight: '500' },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '700', color: Colors.secondary },
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
    backgroundColor: 'rgba(0,200,150,0.1)',
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
