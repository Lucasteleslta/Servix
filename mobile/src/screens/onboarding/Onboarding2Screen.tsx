import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Onboarding2'>;
};

export function Onboarding2Screen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.skipText}>Pular</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💬</Text>
        </View>
        <Text style={styles.title}>Negocie com segurança</Text>
        <Text style={styles.subtitle}>
          Chat integrado para negociar detalhes, tirar dúvidas e fechar o melhor acordo com total segurança.
        </Text>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => navigation.navigate('Onboarding3')}
      >
        <Text style={styles.nextText}>Próximo →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
  },
  skipBtn: { alignSelf: 'flex-end' },
  skipText: { color: Colors.textMuted, fontSize: 14 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  icon: { fontSize: 56 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  dots: { flexDirection: 'row', gap: 8, marginTop: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: Colors.white, width: 24 },
  nextBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
