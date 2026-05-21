import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/auth.store';
import { providerService } from '@/services/provider.service';
import { Provider } from '@/types/models';
import { Colors } from '@/constants/colors';

const CATEGORIES = [
  { id: 'electrician', label: 'Eletricista', icon: 'flash-outline' },
  { id: 'plumber', label: 'Encanador', icon: 'water-outline' },
  { id: 'cleaner', label: 'Limpeza', icon: 'sparkles-outline' },
  { id: 'painter', label: 'Pintor', icon: 'brush-outline' },
  { id: 'carpenter', label: 'Marceneiro', icon: 'hammer-outline' },
  { id: 'other', label: 'Outros', icon: 'grid-outline' },
] as const;

export default function ClientHomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [featured, setFeatured] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    providerService.getFeatured()
      .then(setFeatured)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0]} 👋</Text>
          <Text style={styles.subtitle}>O que você precisa hoje?</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(client)/profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => router.push('/(client)/search')}
        activeOpacity={0.7}
      >
        <Ionicons name="search-outline" size={20} color={Colors.gray400} />
        <Text style={styles.searchPlaceholder}>Buscar serviços ou prestadores...</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categories}>
          {CATEGORIES.map(({ id, label, icon }) => (
            <TouchableOpacity
              key={id}
              style={styles.categoryItem}
              onPress={() => router.push({ pathname: '/(client)/search', params: { category: id } })}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={icon as any} size={24} color={Colors.primary} />
              </View>
              <Text style={styles.categoryLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prestadores em Destaque</Text>
        {loading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginTop: 20 }} />
        ) : featured.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum prestador disponível no momento</Text>
        ) : (
          featured.map((provider) => (
            <TouchableOpacity key={provider.id} style={styles.providerCard}>
              <View style={styles.providerAvatar}>
                <Text style={styles.providerAvatarText}>{provider.name[0]}</Text>
              </View>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerCategory}>{provider.category}</Text>
                <View style={styles.providerRating}>
                  <Ionicons name="star" size={14} color={Colors.warning} />
                  <Text style={styles.ratingText}>{provider.rating?.toFixed(1) ?? 'Novo'}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray400} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  greeting: { fontSize: 22, fontWeight: '700', color: Colors.gray900 },
  subtitle: { fontSize: 14, color: Colors.gray500, marginTop: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  searchPlaceholder: { color: Colors.gray400, fontSize: 15 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: Colors.gray900, marginBottom: 16 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryItem: { alignItems: 'center', width: '28%' },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: { fontSize: 12, color: Colors.gray700, textAlign: 'center' },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  providerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerAvatarText: { color: Colors.white, fontSize: 20, fontWeight: '700' },
  providerInfo: { flex: 1, gap: 2 },
  providerName: { fontSize: 16, fontWeight: '600', color: Colors.gray900 },
  providerCategory: { fontSize: 13, color: Colors.gray500 },
  providerRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, color: Colors.gray700 },
  emptyText: { textAlign: 'center', color: Colors.gray400, marginTop: 20 },
});
