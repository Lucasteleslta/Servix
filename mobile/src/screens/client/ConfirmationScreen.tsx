import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { ClientStackParamList } from '../../navigation/ClientNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ClientStackParamList, 'Confirmation'>;
};

export function ConfirmationScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.successCircle}>
        <Text style={styles.checkIcon}>✓</Text>
      </View>
      <Text style={styles.title}>Contratação confirmada!</Text>
      <Text style={styles.subtitle}>Seu serviço foi agendado com sucesso</Text>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Prestador</Text>
          <Text style={styles.detailValue}>Marco Silva</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Serviço</Text>
          <Text style={styles.detailValue}>Instalação elétrica</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Data</Text>
          <Text style={styles.detailValue}>28/05/2026 às 10:00</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Local</Text>
          <Text style={styles.detailValue}>R. das Flores, 123</Text>
        </View>
        <View style={[styles.detailRow, { borderBottomWidth: 0, marginBottom: 0 }]}>
          <Text style={styles.detailLabel}>Total</Text>
          <Text style={[styles.detailValue, styles.totalValue]}>R$ 262,50</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('Tracking', { requestId: '1' })}
      >
        <Text style={styles.primaryBtnText}>Acompanhar serviço</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineBtn}
        onPress={() => navigation.navigate('HomeMain')}
      >
        <Text style={styles.outlineBtnText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderWidth: 3,
    borderColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkIcon: { fontSize: 44, color: Colors.success },
  title: { fontSize: 22, fontWeight: '700', color: Colors.success, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.textMuted, marginBottom: 32 },
  detailsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 18,
    width: '100%',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 0,
  },
  detailLabel: { fontSize: 14, color: Colors.textMuted },
  detailValue: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  totalValue: { color: Colors.primary, fontWeight: '700', fontSize: 15 },
  primaryBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 12,
  },
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  outlineBtn: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  outlineBtnText: { color: Colors.textSecondary, fontSize: 16 },
});
