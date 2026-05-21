import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export default function ProviderEarningsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ganhos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 22, fontWeight: '700', color: Colors.gray900, paddingHorizontal: 20, paddingTop: 60 },
});
