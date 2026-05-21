import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <View style={styles.empty}>
        <Ionicons name="heart-outline" size={48} color={Colors.gray300} />
        <Text style={styles.emptyText}>Nenhum prestador favoritado ainda</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.gray900,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyText: { color: Colors.gray400, fontSize: 15 },
});
