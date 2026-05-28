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
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { ClientRootParamList } from '../../navigation/ClientNavigator';

const CATEGORIES = ['Eletricista', 'Encanador', 'Pintor', 'Faxineira', 'Jardineiro'];
const RATINGS = ['Qualquer', '4+★', '4.5+★'];
const DISTANCES = ['5 km', '10 km', '20 km', '50 km'];
const AVAILABILITY = ['Hoje', 'Esta semana', 'Qualquer'];

type Props = {
  navigation: NativeStackNavigationProp<ClientRootParamList, 'SearchFilter'>;
  route: RouteProp<ClientRootParamList, 'SearchFilter'>;
};

export function SearchFilterScreen({ navigation, route }: Props) {
  const initialCategory = route.params?.initialCategory;
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedRating, setSelectedRating] = useState('Qualquer');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('10 km');
  const [selectedAvailability, setSelectedAvailability] = useState('Qualquer');

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedRating('Qualquer');
    setPriceMin('');
    setPriceMax('');
    setSelectedDistance('10 km');
    setSelectedAvailability('Qualquer');
  };

  const handleResults = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filtros de busca</Text>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoria</Text>
          <View style={styles.chips}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => toggleCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliação mínima</Text>
          <View style={styles.chips}>
            {RATINGS.map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.chip, selectedRating === r && styles.chipSelected]}
                onPress={() => setSelectedRating(r)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipText, selectedRating === r && styles.chipTextSelected]}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Faixa de preço (R$/hora)</Text>
          <View style={styles.priceRow}>
            <TextInput
              style={styles.priceInput}
              value={priceMin}
              onChangeText={setPriceMin}
              placeholder="Mínimo"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
            />
            <Text style={styles.priceSeparator}>—</Text>
            <TextInput
              style={styles.priceInput}
              value={priceMax}
              onChangeText={setPriceMax}
              placeholder="Máximo"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distância</Text>
          <View style={styles.chips}>
            {DISTANCES.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.chip, selectedDistance === d && styles.chipSelected]}
                onPress={() => setSelectedDistance(d)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipText, selectedDistance === d && styles.chipTextSelected]}>
                  {d}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disponibilidade</Text>
          <View style={styles.chips}>
            {AVAILABILITY.map((a) => (
              <TouchableOpacity
                key={a}
                style={[styles.chip, selectedAvailability === a && styles.chipSelected]}
                onPress={() => setSelectedAvailability(a)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipText, selectedAvailability === a && styles.chipTextSelected]}>
                  {a}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleResults}>
          <Text style={styles.primaryBtnText}>Ver resultados</Text>
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
  clearBtn: { width: 48, height: 40, alignItems: 'flex-end', justifyContent: 'center' },
  clearText: { color: Colors.primary, fontSize: 14, fontWeight: '600' },
  scrollView: { flex: 1 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: { fontSize: 13, color: Colors.textMuted },
  chipTextSelected: { color: Colors.white, fontWeight: '600' },
  divider: { height: 1, backgroundColor: Colors.border, marginHorizontal: 20 },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceInput: {
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
  priceSeparator: { color: Colors.textMuted, fontSize: 16 },
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
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
