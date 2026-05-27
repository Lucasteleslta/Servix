import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { ClientStackParamList } from '../../navigation/ClientNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ClientStackParamList, 'HomeMain'>;
};

const MOCK_FAVORITES = [
  { id: '1', name: 'Marco Silva', specialty: 'Eletricista', rating: 4.9, reviews: 127 },
  { id: '2', name: 'Ana Costa', specialty: 'Pintora', rating: 4.7, reviews: 89 },
  { id: '3', name: 'Carlos Lima', specialty: 'Encanador', rating: 4.8, reviews: 203 },
  { id: '4', name: 'Julia Santos', specialty: 'Diarista', rating: 4.6, reviews: 57 },
];

export function FavoritesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Favoritos</Text>
      <FlatList
        data={MOCK_FAVORITES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProviderProfile', { providerId: item.id })}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item?.name?.[0] ?? '?'}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
              <Text style={styles.rating}>⭐ {item.rating} ({item.reviews})</Text>
            </View>
            <TouchableOpacity style={styles.heartBtn}>
              <Ionicons name="heart" size={22} color={Colors.error} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum favorito ainda</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  list: { paddingHorizontal: 20, gap: 12, paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 20, fontWeight: '700' },
  cardInfo: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: Colors.white },
  specialty: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  rating: { fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  heartBtn: { padding: 6 },
  empty: { paddingTop: 60, alignItems: 'center' },
  emptyText: { color: Colors.textMuted, fontSize: 15 },
});
