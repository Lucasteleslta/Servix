import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { providerService } from '@/services/provider.service';
import { Provider } from '@/types/models';
import { Colors } from '@/constants/colors';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.category) {
      doSearch('', params.category);
    }
  }, [params.category]);

  const doSearch = async (q: string, category?: string) => {
    setLoading(true);
    try {
      const data = await providerService.search(q, category);
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = () => doSearch(query);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Buscar prestadores..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={onSearch}
            returnKeyType="search"
            placeholderTextColor={Colors.gray400}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
            <Ionicons name="search" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={Colors.primary} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {results.length === 0 ? 'Busque por um serviço ou prestador' : 'Nenhum resultado'}
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                {item.description && (
                  <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                )}
                <View style={styles.row}>
                  <Ionicons name="star" size={14} color={Colors.warning} />
                  <Text style={styles.rating}>{item.rating?.toFixed(1) ?? 'Novo'}</Text>
                  {item.hourlyRate && (
                    <Text style={styles.price}>R$ {item.hourlyRate}/h</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.white, padding: 16, paddingTop: 56 },
  searchRow: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: Colors.gray50,
    color: Colors.gray900,
  },
  searchBtn: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 22, fontWeight: '700' },
  info: { flex: 1, gap: 3 },
  name: { fontSize: 16, fontWeight: '600', color: Colors.gray900 },
  category: { fontSize: 13, color: Colors.primary, fontWeight: '500' },
  description: { fontSize: 13, color: Colors.gray500 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  rating: { fontSize: 13, color: Colors.gray700 },
  price: { fontSize: 13, color: Colors.success, fontWeight: '600', marginLeft: 8 },
  emptyText: { textAlign: 'center', color: Colors.gray400, marginTop: 60, fontSize: 15 },
});
