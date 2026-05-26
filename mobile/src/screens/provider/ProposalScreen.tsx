import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { ProviderStackParamList } from '../../navigation/ProviderNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProviderStackParamList, 'Proposal'>;
  route: RouteProp<ProviderStackParamList, 'Proposal'>;
};

export function ProposalScreen({ navigation, route }: Props) {
  const { requestId } = route.params;
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [labor, setLabor] = useState(false);
  const [materials, setMaterials] = useState(false);
  const [warranty, setWarranty] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!description || !value) {
      Alert.alert('Atenção', 'Preencha descrição e valor.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Proposta enviada!', 'O cliente foi notificado.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enviar proposta</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Descrição da proposta *</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descreva o que será feito, materiais incluídos..."
            placeholderTextColor={Colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Valor (R$) *</Text>
          <TextInput
            style={[styles.input, styles.valueInput]}
            placeholder="0,00"
            placeholderTextColor={Colors.textMuted + '88'}
            value={value}
            onChangeText={setValue}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Data disponível</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={Colors.textMuted}
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.label}>Prazo estimado</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 2 dias, 3 horas"
            placeholderTextColor={Colors.textMuted}
            value={deadline}
            onChangeText={setDeadline}
          />

          <Text style={styles.label}>Inclui</Text>
          <View style={styles.checkboxRow}>
            {[
              { key: 'labor', label: 'Mão de obra', val: labor, set: setLabor },
              { key: 'materials', label: 'Materiais básicos', val: materials, set: setMaterials },
              { key: 'warranty', label: 'Garantia 90d', val: warranty, set: setWarranty },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[styles.checkChip, item.val && styles.checkChipActive]}
                onPress={() => item.set(!item.val)}
              >
                {item.val && <Ionicons name="checkmark" size={14} color={Colors.secondary} />}
                <Text style={[styles.checkChipText, item.val && styles.checkChipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.btnDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? 'Enviando...' : 'Enviar proposta'}
            </Text>
          </TouchableOpacity>
          <View style={{ height: 32 }} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.white },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8 },
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    color: Colors.white,
    fontSize: 14,
    marginBottom: 20,
  },
  textarea: { height: 110, paddingTop: 14 },
  valueInput: {
    height: 64,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
  },
  checkboxRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 28 },
  checkChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 6,
  },
  checkChipActive: { borderColor: Colors.secondary, backgroundColor: 'rgba(0,200,150,0.1)' },
  checkChipText: { fontSize: 13, color: Colors.textMuted },
  checkChipTextActive: { color: Colors.secondary, fontWeight: '600' },
  primaryBtn: {
    backgroundColor: Colors.secondary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
