import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { requestService } from '@/services/request.service';
import { ServiceRequest } from '@/types/models';
import { Colors } from '@/constants/colors';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING:    { label: 'Pendente',    color: Colors.warning },
  ACCEPTED:   { label: 'Aceito',      color: Colors.primary },
  IN_PROGRESS:{ label: 'Em andamento',color: Colors.info },
  COMPLETED:  { label: 'Concluído',   color: Colors.success },
  CANCELLED:  { label: 'Cancelado',   color: Colors.error },
};

export default function BookingsScreen() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestService.getMyRequests()
      .then(setRequests)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="clipboard-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyText}>Você ainda não fez nenhum pedido</Text>
          </View>
        }
        renderItem={({ item }) => {
          const status = STATUS_LABELS[item.status] ?? { label: item.status, color: Colors.gray500 };
          return (
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
                  <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
                </View>
              </View>
              {item.description && (
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              )}
              <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 22, fontWeight: '700', color: Colors.gray900, paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16, backgroundColor: Colors.white },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: Colors.white, borderRadius: 12, padding: 16, gap: 8 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.gray900, flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  desc: { fontSize: 13, color: Colors.gray500 },
  date: { fontSize: 12, color: Colors.gray400 },
  empty: { alignItems: 'center', marginTop: 80, gap: 12 },
  emptyText: { color: Colors.gray400, fontSize: 15 },
});
