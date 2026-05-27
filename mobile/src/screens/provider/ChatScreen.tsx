import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { ProviderRootParamList } from '../../navigation/ProviderNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProviderRootParamList, 'ProviderChat'>;
  route: RouteProp<ProviderRootParamList, 'ProviderChat'>;
};

interface Message {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

const INITIAL: Message[] = [
  { id: '1', text: 'Olá! Estou analisando sua solicitação.', isMe: true, time: '10:30' },
  { id: '2', text: 'Quando o senhor pode ir?', isMe: false, time: '10:32' },
  { id: '3', text: 'Posso ir amanhã às 9h. Seria bom?', isMe: true, time: '10:33' },
  { id: '4', text: 'Perfeito! Me confirma o endereço.', isMe: false, time: '10:35' },
];

export function ProviderChatScreen({ navigation, route }: Props) {
  const { clientName } = route.params;
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: text.trim(),
        isMe: true,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setText('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>{clientName?.[0] ?? 'C'}</Text>
            </View>
            <View>
              <Text style={styles.headerName}>{clientName}</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>online</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="call-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.messageRow, item.isMe && styles.messageRowMe]}>
              <View style={[styles.bubble, item.isMe ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={styles.bubbleText}>{item.text}</Text>
              </View>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma mensagem..."
            placeholderTextColor={Colors.textMuted}
            value={text}
            onChangeText={setText}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  headerName: { fontSize: 15, fontWeight: '600', color: Colors.white },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success },
  onlineText: { fontSize: 12, color: Colors.success },
  messagesList: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  messageRow: { alignItems: 'flex-start', maxWidth: '80%' },
  messageRowMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubble: { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 2 },
  bubbleMe: { backgroundColor: Colors.secondary, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: Colors.inputBackground, borderBottomLeftRadius: 4 },
  bubbleText: { color: Colors.white, fontSize: 14, lineHeight: 20 },
  messageTime: { fontSize: 11, color: Colors.textMuted },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.inputBackground,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: Colors.white,
    fontSize: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
