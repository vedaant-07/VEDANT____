import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Gift, Plus, Star, ChevronRight } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function OwnerRewardsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight size={20} color={Colors.textSecondary} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Rewards</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color={Colors.textInverse} /><Text style={styles.addText}>Create Reward</Text>
        </TouchableOpacity>
        {[{ name: "Free Protein Shaker", desc: "Get a branded SE7EN FIT shaker", pointsNeeded: 500, available: true }, { name: "1 Month Free", desc: "Free month of membership", pointsNeeded: 2000, available: true }, { name: "Personal Training Session", desc: "1-on-1 session with a trainer", pointsNeeded: 1000, available: true }, { name: "Gym Bag", desc: "Premium duffel bag", pointsNeeded: 3000, available: false }].map((r, idx) => (
          <GlassCard key={idx} padding={Spacing.md} style={{ marginBottom: Spacing.sm, opacity: r.available ? 1 : 0.5 }}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}><Gift size={18} color={Colors.limeAccent} /></View>
              <View style={styles.info}>
                <Text style={styles.name}>{r.name}</Text>
                <Text style={styles.desc}>{r.desc}</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Star size={14} color={Colors.limeAccent} /><Text style={styles.points}>{r.pointsNeeded} points</Text>
              {!r.available && <Text style={styles.unavailable}>Unavailable</Text>}
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
  cardHeader: { flexDirection: "row", gap: Spacing.md, marginBottom: Spacing.sm },
  iconBox: { width: 40, height: 40, borderRadius: Radius.md, backgroundColor: Colors.limeAccent + "10", alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  name: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textPrimary },
  desc: { fontSize: FontSize.sm, color: Colors.textSecondary },
  footer: { flexDirection: "row", alignItems: "center", gap: Spacing.xs },
  points: { fontSize: FontSize.sm, fontWeight: "600", color: Colors.limeAccent },
  unavailable: { fontSize: FontSize.xs, color: Colors.error, marginLeft: Spacing.sm },
});
