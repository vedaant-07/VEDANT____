import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Bell, Plus, ChevronRight, Clock } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function AnnouncementsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight size={20} color={Colors.textSecondary} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Announcements</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color={Colors.textInverse} /><Text style={styles.addText}>Create Announcement</Text>
        </TouchableOpacity>
        {[{ title: "New HIIT Classes Starting!", content: "We're introducing HIIT classes every morning at 6 AM starting next week.", active: true, date: "2026-06-20" }, { title: "Maintenance Notice", content: "The sauna will be closed for maintenance on Sunday, June 25.", active: true, date: "2026-06-18" }, { title: "Diwali Offer", content: "Special discounts on annual memberships for Diwali.", active: false, date: "2026-10-15" }].map((a, idx) => (
          <GlassCard key={idx} padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Bell size={16} color={a.active ? Colors.limeAccent : Colors.textMuted} />
                <Text style={styles.cardTitle}>{a.title}</Text>
              </View>
              <View style={[styles.status, { backgroundColor: a.active ? Colors.success + "20" : Colors.textMuted + "20" }]}>
                <Text style={[styles.statusText, { color: a.active ? Colors.success : Colors.textMuted }]}>{a.active ? "ACTIVE" : "EXPIRED"}</Text>
              </View>
            </View>
            <Text style={styles.cardContent}>{a.content}</Text>
            <View style={styles.dateRow}>
              <Clock size={10} color={Colors.textMuted} /><Text style={styles.dateText}>{a.date}</Text>
            </View>
          </GlassCard>
        ))}
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
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: Spacing.sm },
  cardTitleRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  cardTitle: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textPrimary },
  status: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.full },
  statusText: { fontSize: 9, fontWeight: "800" },
  cardContent: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.sm },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  dateText: { fontSize: FontSize.xs, color: Colors.textMuted },
});
