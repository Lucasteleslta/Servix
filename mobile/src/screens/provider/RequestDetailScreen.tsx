import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { requestService } from '../../services/request.service';
import { ServiceRequest } from '../../types/models';
import { ProviderRootParamList } from '../../navigation/ProviderNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProviderRootParamList, 'RequestDetail'>;
  route: RouteProp<ProviderRootParamList, 'RequestDetail'>;
};

export function RequestDetailScreen({ navigation, route }: Props) {
  const { requestId } = route.params;
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestService.getById(requestId)
      .then(setRequest)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [requestId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '–';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const handleAccept = async () => {
    try {
      await requestService.accept(requestId);
      Alert.alert('Aceito!', 'Você aceitou esta solicitação.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível aceitar a solicitação.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes do Pedido</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={Colors.secondary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  const clientName = request?.clientName ?? 'Cliente';
  const clientInitial = clientName[0]?.toUpperCase() ?? 'C';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Pedido</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.clientCard}>
          <View style={styles.clientAvatar}>
            <Text style={styles.clientAvatarText}>{clientInitial}</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{clientName}</Text>
            <Text style={styles.clientMeta}>Cliente Servix</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do serviço</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>🔧</Text>
              <View>
                <Text style={styles.detailLabel}>Serviço</Text>
                <Text style={styles.detailValue}>{request?.title ?? '–'}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📂</Text>
              <View>
                <Text style={styles.detailLabel}>Categoria</Text>
                <Text style={styles.detailValue}>{request?.category ?? '–'}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📍</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailLabel}>Local</Text>
                <Text style={styles.detailValue}>{request?.address ?? '–'}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📅</Text>
              <View>
                <Text style={styles.detailLabel}>Data preferida</Text>
                <Text style={styles.detailValue}>{formatDate(request?.preferredDate ?? request?.scheduledAt)}</Text>
              </View>
            </View>
          </View>
        </View>

        {request?.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{request.description}</Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Proposal', { requestId })}
          >
            <Text style={styles.primaryBtnText}>Enviar proposta / orçamento</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={handleAccept}
          >
            <Text style={styles.secondaryBtnText}>Aceitar pedido</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => navigation.navigate('ProviderChat', { requestId, clientName })}
          >
            <Text style={styles.outlineBtnText}>Conversar antes</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.white },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: 20 },
  clientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clientAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientAvatarText: { color: Colors.white, fontSize: 22, fontWeight: '700' },
  clientInfo: {},
  clientName: { fontSize: 16, fontWeight: '600', color: Colors.white },
  clientMeta: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 12 },
  detailCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  detailIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  detailLabel: { fontSize: 12, color: Colors.textMuted },
  detailValue: { fontSize: 14, color: Colors.white, fontWeight: '500', marginTop: 2 },
  divider: { height: 1, backgroundColor: Colors.border, marginHorizontal: 14 },
  description: { fontSize: 14, color: Colors.textMuted, lineHeight: 22 },
  actions: { marginTop: 28, gap: 12 },
  primaryBtn: {
    backgroundColor: Colors.secondary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  secondaryBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  outlineBtn: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtnText: { color: Colors.textMuted, fontSize: 16 },
});
