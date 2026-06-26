import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Share2, Users, Copy, TrendingUp, ChevronRight } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { GradientButton } from "../../src/components/GradientButton";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function ReferralsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight size={20} color={Colors.textSecondary} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Referrals</Text>

        <GlassCard glow style={styles.codeCard}>
          <Text style={styles.codeLabel}>YOUR GYM CODE</Text>
          <Text style={styles.code}>IRON-FIT-2026</Text>
          <TouchableOpacity style={styles.copyButton}>
            <Copy size={14} color={Colors.textInverse} /><Text style={styles.copyText}>Copy Code</Text>
          </TouchableOpacity>
        </GlassCard>

        <GlassCard style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.stat}><Text style={styles.statValue}>24</Text><Text style={styles.statLabel}>Conversions</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.stat}><Text style={styles.statValue}>₹4,800</Text><Text style={styles.statLabel}>Rewards</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.stat}><Text style={styles.statValue}>156</Text><Text style={styles.statLabel}>Clicks</Text></View>
          </View>
        </GlassCard>

        <GradientButton title="Share Referral Code" onPress={() => {}} />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingTop: 60, paddingHorizontal: Spacing.lg },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surfaceElevated, alignItems: "center", justifyContent: "center", marginBottom: Spacing.md },
  title: { fontSize: FontSize.xxxl, fontWeight: "900", color: Colors.limeAccent, marginBottom: Spacing.lg },
  codeCard: { alignItems: "center", paddingVertical: Spacing.lg, marginBottom: Spacing.md },
  codeLabel: { fontSize: FontSize.xs, color: Colors.textMuted, letterSpacing: 2, marginBottom: Spacing.sm },
  code: { fontSize: FontSize.xxl, fontWeight: "900", color: Colors.limeAccent, letterSpacing: 1, marginBottom: Spacing.md },
  copyButton: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.limeAccent, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.full },
  copyText: { fontSize: FontSize.sm, fontWeight: "700", color: Colors.textInverse },
  statsCard: { marginBottom: Spacing.lg },
  statsRow: { flexDirection: "row" },
  stat: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, backgroundColor: Colors.divider },
  statValue: { fontSize: FontSize.xxl, fontWeight: "800", color: Colors.textPrimary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
});
