import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Utensils,
  Plus,
  Flame,
  Beef,
  Wheat,
  Droplets,
  ChevronRight,
  Coffee,
  Sun,
  UtensilsCrossed,
  Moon,
  Cookie,
} from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { INDIAN_MEALS } from "../../src/mock/dashboardData";
import { MOCK_TRACKING } from "../../src/mock/dashboardData";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

const MEAL_ICONS: Record<string, React.ReactNode> = {
  breakfast: <Coffee size={16} color="#FFB74D" />,
  lunch: <Sun size={16} color="#FF6B35" />,
  dinner: <Moon size={16} color="#9575CD" />,
  snack: <Cookie size={16} color="#81C784" />,
};

export default function NutritionScreen() {
  const [selectedMeals, setSelectedMeals] = useState<Set<string>>(new Set());

  const toggleMeal = (mealName: string) => {
    setSelectedMeals((prev) => {
      const next = new Set(prev);
      if (next.has(mealName)) next.delete(mealName);
      else next.add(mealName);
      return next;
    });
  };

  const totalSelected = Array.from(selectedMeals).reduce((acc, name) => {
    const meal = INDIAN_MEALS.find((m) => m.name === name);
    if (!meal) return acc;
    return {
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

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

        <Text style={styles.title}>Nutrition</Text>
        <Text style={styles.subtitle}>Track your daily meals</Text>

        {/* Macro Summary */}
        <GlassCard glow style={styles.macroCard}>
          <View style={styles.macroGrid}>
            <MacroItem icon={<Flame size={18} color="#FF6B35" />} label="Calories" value={totalSelected.calories} goal={MOCK_TRACKING.calorieGoal} unit="kcal" color="#FF6B35" />
            <MacroItem icon={<Beef size={18} color="#E57373" />} label="Protein" value={totalSelected.protein} goal={150} unit="g" color="#E57373" />
            <MacroItem icon={<Wheat size={18} color="#FFB74D" />} label="Carbs" value={totalSelected.carbs} goal={250} unit="g" color="#FFB74D" />
            <MacroItem icon={<Droplets size={18} color="#4FC3F7" />} label="Water" value={MOCK_TRACKING.water} goal={MOCK_TRACKING.waterGoal} unit="ml" color="#4FC3F7" />
          </View>
        </GlassCard>

        {/* Meal Sections */}
        {(["breakfast", "lunch", "snack", "dinner"] as const).map((mealType) => {
          const mealsOfType = INDIAN_MEALS.filter((m) => m.type === mealType);
          return (
            <View key={mealType} style={styles.mealSection}>
              <View style={styles.mealTypeHeader}>
                {MEAL_ICONS[mealType]}
                <Text style={styles.mealTypeLabel}>
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </Text>
                <TouchableOpacity style={styles.addMealButton}>
                  <Plus size={14} color={Colors.neonGreen} />
                  <Text style={styles.addMealText}>Add</Text>
                </TouchableOpacity>
              </View>

              {mealsOfType.map((meal) => (
                <TouchableOpacity
                  key={meal.name}
                  activeOpacity={0.7}
                  onPress={() => toggleMeal(meal.name)}
                >
                  <GlassCard
                    padding={Spacing.md}
                    style={[
                      styles.mealCard,
                      selectedMeals.has(meal.name) && styles.mealCardSelected,
                    ]}
                  >
                    <View style={styles.mealRow}>
                      <View style={styles.mealInfo}>
                        <Text style={styles.mealName}>{meal.name}</Text>
                        <Text style={styles.mealMacros}>
                          {meal.calories} kcal • P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.mealCheck,
                          selectedMeals.has(meal.name) && styles.mealCheckSelected,
                        ]}
                      >
                        {selectedMeals.has(meal.name) && (
                          <Text style={styles.mealCheckText}>✓</Text>
                        )}
                      </View>
                    </View>
                  </GlassCard>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

function MacroItem({
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
    <View style={macroStyles.macroItem}>
      {icon}
      <Text style={macroStyles.macroValue}>
        {value}
        <Text style={macroStyles.macroUnit}>/{goal}{unit}</Text>
      </Text>
      <Text style={macroStyles.macroLabel}>{label}</Text>
      <View style={macroStyles.macroBar}>
        <View style={[macroStyles.macroFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const macroStyles = StyleSheet.create({
  macroItem: {
    width: "47%",
    alignItems: "center",
    gap: 4,
    marginBottom: Spacing.sm,
  },
  macroValue: {
    fontSize: FontSize.lg,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  macroUnit: {
    fontSize: FontSize.xs,
    fontWeight: "500",
    color: Colors.textMuted,
  },
  macroLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  macroBar: {
    width: "100%",
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.divider,
  },
  macroFill: {
    height: 3,
    borderRadius: 2,
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
  macroCard: {
    marginBottom: Spacing.lg,
  },
  macroGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  mealSection: {
    marginBottom: Spacing.lg,
  },
  mealTypeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  mealTypeLabel: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    flex: 1,
  },
  addMealButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  addMealText: {
    fontSize: FontSize.sm,
    color: Colors.neonGreen,
    fontWeight: "600",
  },
  mealCard: {
    marginBottom: Spacing.xs,
  },
  mealCardSelected: {
    borderColor: Colors.neonGreenDim,
    backgroundColor: Colors.neonGreenGlow,
  },
  mealRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  mealMacros: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  mealCheck: {
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: Colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  mealCheckSelected: {
    borderColor: Colors.neonGreen,
    backgroundColor: Colors.neonGreen,
  },
  mealCheckText: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: "800",
  },
});
