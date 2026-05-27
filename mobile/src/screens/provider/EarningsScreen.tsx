import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';

const TRANSACTIONS = [
  { id: '1', desc: 'Serviço - Instalação elétrica', value: 250.0, date: '26/05/2026', type: 'credit' },
  { id: '2', desc: 'Serviço - Troca de disjuntor', value: 180.0, date: '24/05/2026', type: 'credit' },
  { id: '3', desc: 'Saque para conta bancária', value: 200.0, date: '22/05/2026', type: 'debit' },
  { id: '4', desc: 'Serviço - Instalação tomadas', value: 120.0, date: '20/05/2026', type: 'credit' },
  { id: '5', desc: 'Serviço - Quadro elétrico', value: 320.0, date: '18/05/2026', type: 'credit' },
];

export function EarningsScreen() {
  const STATS = [
    { label: 'Esta semana', value: 'R$ 430,00' },
    { label: 'Este mês', value: 'R$ 870,00' },
    { label: 'Total serviços', value: '47' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Ganhos</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo disponível</Text>
        <Text style={styles.balanceValue}>R$ 670,00</Text>
        <TouchableOpacity style={styles.withdrawBtn}>
          <Text style={styles.withdrawBtnText}>Sacar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {STATS.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Transações recentes</Text>
      <View style={styles.transactionsList}>
        {TRANSACTIONS.map((t) => (
          <View key={t.id} style={styles.transactionItem}>
            <View style={[styles.transactionIcon, t.type === 'credit' ? styles.creditIcon : styles.debitIcon]}>
              <Text style={styles.transactionIconText}>{t.type === 'credit' ? '↑' : '↓'}</Text>
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDesc}>{t.desc}</Text>
              <Text style={styles.transactionDate}>{t.date}</Text>
            </View>
            <Text style={[styles.transactionValue, t.type === 'credit' ? styles.creditValue : styles.debitValue]}>
              {t.type === 'credit' ? '+' : '-'} R$ {t.value.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ height: 24 }} />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  balanceCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  balanceLabel: { fontSize: 14, color: Colors.textMuted, marginBottom: 8 },
  balanceValue: { fontSize: 36, fontWeight: '800', color: Colors.primary, marginBottom: 20 },
  withdrawBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  withdrawBtnText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 28,
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
  statValue: { fontSize: 14, fontWeight: '700', color: Colors.secondary, textAlign: 'center' },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 4, textAlign: 'center' },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  transactionsList: { paddingHorizontal: 20, gap: 8 },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditIcon: { backgroundColor: 'rgba(34,197,94,0.15)' },
  debitIcon: { backgroundColor: 'rgba(239,68,68,0.15)' },
  transactionIconText: { fontSize: 18, fontWeight: '700', color: Colors.white },
  transactionInfo: { flex: 1 },
  transactionDesc: { fontSize: 13, color: Colors.textSecondary },
  transactionDate: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  transactionValue: { fontSize: 14, fontWeight: '700' },
  creditValue: { color: Colors.success },
  debitValue: { color: Colors.error },
});
