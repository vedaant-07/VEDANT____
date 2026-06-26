import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { IndianRupee, TrendingUp, ArrowUpRight, ChevronRight } from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";

const MOCK_TRANSACTIONS = [
  { _id: "t1", memberName: "Rahul Mehta", planName: "Premium Monthly", amount: 499, date: "2026-06-01", status: "paid" as const },
  { _id: "t2", memberName: "Neha Gupta", planName: "Premium Annual", amount: 999, date: "2026-06-15", status: "paid" as const },
  { _id: "t3", memberName: "Priya Sharma", planName: "Basic Monthly", amount: 299, date: "2026-06-05", status: "paid" as const },
  { _id: "t4", memberName: "Ankit Patel", planName: "Premium Quarterly", amount: 749, date: "2026-05-10", status: "pending" as const },
];

export default function EarningsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState("monthly");

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }} tintColor={Colors.limeAccent} colors={[Colors.limeAccent]} />}
      >
        <Text style={styles.title}>Earnings</Text>

        {/* Summary */}
        <GlassCard glow style={styles.summaryCard}>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>₹48.5K</Text>
              <Text style={styles.summaryLabel}>This Month</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>₹312K</Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>₹46.2K</Text>
              <Text style={styles.summaryLabel}>Paid</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: Colors.warning }]}>₹2.3K</Text>
              <Text style={styles.summaryLabel}>Pending</Text>
            </View>
          </View>
        </GlassCard>

        {/* Period Filter */}
        <View style={styles.filterRow}>
          {["daily", "weekly", "monthly"].map((p) => (
            <TouchableOpacity key={p} style={[styles.filterChip, period === p && styles.filterChipActive]} onPress={() => setPeriod(p)}>
              <Text style={[styles.filterText, period === p && styles.filterTextActive]}>{p.charAt(0).toUpperCase() + p.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {MOCK_TRANSACTIONS.map((t) => (
          <GlassCard key={t._id} padding={Spacing.md} style={{ marginBottom: Spacing.xs }}>
            <View style={styles.txnRow}>
              <View style={[styles.txnStatus, { backgroundColor: t.status === "paid" ? Colors.success + "20" : Colors.warning + "20" }]}>
                <IndianRupee size={16} color={t.status === "paid" ? Colors.success : Colors.warning} />
              </View>
              <View style={styles.txnInfo}>
                <Text style={styles.txnName}>{t.memberName}</Text>
                <Text style={styles.txnPlan}>{t.planName}</Text>
              </View>
              <View style={styles.txnRight}>
                <Text style={styles.txnAmount}>₹{t.amount}</Text>
                <Text style={[styles.txnStatusText, { color: t.status === "paid" ? Colors.success : Colors.warning }]}>{t.status.toUpperCase()}</Text>
              </View>
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
  summaryCard: { marginBottom: Spacing.lg },
  summaryGrid: { flexDirection: "row", flexWrap: "wrap" },
  summaryItem: { width: "48%", alignItems: "center", paddingVertical: Spacing.sm },
  summaryDivider: { width: "100%", height: 1, backgroundColor: Colors.divider },
  summaryValue: { fontSize: FontSize.xxl, fontWeight: "800", color: Colors.textPrimary },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  filterRow: { flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.lg },
  filterChip: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: Radius.full, backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.cardBorder },
  filterChipActive: { backgroundColor: Colors.limeAccent + "20", borderColor: Colors.limeAccent + "60" },
  filterText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: "500" },
  filterTextActive: { color: Colors.limeAccent, fontWeight: "600" },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: "700", color: Colors.textPrimary, marginBottom: Spacing.md },
  txnRow: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  txnStatus: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  txnInfo: { flex: 1 },
  txnName: { fontSize: FontSize.md, fontWeight: "600", color: Colors.textPrimary },
  txnPlan: { fontSize: FontSize.xs, color: Colors.textMuted },
  txnRight: { alignItems: "flex-end" },
  txnAmount: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textPrimary },
  txnStatusText: { fontSize: FontSize.xs, fontWeight: "600" },
});
