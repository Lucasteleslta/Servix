import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { ClientStackParamList } from '../../navigation/ClientNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ClientStackParamList, 'Payment'>;
};

type PaymentMethod = 'card' | 'pix' | 'boleto';

const SERVICE_VALUE = 250.0;
const PLATFORM_FEE = SERVICE_VALUE * 0.05;
const TOTAL = SERVICE_VALUE + PLATFORM_FEE;

export function PaymentScreen({ navigation }: Props) {
  const [method, setMethod] = useState<PaymentMethod>('card');

  const methods: { id: PaymentMethod; label: string; icon: string }[] = [
    { id: 'card', label: 'Cartão de crédito', icon: '💳' },
    { id: 'pix', label: 'Pix', icon: '⚡' },
    { id: 'boleto', label: 'Boleto bancário', icon: '📄' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Resumo</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Serviço</Text>
            <Text style={styles.summaryValue}>R$ {SERVICE_VALUE.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxa da plataforma (5%)</Text>
            <Text style={styles.summaryValue}>R$ {PLATFORM_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ {TOTAL.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Forma de pagamento</Text>
        <View style={styles.methodsList}>
          {methods.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.methodItem, method === m.id && styles.methodItemSelected]}
              onPress={() => setMethod(m.id)}
            >
              <Text style={styles.methodIcon}>{m.icon}</Text>
              <Text style={styles.methodLabel}>{m.label}</Text>
              <View style={[styles.radio, method === m.id && styles.radioSelected]}>
                {method === m.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => navigation.navigate('Confirmation')}
        >
          <Text style={styles.payBtnText}>Pagar R$ {TOTAL.toFixed(2)}</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.white },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 14 },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: Colors.textMuted },
  summaryValue: { fontSize: 14, color: Colors.textSecondary },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.white },
  totalValue: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  methodsList: { gap: 10, marginBottom: 28 },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  methodItemSelected: { borderColor: Colors.primary },
  methodIcon: { fontSize: 22 },
  methodLabel: { flex: 1, fontSize: 15, color: Colors.textSecondary },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: Colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  payBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payBtnText: { color: Colors.white, fontSize: 17, fontWeight: '700' },
});
