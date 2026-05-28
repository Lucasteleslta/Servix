import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

const DEFAULT_NEIGHBORHOODS = ['Pinheiros', 'Vila Madalena', 'Moema', 'Itaim Bibi', 'Jardins'];

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ProviderRegister3'>;
};

export function RegisterStep3Screen({ navigation }: Props) {
  const [neighborhoods, setNeighborhoods] = useState<string[]>(DEFAULT_NEIGHBORHOODS);
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [city, setCity] = useState('São Paulo');

  const addNeighborhood = () => {
    const trimmed = newNeighborhood.trim();
    if (trimmed && !neighborhoods.includes(trimmed)) {
      setNeighborhoods([...neighborhoods, trimmed]);
      setNewNeighborhood('');
    }
  };

  const removeNeighborhood = (nb: string) => {
    setNeighborhoods(neighborhoods.filter((n) => n !== nb));
  };

  const handleNext = () => {
    navigation.navigate('ProviderRegister4');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Área de atuação</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
        <Text style={styles.progressLabel}>Passo 3 de 4 — Área de atuação</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapEmoji}>🗺️</Text>
            <Text style={styles.mapText}>Mapa de atuação</Text>
            <Text style={styles.mapHint}>Em breve</Text>
          </View>

          <View style={styles.radiusCard}>
            <Ionicons name="radio-outline" size={20} color={Colors.secondary} />
            <View style={styles.radiusInfo}>
              <Text style={styles.radiusLabel}>Raio de atendimento</Text>
              <Text style={styles.radiusValue}>15 km</Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Bairros de atuação</Text>
            <View style={styles.neighborhoodInput}>
              <TextInput
                style={styles.neighborhoodTextInput}
                value={newNeighborhood}
                onChangeText={setNewNeighborhood}
                placeholder="Adicionar bairro..."
                placeholderTextColor={Colors.textMuted}
                onSubmitEditing={addNeighborhood}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.addBtn} onPress={addNeighborhood}>
                <Ionicons name="add" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.chips}>
              {neighborhoods.map((nb) => (
                <TouchableOpacity
                  key={nb}
                  style={styles.neighborhoodChip}
                  onPress={() => removeNeighborhood(nb)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.chipText}>{nb}</Text>
                  <Ionicons name="close" size={14} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Ex: São Paulo"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
          <Text style={styles.primaryBtnText}>Próximo →</Text>
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
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: 4,
    backgroundColor: Colors.secondary,
    borderRadius: 2,
  },
  progressLabel: { fontSize: 12, color: Colors.textMuted },
  scrollView: { flex: 1 },
  form: { padding: 20, gap: 20 },
  mapPlaceholder: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    height: 160,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapEmoji: { fontSize: 48 },
  mapText: { fontSize: 16, fontWeight: '600', color: Colors.white },
  mapHint: { fontSize: 12, color: Colors.textMuted },
  radiusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  radiusInfo: { flex: 1 },
  radiusLabel: { fontSize: 13, color: Colors.textMuted },
  radiusValue: { fontSize: 18, fontWeight: '700', color: Colors.white, marginTop: 2 },
  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: Colors.white },
  neighborhoodInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  neighborhoodTextInput: {
    flex: 1,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    color: Colors.white,
    fontSize: 14,
  },
  addBtn: {
    width: 48,
    height: 48,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  neighborhoodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  chipText: { fontSize: 13, color: Colors.textSecondary },
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    color: Colors.white,
    fontSize: 14,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  primaryBtn: {
    backgroundColor: Colors.secondary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
