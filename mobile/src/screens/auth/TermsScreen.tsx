import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Terms'>;
  route: RouteProp<AuthStackParamList, 'Terms'>;
};

export function TermsScreen({ navigation, route }: Props) {
  const { isProvider } = route.params;
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [acceptedMarketing, setAcceptedMarketing] = useState(false);

  const handleContinue = () => {
    navigation.navigate('Permissions', { isProvider });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Termos e Privacidade</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Termos de Uso</Text>
          <Text style={styles.paragraph}>
            Ao utilizar o Servix, você concorda com nossos Termos de Uso e Política de Privacidade. O Servix é uma plataforma que conecta clientes a prestadores de serviços. Somos responsáveis por facilitar a conexão, mas não somos parte dos contratos de serviços firmados entre usuários. O uso da plataforma implica na aceitação plena e irrestrita dos presentes termos e condições.
          </Text>

          <Text style={styles.sectionTitle}>Política de Privacidade</Text>
          <Text style={styles.paragraph}>
            Coletamos e processamos seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD). As informações fornecidas são utilizadas exclusivamente para a prestação dos serviços da plataforma, como criação de perfil, busca de prestadores e agendamento de serviços. Seus dados não serão vendidos ou compartilhados com terceiros sem o seu consentimento, exceto quando exigido por lei ou necessário para a execução dos serviços.
          </Text>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
            {acceptedTerms && <Ionicons name="checkmark" size={14} color={Colors.white} />}
          </View>
          <Text style={styles.checkboxLabel}>
            Aceito os Termos de Uso e a Política de Privacidade
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAcceptedMarketing(!acceptedMarketing)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, acceptedMarketing && styles.checkboxChecked]}>
            {acceptedMarketing && <Ionicons name="checkmark" size={14} color={Colors.white} />}
          </View>
          <Text style={styles.checkboxLabel}>
            Aceito receber comunicações de marketing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryBtn, !acceptedTerms && styles.btnDisabled]}
          onPress={handleContinue}
          disabled={!acceptedTerms}
        >
          <Text style={styles.primaryBtnText}>Concordar e continuar</Text>
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
  scrollView: { flex: 1 },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 10,
    marginTop: 8,
  },
  paragraph: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  btnDisabled: { opacity: 0.5 },
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
