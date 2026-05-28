import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { ClientRootParamList } from '../../navigation/ClientNavigator';
import { useAuthStore } from '../../store/auth.store';

type Props = {
  navigation: NativeStackNavigationProp<ClientRootParamList, 'Settings'>;
};

export function SettingsScreen({ navigation }: Props) {
  const { logout } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ]
    );
  };

  const ACCOUNT_OPTIONS = [
    {
      icon: 'person-outline' as const,
      label: 'Dados pessoais',
      onPress: () => {},
    },
    {
      icon: 'location-outline' as const,
      label: 'Endereços salvos',
      onPress: () => {},
    },
    {
      icon: 'card-outline' as const,
      label: 'Métodos de pagamento',
      onPress: () => {},
    },
  ];

  const SUPPORT_OPTIONS = [
    {
      icon: 'help-circle-outline' as const,
      label: 'Ajuda e FAQ',
      onPress: () => {},
    },
    {
      icon: 'chatbubble-outline' as const,
      label: 'Falar com suporte',
      onPress: () => {},
    },
    {
      icon: 'shield-outline' as const,
      label: 'Política de privacidade',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Conta</Text>
        <View style={styles.optionsList}>
          {ACCOUNT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.label}
              style={styles.optionItem}
              onPress={opt.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.optionIcon}>
                <Ionicons name={opt.icon} size={20} color={Colors.primary} />
              </View>
              <Text style={styles.optionLabel}>{opt.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Preferências</Text>
        <View style={styles.optionsList}>
          <View style={styles.optionItem}>
            <View style={styles.optionIcon}>
              <Ionicons name="notifications-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.optionLabel}>Notificações</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>
          <View style={styles.optionItem}>
            <View style={styles.optionIcon}>
              <Ionicons name="moon-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.optionLabel}>Tema escuro</Text>
            <Switch
              value={darkThemeEnabled}
              onValueChange={setDarkThemeEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>
        </View>

        <Text style={styles.sectionLabel}>Suporte</Text>
        <View style={styles.optionsList}>
          {SUPPORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.label}
              style={styles.optionItem}
              onPress={opt.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.optionIcon}>
                <Ionicons name={opt.icon} size={20} color={Colors.primary} />
              </View>
              <Text style={styles.optionLabel}>{opt.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={Colors.error} />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
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
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  optionsList: { paddingHorizontal: 20, gap: 4 },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(37,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: { flex: 1, fontSize: 15, color: Colors.textSecondary },
  logoutSection: { paddingHorizontal: 20, marginTop: 24 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.error + '44',
    gap: 10,
    backgroundColor: Colors.surface,
  },
  logoutText: { color: Colors.error, fontSize: 15, fontWeight: '500' },
});
