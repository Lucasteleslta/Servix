import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { requestService } from '../../services/request.service';
import { ServiceRequest } from '../../types/models';
import { ProviderRootParamList } from '../../navigation/ProviderNavigator';

type Tab = 'new' | 'active' | 'done';

const STATUS_COLORS: Record<string, string> = {
  PENDING: Colors.warning,
  ACCEPTED: Colors.secondary,
  IN_PROGRESS: Colors.primary,
  COMPLETED: Colors.success,
  CANCELLED: Colors.error,
};

export function RequestsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProviderRootParamList>>();
  const [tab, setTab] = useState<Tab>('new');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    requestService.getReceivedRequests().then(setRequests).catch(() => {});
  }, []);

  const filtered = requests.filter((r) => {
    if (tab === 'new') return r.status === 'PENDING';
    if (tab === 'active') return ['ACCEPTED', 'IN_PROGRESS'].includes(r.status);
    return r.status === 'COMPLETED';
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Text style={styles.pageTitle}>Pedidos</Text>

      <View style={styles.tabs}>
        {([['new', 'Novas'], ['active', 'Em andamento'], ['done', 'Concluídas']] as [Tab, string][]).map(([t, label]) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>C</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLocation}>📍 {item.address}</Text>
                <Text style={styles.cardDate}>{item.createdAt}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: (STATUS_COLORS[item.status] ?? Colors.textMuted) + '22' }]}>
                <Text style={[styles.badgeText, { color: STATUS_COLORS[item.status] ?? Colors.textMuted }]}>
                  {item.urgency === 'URGENT' ? 'Urgente' : item.status === 'PENDING' ? 'Nova' : item.status}
                </Text>
              </View>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => navigation.navigate('RequestDetail', { requestId: item.id })}
              >
                <Text style={styles.viewBtnText}>Ver detalhes</Text>
              </TouchableOpacity>
              {item.status === 'PENDING' && (
                <TouchableOpacity style={styles.refuseBtn}>
                  <Text style={styles.refuseBtnText}>Recusar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  tabs: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, gap: 8 },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: { backgroundColor: Colors.secondary, borderColor: Colors.secondary },
  tabText: { fontSize: 11, color: Colors.textMuted },
  tabTextActive: { color: Colors.white, fontWeight: '600' },
  list: { paddingHorizontal: 20, gap: 12, paddingBottom: 20 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.primary, fontSize: 18, fontWeight: '700' },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: Colors.white },
  cardLocation: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  cardDate: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  badge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  cardActions: { flexDirection: 'row', gap: 10 },
  viewBtn: {
    flex: 1,
    height: 36,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtnText: { color: Colors.white, fontSize: 13, fontWeight: '600' },
  refuseBtn: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refuseBtnText: { color: Colors.textMuted, fontSize: 13 },
  empty: { paddingTop: 60, alignItems: 'center' },
  emptyText: { color: Colors.textMuted, fontSize: 15 },
});
