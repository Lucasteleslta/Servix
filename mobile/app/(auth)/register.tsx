import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '@/services/auth.service';
import { Colors } from '@/constants/colors';

const schema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await authService.register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      router.push('/(auth)/choose-role');
    } catch (err: any) {
      Alert.alert('Erro', err?.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const fields: Array<{ name: keyof FormData; label: string; secure?: boolean; keyboard?: any }> = [
    { name: 'name', label: 'Nome completo' },
    { name: 'email', label: 'Email', keyboard: 'email-address' },
    { name: 'phone', label: 'Telefone', keyboard: 'phone-pad' },
    { name: 'password', label: 'Senha', secure: true },
    { name: 'confirmPassword', label: 'Confirmar senha', secure: true },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Junte-se ao Servix</Text>

        <View style={styles.form}>
          {fields.map(({ name, label, secure, keyboard }) => (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <TextInput
                    style={[styles.input, errors[name] && styles.inputError]}
                    placeholder={label}
                    secureTextEntry={secure}
                    keyboardType={keyboard}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={Colors.gray400}
                  />
                  {errors[name] && (
                    <Text style={styles.errorText}>{errors[name]?.message}</Text>
                  )}
                </View>
              )}
            />
          ))}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Criar conta</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>
              Já tem conta? <Text style={styles.link}>Entrar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  title: { fontSize: 28, fontWeight: '700', color: Colors.gray900, marginBottom: 4 },
  subtitle: { fontSize: 16, color: Colors.gray500, marginBottom: 32 },
  form: { gap: 16 },
  inputGroup: { gap: 4 },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.gray900,
    backgroundColor: Colors.gray50,
  },
  inputError: { borderColor: Colors.error },
  errorText: { fontSize: 12, color: Colors.error, marginLeft: 4 },
  button: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  linkText: { textAlign: 'center', color: Colors.gray500, fontSize: 14 },
  link: { color: Colors.primary, fontWeight: '600' },
});
