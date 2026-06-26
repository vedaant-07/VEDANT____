import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QrCode, Users, Check, Clock, ChevronRight } from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";

const MOCK_ATTENDANCE = [
  { _id: "a1", memberName: "Rahul Mehta", checkInTime: "07:30 AM", date: "2026-06-22" },
  { _id: "a2", memberName: "Priya Sharma", checkInTime: "08:15 AM", date: "2026-06-22" },
  { _id: "a3", memberName: "Neha Gupta", checkInTime: "06:45 AM", date: "2026-06-22" },
  { _id: "a4", memberName: "Vikram Singh", checkInTime: "09:00 AM", date: "2026-06-22" },
];

export default function AttendanceScreen() {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }} tintColor={Colors.limeAccent} colors={[Colors.limeAccent]} />}
      >
        <Text style={styles.title}>Attendance</Text>

        <GlassCard glow style={styles.todayCard}>
          <Text style={styles.todayLabel}>TODAY</Text>
          <Text style={styles.todayCount}>{MOCK_ATTENDANCE.length}</Text>
          <Text style={styles.todaySub}>Check-ins</Text>
        </GlassCard>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <QrCode size={20} color={Colors.textInverse} /><Text style={styles.actionText}>Scan QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnOutline}>
            <Users size={20} color={Colors.limeAccent} /><Text style={styles.actionTextOutline}>Manual Check-in</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Today's Check-ins</Text>
        {MOCK_ATTENDANCE.map((a) => (
          <GlassCard key={a._id} padding={Spacing.md} style={{ marginBottom: Spacing.xs }}>
            <View style={styles.checkRow}>
              <View style={styles.checkIcon}><Check size={16} color={Colors.success} /></View>
              <View style={styles.checkInfo}>
                <Text style={styles.checkName}>{a.memberName}</Text>
                <View style={styles.checkMeta}>
                  <Clock size={12} color={Colors.textMuted} /><Text style={styles.checkTime}>{a.checkInTime}</Text>
                </View>
              </View>
              <ChevronRight size={16} color={Colors.textMuted} />
            </View>
          </GlassCard>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingTop: 60, paddingBottom: 100, paddingHorizontal: Spacing.lg },
  title: { fontSize: FontSize.xxxl, fontWeight: "900", color: Colors.limeAccent, marginBottom: Spacing.lg },
  todayCard: { alignItems: "center", paddingVertical: Spacing.lg, marginBottom: Spacing.md },
  todayLabel: { fontSize: FontSize.sm, color: Colors.textMuted, letterSpacing: 1 },
  todayCount: { fontSize: 56, fontWeight: "900", color: Colors.limeAccent },
  todaySub: { fontSize: FontSize.md, color: Colors.textSecondary },
  actionRow: { flexDirection: "row", gap: Spacing.md, marginBottom: Spacing.lg },
  actionBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.limeAccent, paddingVertical: 14, borderRadius: Radius.md, gap: Spacing.sm },
  actionText: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textInverse },
  actionBtnOutline: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.limeAccent + "10", paddingVertical: 14, borderRadius: Radius.md, borderWidth: 1.5, borderColor: Colors.limeAccent + "50", gap: Spacing.sm },
  actionTextOutline: { fontSize: FontSize.md, fontWeight: "700", color: Colors.limeAccent },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: "700", color: Colors.textPrimary, marginBottom: Spacing.md },
  checkRow: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  checkIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.success + "20", alignItems: "center", justifyContent: "center" },
  checkInfo: { flex: 1 },
  checkName: { fontSize: FontSize.md, fontWeight: "600", color: Colors.textPrimary },
  checkMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  checkTime: { fontSize: FontSize.xs, color: Colors.textMuted },
});
