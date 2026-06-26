import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { UserPlus, Phone, MessageCircle, ChevronRight, Calendar, Plus } from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";

const MOCK_LEADS = [
  { _id: "l1", name: "Arun Kumar", phone: "+91 9876543210", status: "new" as const, followUpDate: "2026-06-24", source: "Instagram" },
  { _id: "l2", name: "Sneha Reddy", phone: "+91 9988776655", status: "contacted" as const, followUpDate: "2026-06-23", source: "Walk-in" },
  { _id: "l3", name: "Deepak Joshi", phone: "+91 9123456780", status: "converted" as const, followUpDate: undefined, source: "Referral" },
  { _id: "l4", name: "Kavita Iyer", phone: "+91 9871122334", status: "new" as const, followUpDate: "2026-06-25", source: "Google" },
  { _id: "l5", name: "Mohit Agarwal", phone: "+91 9001122334", status: "lost" as const, followUpDate: undefined, source: "Facebook" },
];

const STATUS_COLORS: Record<string, string> = {
  new: "#4FC3F7", contacted: "#FFB74D", converted: Colors.success, lost: Colors.error,
};

export default function LeadsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }} tintColor={Colors.limeAccent} colors={[Colors.limeAccent]} />}
      >
        <Text style={styles.title}>Leads</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color={Colors.textInverse} /><Text style={styles.addText}>Add Lead</Text>
        </TouchableOpacity>
        {MOCK_LEADS.map((lead) => (
          <GlassCard key={lead._id} padding={Spacing.md} style={{ marginBottom: Spacing.xs }}>
            <View style={styles.leadRow}>
              <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[lead.status] }]} />
              <View style={styles.leadInfo}>
                <Text style={styles.leadName}>{lead.name}</Text>
                <Text style={styles.leadPhone}>{lead.phone}</Text>
                <View style={styles.leadTags}>
                  <View style={[styles.statusTag, { backgroundColor: STATUS_COLORS[lead.status] + "20" }]}>
                    <Text style={[styles.statusText, { color: STATUS_COLORS[lead.status] }]}>{lead.status.toUpperCase()}</Text>
                  </View>
                  {lead.followUpDate && (
                    <View style={styles.followTag}>
                      <Calendar size={10} color={Colors.textMuted} /><Text style={styles.followText}>Follow-up: {lead.followUpDate}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.leadActions}>
                <TouchableOpacity style={styles.actionIcon}><Phone size={16} color={Colors.limeAccent} /></TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}><MessageCircle size={16} color={Colors.success} /></TouchableOpacity>
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
  title: { fontSize: FontSize.xxxl, fontWeight: "900", color: Colors.limeAccent, marginBottom: Spacing.md },
  addButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.limeAccent, paddingVertical: 10, borderRadius: Radius.md, gap: Spacing.xs, marginBottom: Spacing.md },
  addText: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textInverse },
  leadRow: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  leadInfo: { flex: 1 },
  leadName: { fontSize: FontSize.md, fontWeight: "700", color: Colors.textPrimary },
  leadPhone: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 1 },
  leadTags: { flexDirection: "row", alignItems: "center", gap: Spacing.sm, marginTop: 4, flexWrap: "wrap" },
  statusTag: { paddingHorizontal: Spacing.sm, paddingVertical: 1, borderRadius: Radius.full },
  statusText: { fontSize: 9, fontWeight: "800" },
  followTag: { flexDirection: "row", alignItems: "center", gap: 2 },
  followText: { fontSize: 9, color: Colors.textMuted },
  leadActions: { flexDirection: "row", gap: Spacing.sm },
  actionIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.surfaceElevated, alignItems: "center", justifyContent: "center" },
});
