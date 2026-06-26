import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ChevronRight,
  Play,
  Dumbbell,
  Timer,
  ListOrdered,
  Target,
  AlertTriangle,
  CheckCircle,
  Video,
} from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { GradientButton } from "../../../src/components/GradientButton";
import { exerciseService } from "../../../src/services/exerciseService";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = exerciseService.getById(id || "");

  if (!exercise) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Exercise not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.goBack}>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight
            size={20}
            color={Colors.textSecondary}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>

        {/* Video / Thumbnail placeholder */}
        <View style={styles.videoPlaceholder}>
          <View style={styles.videoOverlay}>
            <Video size={48} color={Colors.neonGreen} />
            <Text style={styles.videoText}>Video Coming Soon</Text>
          </View>
        </View>

        {/* Exercise Info Header */}
        <View style={styles.header}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Target size={12} color={Colors.neonGreen} />
              <Text style={styles.tagText}>{exercise.targetMuscle}</Text>
            </View>
            <View style={styles.tag}>
              <Dumbbell size={12} color={Colors.neonGreen} />
              <Text style={styles.tagText}>{exercise.equipment}</Text>
            </View>
            <View style={styles.difficultyTag}>
              <Text style={styles.difficultyText}>{exercise.difficulty.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Sets/Reps/Rest */}
        <GlassCard glow style={styles.statsCard}>
          <View style={styles.statsRow}>
            <StatItem
              icon={<ListOrdered size={18} color={Colors.neonGreen} />}
              label="Sets"
              value={exercise.sets}
            />
            <StatItem
              icon={<Dumbbell size={18} color={Colors.neonGreen} />}
              label="Reps"
              value={exercise.reps}
            />
            <StatItem
              icon={<Timer size={18} color={Colors.neonGreen} />}
              label="Rest"
              value={`${exercise.restSeconds}s`}
            />
          </View>
        </GlassCard>

        {/* Form Tips */}
        <Text style={styles.sectionTitle}>Form Tips</Text>
        {exercise.formTips.map((tip, idx) => (
          <View key={idx} style={styles.tipItem}>
            <CheckCircle size={16} color={Colors.neonGreen} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}

        {/* Common Mistakes */}
        <Text style={styles.sectionTitle}>Common Mistakes</Text>
        {exercise.commonMistakes.map((mistake, idx) => (
          <View key={idx} style={styles.mistakeItem}>
            <AlertTriangle size={16} color={Colors.warning} />
            <Text style={styles.mistakeText}>{mistake}</Text>
          </View>
        ))}

        {/* Video Guide Note */}
        <GlassCard padding={Spacing.md} style={styles.videoNoteCard}>
          <Play size={18} color={Colors.neonGreen} />
          <View style={styles.videoNoteContent}>
            <Text style={styles.videoNoteTitle}>Video Guide</Text>
            <Text style={styles.videoNoteText}>
              Admin is adding HD video guides. Check back soon for pro form demonstrations.
            </Text>
          </View>
        </GlassCard>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <View style={statStyles.item}>
      {icon}
      <Text style={statStyles.value}>{value}</Text>
      <Text style={statStyles.label}>{label}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  item: {
    alignItems: "center",
    gap: 4,
  },
  value: {
    fontSize: FontSize.xl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
  },
  notFoundText: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
  goBack: {
    fontSize: FontSize.md,
    color: Colors.neonGreen,
    fontWeight: "600",
  },
  videoPlaceholder: {
    height: 220,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  videoOverlay: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  videoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  exerciseName: {
    fontSize: FontSize.xxl,
    fontWeight: "900",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  tags: {
    flexDirection: "row",
    gap: Spacing.sm,
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  tagText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  difficultyTag: {
    backgroundColor: Colors.neonGreenGlow,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  difficultyText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.neonGreen,
  },
  statsCard: {
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  mistakeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  mistakeText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.warning,
    lineHeight: 20,
  },
  videoNoteCard: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg,
    backgroundColor: Colors.neonGreenGlow,
    borderColor: Colors.neonGreenDim + "60",
  },
  videoNoteContent: {
    flex: 1,
  },
  videoNoteTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  videoNoteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
