import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronRight, Check, Timer, Play, Pause, X } from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { GradientButton } from "../../../src/components/GradientButton";
import { MOCK_TODAY_WORKOUT } from "../../../src/mock/dashboardData";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";

export default function ActiveWorkoutScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());
  const [workoutComplete, setWorkoutComplete] = useState(false);

  const workout = MOCK_TODAY_WORKOUT;
  const current = workout.exercises[activeIndex];

  const toggleSet = (setIndex: number) => {
    const key = `${activeIndex}-${setIndex}`;
    setCompletedSets((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const nextExercise = () => {
    if (activeIndex < workout.exercises.length - 1) {
      setActiveIndex(activeIndex + 1);
      setTimerRunning(false);
      setTimerSeconds(0);
    } else {
      setWorkoutComplete(true);
    }
  };

  const prevExercise = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setTimerRunning(false);
      setTimerSeconds(0);
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (workoutComplete) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.completeContainer}>
          <View style={styles.completeIcon}>
            <Check size={48} color={Colors.textInverse} />
          </View>
          <Text style={styles.completeTitle}>Workout Complete!</Text>
          <Text style={styles.completeSub}>
            Great job! You crushed {workout.name}
          </Text>
          <View style={styles.completeStats}>
            <View style={styles.completeStat}>
              <Text style={styles.completeStatValue}>{workout.duration}</Text>
              <Text style={styles.completeStatLabel}>Minutes</Text>
            </View>
            <View style={styles.completeStat}>
              <Text style={styles.completeStatValue}>{workout.exercises.length}</Text>
              <Text style={styles.completeStatLabel}>Exercises</Text>
            </View>
          </View>
          <GradientButton
            title="Done"
            onPress={() => router.back()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.progressText}>
            {activeIndex + 1}/{workout.exercises.length}
          </Text>
        </View>

        {/* Timer */}
        <GlassCard style={styles.timerCard}>
          <Text style={styles.timerLabel}>Rest Timer</Text>
          <Text style={styles.timerValue}>{formatTime(timerSeconds)}</Text>
          <Text style={styles.timerRest}>{current.restSeconds}s rest</Text>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={() => {
              if (timerRunning) setTimerRunning(false);
              else {
                setTimerRunning(true);
                setTimerSeconds(current.restSeconds);
              }
            }}
          >
            {timerRunning ? (
              <Pause size={24} color={Colors.textInverse} />
            ) : (
              <Play size={24} color={Colors.textInverse} />
            )}
          </TouchableOpacity>
        </GlassCard>

        {/* Current Exercise */}
        <ScrollView style={styles.exerciseScroll} contentContainerStyle={styles.exerciseContent}>
          <Text style={styles.currentLabel}>CURRENT EXERCISE</Text>
          <Text style={styles.currentName}>{current.exercise.name}</Text>
          <Text style={styles.currentDetail}>
            {current.sets} sets × {current.reps} reps • {current.restSeconds}s rest
          </Text>

          {/* Set Tracking */}
          <Text style={styles.setsLabel}>Sets</Text>
          <View style={styles.setsGrid}>
            {Array.from({ length: current.sets }).map((_, idx) => {
              const key = `${activeIndex}-${idx}`;
              const isCompleted = completedSets.has(key);
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.setButton, isCompleted && styles.setCompleted]}
                  onPress={() => toggleSet(idx)}
                >
                  <Text
                    style={[
                      styles.setButtonText,
                      isCompleted && styles.setButtonTextCompleted,
                    ]}
                  >
                    {isCompleted ? "✓" : `Set ${idx + 1}`}
                  </Text>
                  <Text
                    style={[
                      styles.setReps,
                      isCompleted && styles.setRepsCompleted,
                    ]}
                  >
                    {current.reps} reps
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Navigation */}
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.navButton, activeIndex === 0 && styles.navDisabled]}
              onPress={prevExercise}
              disabled={activeIndex === 0}
            >
              <Text style={styles.navText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navButton, styles.navNext]}
              onPress={nextExercise}
            >
              <Text style={[styles.navText, styles.navNextText]}>
                {activeIndex < workout.exercises.length - 1 ? "Next" : "Finish"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  workoutName: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  progressText: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.neonGreen,
  },
  timerCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    alignItems: "center",
    paddingVertical: Spacing.lg,
  },
  timerLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  timerValue: {
    fontSize: 56,
    fontWeight: "900",
    color: Colors.neonGreen,
    fontVariant: ["tabular-nums"],
    marginBottom: 2,
  },
  timerRest: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  timerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.neonGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseScroll: {
    flex: 1,
  },
  exerciseContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  currentLabel: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.neonGreen,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  currentName: {
    fontSize: FontSize.xxl,
    fontWeight: "900",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  currentDetail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  setsLabel: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  setsGrid: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  setButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.md,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  setCompleted: {
    borderColor: Colors.neonGreenDim,
    backgroundColor: Colors.neonGreenGlow,
  },
  setButtonText: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  setButtonTextCompleted: {
    color: Colors.neonGreen,
  },
  setReps: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  setRepsCompleted: {
    color: Colors.neonGreen,
  },
  navRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  navDisabled: {
    opacity: 0.4,
  },
  navNext: {
    backgroundColor: Colors.neonGreen,
    borderColor: Colors.neonGreen,
  },
  navText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  navNextText: {
    color: Colors.textInverse,
  },
  completeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  completeIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.neonGreen,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  completeTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: "900",
    color: Colors.textPrimary,
  },
  completeSub: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  completeStats: {
    flexDirection: "row",
    gap: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  completeStat: {
    alignItems: "center",
  },
  completeStatValue: {
    fontSize: FontSize.xxxl,
    fontWeight: "900",
    color: Colors.neonGreen,
  },
  completeStatLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
