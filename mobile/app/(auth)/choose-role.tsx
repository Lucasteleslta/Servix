import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { Colors } from '@/constants/colors';

type Role = 'CLIENT' | 'PROVIDER';

export default function ChooseRoleScreen() {
  const { user, setAuth, token } = useAuthStore();
  const [selected, setSelected] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const updated = await authService.setRole(selected);
      setAuth(updated.user, updated.token ?? token!);
    } catch (err: any) {
      Alert.alert('Erro', err?.response?.data?.message || 'Erro ao definir perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você quer usar o Servix?</Text>
      <Text style={styles.subtitle}>Você poderá mudar isso depois nas configurações</Text>

      <View style={styles.cards}>
        <TouchableOpacity
          style={[styles.card, selected === 'CLIENT' && styles.cardSelected]}
          onPress={() => setSelected('CLIENT')}
        >
          <Ionicons
            name="person-outline"
            size={48}
            color={selected === 'CLIENT' ? Colors.primary : Colors.gray400}
          />
          <Text style={[styles.cardTitle, selected === 'CLIENT' && styles.cardTitleSelected]}>
            Contratar Serviços
          </Text>
          <Text style={styles.cardDesc}>
            Encontre prestadores qualificados para seus projetos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, selected === 'PROVIDER' && styles.cardSelected]}
          onPress={() => setSelected('PROVIDER')}
        >
          <Ionicons
            name="briefcase-outline"
            size={48}
            color={selected === 'PROVIDER' ? Colors.primary : Colors.gray400}
          />
          <Text style={[styles.cardTitle, selected === 'PROVIDER' && styles.cardTitleSelected]}>
            Oferecer Serviços
          </Text>
          <Text style={styles.cardDesc}>
            Cadastre seus serviços e receba solicitações de clientes
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, (!selected || loading) && styles.buttonDisabled]}
        onPress={onConfirm}
        disabled={!selected || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continuar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 24, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.gray900, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.gray500, marginBottom: 40 },
  cards: { gap: 16, marginBottom: 40 },
  card: {
    borderWidth: 2,
    borderColor: Colors.gray200,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.gray50,
  },
  cardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  cardTitle: { fontSize: 18, fontWeight: '600', color: Colors.gray700 },
  cardTitleSelected: { color: Colors.primary },
  cardDesc: { fontSize: 14, color: Colors.gray500, textAlign: 'center' },
  button: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
