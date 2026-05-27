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

const MOCK_REQUESTS: ServiceRequest[] = [
  { id: '1', clientId: 'c1', title: 'Instalação de tomadas', description: 'Preciso instalar 4 tomadas novas.', category: 'Elétrica', address: 'R. das Flores, 123', urgency: 'URGENT', status: 'PENDING', createdAt: '2026-05-26', updatedAt: '2026-05-26' },
  { id: '2', clientId: 'c2', title: 'Troca de disjuntor', description: 'Disjuntor queimado.', category: 'Elétrica', address: 'Av. Brasil, 456', urgency: 'NORMAL', status: 'PENDING', createdAt: '2026-05-25', updatedAt: '2026-05-25' },
];

export function ProviderHomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProviderRootParamList>>();
  const user = useAuthStore((s) => s.user);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const firstName = user?.name?.split(' ')[0] ?? 'você';

  useEffect(() => {
    requestService.getReceivedRequests().then(setRequests).catch(() => setRequests(MOCK_REQUESTS));
  }, []);

  const displayRequests = requests.length > 0 ? requests : MOCK_REQUESTS;

  const STATS = [
    { label: 'Solicitações', value: displayRequests.length.toString(), color: Colors.primary },
    { label: 'Agendados', value: '3', color: Colors.secondary },
    { label: 'Ganhos', value: 'R$\n1.250', color: Colors.warning },
  ];

  const TODAY_SCHEDULE = [
    { time: '09:00', client: 'João M.', service: 'Instalação elétrica' },
    { time: '14:30', client: 'Ana C.', service: 'Troca de disjuntor' },
  ];

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
        {displayRequests.map((req) => (
          <View key={req.id} style={styles.requestCard}>
            <View style={styles.requestTop}>
              <View style={styles.clientAvatar}>
                <Text style={styles.clientAvatarText}>C</Text>
              </View>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>{req.title}</Text>
                <Text style={styles.requestLocation}>📍 {req.address}</Text>
              </View>
              <View style={[styles.urgencyBadge, req.urgency === 'URGENT' ? styles.urgentBadge : styles.normalBadge]}>
                <Text style={[styles.urgencyText, req.urgency === 'URGENT' ? styles.urgentText : styles.normalText]}>
                  {req.urgency === 'URGENT' ? 'Urgente' : 'Nova'}
                </Text>
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
});
