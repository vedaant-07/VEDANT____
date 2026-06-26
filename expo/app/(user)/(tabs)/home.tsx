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
  Bell,
  Flame,
  Droplets,
  Footprints,
  Moon,
  Scale,
  Sparkles,
  Dumbbell,
  Brain,
  Utensils,
  Camera,
  MessageCircle,
  ChevronRight,
  Zap,
  TrendingUp,
  Trophy,
} from "lucide-react-native";
import type { User } from "../../../src/api/types";
import { useAuth } from "../../../src/hooks/useAuth";
import { GlassCard } from "../../../src/components/GlassCard";
import { GradientButton } from "../../../src/components/GradientButton";
import { MOCK_TRACKING, AI_PROMPTS } from "../../../src/mock/dashboardData";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";
import { useState } from "react";

export default function UserHomeScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const firstName = (user as User)?.fullName?.split(" ")[0] || "Vedant";

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.neonGreen}
            colors={[Colors.neonGreen]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getTimeGreeting()}, {firstName} 👋
            </Text>
            <Text style={styles.subGreeting}>Let's crush it today!</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/(user)/subscription")}
            >
              <Sparkles size={20} color={Colors.neonGreen} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/(user)/profile")}
            >
              <Bell size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Stats Grid */}
        <Text style={styles.sectionTitle}>Today's Fitness</Text>
        <View style={styles.statsGrid}>
          <StatCard
            icon={<Flame size={20} color="#FF6B35" />}
            label="Calories"
            value={MOCK_TRACKING.calories}
            goal={MOCK_TRACKING.calorieGoal}
            unit="kcal"
            color="#FF6B35"
          />
          <StatCard
            icon={<Droplets size={20} color="#4FC3F7" />}
            label="Water"
            value={MOCK_TRACKING.water}
            goal={MOCK_TRACKING.waterGoal}
            unit="ml"
            color="#4FC3F7"
          />
          <StatCard
            icon={<Footprints size={20} color="#81C784" />}
            label="Steps"
            value={MOCK_TRACKING.steps}
            goal={MOCK_TRACKING.stepGoal}
            unit=""
            color="#81C784"
          />
          <StatCard
            icon={<Moon size={20} color="#9575CD" />}
            label="Sleep"
            value={MOCK_TRACKING.sleep}
            goal={MOCK_TRACKING.sleepGoal}
            unit="hrs"
            color="#9575CD"
          />
        </View>

        {/* Let's Go Card */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(user)/(tabs)/workout")}
        >
          <GlassCard glow style={styles.letsGoCard}>
            <View style={styles.letsGoContent}>
              <Zap size={28} color={Colors.neonGreen} />
              <View style={styles.letsGoText}>
                <Text style={styles.letsGoTitle}>Let's Go!</Text>
                <Text style={styles.letsGoSub}>
                  Push Day — Chest & Triceps is ready
                </Text>
              </View>
              <View style={styles.letsGoBadge}>
                <Text style={styles.letsGoBadgeText}>45 min</Text>
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <QuickAction
            icon={<Brain size={22} color={Colors.neonGreen} />}
            label="AI Trainer"
            onPress={() => router.push("/(user)/(tabs)/ai-trainer")}
          />
          <QuickAction
            icon={<Dumbbell size={22} color={Colors.neonGreen} />}
            label="Workout"
            onPress={() => router.push("/(user)/(tabs)/workout")}
          />
          <QuickAction
            icon={<Utensils size={22} color={Colors.neonGreen} />}
            label="Nutrition"
            onPress={() => router.push("/(user)/nutrition")}
          />
          <QuickAction
            icon={<Camera size={22} color={Colors.neonGreen} />}
            label="Food Scan"
            onPress={() => router.push("/(user)/food-scan")}
          />
          <QuickAction
            icon={<TrendingUp size={22} color={Colors.neonGreen} />}
            label="Tracking"
            onPress={() => router.push("/(user)/(tabs)/track")}
          />
          <QuickAction
            icon={<Trophy size={22} color={Colors.neonGreen} />}
            label="Challenges"
            onPress={() => router.push("/(user)/(tabs)/challenges")}
          />
        </View>

        {/* AI Recommendation Card */}
        <GlassCard glow style={styles.aiCard}>
          <View style={styles.aiCardContent}>
            <View style={styles.aiCardHeader}>
              <Sparkles size={20} color={Colors.neonGreen} />
              <Text style={styles.aiCardTitle}>AI Recommendation</Text>
            </View>
            <Text style={styles.aiCardText}>
              Based on your progress, try increasing protein intake to 150g and
              add 10 min cardio post-workout.
            </Text>
            <TouchableOpacity
              style={styles.aiCardButton}
              onPress={() => router.push("/(user)/(tabs)/ai-trainer")}
            >
              <MessageCircle size={14} color={Colors.textInverse} />
              <Text style={styles.aiCardButtonText}>Ask AI Coach</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Unlock Premium */}
        <GlassCard style={styles.premiumCard}>
          <View style={styles.premiumContent}>
            <View style={styles.premiumBadge}>
              <Sparkles size={16} color={Colors.neonGreen} />
              <Text style={styles.premiumBadgeText}>PREMIUM</Text>
            </View>
            <Text style={styles.premiumTitle}>
              Unlock Full AI Trainer & Premium Features
            </Text>
            <Text style={styles.premiumSub}>
              Get personalized workout plans, food scanning, and more.
            </Text>
            <GradientButton
              title="Upgrade from ₹499/mo"
              onPress={() => router.push("/(user)/subscription")}
            />
          </View>
        </GlassCard>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

function StatCard({
  icon,
  label,
  value,
  goal,
  unit,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  goal: number;
  unit: string;
  color: string;
}) {
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <GlassCard padding={Spacing.sm + 4} style={styles.statCard}>
      {icon}
      <Text style={styles.statValue}>
        {value}
        {unit ? <Text style={styles.statUnit}> {unit}</Text> : null}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarBg}>
        <View
          style={[styles.statBarFill, { width: `${pct}%`, backgroundColor: color }]}
        />
      </View>
    </GlassCard>
  );
}

function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.quickAction} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.quickActionIcon}>{icon}</View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  subGreeting: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    width: "47%",
    gap: 4,
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  statUnit: {
    fontSize: FontSize.xs,
    fontWeight: "500",
    color: Colors.textMuted,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  statBarBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.divider,
    marginTop: 4,
  },
  statBarFill: {
    height: 4,
    borderRadius: 2,
  },
  letsGoCard: {
    marginBottom: Spacing.lg,
  },
  letsGoContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  letsGoText: {
    flex: 1,
  },
  letsGoTitle: {
    fontSize: FontSize.xl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  letsGoSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  letsGoBadge: {
    backgroundColor: Colors.neonGreenGlow,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  letsGoBadgeText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.neonGreen,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  quickAction: {
    width: "30%",
    alignItems: "center",
    gap: Spacing.xs,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  quickActionLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: "500",
    textAlign: "center",
  },
  aiCard: {
    marginBottom: Spacing.md,
  },
  aiCardContent: {
    gap: Spacing.sm,
  },
  aiCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  aiCardTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  aiCardText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  aiCardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.neonGreen,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    alignSelf: "flex-start",
    gap: Spacing.xs,
  },
  aiCardButtonText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.textInverse,
  },
  premiumCard: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.neonGreenDim + "30",
  },
  premiumContent: {
    gap: Spacing.sm,
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.neonGreenGlow,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    alignSelf: "flex-start",
  },
  premiumBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.neonGreen,
  },
  premiumTitle: {
    fontSize: FontSize.lg,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  premiumSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
});
