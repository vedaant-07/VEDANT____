import SwiftUI

// MARK: - User Home Dashboard

struct UserHomeView: View {
    @Environment(AuthViewModel.self) private var auth
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            UserDashboardContent()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
                .tag(0)

            WorkoutListView()
                .tabItem {
                    Image(systemName: "dumbbell.fill")
                    Text("Workout")
                }
                .tag(1)

            AITrainerView()
                .tabItem {
                    Image(systemName: "brain.head.profile")
                    Text("AI")
                }
                .tag(2)

            ChallengesView()
                .tabItem {
                    Image(systemName: "trophy.fill")
                    Text("Challenges")
                }
                .tag(3)

            TrackingView()
                .tabItem {
                    Image(systemName: "chart.line.uptrend.xyaxis")
                    Text("Track")
                }
                .tag(4)
        }
        .tint(SE7ENColors.neonGreen)
        .onAppear {
            let appearance = UITabBarAppearance()
            appearance.configureWithOpaqueBackground()
            appearance.backgroundColor = UIColor(SE7ENColors.surface)
            UITabBar.appearance().standardAppearance = appearance
            UITabBar.appearance().scrollEdgeAppearance = appearance
        }
    }
}

// MARK: - Dashboard Content

struct UserDashboardContent: View {
    @Environment(AuthViewModel.self) private var auth
    let tracking = DashboardData.tracking

    private var timeGreeting: String {
        let hour = Calendar.current.component(.hour, from: Date())
        if hour < 12 { return "Good Morning" }
        if hour < 17 { return "Good Afternoon" }
        return "Good Evening"
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.lg) {
                    // Header
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text("\(timeGreeting), \(auth.firstName) 👋")
                                .font(.system(size: SE7ENFontSize.xxl, weight: .bold))
                                .foregroundStyle(SE7ENColors.textPrimary)
                            Text("Let's crush it today!")
                                .font(.system(size: SE7ENFontSize.sm))
                                .foregroundStyle(SE7ENColors.textSecondary)
                        }
                        Spacer()
                        HStack(spacing: SE7ENSpacing.sm) {
                            NavigationLink(destination: SubscriptionView()) {
                                Image(systemName: "sparkles")
                                    .font(.system(size: 16))
                                    .foregroundStyle(SE7ENColors.neonGreen)
                                    .frame(width: 40, height: 40)
                                    .background(SE7ENColors.surfaceElevated)
                                    .clipShape(Circle())
                            }
                            NavigationLink(destination: ProfileView()) {
                                Image(systemName: "bell.fill")
                                    .font(.system(size: 16))
                                    .foregroundStyle(SE7ENColors.textSecondary)
                                    .frame(width: 40, height: 40)
                                    .background(SE7ENColors.surfaceElevated)
                                    .clipShape(Circle())
                            }
                        }
                    }

                    // Today's Fitness
                    Text("Today's Fitness")
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)

                    LazyVGrid(columns: [.init(.flexible()), .init(.flexible())], spacing: SE7ENSpacing.sm) {
                        StatCardView(
                            icon: "flame.fill", iconColor: Color(hex: "#FF6B35"),
                            label: "Calories", value: "\(tracking.calories)", unit: "kcal",
                            goal: tracking.calorieGoal, current: Double(tracking.calories),
                            accentColor: Color(hex: "#FF6B35")
                        )
                        StatCardView(
                            icon: "drop.fill", iconColor: Color(hex: "#4FC3F7"),
                            label: "Water", value: "\(tracking.water)", unit: "ml",
                            goal: Int(tracking.waterGoal), current: tracking.water,
                            accentColor: Color(hex: "#4FC3F7")
                        )
                        StatCardView(
                            icon: "shoeprints.fill", iconColor: Color(hex: "#81C784"),
                            label: "Steps", value: "\(tracking.steps)", unit: "",
                            goal: tracking.stepGoal, current: Double(tracking.steps),
                            accentColor: Color(hex: "#81C784")
                        )
                        StatCardView(
                            icon: "moon.fill", iconColor: Color(hex: "#9575CD"),
                            label: "Sleep", value: "\(tracking.sleep)", unit: "hrs",
                            goal: Int(tracking.sleepGoal), current: tracking.sleep,
                            accentColor: Color(hex: "#9575CD")
                        )
                    }

                    // Let's Go Card
                    GlassCard(glow: true) {
                        HStack(spacing: SE7ENSpacing.md) {
                            Image(systemName: "bolt.fill")
                                .font(.system(size: 24))
                                .foregroundStyle(SE7ENColors.neonGreen)

                            VStack(alignment: .leading, spacing: 2) {
                                Text("Let's Go!")
                                    .font(.system(size: SE7ENFontSize.xl, weight: .bold))
                                    .foregroundStyle(SE7ENColors.textPrimary)
                                Text("Push Day — Chest & Triceps is ready")
                                    .font(.system(size: SE7ENFontSize.sm))
                                    .foregroundStyle(SE7ENColors.textSecondary)
                            }

                            Spacer()

                            Text("45 min")
                                .font(.system(size: SE7ENFontSize.sm, weight: .bold))
                                .foregroundStyle(SE7ENColors.neonGreen)
                                .padding(.horizontal, SE7ENSpacing.md)
                                .padding(.vertical, SE7ENSpacing.xs)
                                .background(SE7ENColors.neonGreenGlow)
                                .clipShape(Capsule())
                        }
                    }

                    // Quick Actions
                    Text("Quick Actions")
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)

                    LazyVGrid(columns: Array(repeating: .init(.flexible()), count: 3), spacing: SE7ENSpacing.md) {
                        QuickActionButton(icon: "brain.head.profile", label: "AI Trainer")
                        QuickActionButton(icon: "dumbbell.fill", label: "Workout")
                        QuickActionButton(icon: "fork.knife", label: "Nutrition")
                        QuickActionButton(icon: "camera.fill", label: "Food Scan")
                        QuickActionButton(icon: "chart.line.uptrend.xyaxis", label: "Tracking")
                        QuickActionButton(icon: "trophy.fill", label: "Challenges")
                    }

                    // AI Recommendation
                    GlassCard(glow: true) {
                        VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                            HStack(spacing: SE7ENSpacing.sm) {
                                Image(systemName: "sparkles")
                                    .foregroundStyle(SE7ENColors.neonGreen)
                                Text("AI Recommendation")
                                    .font(.system(size: SE7ENFontSize.md, weight: .bold))
                                    .foregroundStyle(SE7ENColors.textPrimary)
                            }

                            Text("Based on your progress, try increasing protein intake to 150g and add 10 min cardio post-workout.")
                                .font(.system(size: SE7ENFontSize.sm))
                                .foregroundStyle(SE7ENColors.textSecondary)
                                .lineSpacing(2)

                            NavigationLink(destination: AITrainerView()) {
                                HStack(spacing: 4) {
                                    Image(systemName: "message.fill")
                                    Text("Ask AI Coach")
                                        .font(.system(size: SE7ENFontSize.sm, weight: .bold))
                                }
                                .foregroundStyle(SE7ENColors.textInverse)
                                .padding(.horizontal, SE7ENSpacing.md)
                                .padding(.vertical, SE7ENSpacing.sm)
                                .background(SE7ENColors.neonGreen)
                                .clipShape(Capsule())
                            }
                        }
                    }

                    // Unlock Premium
                    GlassCard {
                        VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                            HStack(spacing: SE7ENSpacing.xs) {
                                Image(systemName: "sparkles")
                                    .font(.system(size: 12))
                                Text("PREMIUM")
                                    .font(.system(size: SE7ENFontSize.xs, weight: .bold))
                            }
                            .foregroundStyle(SE7ENColors.neonGreen)
                            .padding(.horizontal, SE7ENSpacing.sm)
                            .padding(.vertical, 2)
                            .background(SE7ENColors.neonGreenGlow)
                            .clipShape(Capsule())

                            Text("Unlock Full AI Trainer & Premium Features")
                                .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                                .foregroundStyle(SE7ENColors.textPrimary)

                            Text("Get personalized workout plans, food scanning, and more.")
                                .font(.system(size: SE7ENFontSize.sm))
                                .foregroundStyle(SE7ENColors.textSecondary)
                                .lineSpacing(2)

                            NavigationLink(destination: SubscriptionView()) {
                                Text("Upgrade from ₹499/mo")
                                    .font(.system(size: SE7ENFontSize.md, weight: .bold))
                                    .foregroundStyle(SE7ENColors.textInverse)
                                    .frame(maxWidth: .infinity)
                                    .frame(height: 50)
                                    .background(
                                        LinearGradient(
                                            colors: [SE7ENColors.neonGreen, SE7ENColors.neonGreenDim],
                                            startPoint: .leading, endPoint: .trailing
                                        )
                                    )
                                    .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                            }
                        }
                    }
                    .overlay(
                        RoundedRectangle(cornerRadius: SE7ENRadius.lg)
                            .stroke(SE7ENColors.neonGreenDim.opacity(0.2), lineWidth: 1)
                    )

                    Spacer().frame(height: 20)
                }
                .padding(.horizontal, SE7ENSpacing.lg)
                .padding(.top, 60)
                .padding(.bottom, 100)
            }
            .scrollIndicators(.hidden)
            .se7enScreen()
        }
    }
}

// MARK: - Stat Card

struct StatCardView: View {
    let icon: String
    let iconColor: Color
    let label: String
    let value: String
    let unit: String
    let goal: Int
    let current: Double
    let accentColor: Color

    private var progress: Double {
        min(current / Double(goal), 1.0)
    }

    var body: some View {
        GlassCard(padding: SE7ENSpacing.md) {
            VStack(alignment: .leading, spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 16))
                    .foregroundStyle(iconColor)

                HStack(alignment: .lastTextBaseline, spacing: 2) {
                    Text(value)
                        .font(.system(size: SE7ENFontSize.xxl, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    if !unit.isEmpty {
                        Text(unit)
                            .font(.system(size: SE7ENFontSize.xs))
                            .foregroundStyle(SE7ENColors.textMuted)
                    }
                }

                Text(label)
                    .font(.system(size: SE7ENFontSize.xs))
                    .foregroundStyle(SE7ENColors.textSecondary)

                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 2)
                            .fill(SE7ENColors.divider)
                            .frame(height: 4)
                        RoundedRectangle(cornerRadius: 2)
                            .fill(accentColor)
                            .frame(width: geo.size.width * progress, height: 4)
                    }
                }
                .frame(height: 4)
                .padding(.top, 4)
            }
        }
    }
}

// MARK: - Quick Action Button

struct QuickActionButton: View {
    let icon: String
    let label: String

    var body: some View {
        VStack(spacing: SE7ENSpacing.xs) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundStyle(SE7ENColors.neonGreen)
                .frame(width: 52, height: 52)
                .background(SE7ENColors.surfaceElevated)
                .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                .overlay(
                    RoundedRectangle(cornerRadius: SE7ENRadius.md)
                        .stroke(SE7ENColors.cardBorder, lineWidth: 1)
                )

            Text(label)
                .font(.system(size: SE7ENFontSize.xs))
                .foregroundStyle(SE7ENColors.textSecondary)
                .multilineTextAlignment(.center)
        }
    }
}
