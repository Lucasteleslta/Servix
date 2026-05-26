import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { ClientStackParamList } from '../../navigation/ClientNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ClientStackParamList, 'Schedule'>;
  route: RouteProp<ClientStackParamList, 'Schedule'>;
};

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

function buildCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return { cells, today: today.getDate(), month, year };
}

export function ScheduleScreen({ navigation, route }: Props) {
  const { providerId } = route.params ?? {};
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const cal = buildCalendar();
  const monthName = new Date(cal.year, cal.month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const handleConfirm = () => {
    if (!selectedDay || !selectedTime || !address) {
      Alert.alert('Atenção', 'Selecione data, horário e informe o endereço.');
      return;
    }
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendamento</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.providerCard}>
          <View style={styles.providerAvatar}>
            <Text style={styles.providerAvatarText}>M</Text>
          </View>
          <View>
            <Text style={styles.providerName}>Marco Silva</Text>
            <Text style={styles.providerSpecialty}>Eletricista · ⭐ 4.8</Text>
          </View>
        </View>

        <Text style={styles.monthTitle}>{monthName}</Text>

        <View style={styles.dayLabels}>
          {DAYS.map((d) => (
            <Text key={d} style={styles.dayLabel}>{d}</Text>
          ))}
        </View>

        <View style={styles.calendar}>
          {cal.cells.map((day, i) =>
            day === null ? (
              <View key={`e-${i}`} style={styles.dayCell} />
            ) : (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayCell,
                  day === cal.today && styles.dayCellToday,
                  selectedDay === day && styles.dayCellSelected,
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <Text
                  style={[
                    styles.dayCellText,
                    selectedDay === day && styles.dayCellTextSelected,
                    day === cal.today && selectedDay !== day && styles.dayCellTodayText,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <Text style={styles.sectionLabel}>Horários disponíveis</Text>
        <View style={styles.timeSlots}>
          {TIME_SLOTS.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.timeChip, selectedTime === t && styles.timeChipSelected]}
              onPress={() => setSelectedTime(t)}
            >
              <Text style={[styles.timeText, selectedTime === t && styles.timeTextSelected]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Endereço do serviço</Text>
        <TextInput
          style={styles.input}
          placeholder="Rua, número, bairro..."
          placeholderTextColor={Colors.textMuted}
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleConfirm}>
          <Text style={styles.primaryBtnText}>Confirmar agendamento</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
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
  content: { flex: 1, paddingHorizontal: 20 },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    marginBottom: 24,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  providerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerAvatarText: { color: Colors.white, fontSize: 20, fontWeight: '700' },
  providerName: { fontSize: 15, fontWeight: '600', color: Colors.white },
  providerSpecialty: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  monthTitle: { fontSize: 15, fontWeight: '600', color: Colors.textSecondary, marginBottom: 12, textAlign: 'center' },
  dayLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dayLabel: { width: '14.28%', textAlign: 'center', color: Colors.textMuted, fontSize: 12 },
  calendar: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 },
  dayCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  dayCellToday: {},
  dayCellSelected: { backgroundColor: Colors.primary, borderRadius: 20 },
  dayCellText: { color: Colors.textSecondary, fontSize: 14 },
  dayCellTodayText: { color: Colors.secondary, fontWeight: '700' },
  dayCellTextSelected: { color: Colors.white, fontWeight: '700' },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, marginBottom: 12 },
  timeSlots: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeChipSelected: { borderColor: Colors.primary, backgroundColor: 'rgba(37,99,235,0.1)' },
  timeText: { color: Colors.textMuted, fontSize: 13 },
  timeTextSelected: { color: Colors.primary, fontWeight: '600' },
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    color: Colors.white,
    fontSize: 14,
    marginBottom: 24,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
