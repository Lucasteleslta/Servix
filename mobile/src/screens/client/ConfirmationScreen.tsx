import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { requestService } from '../../services/request.service';
import { ServiceRequest } from '../../types/models';
import { ClientRootParamList } from '../../navigation/ClientNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ClientRootParamList, 'Confirmation'>;
  route: RouteProp<ClientRootParamList, 'Confirmation'>;
};

export function ConfirmationScreen({ navigation, route }: Props) {
  const requestId = (route.params as any)?.requestId as string | undefined;
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(!!requestId);

  useEffect(() => {
    if (!requestId) return;
    requestService.getById(requestId)
      .then(setRequest)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [requestId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '–';
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.successCircle}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>
        <Text style={styles.title}>Solicitação enviada!</Text>
        <Text style={styles.subtitle}>Aguarde o prestador aceitar seu pedido</Text>

        {loading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginVertical: 24 }} />
        ) : (
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Serviço</Text>
              <Text style={styles.detailValue}>{request?.title ?? '–'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Categoria</Text>
              <Text style={styles.detailValue}>{request?.category ?? '–'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Data preferida</Text>
              <Text style={styles.detailValue}>{formatDate(request?.preferredDate ?? request?.scheduledAt)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Local</Text>
              <Text style={styles.detailValue} numberOfLines={2}>{request?.address ?? '–'}</Text>
            </View>
            <View style={[styles.detailRow, { borderBottomWidth: 0, marginBottom: 0 }]}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={[styles.detailValue, styles.pendingValue]}>Pendente</Text>
            </View>
          </View>
        )}

        {requestId && (
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Tracking', { requestId })}
          >
            <Text style={styles.primaryBtnText}>Acompanhar serviço</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => navigation.navigate('Tabs')}
        >
          <Text style={styles.outlineBtnText}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
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
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: { fontSize: 14, color: Colors.textMuted, flex: 1 },
  detailValue: { fontSize: 14, color: Colors.white, fontWeight: '500', flex: 1, textAlign: 'right' },
  pendingValue: { color: Colors.warning, fontWeight: '700' },
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
  outlineBtnText: { color: Colors.textMuted, fontSize: 16 },
});
