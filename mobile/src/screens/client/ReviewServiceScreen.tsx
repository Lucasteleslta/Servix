import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { ClientRootParamList } from '../../navigation/ClientNavigator';
import { reviewService } from '../../services/review.service';

type Props = {
  navigation: NativeStackNavigationProp<ClientRootParamList, 'ReviewService'>;
  route: RouteProp<ClientRootParamList, 'ReviewService'>;
};

function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <TouchableOpacity key={s} onPress={() => onChange(s)} activeOpacity={0.8}>
          <Ionicons
            name={s <= value ? 'star' : 'star-outline'}
            size={32}
            color={Colors.warning}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function SmallStarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <TouchableOpacity key={s} onPress={() => onChange(s)} activeOpacity={0.8}>
          <Ionicons
            name={s <= value ? 'star' : 'star-outline'}
            size={22}
            color={Colors.warning}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function ReviewServiceScreen({ navigation, route }: Props) {
  const { requestId, providerName, providerInitial } = route.params;
  const [rating, setRating] = useState(0);
  const [punctualityRating, setPunctualityRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const initial = providerInitial ?? (providerName?.[0] ?? 'P').toUpperCase();

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Atenção', 'Selecione uma avaliação geral.');
      return;
    }
    try {
      setLoading(true);
      await reviewService.create({ requestId, rating, comment: comment.trim() || undefined });
      Alert.alert('Avaliação enviada!', 'Obrigado por avaliar o serviço.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar sua avaliação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avaliar serviço</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.providerCard}>
          <View style={styles.providerAvatar}>
            <Text style={styles.providerAvatarText}>{initial}</Text>
          </View>
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{providerName}</Text>
            <Text style={styles.providerSub}>Prestador de serviços</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliação geral</Text>
          <StarSelector value={rating} onChange={setRating} />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliações específicas</Text>

          <View style={styles.subRatingRow}>
            <Text style={styles.subRatingLabel}>Pontualidade</Text>
            <SmallStarSelector value={punctualityRating} onChange={setPunctualityRating} />
          </View>
          <View style={styles.subRatingRow}>
            <Text style={styles.subRatingLabel}>Qualidade</Text>
            <SmallStarSelector value={qualityRating} onChange={setQualityRating} />
          </View>
          <View style={styles.subRatingRow}>
            <Text style={styles.subRatingLabel}>Limpeza</Text>
            <SmallStarSelector value={cleanlinessRating} onChange={setCleanlinessRating} />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comentário (opcional)</Text>
          <TextInput
            style={styles.textarea}
            value={comment}
            onChangeText={setComment}
            placeholder="Conte como foi sua experiência com o prestador..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.primaryBtn, (loading || rating === 0) && styles.btnDisabled]}
          onPress={handleSubmit}
          disabled={loading || rating === 0}
        >
          <Text style={styles.primaryBtnText}>
            {loading ? 'Enviando...' : 'Enviar avaliação'}
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
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 14,
  },
  providerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerAvatarText: { color: Colors.white, fontSize: 24, fontWeight: '700' },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 17, fontWeight: '700', color: Colors.white },
  providerSub: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  section: { padding: 20, gap: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.white },
  divider: { height: 1, backgroundColor: Colors.border },
  subRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subRatingLabel: { fontSize: 14, color: Colors.textMuted },
  textarea: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 100,
    color: Colors.white,
    fontSize: 14,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.5 },
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
