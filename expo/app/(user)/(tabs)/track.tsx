import { useState } from "react";
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
  Droplets,
  Footprints,
  Flame,
  Moon,
  Scale,
  TrendingUp,
  Plus,
  Minus,
} from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { MOCK_TRACKING } from "../../../src/mock/dashboardData";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";

export default function TrackingScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [water, setWater] = useState(MOCK_TRACKING.water);
  const [steps, setSteps] = useState(MOCK_TRACKING.steps);
  const [weight, setWeight] = useState(MOCK_TRACKING.weight);

  const addWater = () => setWater((w) => Math.min(w + 300, MOCK_TRACKING.waterGoal));
  const addSteps = () => setSteps((s) => s + 500);

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
        <Text style={styles.title}>Tracking</Text>
        <Text style={styles.subtitle}>Monitor your daily progress</Text>

        {/* Water */}
        <GlassCard glow style={styles.trackCard}>
          <View style={styles.trackHeader}>
            <View style={styles.trackIconRow}>
              <View style={[styles.trackIcon, { backgroundColor: "#4FC3F7" + "20" }]}>
                <Droplets size={20} color="#4FC3F7" />
              </View>
              <Text style={styles.trackLabel}>Water Intake</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addWater}>
              <Plus size={16} color={Colors.textInverse} />
            </TouchableOpacity>
          </View>
          <View style={styles.trackProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((water / MOCK_TRACKING.waterGoal) * 100, 100)}%`,
                    backgroundColor: "#4FC3F7",
                  },
                ]}
              />
            </View>
            <Text style={styles.trackValue}>
              {water} ml
              <Text style={styles.trackGoal}> / {MOCK_TRACKING.waterGoal} ml</Text>
            </Text>
          </View>
          <Text style={styles.trackTip}>
            {water < MOCK_TRACKING.waterGoal
              ? `Drink ${MOCK_TRACKING.waterGoal - water}ml more to hit your goal`
              : "Great job! You've hit your water goal 🎉"}
          </Text>
        </GlassCard>

        {/* Steps */}
        <GlassCard glow style={styles.trackCard}>
          <View style={styles.trackHeader}>
            <View style={styles.trackIconRow}>
              <View style={[styles.trackIcon, { backgroundColor: "#81C784" + "20" }]}>
                <Footprints size={20} color="#81C784" />
              </View>
              <Text style={styles.trackLabel}>Steps</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addSteps}>
              <Plus size={16} color={Colors.textInverse} />
            </TouchableOpacity>
          </View>
          <View style={styles.trackProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((steps / MOCK_TRACKING.stepGoal) * 100, 100)}%`,
                    backgroundColor: "#81C784",
                  },
                ]}
              />
            </View>
            <Text style={styles.trackValue}>
              {steps.toLocaleString()}
              <Text style={styles.trackGoal}> / {MOCK_TRACKING.stepGoal.toLocaleString()}</Text>
            </Text>
          </View>
          <Text style={styles.trackTip}>
            {steps < MOCK_TRACKING.stepGoal
              ? `${MOCK_TRACKING.stepGoal - steps} more steps to go`
              : "Amazing! Step goal achieved 🏆"}
          </Text>
        </GlassCard>

        {/* Calories */}
        <GlassCard style={styles.trackCard}>
          <View style={styles.trackHeader}>
            <View style={styles.trackIconRow}>
              <View style={[styles.trackIcon, { backgroundColor: "#FF6B35" + "20" }]}>
                <Flame size={20} color="#FF6B35" />
              </View>
              <Text style={styles.trackLabel}>Calories</Text>
            </View>
          </View>
          <View style={styles.trackProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((MOCK_TRACKING.calories / MOCK_TRACKING.calorieGoal) * 100, 100)}%`,
                    backgroundColor: "#FF6B35",
                  },
                ]}
              />
            </View>
            <Text style={styles.trackValue}>
              {MOCK_TRACKING.calories}
              <Text style={styles.trackGoal}> / {MOCK_TRACKING.calorieGoal} kcal</Text>
            </Text>
          </View>
        </GlassCard>

        {/* Sleep */}
        <GlassCard style={styles.trackCard}>
          <View style={styles.trackHeader}>
            <View style={styles.trackIconRow}>
              <View style={[styles.trackIcon, { backgroundColor: "#9575CD" + "20" }]}>
                <Moon size={20} color="#9575CD" />
              </View>
              <Text style={styles.trackLabel}>Sleep</Text>
            </View>
          </View>
          <View style={styles.trackProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((MOCK_TRACKING.sleep / MOCK_TRACKING.sleepGoal) * 100, 100)}%`,
                    backgroundColor: "#9575CD",
                  },
                ]}
              />
            </View>
            <Text style={styles.trackValue}>
              {MOCK_TRACKING.sleep} hrs
              <Text style={styles.trackGoal}> / {MOCK_TRACKING.sleepGoal} hrs</Text>
            </Text>
          </View>
        </GlassCard>

        {/* Weight */}
        <GlassCard style={styles.trackCard}>
          <View style={styles.trackHeader}>
            <View style={styles.trackIconRow}>
              <View style={[styles.trackIcon, { backgroundColor: Colors.neonGreen + "20" }]}>
                <Scale size={20} color={Colors.neonGreen} />
              </View>
              <Text style={styles.trackLabel}>Weight</Text>
            </View>
            <View style={styles.weightControls}>
              <TouchableOpacity
                style={styles.weightBtn}
                onPress={() => setWeight((w) => +(w - 0.1).toFixed(1))}
              >
                <Minus size={14} color={Colors.textSecondary} />
              </TouchableOpacity>
              <Text style={styles.weightValue}>{weight} kg</Text>
              <TouchableOpacity
                style={styles.weightBtn}
                onPress={() => setWeight((w) => +(w + 0.1).toFixed(1))}
              >
                <Plus size={14} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.trackProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((weight / MOCK_TRACKING.weightGoal) * 100, 100)}%`,
                    backgroundColor: Colors.neonGreen,
                  },
                ]}
              />
            </View>
            <Text style={styles.trackValue}>
              Goal: {MOCK_TRACKING.weightGoal} kg
              <Text style={styles.trackGoal}>
                {" "}
                ({(weight - MOCK_TRACKING.weightGoal).toFixed(1)} kg to go)
              </Text>
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
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  trackCard: {
    marginBottom: Spacing.md,
  },
  trackHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  trackIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  trackIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  trackLabel: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.neonGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  trackProgress: {
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.divider,
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  trackValue: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  trackGoal: {
    fontSize: FontSize.sm,
    fontWeight: "500",
    color: Colors.textMuted,
  },
  trackTip: {
    fontSize: FontSize.xs,
    color: Colors.neonGreen,
    fontWeight: "500",
  },
  weightControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  weightBtn: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  weightValue: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
});
