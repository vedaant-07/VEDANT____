import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronRight, Search, Filter, Dumbbell, Target, Play } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { exerciseService, EXERCISE_LIBRARY } from "../../src/services/exerciseService";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

type FilterType = "all" | "beginner" | "intermediate" | "advanced";

export default function ExerciseLibraryScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  let exercises = query
    ? exerciseService.search(query)
    : EXERCISE_LIBRARY;

  if (filter !== "all") {
    exercises = exercises.filter((ex) => ex.difficulty === filter);
  }

  const filters: FilterType[] = ["all", "beginner", "intermediate", "advanced"];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.fixedHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronRight
              size={20}
              color={Colors.textSecondary}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Exercise Library</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={16} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise._id}
            activeOpacity={0.7}
            onPress={() => router.push(`/(user)/exercise/${exercise._id}`)}
          >
            <GlassCard padding={Spacing.md} style={styles.exerciseCard}>
              <View style={styles.exerciseRow}>
                <View style={styles.exerciseIcon}>
                  <Dumbbell size={20} color={Colors.neonGreen} />
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseMuscle}>{exercise.targetMuscle}</Text>
                  <View style={styles.exerciseMeta}>
                    <View style={styles.metaTag}>
                      <Target size={10} color={Colors.textMuted} />
                      <Text style={styles.metaText}>{exercise.equipment}</Text>
                    </View>
                    <View style={styles.metaTag}>
                      <Text style={styles.metaText}>{exercise.sets}×{exercise.reps}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.exerciseRight}>
                  <View style={[styles.diffBadge, 
                    exercise.difficulty === "beginner" ? styles.diffBeginner :
                    exercise.difficulty === "intermediate" ? styles.diffIntermediate :
                    styles.diffAdvanced
                  ]}>
                    <Text style={styles.diffText}>{exercise.difficulty[0].toUpperCase()}</Text>
                  </View>
                  {exercise.contentStatus === "ready" && (
                    <Play size={14} color={Colors.neonGreen} />
                  )}
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        ))}

        {exercises.length === 0 && (
          <View style={styles.emptyState}>
            <Filter size={32} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No exercises found</Text>
            <Text style={styles.emptySub}>Try a different search or filter</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fixedHeader: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    paddingVertical: 10,
    marginLeft: Spacing.sm,
  },
  filterRow: {
    marginBottom: Spacing.xs,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginRight: Spacing.sm,
  },
  filterChipActive: {
    backgroundColor: Colors.neonGreenGlow,
    borderColor: Colors.neonGreenDim,
  },
  filterText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  filterTextActive: {
    color: Colors.neonGreen,
    fontWeight: "600",
  },
  scroll: {
    padding: Spacing.lg,
  },
  exerciseCard: {
    marginBottom: Spacing.sm,
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  exerciseIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.neonGreenGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  exerciseMuscle: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  exerciseMeta: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: 4,
  },
  metaTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  metaText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  exerciseRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  diffBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  diffBeginner: { backgroundColor: "#81C784" + "30" },
  diffIntermediate: { backgroundColor: "#FFB74D" + "30" },
  diffAdvanced: { backgroundColor: "#E57373" + "30" },
  diffText: {
    fontSize: 10,
    fontWeight: "800",
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  emptyTitle: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  emptySub: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
});
