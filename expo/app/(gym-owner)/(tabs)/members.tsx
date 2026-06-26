import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, RefreshControl } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Users, Search, Plus, ChevronRight, Filter, IndianRupee } from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";

const MOCK_MEMBERS = [
  { _id: "m1", fullName: "Rahul Mehta", email: "rahul@email.com", membershipStatus: "active" as const, planName: "Premium Monthly", joinedAt: "2026-06-01", paymentStatus: "paid" as const, attendanceCount: 18 },
  { _id: "m2", fullName: "Priya Sharma", email: "priya@email.com", membershipStatus: "active" as const, planName: "Basic Monthly", joinedAt: "2026-05-15", paymentStatus: "paid" as const, attendanceCount: 12 },
  { _id: "m3", fullName: "Ankit Patel", email: "ankit@email.com", membershipStatus: "expired" as const, planName: "Premium Quarterly", joinedAt: "2026-03-10", paymentStatus: "overdue" as const, attendanceCount: 32 },
  { _id: "m4", fullName: "Neha Gupta", email: "neha@email.com", membershipStatus: "active" as const, planName: "Premium Annual", joinedAt: "2026-04-20", paymentStatus: "paid" as const, attendanceCount: 25 },
  { _id: "m5", fullName: "Vikram Singh", email: "vikram@email.com", membershipStatus: "pending" as const, planName: "Basic Monthly", joinedAt: "2026-06-18", paymentStatus: "pending" as const, attendanceCount: 0 },
];

export default function MembersScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_MEMBERS.filter((m) => {
    const matchQuery = m.fullName.toLowerCase().includes(query.toLowerCase()) || m.email.toLowerCase().includes(query.toLowerCase());
    const matchStatus = statusFilter === "all" || m.membershipStatus === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }} tintColor={Colors.limeAccent} colors={[Colors.limeAccent]} />}
      >
        <Text style={styles.title}>Members</Text>
        <View style={styles.searchContainer}>
          <Search size={16} color={Colors.textMuted} />
          <TextInput style={styles.searchInput} placeholder="Search members..." placeholderTextColor={Colors.textMuted} value={query} onChangeText={setQuery} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {["all", "active", "expired", "pending"].map((s) => (
            <TouchableOpacity key={s} style={[styles.filterChip, statusFilter === s && styles.filterChipActive]} onPress={() => setStatusFilter(s)}>
              <Text style={[styles.filterText, statusFilter === s && styles.filterTextActive]}>{s.charAt(0).toUpperCase() + s.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color={Colors.textInverse} /><Text style={styles.addText}>Add Member</Text>
        </TouchableOpacity>
        {filtered.map((m) => (
          <GlassCard key={m._id} padding={Spacing.md} style={{ marginBottom: Spacing.xs }}>
            <View style={styles.memberRow}>
              <View style={styles.avatar}><Users size={18} color={Colors.textSecondary} /></View>
              <View style={styles.info}>
                <Text style={styles.name}>{m.fullName}</Text>
                <Text style={styles.email}>{m.email}</Text>
                <View style={styles.tags}>
                  <View style={[styles.statusTag, m.membershipStatus === "active" ? styles.activeTag : m.membershipStatus === "expired" ? styles.expiredTag : styles.pendingTag]}>
                    <Text style={[styles.statusText, m.membershipStatus === "active" ? styles.activeText : m.membershipStatus === "expired" ? styles.expiredText : styles.pendingText]}>{m.membershipStatus.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.planText}>{m.planName}</Text>
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
  title: { fontSize: FontSize.xxxl, fontWeight: "900", color: Colors.limeAccent, marginBottom: Spacing.md },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: Colors.surfaceElevated, borderRadius: Radius.md, paddingHorizontal: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.cardBorder },
  searchInput: { flex: 1, fontSize: FontSize.md, color: Colors.textPrimary, paddingVertical: 10, marginLeft: Spacing.sm },
  filterRow: { marginBottom: Spacing.md },
  filterChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2, borderRadius: Radius.full, backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.cardBorder, marginRight: Spacing.sm },
  filterChipActive: { backgroundColor: Colors.limeAccent + "20", borderColor: Colors.limeAccent + "60" },
  filterText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: "500" },
  filterTextActive: { color: Colors.limeAccent, fontWeight: "600" },
  addButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.limeAccent, paddingVertical: 10, borderRadius: Radius.md, gap: Spacing.xs, marginBottom: Spacing.md },
  addText: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textInverse },
  memberRow: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  name: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textPrimary },
  email: { fontSize: FontSize.xs, color: Colors.textMuted },
  tags: { flexDirection: "row", alignItems: "center", gap: Spacing.sm, marginTop: 4 },
  statusTag: { paddingHorizontal: Spacing.sm, paddingVertical: 1, borderRadius: Radius.full },
  activeTag: { backgroundColor: Colors.success + "20" }, expiredTag: { backgroundColor: Colors.error + "20" }, pendingTag: { backgroundColor: Colors.warning + "20" },
  statusText: { fontSize: 9, fontWeight: "800" }, activeText: { color: Colors.success }, expiredText: { color: Colors.error }, pendingText: { color: Colors.warning },
  planText: { fontSize: FontSize.xs, color: Colors.textSecondary },
});
