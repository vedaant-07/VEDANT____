import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Megaphone, Plus, Eye, MousePointer, ChevronRight, Clock } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function PromotionsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight size={20} color={Colors.textSecondary} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Promotions</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color={Colors.textInverse} /><Text style={styles.addText}>Create Promotion</Text>
        </TouchableOpacity>
        {[{ title: "Summer Special", desc: "Get 20% off on all quarterly plans. Limited time offer!", cta: "Join Now", startDate: "2026-06-01", endDate: "2026-07-31", active: true, impressions: 340, clicks: 87 }, { title: "Referral Bonus", desc: "Refer a friend and get 1 month free. They get ₹200 off!", cta: "Refer Now", startDate: "2026-05-01", endDate: "2026-12-31", active: true, impressions: 520, clicks: 142 }].map((p, idx) => (
          <GlassCard key={idx} padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.cardHeader}>
              <View style={styles.titleRow}>
                <Megaphone size={16} color={p.active ? Colors.limeAccent : Colors.textMuted} />
                <Text style={styles.cardTitle}>{p.title}</Text>
              </View>
              <View style={[styles.status, { backgroundColor: p.active ? Colors.success + "20" : Colors.textMuted + "20" }]}>
                <Text style={[styles.statusText, { color: p.active ? Colors.success : Colors.textMuted }]}>{p.active ? "ACTIVE" : "EXPIRED"}</Text>
              </View>
            </View>
            <Text style={styles.desc}>{p.desc}</Text>
            <View style={styles.meta}>
              <View style={styles.metaItem}><Clock size={10} color={Colors.textMuted} /><Text style={styles.metaText}>{p.startDate} - {p.endDate}</Text></View>
            </View>
            <View style={styles.stats}>
              <View style={styles.statItem}><Eye size={12} color={Colors.textMuted} /><Text style={styles.statText}>{p.impressions} views</Text></View>
              <View style={styles.statItem}><MousePointer size={12} color={Colors.textMuted} /><Text style={styles.statText}>{p.clicks} clicks</Text></View>
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
  titleRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  cardTitle: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textPrimary },
  status: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.full },
  statusText: { fontSize: 9, fontWeight: "800" },
  desc: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.sm },
  meta: { marginBottom: Spacing.sm },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: FontSize.xs, color: Colors.textMuted },
  stats: { flexDirection: "row", gap: Spacing.lg },
  statItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  statText: { fontSize: FontSize.xs, color: Colors.textMuted },
});
