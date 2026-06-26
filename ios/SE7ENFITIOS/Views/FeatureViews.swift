import SwiftUI

// MARK: - Nutrition View

struct NutritionView: View {
    @State private var selectedMeal = "breakfast"

    let goals = NutritionGoals(calories: 2200, protein: 150, carbs: 250, fat: 65)

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: SE7ENSpacing.lg) {
                Text("Nutrition")
                    .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                    .foregroundStyle(SE7ENColors.textPrimary)
                    .padding(.top, 60)

                // Macro Goals
                GlassCard {
                    HStack(spacing: 0) {
                        MacroCircle(label: "Calories", current: 1250, goal: goals.calories, color: .orange)
                        Spacer()
                        MacroCircle(label: "Protein", current: 85, goal: goals.protein, color: SE7ENColors.neonGreen)
                        Spacer()
                        MacroCircle(label: "Carbs", current: 140, goal: goals.carbs, color: .blue)
                        Spacer()
                        MacroCircle(label: "Fat", current: 32, goal: goals.fat, color: .yellow)
                    }
                }

                // Meal Type Picker
                HStack(spacing: SE7ENSpacing.sm) {
                    ForEach(["breakfast", "lunch", "dinner", "snacks"], id: \.self) { meal in
                        Button {
                            selectedMeal = meal
                        } label: {
                            Text(meal.capitalized)
                                .font(.system(size: SE7ENFontSize.sm, weight: .semibold))
                                .foregroundStyle(selectedMeal == meal ? SE7ENColors.textInverse : SE7ENColors.textSecondary)
                                .padding(.horizontal, SE7ENSpacing.md)
                                .padding(.vertical, SE7ENSpacing.sm)
                                .background(selectedMeal == meal ? SE7ENColors.neonGreen : SE7ENColors.surfaceElevated)
                                .clipShape(Capsule())
                        }
                    }
                }

                // Meal Entries
                Text("\(selectedMeal.capitalized) Entries")
                    .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                    .foregroundStyle(SE7ENColors.textPrimary)

                ForEach(mealSamples(for: selectedMeal), id: \.name) { meal in
                    GlassCard {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text(meal.name)
                                    .font(.system(size: SE7ENFontSize.md, weight: .semibold))
                                    .foregroundStyle(SE7ENColors.textPrimary)
                                Text("\(meal.calories) kcal · P:\(meal.protein)g · C:\(meal.carbs)g · F:\(meal.fat)g")
                                    .font(.system(size: SE7ENFontSize.xs))
                                    .foregroundStyle(SE7ENColors.textMuted)
                            }
                            Spacer()
                            Text("\(meal.calories)")
                                .font(.system(size: SE7ENFontSize.md, weight: .bold))
                                .foregroundStyle(SE7ENColors.neonGreen)
                            Text("kcal")
                                .font(.system(size: SE7ENFontSize.xs))
                                .foregroundStyle(SE7ENColors.textMuted)
                        }
                    }
                }

                // Water Tracker
                Text("Water Intake")
                    .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                    .foregroundStyle(SE7ENColors.textPrimary)

                GlassCard {
                    HStack(spacing: SE7ENSpacing.sm) {
                        Image(systemName: "drop.fill")
                            .foregroundStyle(Color(hex: "#4FC3F7"))
                        VStack(alignment: .leading, spacing: 2) {
                            Text("1,500 ml of 3,000 ml")
                                .font(.system(size: SE7ENFontSize.md, weight: .bold))
                                .foregroundStyle(SE7ENColors.textPrimary)
                            Text("5 of 10 glasses")
                                .font(.system(size: SE7ENFontSize.xs))
                                .foregroundStyle(SE7ENColors.textSecondary)
                        }
                    }
                }

                Spacer().frame(height: 20)
            }
            .padding(.horizontal, SE7ENSpacing.lg)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
    }

    func mealSamples(for type: String) -> [(name: String, calories: Int, protein: Int, carbs: Int, fat: Int)] {
        switch type {
        case "breakfast":
            return [
                ("Poha with peanuts", 320, 8, 52, 10),
                ("Eggs (3) + toast", 280, 21, 30, 14),
                ("Dosa with sambar", 250, 6, 42, 8),
            ]
        case "lunch":
            return [
                ("Dal rice with sabzi", 420, 15, 62, 12),
                ("Chicken rice bowl", 480, 32, 55, 14),
                ("Roti sabzi (3 rotis)", 380, 10, 58, 14),
            ]
        case "dinner":
            return [
                ("Paneer curry + roti", 350, 18, 32, 18),
                ("Grilled chicken + salad", 320, 35, 10, 15),
                ("Biryani (veg)", 380, 10, 60, 12),
            ]
        default:
            return [
                ("Sprouts chaat", 150, 12, 22, 4),
                ("Curd (200g)", 120, 8, 8, 6),
                ("Idli (2 pcs)", 140, 4, 28, 2),
            ]
        }
    }
}

// MARK: - Macro Circle

struct MacroCircle: View {
    let label: String
    let current: Int
    let goal: Int
    let color: Color

    private var progress: Double {
        min(Double(current) / Double(goal), 1.0)
    }

    var body: some View {
        VStack(spacing: 4) {
            ZStack {
                Circle()
                    .stroke(SE7ENColors.divider, lineWidth: 5)
                    .frame(width: 52, height: 52)
                Circle()
                    .trim(from: 0, to: progress)
                    .stroke(color, lineWidth: 5)
                    .frame(width: 52, height: 52)
                    .rotationEffect(.degrees(-90))
                Text("\(current)")
                    .font(.system(size: SE7ENFontSize.sm, weight: .bold))
                    .foregroundStyle(SE7ENColors.textPrimary)
            }
            Text(label)
                .font(.system(size: 9))
                .foregroundStyle(SE7ENColors.textSecondary)
        }
    }
}

// MARK: - Food Scan View

struct FoodScanView: View {
    @State private var showingPermissionAlert = false
    @State private var scannedResult: FoodScanResult?

    struct FoodScanResult {
        let name: String
        let calories: Int
        let protein: Int
        let carbs: Int
        let fat: Int
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: SE7ENSpacing.lg) {
                Text("Food Scan")
                    .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                    .foregroundStyle(SE7ENColors.textPrimary)
                    .padding(.top, 60)

                // Camera Placeholder
                ZStack {
                    RoundedRectangle(cornerRadius: SE7ENRadius.lg)
                        .fill(SE7ENColors.surfaceElevated)
                        .frame(height: 250)
                        .overlay(
                            RoundedRectangle(cornerRadius: SE7ENRadius.lg)
                                .stroke(SE7ENColors.cardBorder, lineWidth: 1)
                        )

                    VStack(spacing: SE7ENSpacing.md) {
                        Image(systemName: "camera.fill")
                            .font(.system(size: 40))
                            .foregroundStyle(SE7ENColors.textMuted)

                        Text("Install this app on your device via the Rork App to use the camera.")
                            .font(.system(size: SE7ENFontSize.sm))
                            .foregroundStyle(SE7ENColors.textSecondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, SE7ENSpacing.xl)
                    }
                }

                // Upload Alternative
                Button {
                    scanSampleFood()
                } label: {
                    HStack {
                        Image(systemName: "photo.on.rectangle")
                        Text("Upload Food Photo")
                            .font(.system(size: SE7ENFontSize.md, weight: .semibold))
                    }
                    .foregroundStyle(SE7ENColors.neonGreen)
                    .frame(maxWidth: .infinity)
                    .frame(height: 50)
                    .background(SE7ENColors.surfaceElevated)
                    .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                    .overlay(
                        RoundedRectangle(cornerRadius: SE7ENRadius.md)
                            .stroke(SE7ENColors.neonGreenDim.opacity(0.3), lineWidth: 1)
                    )
                }

                // Result
                if let result = scannedResult {
                    GlassCard(glow: true) {
                        VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                            Text("Scan Result")
                                .font(.system(size: SE7ENFontSize.md, weight: .bold))
                                .foregroundStyle(SE7ENColors.textPrimary)
                            Text(result.name)
                                .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                                .foregroundStyle(SE7ENColors.neonGreen)

                            HStack(spacing: SE7ENSpacing.lg) {
                                NutrientBadge(label: "Calories", value: "\(result.calories)", color: .orange)
                                NutrientBadge(label: "Protein", value: "\(result.protein)g", color: SE7ENColors.neonGreen)
                                NutrientBadge(label: "Carbs", value: "\(result.carbs)g", color: .blue)
                                NutrientBadge(label: "Fat", value: "\(result.fat)g", color: .yellow)
                            }

                            HStack(spacing: 4) {
                                Image(systemName: "info.circle.fill")
                                    .font(.system(size: 10))
                                    .foregroundStyle(SE7ENColors.textMuted)
                                Text("AI scan results are estimates. Actual values may vary.")
                                    .font(.system(size: 10))
                                    .foregroundStyle(SE7ENColors.textMuted)
                            }
                            .padding(.top, 4)
                        }
                    }
                }

                Spacer().frame(height: 20)
            }
            .padding(.horizontal, SE7ENSpacing.lg)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
    }

    func scanSampleFood() {
        let foods: [FoodScanResult] = [
            FoodScanResult(name: "🍗 Grilled Chicken Breast", calories: 230, protein: 43, carbs: 0, fat: 5),
            FoodScanResult(name: "🍚 Steamed Rice (1 cup)", calories: 206, protein: 4, carbs: 45, fat: 0.5),
            FoodScanResult(name: "🥗 Mixed Salad Bowl", calories: 120, protein: 3, carbs: 18, fat: 5),
            FoodScanResult(name: "🍳 Egg Omelette (2 eggs)", calories: 180, protein: 14, carbs: 2, fat: 14),
        ]
        scannedResult = foods.randomElement()!
    }
}

struct NutrientBadge: View {
    let label: String
    let value: String
    let color: Color

    var body: some View {
        VStack(spacing: 2) {
            Text(value)
                .font(.system(size: SE7ENFontSize.md, weight: .bold))
                .foregroundStyle(color)
            Text(label)
                .font(.system(size: 10))
                .foregroundStyle(SE7ENColors.textSecondary)
        }
    }
}

// MARK: - Exercise Library View

struct ExerciseLibraryView: View {
    let exercises = ExerciseData.exercises

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                Text("Exercise Library")
                    .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                    .foregroundStyle(SE7ENColors.textPrimary)
                    .padding(.top, 60)

                ForEach(exercises) { exercise in
                    NavigationLink(destination: ExerciseDetailView(exercise: exercise)) {
                        ExerciseCardView(exercise: exercise)
                    }
                    .buttonStyle(.plain)
                }

                Spacer().frame(height: 20)
            }
            .padding(.horizontal, SE7ENSpacing.lg)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
    }
}

// MARK: - Exercise Detail View

struct ExerciseDetailView: View {
    let exercise: Exercise

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                // Video Placeholder
                ZStack {
                    RoundedRectangle(cornerRadius: SE7ENRadius.lg)
                        .fill(SE7ENColors.surfaceElevated)
                        .frame(height: 220)

                    VStack(spacing: SE7ENSpacing.sm) {
                        Image(systemName: "play.circle.fill")
                            .font(.system(size: 48))
                            .foregroundStyle(SE7ENColors.neonGreen)
                        Text("Video Coming Soon")
                            .font(.system(size: SE7ENFontSize.sm))
                            .foregroundStyle(SE7ENColors.textSecondary)
                    }
                }

                // Exercise Info
                Text(exercise.name)
                    .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                    .foregroundStyle(SE7ENColors.textPrimary)

                HStack(spacing: SE7ENSpacing.sm) {
                    Badge(text: exercise.targetMuscle, color: SE7ENColors.neonGreen)
                    Badge(text: exercise.equipment, color: .blue)
                    Badge(text: exercise.difficulty.capitalized, color: .orange)
                }

                // Stats
                HStack(spacing: SE7ENSpacing.xl) {
                    StatItem(label: "Sets", value: "\(exercise.sets)")
                    StatItem(label: "Reps", value: "\(exercise.reps)")
                    StatItem(label: "Rest", value: "\(exercise.restSeconds)s")
                }

                // Form Tips
                GlassCard {
                    VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                        Text("Form Tips")
                            .font(.system(size: SE7ENFontSize.md, weight: .bold))
                            .foregroundStyle(SE7ENColors.textPrimary)
                        ForEach(exercise.formTips, id: \.self) { tip in
                            HStack(alignment: .top, spacing: 8) {
                                Text("•")
                                    .foregroundStyle(SE7ENColors.neonGreen)
                                Text(tip)
                                    .font(.system(size: SE7ENFontSize.sm))
                                    .foregroundStyle(SE7ENColors.textSecondary)
                            }
                        }
                    }
                }

                // Common Mistakes
                GlassCard {
                    VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                        Text("Common Mistakes")
                            .font(.system(size: SE7ENFontSize.md, weight: .bold))
                            .foregroundStyle(SE7ENColors.textPrimary)
                        ForEach(exercise.commonMistakes, id: \.self) { mistake in
                            HStack(alignment: .top, spacing: 8) {
                                Text("•")
                                    .foregroundStyle(SE7ENColors.error)
                                Text(mistake)
                                    .font(.system(size: SE7ENFontSize.sm))
                                    .foregroundStyle(SE7ENColors.textSecondary)
                            }
                        }
                    }
                }

                Spacer().frame(height: 20)
            }
            .padding(.horizontal, SE7ENSpacing.lg)
            .padding(.top, 60)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Profile View

struct ProfileView: View {
    @Environment(AuthViewModel.self) private var auth

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: SE7ENSpacing.lg) {
                Text("Profile")
                    .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                    .foregroundStyle(SE7ENColors.textPrimary)
                    .padding(.top, 60)

                // User Info Card
                GlassCard {
                    VStack(spacing: SE7ENSpacing.md) {
                        Circle()
                            .fill(SE7ENColors.surface)
                            .frame(width: 80, height: 80)
                            .overlay(
                                Text("\(auth.firstName.prefix(1))")
                                    .font(.system(size: 32, weight: .bold))
                                    .foregroundStyle(SE7ENColors.neonGreen)
                            )

                        Text(auth.firstName)
                            .font(.system(size: SE7ENFontSize.xl, weight: .bold))
                            .foregroundStyle(SE7ENColors.textPrimary)

                        Text("Free Plan")
                            .font(.system(size: SE7ENFontSize.sm))
                            .foregroundStyle(SE7ENColors.neonGreen)
                            .padding(.horizontal, SE7ENSpacing.md)
                            .padding(.vertical, 4)
                            .background(SE7ENColors.neonGreenGlow)
                            .clipShape(Capsule())
                    }
                }

                // Settings
                Group {
                    SettingsRow(icon: "person.fill", title: "Edit Profile")
                    SettingsRow(icon: "creditcard.fill", title: "Subscription")
                    SettingsRow(icon: "bell.fill", title: "Notifications")
                    SettingsRow(icon: "moon.fill", title: "Dark Mode", trailing: "On")
                    SettingsRow(icon: "questionmark.circle.fill", title: "Help & Support")
                }

                // Logout
                Button {
                    Task { await auth.logout() }
                } label: {
                    Text("Log Out")
                        .font(.system(size: SE7ENFontSize.md, weight: .semibold))
                        .foregroundStyle(SE7ENColors.error)
                        .frame(maxWidth: .infinity)
                        .frame(height: 50)
                        .background(SE7ENColors.surfaceElevated)
                        .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                        .overlay(
                            RoundedRectangle(cornerRadius: SE7ENRadius.md)
                                .stroke(SE7ENColors.error.opacity(0.3), lineWidth: 1)
                        )
                }
                .padding(.top, SE7ENSpacing.md)

                Spacer().frame(height: 20)
            }
            .padding(.horizontal, SE7ENSpacing.lg)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
    }
}

// MARK: - Subviews

struct Badge: View {
    let text: String
    let color: Color

    var body: some View {
        Text(text)
            .font(.system(size: 11, weight: .semibold))
            .foregroundStyle(color)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(color.opacity(0.12))
            .clipShape(Capsule())
    }
}

struct StatItem: View {
    let label: String
    let value: String

    var body: some View {
        VStack(spacing: 2) {
            Text(value)
                .font(.system(size: SE7ENFontSize.xl, weight: .bold))
                .foregroundStyle(SE7ENColors.textPrimary)
            Text(label)
                .font(.system(size: SE7ENFontSize.xs))
                .foregroundStyle(SE7ENColors.textSecondary)
        }
    }
}

struct SettingsRow: View {
    let icon: String
    let title: String
    var trailing: String? = nil

    var body: some View {
        GlassCard {
            HStack(spacing: SE7ENSpacing.md) {
                Image(systemName: icon)
                    .font(.system(size: 16))
                    .foregroundStyle(SE7ENColors.neonGreen)
                    .frame(width: 28)

                Text(title)
                    .font(.system(size: SE7ENFontSize.md))
                    .foregroundStyle(SE7ENColors.textPrimary)

                Spacer()

                if let trailing = trailing {
                    Text(trailing)
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textMuted)
                }

                Image(systemName: "chevron.right")
                    .font(.system(size: 12))
                    .foregroundStyle(SE7ENColors.textMuted)
            }
        }
    }
}

// MARK: - Subscription View

struct SubscriptionView: View {
    let plans: [(name: String, price: String, period: String, features: [String], isPremium: Bool)] = [
        ("Free", "₹0", "7-day trial", ["Limited workout plans", "Basic nutrition tracking", "Water tracker"], false),
        ("Basic", "₹299", "per month", ["All workout plans", "Full nutrition tracking", "AI meal suggestions", "Challenges access"], false),
        ("Premium", "₹499", "per month", ["Everything in Basic", "Full AI Trainer", "Food Scan AI", "Priority support", "Custom workout plans"], true),
        ("Quarterly", "₹2,999", "per quarter", ["Everything in Premium", "Save 17% vs monthly", "Quarterly progress report"], false),
        ("Annual", "₹5,999", "per year", ["Everything in Premium", "Save 17% vs monthly", "Annual fitness assessment"], false),
    ]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: SE7ENSpacing.lg) {
                Text("Subscription")
                    .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                    .foregroundStyle(SE7ENColors.textPrimary)
                    .padding(.top, 60)

                Text("Choose the plan that fits your fitness journey")
                    .font(.system(size: SE7ENFontSize.sm))
                    .foregroundStyle(SE7ENColors.textSecondary)

                ForEach(plans, id: \.name) { plan in
                    PlanCard(
                        name: plan.name,
                        price: plan.price,
                        period: plan.period,
                        features: plan.features,
                        isPremium: plan.isPremium
                    )
                }

                Spacer().frame(height: 20)
            }
            .padding(.horizontal, SE7ENSpacing.lg)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
    }
}

struct PlanCard: View {
    let name: String
    let price: String
    let period: String
    let features: [String]
    let isPremium: Bool

    var body: some View {
        GlassCard(glow: isPremium) {
            VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                HStack {
                    Text(name)
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(isPremium ? SE7ENColors.neonGreen : SE7ENColors.textPrimary)

                    if isPremium {
                        Text("BEST VALUE")
                            .font(.system(size: 8, weight: .bold))
                            .foregroundStyle(SE7ENColors.textInverse)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(SE7ENColors.neonGreen)
                            .clipShape(Capsule())
                    }
                }

                HStack(alignment: .lastTextBaseline) {
                    Text(price)
                        .font(.system(size: SE7ENFontSize.xxxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    Text(period)
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)
                }

                ForEach(features, id: \.self) { feature in
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundStyle(SE7ENColors.neonGreen)
                        Text(feature)
                            .font(.system(size: SE7ENFontSize.sm))
                            .foregroundStyle(SE7ENColors.textSecondary)
                    }
                }

                Button {} label: {
                    Text("Choose \(name)")
                        .font(.system(size: SE7ENFontSize.md, weight: .bold))
                        .foregroundStyle(isPremium ? SE7ENColors.textInverse : SE7ENColors.neonGreen)
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(isPremium ? SE7ENColors.neonGreen : Color.clear)
                        .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                        .overlay(
                            RoundedRectangle(cornerRadius: SE7ENRadius.md)
                                .stroke(isPremium ? Color.clear : SE7ENColors.neonGreen, lineWidth: 1.5)
                        )
                }
            }
        }
        .overlay(
            RoundedRectangle(cornerRadius: SE7ENRadius.lg)
                .stroke(isPremium ? SE7ENColors.neonGreenDim : SE7ENColors.cardBorder, lineWidth: isPremium ? 1.5 : 1)
        )
    }
}
