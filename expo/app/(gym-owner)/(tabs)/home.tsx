import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Building2,
  IndianRupee,
  Users,
  UserPlus,
  QrCode,
  Bell,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react-native";
import { useAuth } from "../../../src/hooks/useAuth";
import { GlassCard } from "../../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";
import { useState } from "react";

export default function OwnerDashboardScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const gymName = (user as any)?.gym?.name || "Iron Paradise Gym";
  const stats = {
    monthlyRevenue: 48500,
    totalMembers: 127,
    newLeads: 14,
    todayCheckins: 38,
  };

  const features = [
    { icon: <Building2 size={18} color={Colors.limeAccent} />, label: "Gym Profile", route: "/(gym-owner)/gym-profile" },
    { icon: <QrCode size={18} color={Colors.limeAccent} />, label: "Equipment", route: "/(gym-owner)/equipment" },
    { icon: <Users size={18} color={Colors.limeAccent} />, label: "Challenges", route: "/(gym-owner)/owner-challenges" },
    { icon: <Bell size={18} color={Colors.limeAccent} />, label: "Announcements", route: "/(gym-owner)/announcements" },
    { icon: <UserPlus size={18} color={Colors.limeAccent} />, label: "Promotions", route: "/(gym-owner)/promotions" },
    { icon: <IndianRupee size={18} color={Colors.limeAccent} />, label: "Rewards", route: "/(gym-owner)/owner-rewards" },
    { icon: <Building2 size={18} color={Colors.limeAccent} />, label: "Reviews", route: "/(gym-owner)/reviews" },
    { icon: <Users size={18} color={Colors.limeAccent} />, label: "Referrals", route: "/(gym-owner)/referrals" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }}
            tintColor={Colors.limeAccent}
            colors={[Colors.limeAccent]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>My Gym</Text>
            <Text style={styles.gymName}>{gymName}</Text>
          </View>
          <TouchableOpacity style={styles.notifyButton}>
            <Bell size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <RevenueCard
            icon={<IndianRupee size={18} color={Colors.limeAccent} />}
            label="Monthly Revenue"
            value={`₹${(stats.monthlyRevenue / 1000).toFixed(1)}K`}
            trend="+12%"
          />
          <StatBox
            icon={<Users size={18} color="#4FC3F7" />}
            label="Total Members"
            value={stats.totalMembers}
            color="#4FC3F7"
          />
          <StatBox
            icon={<UserPlus size={18} color="#FFB74D" />}
            label="New Leads"
            value={stats.newLeads}
            color="#FFB74D"
          />
          <StatBox
            icon={<QrCode size={18} color="#81C784" />}
            label="Today Check-ins"
            value={stats.todayCheckins}
            color="#81C784"
          />
        </View>

        {/* Quick Action */}
        <Text style={styles.sectionTitle}>More Features</Text>
        <View style={styles.featuresGrid}>
          {features.map((f, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.featureCard}
              activeOpacity={0.7}
              onPress={() => router.push(f.route as any)}
            >
              <GlassCard padding={Spacing.md} style={styles.featureInner}>
                <View style={styles.featureIcon}>{f.icon}</View>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Members */}
        <Text style={styles.sectionTitle}>Recent Members</Text>
        {["Rahul Mehta", "Priya Sharma", "Ankit Patel"].map((name, idx) => (
          <GlassCard key={idx} padding={Spacing.md} style={{ marginBottom: Spacing.xs }}>
            <View style={styles.memberRow}>
              <View style={styles.memberAvatar}>
                <Users size={16} color={Colors.textSecondary} />
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{name}</Text>
                <Text style={styles.memberDate}>Joined 2 days ago</Text>
              </View>
              <ChevronRight size={16} color={Colors.textMuted} />
            </View>
          </GlassCard>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

function RevenueCard({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) {
  return (
    <GlassCard glow padding={Spacing.md} style={revenueStyles.card}>
      <View style={revenueStyles.header}>
        <Text style={revenueStyles.label}>{label}</Text>
        {icon}
      </View>
      <Text style={revenueStyles.value}>{value}</Text>
      <View style={revenueStyles.trendRow}>
        <ArrowUpRight size={12} color={Colors.success} />
        <Text style={revenueStyles.trend}>{trend} from last month</Text>
      </View>
    </GlassCard>
  );
}

const revenueStyles = StyleSheet.create({
  card: { width: "48%" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: Spacing.xs },
  label: { fontSize: FontSize.xs, color: Colors.textSecondary },
  value: { fontSize: FontSize.xxl, fontWeight: "800", color: Colors.textPrimary, marginBottom: 2 },
  trendRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  trend: { fontSize: FontSize.xs, color: Colors.success },
});

function StatBox({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <GlassCard padding={Spacing.sm + 4} style={statStyles.box}>
      <View style={[statStyles.iconBox, { backgroundColor: color + "20" }]}>{icon}</View>
      <Text style={statStyles.value}>{value}</Text>
      <Text style={statStyles.label}>{label}</Text>
    </GlassCard>
  );
}

const statStyles = StyleSheet.create({
  box: { width: "48%", alignItems: "center", gap: 6 },
  iconBox: { width: 36, height: 36, borderRadius: Radius.md, alignItems: "center", justifyContent: "center" },
  value: { fontSize: FontSize.xl, fontWeight: "800", color: Colors.textPrimary },
  label: { fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: "center" },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingTop: 60, paddingBottom: 100, paddingHorizontal: Spacing.lg },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: Spacing.lg },
  heading: { fontSize: FontSize.sm, color: Colors.textMuted, textTransform: "uppercase", letterSpacing: 1 },
  gymName: { fontSize: FontSize.xxl, fontWeight: "900", color: Colors.limeAccent },
  notifyButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surfaceElevated, alignItems: "center", justifyContent: "center" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm, marginBottom: Spacing.lg },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: "700", color: Colors.textPrimary, marginBottom: Spacing.md },
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm, marginBottom: Spacing.lg },
  featureCard: { width: "23%" },
  featureInner: { alignItems: "center", gap: Spacing.xs },
  featureIcon: { width: 36, height: 36, borderRadius: Radius.md, backgroundColor: Colors.limeAccent + "10", alignItems: "center", justifyContent: "center" },
  featureLabel: { fontSize: 9, color: Colors.textSecondary, textAlign: "center", fontWeight: "500" },
  memberRow: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  memberAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surface, alignItems: "center", justifyContent: "center" },
  memberInfo: { flex: 1 },
  memberName: { fontSize: FontSize.md, fontWeight: "600", color: Colors.textPrimary },
  memberDate: { fontSize: FontSize.xs, color: Colors.textMuted },
});
