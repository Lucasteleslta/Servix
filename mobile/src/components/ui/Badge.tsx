import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

type Variant = 'success' | 'warning' | 'error' | 'primary';

interface Props {
  label: string;
  variant?: Variant;
}

const COLORS: Record<Variant, { bg: string; text: string }> = {
  success: { bg: Colors.success + '33', text: Colors.success },
  warning: { bg: Colors.warning + '33', text: Colors.warning },
  error: { bg: Colors.error + '33', text: Colors.error },
  primary: { bg: Colors.primary + '33', text: Colors.primary },
};

export function Badge({ label, variant = 'success' }: Props) {
  const { bg, text } = COLORS[variant];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  text: { fontSize: 11, fontWeight: '600' },
});
