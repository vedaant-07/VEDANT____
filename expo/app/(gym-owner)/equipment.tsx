import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dumbbell, Check, AlertCircle, Wrench, Plus, ChevronRight } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

const MOCK_EQUIPMENT = [
  { name: "Bench Press Station", status: "working" as const, lastMaintenance: "2026-05-20" },
  { name: "Squat Rack", status: "working" as const, lastMaintenance: "2026-06-01" },
  { name: "Treadmill (Unit 2)", status: "maintenance" as const, lastMaintenance: "2026-06-15" },
  { name: "Cable Crossover", status: "working" as const, lastMaintenance: "2026-04-30" },
  { name: "Leg Press Machine", status: "broken" as const, lastMaintenance: "2026-03-10" },
];

const STATUS_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  working: { icon: <Check size={14} />, color: Colors.success },
  maintenance: { icon: <Wrench size={14} />, color: Colors.warning },
  broken: { icon: <AlertCircle size={14} />, color: Colors.error },
};

export default function EquipmentScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight size={20} color={Colors.textSecondary} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Equipment</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color={Colors.textInverse} /><Text style={styles.addText}>Add Equipment</Text>
        </TouchableOpacity>
        {MOCK_EQUIPMENT.map((eq, idx) => {
          const status = STATUS_ICONS[eq.status];
          return (
            <GlassCard key={idx} padding={Spacing.md} style={{ marginBottom: Spacing.xs }}>
              <View style={styles.eqRow}>
                <View style={[styles.eqStatus, { backgroundColor: status.color + "20" }]}>{status.icon}</View>
                <View style={styles.eqInfo}>
                  <Text style={styles.eqName}>{eq.name}</Text>
                  <Text style={[styles.eqStatusText, { color: status.color }]}>{eq.status.toUpperCase()}</Text>
                  <Text style={styles.eqDate}>Last maintained: {eq.lastMaintenance}</Text>
                </View>
              </View>
            </GlassCard>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingTop: 60, paddingHorizontal: Spacing.lg },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surfaceElevated, alignItems: "center", justifyContent: "center", marginBottom: Spacing.md },
  title: { fontSize: FontSize.xxxl, fontWeight: "900", color: Colors.limeAccent, marginBottom: Spacing.md },
  addButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.limeAccent, paddingVertical: 10, borderRadius: Radius.md, gap: Spacing.xs, marginBottom: Spacing.md },
  addText: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textInverse },
  eqRow: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  eqStatus: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  eqInfo: { flex: 1 },
  eqName: { fontSize: FontSize.md, fontWeight: "600", color: Colors.textPrimary },
  eqStatusText: { fontSize: FontSize.xs, fontWeight: "700", marginTop: 1 },
  eqDate: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 1 },
});
