import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

export function ChooseRoleScreen() {
  const [selected, setSelected] = useState<'CLIENT' | 'PROVIDER' | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleContinue = () => {
    if (!selected) {
      Alert.alert('Atenção', 'Selecione como deseja usar o Servix.');
      return;
    }
    navigation.navigate('Terms', { isProvider: selected === 'PROVIDER' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.title}>Como você vai usar o Servix?</Text>
      <Text style={styles.subtitle}>Escolha seu perfil para personalizar sua experiência</Text>

      <View style={styles.cards}>
        <TouchableOpacity
          style={[styles.card, selected === 'CLIENT' && styles.cardSelected]}
          onPress={() => setSelected('CLIENT')}
          activeOpacity={0.8}
        >
          <Text style={styles.cardIcon}>👤</Text>
          <Text style={styles.cardTitle}>Sou Cliente</Text>
          <Text style={styles.cardDesc}>
            Quero contratar profissionais para serviços em casa ou escritório
          </Text>
          {selected === 'CLIENT' && <View style={styles.selectedDot} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, selected === 'PROVIDER' && styles.cardSelectedGreen]}
          onPress={() => setSelected('PROVIDER')}
          activeOpacity={0.8}
        >
          <Text style={styles.cardIcon}>🔧</Text>
          <Text style={styles.cardTitle}>Sou Prestador</Text>
          <Text style={styles.cardDesc}>
            Quero oferecer meus serviços e encontrar novos clientes
          </Text>
          {selected === 'PROVIDER' && <View style={[styles.selectedDot, styles.selectedDotGreen]} />}
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>Você pode alterar isso depois nas configurações</Text>

      <TouchableOpacity
        style={[styles.primaryBtn, !selected && styles.btnDisabled]}
        onPress={handleContinue}
        disabled={!selected}
      >
        <Text style={styles.primaryBtnText}>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 40,
  },
  cards: { gap: 16, flex: 1 },
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  cardSelected: { borderColor: Colors.primary },
  cardSelectedGreen: { borderColor: Colors.secondary },
  cardIcon: { fontSize: 48, marginBottom: 12 },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  selectedDotGreen: { backgroundColor: Colors.secondary },
  note: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 20,
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
