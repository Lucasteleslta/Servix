import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';

interface Notification {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  date: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: '1', icon: '✅', title: 'Serviço confirmado', subtitle: 'Marco Silva confirmou seu agendamento para amanhã.', date: 'Agora', read: false },
  { id: '2', icon: '💬', title: 'Nova mensagem', subtitle: 'Marco: "Estarei aí às 10h!"', date: '2h atrás', read: false },
  { id: '3', icon: '⭐', title: 'Avalie o serviço', subtitle: 'Como foi o serviço de Ana Costa?', date: 'Ontem', read: true },
  { id: '4', icon: '💡', title: 'Oferta especial', subtitle: 'Desconto de 15% em serviços de limpeza esta semana.', date: '2 dias', read: true },
  { id: '5', icon: '🔧', title: 'Proposta recebida', subtitle: 'Carlos Lima enviou uma proposta para seu pedido.', date: '3 dias', read: true },
];

export function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.pageTitle}>Notificações</Text>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, !item.read && styles.cardUnread]}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconEmoji}>{item.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  list: { paddingHorizontal: 20, gap: 8, paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'flex-start',
    gap: 12,
  },
  cardUnread: { borderColor: Colors.primary + '44' },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: { fontSize: 20 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: Colors.white, marginBottom: 3 },
  cardSubtitle: { fontSize: 13, color: Colors.textMuted, lineHeight: 18 },
  cardDate: { fontSize: 11, color: Colors.textMuted, marginTop: 6 },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginTop: 4,
  },
});
