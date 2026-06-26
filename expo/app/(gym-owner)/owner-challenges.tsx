import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Trophy, Plus, Users, Star, Timer, ChevronRight } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function OwnerChallengesScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight size={20} color={Colors.textSecondary} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Gym Challenges</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color={Colors.textInverse} /><Text style={styles.addText}>Create Challenge</Text>
        </TouchableOpacity>
        {[{ title: "30-Day Transformation", target: "Lose 3% body fat", rewardPoints: 2000, participants: 18, duration: 30 }, { title: "Bench Press Challenge", target: "Increase bench by 10kg", rewardPoints: 1000, participants: 12, duration: 14 }].map((c, idx) => (
          <GlassCard key={idx} padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.cardHeader}>
              <Trophy size={18} color={Colors.limeAccent} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{c.title}</Text>
                <Text style={styles.cardTarget}>{c.target}</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}><Users size={12} color={Colors.textMuted} /><Text style={styles.metaText}>{c.participants} joined</Text></View>
              <View style={styles.metaItem}><Timer size={12} color={Colors.textMuted} /><Text style={styles.metaText}>{c.duration} days</Text></View>
              <View style={styles.metaItem}><Star size={12} color={Colors.limeAccent} /><Text style={styles.metaTextGreen}>+{c.rewardPoints} pts</Text></View>
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
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textPrimary },
  cardTarget: { fontSize: FontSize.sm, color: Colors.textSecondary },
  metaRow: { flexDirection: "row", gap: Spacing.lg },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: FontSize.xs, color: Colors.textMuted },
  metaTextGreen: { fontSize: FontSize.xs, color: Colors.limeAccent, fontWeight: "600" },
});
