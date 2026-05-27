import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { ClientRootParamList } from '../../navigation/ClientNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ClientRootParamList, 'Tracking'>;
  route: RouteProp<ClientRootParamList, 'Tracking'>;
};

const TIMELINE = [
  { label: 'Agendado', desc: 'Contratação confirmada', done: true, active: false },
  { label: 'Em andamento', desc: 'Profissional a caminho', done: false, active: true },
  { label: 'Concluído', desc: 'Serviço finalizado', done: false, active: false },
];

export function TrackingScreen({ navigation, route }: Props) {
  const { requestId } = route.params;

  const handleCancel = () => {
    Alert.alert('Cancelar serviço', 'Tem certeza que deseja cancelar?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim, cancelar', style: 'destructive', onPress: () => navigation.navigate('Tabs') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acompanhar serviço</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.providerCard}>
          <View style={styles.providerInfo}>
            <View style={styles.providerAvatar}>
              <Text style={styles.providerAvatarText}>M</Text>
            </View>
            <View>
              <Text style={styles.providerName}>Marco Silva</Text>
              <Text style={styles.providerSpecialty}>Eletricista · ⭐ 4.8</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.chatBtn}
            onPress={() => navigation.navigate('Chat', { requestId, providerName: 'Marco Silva' })}
          >
            <Ionicons name="chatbubble" size={18} color={Colors.primary} />
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapText}>Mapa em tempo real</Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>📍</Text>
          <Text style={styles.statusText}>Marco está a 8 min de você</Text>
        </View>

        <Text style={styles.sectionTitle}>Status do serviço</Text>
        <View style={styles.timeline}>
          {TIMELINE.map((step, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,
                    step.done && styles.timelineDotDone,
                    step.active && styles.timelineDotActive,
                  ]}
                >
                  {step.done && <Text style={styles.dotCheck}>✓</Text>}
                </View>
                {i < TIMELINE.length - 1 && (
                  <View style={[styles.timelineLine, step.done && styles.timelineLineDone]} />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineLabel,
                    step.active && styles.timelineLabelActive,
                    step.done && styles.timelineLabelDone,
                  ]}
                >
                  {step.label}
                </Text>
                <Text style={styles.timelineDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelBtnText}>Cancelar serviço</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
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
  content: { flex: 1, paddingHorizontal: 20 },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  providerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  providerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerAvatarText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  providerName: { fontSize: 15, fontWeight: '600', color: Colors.white },
  providerSpecialty: { fontSize: 12, color: Colors.textMuted },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  chatBtnText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  mapPlaceholder: {
    height: 180,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  mapIcon: { fontSize: 40 },
  mapText: { color: Colors.textMuted, fontSize: 14 },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37,99,235,0.1)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  statusIcon: { fontSize: 20 },
  statusText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '500' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 16 },
  timeline: { marginBottom: 24 },
  timelineItem: { flexDirection: 'row', gap: 14, marginBottom: 4 },
  timelineLeft: { alignItems: 'center', width: 24 },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  timelineDotActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dotCheck: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  timelineLine: { width: 2, flex: 1, backgroundColor: Colors.border, marginVertical: 4, minHeight: 32 },
  timelineLineDone: { backgroundColor: Colors.success },
  timelineContent: { flex: 1, paddingBottom: 24 },
  timelineLabel: { fontSize: 14, fontWeight: '600', color: Colors.textMuted },
  timelineLabelActive: { color: Colors.primary },
  timelineLabelDone: { color: Colors.success },
  timelineDesc: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  cancelBtn: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: { color: Colors.error, fontSize: 15, fontWeight: '600' },
});
