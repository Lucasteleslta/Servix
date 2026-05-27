import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

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

const SCHEDULE: Record<number, { time: string; client: string; service: string; color: string }[]> = {
  26: [
    { time: '09:00', client: 'João M.', service: 'Instalação elétrica', color: Colors.primary },
    { time: '14:30', client: 'Ana C.', service: 'Troca de disjuntor', color: Colors.secondary },
  ],
  27: [
    { time: '10:00', client: 'Pedro L.', service: 'Reparo em tomada', color: Colors.warning },
  ],
};

export function ProviderScheduleScreen() {
  const [view, setView] = useState<'week' | 'month'>('week');
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const cal = buildCalendar();
  const monthName = new Date(cal.year, cal.month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const daySchedule = SCHEDULE[selectedDay] ?? [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>Agenda</Text>
        <View style={styles.viewToggle}>
          {(['week', 'month'] as const).map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.toggleBtn, view === v && styles.toggleBtnActive]}
              onPress={() => setView(v)}
            >
              <Text style={[styles.toggleText, view === v && styles.toggleTextActive]}>
                {v === 'week' ? 'Semana' : 'Mês'}
              </Text>
            </TouchableOpacity>
          ))}
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
                SCHEDULE[day] && styles.dayCellHasEvents,
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
              {SCHEDULE[day] && selectedDay !== day && (
                <View style={styles.eventDot} />
              )}
            </TouchableOpacity>
          )
        )}
      </View>

      <Text style={styles.selectedDayTitle}>
        Serviços do dia {selectedDay}
      </Text>

      {daySchedule.length === 0 ? (
        <View style={styles.emptyDay}>
          <Text style={styles.emptyDayText}>Nenhum serviço agendado</Text>
        </View>
      ) : (
        daySchedule.map((item, i) => (
          <View key={i} style={[styles.scheduleCard, { borderLeftColor: item.color }]}>
            <Text style={[styles.scheduleTime, { color: item.color }]}>{item.time}</Text>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleService}>{item.service}</Text>
              <Text style={styles.scheduleClient}>{item.client}</Text>
            </View>
          </View>
        ))
      )}
      <View style={{ height: 24 }} />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  pageTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toggleBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  toggleBtnActive: { backgroundColor: Colors.secondary },
  toggleText: { fontSize: 13, color: Colors.textMuted },
  toggleTextActive: { color: Colors.white, fontWeight: '600' },
  monthTitle: { fontSize: 15, fontWeight: '600', color: Colors.textSecondary, marginBottom: 12, textAlign: 'center' },
  dayLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 8 },
  dayLabel: { width: '14.28%', textAlign: 'center', color: Colors.textMuted, fontSize: 12 },
  calendar: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 14, marginBottom: 24 },
  dayCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  dayCellToday: {},
  dayCellSelected: { backgroundColor: Colors.secondary, borderRadius: 20 },
  dayCellHasEvents: {},
  dayCellText: { color: Colors.textSecondary, fontSize: 14 },
  dayCellTodayText: { color: Colors.secondary, fontWeight: '700' },
  dayCellTextSelected: { color: Colors.white, fontWeight: '700' },
  eventDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.secondary, marginTop: 2 },
  selectedDayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  emptyDay: { paddingVertical: 24, alignItems: 'center' },
  emptyDayText: { color: Colors.textMuted, fontSize: 14 },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  scheduleTime: { fontSize: 15, fontWeight: '700', width: 52 },
  scheduleInfo: { flex: 1 },
  scheduleService: { fontSize: 14, fontWeight: '600', color: Colors.white },
  scheduleClient: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
});
