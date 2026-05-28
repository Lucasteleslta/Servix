import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { ProviderRootParamList } from '../../navigation/ProviderNavigator';
import { requestService } from '../../services/request.service';

type Props = {
  navigation: NativeStackNavigationProp<ProviderRootParamList, 'ServiceStatus'>;
  route: RouteProp<ProviderRootParamList, 'ServiceStatus'>;
};

const TIMELINE = [
  { key: 'onway', label: 'A caminho', color: Colors.secondary, status: 'done' },
  { key: 'started', label: 'Iniciado', color: Colors.primary, status: 'active' },
  { key: 'done', label: 'Concluído', color: Colors.textMuted, status: 'pending' },
];

export function ServiceStatusScreen({ navigation, route }: Props) {
  const { requestId, clientName } = route.params;
  const [loading, setLoading] = useState(false);

  const initial = (clientName ?? 'C')[0].toUpperCase();

  const handleComplete = () => {
    Alert.alert(
      'Concluir atendimento',
      'Tem certeza que deseja marcar o serviço como concluído?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              setLoading(true);
              await requestService.complete(requestId);
              Alert.alert('Serviço concluído!', 'O cliente será notificado.', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } catch {
              Alert.alert('Erro', 'Não foi possível concluir o atendimento. Tente novamente.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atendimento em curso</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.clientCard}>
          <View style={styles.clientAvatar}>
            <Text style={styles.clientAvatarText}>{initial}</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{clientName}</Text>
            <Text style={styles.clientAddress}>📍 Endereço do cliente</Text>
          </View>
          <TouchableOpacity
            style={styles.chatBtn}
            onPress={() => navigation.navigate('ProviderChat', { requestId, clientName })}
          >
            <Ionicons name="chatbubble-outline" size={20} color={Colors.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Status do atendimento</Text>
          {TIMELINE.map((step, index) => (
            <View key={step.key} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,
                    step.status === 'done' && styles.timelineDotDone,
                    step.status === 'active' && styles.timelineDotActive,
                  ]}
                >
                  {step.status === 'done' && (
                    <Ionicons name="checkmark" size={12} color={Colors.white} />
                  )}
                  {step.status === 'active' && (
                    <View style={styles.timelineDotInner} />
                  )}
                </View>
                {index < TIMELINE.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      step.status === 'done' && styles.timelineLineDone,
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.timelineLabel,
                  step.status === 'active' && styles.timelineLabelActive,
                  step.status === 'done' && styles.timelineLabelDone,
                ]}
              >
                {step.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>
            Serviço iniciado. Solicite confirmação do cliente ao concluir.
          </Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.completeBtn, loading && styles.btnDisabled]}
          onPress={handleComplete}
          disabled={loading}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color={Colors.white} />
          <Text style={styles.completeBtnText}>
            {loading ? 'Aguarde...' : 'Marcar como concluído'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  scrollView: { flex: 1 },
  clientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: 20,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  clientAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientAvatarText: { color: Colors.white, fontSize: 20, fontWeight: '700' },
  clientInfo: { flex: 1 },
  clientName: { fontSize: 16, fontWeight: '700', color: Colors.white },
  clientAddress: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  chatBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 20,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.border,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotDone: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  timelineDotActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timelineDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  timelineLine: {
    width: 2,
    height: 28,
    backgroundColor: Colors.border,
    marginTop: 2,
  },
  timelineLineDone: {
    backgroundColor: Colors.secondary,
  },
  timelineLabel: {
    fontSize: 14,
    color: Colors.textMuted,
    paddingTop: 2,
    marginBottom: 24,
  },
  timelineLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  timelineLabelDone: {
    color: Colors.secondary,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.primary + '15',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.primary + '33',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  completeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    height: 52,
    borderRadius: 12,
    gap: 8,
  },
  btnDisabled: { opacity: 0.5 },
  completeBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
