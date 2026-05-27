import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth.store';
import { requestService } from '../../services/request.service';
import { ServiceRequest } from '../../types/models';
import { ProviderRootParamList } from '../../navigation/ProviderNavigator';

export function ProviderHomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProviderRootParamList>>();
  const user = useAuthStore((s) => s.user);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const firstName = user?.name?.split(' ')[0] ?? 'você';

  useEffect(() => {
    requestService.getReceivedRequests().then(setRequests).catch(() => {});
  }, []);

  const STATS = [
    { label: 'Solicitações', value: requests.length.toString(), color: Colors.primary },
    { label: 'Agendados', value: '0', color: Colors.secondary },
    { label: 'Ganhos', value: 'R$\n0,00', color: Colors.warning },
  ];

  const TODAY_SCHEDULE: { time: string; client: string; service: string }[] = [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {firstName} 🔧</Text>
            <Text style={styles.headerSub}>Sua agenda de hoje</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstName?.[0]?.toUpperCase() ?? '?'}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Novas solicitações</Text>
        {requests.length === 0 && (
          <View style={styles.emptyRequests}>
            <Text style={styles.emptyText}>Nenhuma nova solicitação</Text>
          </View>
        )}
        {(requests ?? []).map((req) => (
          <View key={req.id} style={styles.requestCard}>
            <View style={styles.requestTop}>
              <View style={styles.clientAvatar}>
                <Text style={styles.clientAvatarText}>C</Text>
              </View>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>{req.clientName ?? 'Cliente'} — {req.title}</Text>
                <Text style={styles.requestLocation}>📍 {req.address}</Text>
              </View>
              <View style={[styles.urgencyBadge, styles.normalBadge]}>
                <Text style={[styles.urgencyText, styles.normalText]}>Nova</Text>
              </View>
            </View>
            <View style={styles.requestActions}>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => navigation.navigate('RequestDetail', { requestId: req.id })}
              >
                <Text style={styles.viewBtnText}>Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.refuseBtn}>
                <Text style={styles.refuseBtnText}>Recusar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Agenda de hoje</Text>
        {TODAY_SCHEDULE.length === 0 && (
          <View style={styles.emptyRequests}>
            <Text style={styles.emptyText}>Nenhum agendamento para hoje</Text>
          </View>
        )}
        {TODAY_SCHEDULE.map((item, i) => (
          <View key={i} style={styles.scheduleCard}>
            <View style={styles.scheduleTime}>
              <Text style={styles.scheduleTimeText}>{item.time}</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleService}>{item.service}</Text>
              <Text style={styles.scheduleClient}>{item.client}</Text>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  greeting: { fontSize: 20, fontWeight: '700', color: Colors.white },
  headerSub: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 4, textAlign: 'center' },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  requestCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  requestTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  clientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientAvatarText: { color: Colors.primary, fontSize: 18, fontWeight: '700' },
  requestInfo: { flex: 1 },
  requestTitle: { fontSize: 14, fontWeight: '600', color: Colors.white },
  requestLocation: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  urgencyBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  urgentBadge: { backgroundColor: Colors.error + '22' },
  normalBadge: { backgroundColor: Colors.secondary + '22' },
  urgencyText: { fontSize: 11, fontWeight: '600' },
  urgentText: { color: Colors.error },
  normalText: { color: Colors.secondary },
  requestActions: { flexDirection: 'row', gap: 10 },
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
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  scheduleTime: {
    width: 52,
    alignItems: 'center',
  },
  scheduleTimeText: { fontSize: 14, fontWeight: '700', color: Colors.secondary },
  scheduleInfo: {},
  scheduleService: { fontSize: 14, fontWeight: '600', color: Colors.white },
  scheduleClient: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  emptyRequests: { padding: 20, alignItems: 'center' },
  emptyText: { color: Colors.textMuted, fontSize: 14 },
});
