import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Trophy,
  Flame,
  Footprints,
  Dumbbell,
  TrendingUp,
  Users,
  Timer,
  Star,
  ChevronRight,
} from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { MOCK_CHALLENGES } from "../../../src/mock/dashboardData";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";
import { useState } from "react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  workout: <Dumbbell size={16} color={Colors.neonGreen} />,
  steps: <Footprints size={16} color={Colors.neonGreen} />,
  weight_loss: <Flame size={16} color={Colors.neonGreen} />,
  muscle_gain: <Trophy size={16} color={Colors.neonGreen} />,
  nutrition: <TrendingUp size={16} color={Colors.neonGreen} />,
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "#81C784",
  intermediate: "#FFB74D",
  advanced: "#E57373",
};

export default function ChallengesScreen() {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 1000);
            }}
            tintColor={Colors.neonGreen}
            colors={[Colors.neonGreen]}
          />
        }
      >
        <Text style={styles.title}>Challenges</Text>
        <Text style={styles.subtitle}>Push your limits & earn rewards</Text>

        {/* Points Card */}
        <GlassCard glow style={styles.pointsCard}>
          <View style={styles.pointsRow}>
            <View style={styles.pointsIcon}>
              <Star size={24} color={Colors.neonGreen} />
            </View>
            <View>
              <Text style={styles.pointsValue}>1,250</Text>
              <Text style={styles.pointsLabel}>Points Balance</Text>
            </View>
            <TouchableOpacity style={styles.redeemButton}>
              <Text style={styles.redeemText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Challenge List */}
        {MOCK_CHALLENGES.map((challenge) => (
          <TouchableOpacity key={challenge._id} activeOpacity={0.7}>
            <GlassCard style={styles.challengeCard} padding={Spacing.md}>
              <View style={styles.challengeHeader}>
                <View style={styles.challengeCategory}>
                  {CATEGORY_ICONS[challenge.category] || <Star size={16} color={Colors.neonGreen} />}
                  <Text style={styles.challengeCategoryText}>
                    {challenge.category.replace("_", " ").toUpperCase()}
                  </Text>
                </View>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: DIFFICULTY_COLORS[challenge.difficulty] + "20" },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: DIFFICULTY_COLORS[challenge.difficulty] },
                    ]}
                  >
                    {challenge.difficulty.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDesc}>{challenge.description}</Text>

              <View style={styles.challengeMeta}>
                <View style={styles.metaItem}>
                  <Timer size={12} color={Colors.textSecondary} />
                  <Text style={styles.metaText}>{challenge.duration} days</Text>
                </View>
                <View style={styles.metaItem}>
                  <Users size={12} color={Colors.textSecondary} />
                  <Text style={styles.metaText}>
                    {challenge.participants.toLocaleString()} joined
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Star size={12} color={Colors.neonGreen} />
                  <Text style={styles.metaTextGreen}>
                    +{challenge.rewardPoints} pts
                  </Text>
                </View>
              </View>

              {/* Progress bar if joined */}
              {challenge.joined && challenge.progress !== undefined && (
                <View style={styles.progressSection}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${challenge.progress * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round(challenge.progress * 100)}% complete
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={[
                  styles.joinButton,
                  challenge.joined && styles.joinedButton,
                ]}
              >
                <Text
                  style={[
                    styles.joinButtonText,
                    challenge.joined && styles.joinedButtonText,
                  ]}
                >
                  {challenge.joined ? "Continue" : "Join Challenge"}
                </Text>
                <ChevronRight
                  size={16}
                  color={challenge.joined ? Colors.neonGreen : Colors.textInverse}
                />
              </TouchableOpacity>
            </GlassCard>
          </TouchableOpacity>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
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
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: "900",
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  pointsCard: {
    marginBottom: Spacing.lg,
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  pointsIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.neonGreenGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsValue: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  pointsLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  redeemButton: {
    marginLeft: "auto",
    backgroundColor: Colors.neonGreen,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  redeemText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.textInverse,
  },
  challengeCard: {
    marginBottom: Spacing.sm,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  challengeCategory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  challengeCategoryText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.neonGreen,
    letterSpacing: 1,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  difficultyText: {
    fontSize: 9,
    fontWeight: "800",
  },
  challengeTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  challengeDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  challengeMeta: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  metaTextGreen: {
    fontSize: FontSize.xs,
    color: Colors.neonGreen,
    fontWeight: "600",
  },
  progressSection: {
    marginBottom: Spacing.md,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.divider,
    marginBottom: 4,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.neonGreen,
  },
  progressText: {
    fontSize: FontSize.xs,
    color: Colors.neonGreen,
    fontWeight: "600",
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.neonGreen,
    paddingVertical: 10,
    borderRadius: Radius.md,
    gap: 4,
  },
  joinButtonText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textInverse,
  },
  joinedButton: {
    backgroundColor: Colors.neonGreenGlow,
  },
  joinedButtonText: {
    color: Colors.neonGreen,
  },
});
