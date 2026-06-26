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
  Play,
  Clock,
  Flame,
  ChevronRight,
  Dumbbell,
  Timer,
  ListOrdered,
  Check,
  History,
} from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { GradientButton } from "../../../src/components/GradientButton";
import { MOCK_TODAY_WORKOUT } from "../../../src/mock/dashboardData";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";
import { useState } from "react";

export default function WorkoutScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const workout = MOCK_TODAY_WORKOUT;

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
        {/* Header */}
        <Text style={styles.title}>Today's Workout</Text>

        {/* Plan Card */}
        <GlassCard glow style={styles.planCard}>
          <View style={styles.planHeader}>
            <View style={styles.planBadge}>
              <Dumbbell size={14} color={Colors.neonGreen} />
              <Text style={styles.planBadgeText}>{workout.difficulty.toUpperCase()}</Text>
            </View>
            <View style={styles.planMeta}>
              <View style={styles.metaItem}>
                <Clock size={14} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{workout.duration} min</Text>
              </View>
              <View style={styles.metaItem}>
                <ListOrdered size={14} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{workout.exercises.length} exercises</Text>
              </View>
            </View>
          </View>
          <Text style={styles.planName}>{workout.name}</Text>
          {workout.targetMuscle && (
            <Text style={styles.planTarget}>{workout.targetMuscle}</Text>
          )}
          <GradientButton
            title="Start Workout"
            onPress={() => router.push("/(user)/exercise/active")}
          />
        </GlassCard>

        {/* Exercise List */}
        <Text style={styles.sectionTitle}>Exercises</Text>
        {workout.exercises.map((we, idx) => (
          <TouchableOpacity
            key={we.exercise._id}
            activeOpacity={0.7}
            onPress={() => router.push(`/(user)/exercise/${we.exercise._id}`)}
          >
            <GlassCard style={styles.exerciseCard}>
              <View style={styles.exerciseRow}>
                <View style={styles.exerciseNum}>
                  <Text style={styles.exerciseNumText}>{idx + 1}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{we.exercise.name}</Text>
                  <Text style={styles.exerciseDetail}>
                    {we.sets} sets × {we.reps} reps • {we.restSeconds}s rest
                  </Text>
                  <Text style={styles.exerciseMuscle}>
                    {we.exercise.targetMuscle} • {we.exercise.equipment}
                  </Text>
                </View>
                <View style={styles.exerciseAction}>
                  <View style={[styles.exerciseStatus, we.completed && styles.exerciseComplete]}>
                    {we.completed ? (
                      <Check size={14} color={Colors.neonGreen} />
                    ) : (
                      <Play size={14} color={Colors.textMuted} />
                    )}
                  </View>
                  <ChevronRight size={16} color={Colors.textMuted} />
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        ))}

        {/* Exercise Library */}
        <Text style={styles.sectionTitle}>Exercise Library</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(user)/exercise-library")}
        >
          <GlassCard padding={Spacing.md}>
            <View style={styles.libraryRow}>
              <View style={styles.libraryIcon}>
                <Dumbbell size={20} color={Colors.neonGreen} />
              </View>
              <View style={styles.libraryInfo}>
                <Text style={styles.libraryTitle}>Browse All Exercises</Text>
                <Text style={styles.librarySub}>
                  11 exercises with video guides & form tips
                </Text>
              </View>
              <ChevronRight size={20} color={Colors.neonGreen} />
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* Workout History */}
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        <GlassCard padding={Spacing.md}>
          <View style={styles.historyEmpty}>
            <History size={28} color={Colors.textMuted} />
            <Text style={styles.historyEmptyTitle}>No workout history yet</Text>
            <Text style={styles.historyEmptySub}>
              Complete your first workout to see it here
            </Text>
          </View>
        </GlassCard>

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
    marginBottom: Spacing.lg,
  },
  planCard: {
    marginBottom: Spacing.lg,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.neonGreenGlow,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  planBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.neonGreen,
  },
  planMeta: {
    flexDirection: "row",
    gap: Spacing.md,
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
  planName: {
    fontSize: FontSize.xl,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  planTarget: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
  },
  exerciseCard: {
    marginBottom: Spacing.sm,
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  exerciseNum: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.neonGreenGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseNumText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.neonGreen,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  exerciseDetail: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  exerciseMuscle: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 1,
  },
  exerciseAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  exerciseStatus: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseComplete: {
    backgroundColor: Colors.neonGreenGlow,
  },
  libraryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  libraryIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.neonGreenGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  libraryInfo: {
    flex: 1,
  },
  libraryTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  librarySub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  historyEmpty: {
    alignItems: "center",
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  historyEmptyTitle: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  historyEmptySub: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
});
