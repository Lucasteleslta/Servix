import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/auth.store';
import { requestService } from '@/services/request.service';
import { ServiceRequest } from '@/types/models';
import { Colors } from '@/constants/colors';

export default function ProviderHomeScreen() {
  const { user } = useAuthStore();
  const [pendingRequests, setPendingRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ completed: 0, earnings: 0, rating: 0 });

  useEffect(() => {
    Promise.all([
      requestService.getPendingForProvider(),
      requestService.getProviderStats(),
    ])
      .then(([requests, providerStats]) => {
        setPendingRequests(requests);
        setStats(providerStats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0]}</Text>
          <Text style={styles.subtitle}>Painel do Prestador</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        {[
          { icon: 'checkmark-circle-outline', label: 'Concluídos', value: stats.completed },
          { icon: 'cash-outline', label: 'Ganhos (R$)', value: stats.earnings.toFixed(0) },
          { icon: 'star-outline', label: 'Avaliação', value: stats.rating.toFixed(1) },
        ].map(({ icon, label, value }) => (
          <View key={label} style={styles.statCard}>
            <Ionicons name={icon as any} size={24} color={Colors.secondary} />
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Novos Pedidos</Text>
        {loading ? (
          <ActivityIndicator color={Colors.secondary} />
        ) : pendingRequests.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="inbox-outline" size={40} color={Colors.gray300} />
            <Text style={styles.emptyText}>Nenhum pedido pendente</Text>
          </View>
        ) : (
          pendingRequests.map((req) => (
            <TouchableOpacity key={req.id} style={styles.requestCard}>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>{req.title}</Text>
                <Text style={styles.requestDesc} numberOfLines={2}>{req.description}</Text>
                <Text style={styles.requestDate}>
                  {new Date(req.createdAt).toLocaleDateString('pt-BR')}
                </Text>
              </View>
              <View style={styles.requestActions}>
                <TouchableOpacity style={styles.acceptBtn}>
                  <Text style={styles.acceptText}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn}>
                  <Text style={styles.rejectText}>Recusar</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  greeting: { fontSize: 22, fontWeight: '700', color: Colors.gray900 },
  subtitle: { fontSize: 14, color: Colors.gray500, marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.secondary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 16 },
  statCard: { flex: 1, backgroundColor: Colors.white, borderRadius: 12, padding: 16, alignItems: 'center', gap: 6 },
  statValue: { fontSize: 20, fontWeight: '700', color: Colors.gray900 },
  statLabel: { fontSize: 11, color: Colors.gray500, textAlign: 'center' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: Colors.gray900, marginBottom: 16 },
  requestCard: { backgroundColor: Colors.white, borderRadius: 12, padding: 16, marginBottom: 12 },
  requestInfo: { marginBottom: 12, gap: 4 },
  requestTitle: { fontSize: 15, fontWeight: '600', color: Colors.gray900 },
  requestDesc: { fontSize: 13, color: Colors.gray500 },
  requestDate: { fontSize: 12, color: Colors.gray400 },
  requestActions: { flexDirection: 'row', gap: 10 },
  acceptBtn: { flex: 1, backgroundColor: Colors.secondary, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  acceptText: { color: Colors.white, fontWeight: '600', fontSize: 14 },
  rejectBtn: { flex: 1, borderWidth: 1, borderColor: Colors.gray200, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  rejectText: { color: Colors.gray600, fontWeight: '600', fontSize: 14 },
  empty: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { color: Colors.gray400, fontSize: 15 },
});
