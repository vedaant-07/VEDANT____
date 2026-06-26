import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Star, MessageCircle, ChevronRight } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

const MOCK_REVIEWS = [
  { userName: "Rahul M.", rating: 5, comment: "Best gym in the area! The trainers are amazing and equipment is always clean.", date: "2026-06-15", reply: "Thank you Rahul! We appreciate your support." },
  { userName: "Priya S.", rating: 4, comment: "Great atmosphere and good crowd. Would love more group classes though.", date: "2026-06-10" },
  { userName: "Ankit P.", rating: 5, comment: "Joined 3 months ago, already seeing amazing results. The AI trainer feature is a game changer!", date: "2026-06-05" },
];

export default function ReviewsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight size={20} color={Colors.textSecondary} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Reviews</Text>
        <GlassCard glow style={styles.ratingCard}>
          <Text style={styles.ratingBig}>4.8</Text>
          <View style={styles.starsRow}>{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={16} color={i < 4 ? "#FFB74D" : Colors.textMuted} fill={i < 4 ? "#FFB74D" : "none"} />))}</View>
          <Text style={styles.reviewCount}>Based on 124 reviews</Text>
        </GlassCard>
        {MOCK_REVIEWS.map((r, idx) => (
          <GlassCard key={idx} padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{r.userName}</Text>
              <View style={styles.starsRow}>{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={12} color={i < r.rating ? "#FFB74D" : Colors.textMuted} fill={i < r.rating ? "#FFB74D" : "none"} />))}</View>
            </View>
            <Text style={styles.comment}>{r.comment}</Text>
            <Text style={styles.date}>{r.date}</Text>
            {r.reply && (
              <View style={styles.replyBox}>
                <MessageCircle size={12} color={Colors.limeAccent} /><Text style={styles.replyText}>{r.reply}</Text>
              </View>
            )}
            {!r.reply && (
              <TouchableOpacity style={styles.replyButton}><MessageCircle size={12} color={Colors.limeAccent} /><Text style={styles.replyBtnText}>Reply</Text></TouchableOpacity>
            )}
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
  title: { fontSize: FontSize.xxxl, fontWeight: "900", color: Colors.limeAccent, marginBottom: Spacing.lg },
  ratingCard: { alignItems: "center", paddingVertical: Spacing.lg, marginBottom: Spacing.lg },
  ratingBig: { fontSize: 56, fontWeight: "900", color: "#FFB74D" },
  starsRow: { flexDirection: "row", gap: 2, marginVertical: Spacing.xs },
  reviewCount: { fontSize: FontSize.sm, color: Colors.textSecondary },
  reviewHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.sm },
  reviewerName: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textPrimary },
  comment: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.xs },
  date: { fontSize: FontSize.xs, color: Colors.textMuted, marginBottom: Spacing.sm },
  replyBox: { flexDirection: "row", gap: Spacing.sm, padding: Spacing.sm, backgroundColor: Colors.limeAccent + "08", borderRadius: Radius.sm, borderLeftWidth: 2, borderLeftColor: Colors.limeAccent },
  replyText: { fontSize: FontSize.sm, color: Colors.textSecondary, flex: 1 },
  replyButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  replyBtnText: { fontSize: FontSize.sm, color: Colors.limeAccent, fontWeight: "600" },
});
