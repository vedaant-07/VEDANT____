import SwiftUI

// MARK: - AI Trainer View

struct AITrainerView: View {
    @State private var question = ""
    @State private var response: String?
    @State private var isGenerating = false

    let prompts = DashboardData.aiPrompts

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.lg) {
                    // Header
                    HStack {
                        Image(systemName: "sparkles")
                            .foregroundStyle(SE7ENColors.neonGreen)
                        Text("SE7ENFIT AI Coach")
                            .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                            .foregroundStyle(SE7ENColors.textPrimary)
                    }

                    Text("Ask me anything about your fitness, nutrition, or workout plans.")
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)

                    // Prompt Cards
                    LazyVGrid(columns: [.init(.flexible()), .init(.flexible())], spacing: SE7ENSpacing.sm) {
                        ForEach(prompts, id: \.self) { prompt in
                            Button {
                                question = prompt
                                generateResponse(for: prompt)
                            } label: {
                                Text(prompt)
                                    .font(.system(size: SE7ENFontSize.sm, weight: .semibold))
                                    .foregroundStyle(SE7ENColors.textPrimary)
                                    .frame(maxWidth: .infinity)
                                    .padding(SE7ENSpacing.md)
                                    .background(SE7ENColors.surfaceElevated)
                                    .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: SE7ENRadius.md)
                                            .stroke(SE7ENColors.neonGreenDim.opacity(0.2), lineWidth: 1)
                                    )
                            }
                        }
                    }

                    // Question Input
                    HStack(spacing: SE7ENSpacing.sm) {
                        TextField("Ask AI trainer anything...", text: $question)
                            .font(.system(size: SE7ENFontSize.md))
                            .foregroundStyle(SE7ENColors.textPrimary)
                            .padding(.horizontal, SE7ENSpacing.md)
                            .frame(height: 50)
                            .background(SE7ENColors.surfaceElevated)
                            .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                            .overlay(
                                RoundedRectangle(cornerRadius: SE7ENRadius.md)
                                    .stroke(SE7ENColors.cardBorder, lineWidth: 1)
                            )

                        Button {
                            generateResponse(for: question)
                        } label: {
                            Image(systemName: "arrow.up")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundStyle(SE7ENColors.textInverse)
                                .frame(width: 50, height: 50)
                                .background(SE7ENColors.neonGreen)
                                .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                        }
                        .disabled(question.isEmpty || isGenerating)
                    }

                    // Response
                    if isGenerating {
                        HStack {
                            ProgressView()
                                .tint(SE7ENColors.neonGreen)
                            Text("Generating...")
                                .font(.system(size: SE7ENFontSize.sm))
                                .foregroundStyle(SE7ENColors.textSecondary)
                        }
                        .padding(.top, SE7ENSpacing.md)
                    }

                    if let response = response {
                        GlassCard(glow: true) {
                            VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                                HStack(spacing: SE7ENSpacing.sm) {
                                    Image(systemName: "sparkles")
                                        .foregroundStyle(SE7ENColors.neonGreen)
                                    Text("AI Coach Response")
                                        .font(.system(size: SE7ENFontSize.md, weight: .bold))
                                        .foregroundStyle(SE7ENColors.textPrimary)
                                }

                                Text(response)
                                    .font(.system(size: SE7ENFontSize.sm))
                                    .foregroundStyle(SE7ENColors.textSecondary)
                                    .lineSpacing(4)

                                Divider()
                                    .background(SE7ENColors.divider)

                                HStack(spacing: 4) {
                                    Image(systemName: "info.circle.fill")
                                        .font(.system(size: 12))
                                        .foregroundStyle(SE7ENColors.warning)
                                    Text("This is an AI-generated suggestion. Always consult a healthcare professional before starting any new diet or exercise plan.")
                                        .font(.system(size: 10))
                                        .foregroundStyle(SE7ENColors.textMuted)
                                }
                            }
                        }
                    }

                    // Daily Tip
                    GlassCard {
                        HStack(spacing: SE7ENSpacing.sm) {
                            Image(systemName: "lightbulb.fill")
                                .foregroundStyle(SE7ENColors.warning)
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Daily Tip")
                                    .font(.system(size: SE7ENFontSize.xs, weight: .semibold))
                                    .foregroundStyle(SE7ENColors.textMuted)
                                Text("Drink 500ml of water 30 minutes before your workout for better performance.")
                                    .font(.system(size: SE7ENFontSize.sm))
                                    .foregroundStyle(SE7ENColors.textSecondary)
                            }
                        }
                    }

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

    private func generateResponse(for prompt: String) {
        guard !prompt.isEmpty else { return }
        isGenerating = true
        response = nil

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            isGenerating = false
            response = """
            Based on your profile and goals, here's a personalized recommendation for "\(prompt)":

            🏋️ Workout Plan: Start with a 10-min warm-up (jumping jacks, arm circles, bodyweight squats). Then do 3 sets of each exercise with 60-90 sec rest between sets.

            🍽️ Nutrition Tip: Focus on getting 1.8-2.2g of protein per kg of bodyweight. Include complex carbs like oats, brown rice, and sweet potatoes. Don't forget healthy fats from nuts and seeds.

            💧 Stay hydrated with at least 3L of water daily. Track your progress for 2 weeks and adjust accordingly.

            💡 Pro Tip: Consistency beats intensity. Show up every day, even if it's just for 20 minutes.
            """
        }
    }
}

// MARK: - Challenges View

struct ChallengesView: View {
    let challenges = ChallengeData.challenges

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                    Text("Challenges")
                        .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, 60)

                    Text("Complete challenges and earn rewards")
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)

                    // Active Challenges
                    Text("Active")
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, SE7ENSpacing.sm)

                    ForEach(challenges.filter { $0.joined == true }) { challenge in
                        ChallengeCardView(challenge: challenge)
                    }

                    // Available Challenges
                    Text("Available")
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, SE7ENSpacing.sm)

                    ForEach(challenges.filter { $0.joined != true }) { challenge in
                        ChallengeCardView(challenge: challenge)
                    }

                    Spacer().frame(height: 100)
                }
                .padding(.horizontal, SE7ENSpacing.lg)
            }
            .scrollIndicators(.hidden)
            .se7enScreen()
        }
    }
}

// MARK: - Challenge Card

struct ChallengeCardView: View {
    let challenge: Challenge

    var difficultyColor: Color {
        switch challenge.difficulty {
        case "beginner": return .green
        case "advanced": return .red
        default: return .orange
        }
    }

    var body: some View {
        GlassCard(glow: challenge.joined == true) {
            VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                HStack {
                    Text(challenge.title)
                        .font(.system(size: SE7ENFontSize.md, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    Spacer()
                    Text("\(challenge.rewardPoints) pts")
                        .font(.system(size: SE7ENFontSize.xs, weight: .bold))
                        .foregroundStyle(SE7ENColors.neonGreen)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 2)
                        .background(SE7ENColors.neonGreenGlow)
                        .clipShape(Capsule())
                }

                Text(challenge.description)
                    .font(.system(size: SE7ENFontSize.sm))
                    .foregroundStyle(SE7ENColors.textSecondary)
                    .lineLimit(2)

                HStack(spacing: SE7ENSpacing.sm) {
                    Label("\(challenge.duration)d", systemImage: "calendar")
                    Label("\(challenge.participants)", systemImage: "person.2")
                    Text(challenge.difficulty.capitalized)
                        .font(.system(size: 10, weight: .bold))
                        .foregroundStyle(difficultyColor)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(difficultyColor.opacity(0.15))
                        .clipShape(Capsule())
                }
                .font(.system(size: SE7ENFontSize.xs))
                .foregroundStyle(SE7ENColors.textMuted)

                if let progress = challenge.progress, challenge.joined == true {
                    GeometryReader { geo in
                        ZStack(alignment: .leading) {
                            RoundedRectangle(cornerRadius: 4)
                                .fill(SE7ENColors.divider)
                                .frame(height: 8)
                            RoundedRectangle(cornerRadius: 4)
                                .fill(SE7ENColors.neonGreen)
                                .frame(width: geo.size.width * (progress / 100), height: 8)
                        }
                    }
                    .frame(height: 8)
                }

                if challenge.joined != true {
                    Button {} label: {
                        Text("Join Challenge")
                            .font(.system(size: SE7ENFontSize.sm, weight: .bold))
                            .foregroundStyle(SE7ENColors.neonGreen)
                            .frame(maxWidth: .infinity)
                            .frame(height: 40)
                            .overlay(
                                RoundedRectangle(cornerRadius: SE7ENRadius.md)
                                    .stroke(SE7ENColors.neonGreen, lineWidth: 1.5)
                            )
                    }
                }
            }
        }
    }
}

// MARK: - Tracking View

struct TrackingView: View {
    let tracking = DashboardData.tracking
    @State private var waterGlasses = 5
    @State private var currentWeight = 72.0
    @State private var sleepHours = 6.5

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.lg) {
                    Text("Track")
                        .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, 60)

                    // Water
                    TrackingMetricCard(
                        icon: "drop.fill",
                        iconColor: Color(hex: "#4FC3F7"),
                        title: "Water",
                        value: "\(waterGlasses * 300) ml",
                        goal: "3,000 ml",
                        progress: Double(waterGlasses * 300) / 3000
                    ) {
                        HStack(spacing: SE7ENSpacing.sm) {
                            ForEach(0..<10, id: \.self) { i in
                                Button {
                                    waterGlasses = i + 1
                                } label: {
                                    Image(systemName: i < waterGlasses ? "drop.fill" : "drop")
                                        .foregroundStyle(i < waterGlasses ? Color(hex: "#4FC3F7") : SE7ENColors.textMuted)
                                }
                            }
                        }
                    }

                    // Steps
                    TrackingMetricCard(
                        icon: "shoeprints.fill",
                        iconColor: Color(hex: "#81C784"),
                        title: "Steps",
                        value: "\(tracking.steps)",
                        goal: "\(tracking.stepGoal)",
                        progress: Double(tracking.steps) / Double(tracking.stepGoal)
                    )

                    // Calories
                    TrackingMetricCard(
                        icon: "flame.fill",
                        iconColor: Color(hex: "#FF6B35"),
                        title: "Calories Burned",
                        value: "\(tracking.calories) kcal",
                        goal: "\(tracking.calorieGoal) kcal",
                        progress: Double(tracking.calories) / Double(tracking.calorieGoal)
                    )

                    // Sleep
                    TrackingMetricCard(
                        icon: "moon.fill",
                        iconColor: Color(hex: "#9575CD"),
                        title: "Sleep",
                        value: "\(sleepHours) hrs",
                        goal: "8 hrs",
                        progress: sleepHours / 8
                    )

                    // Weight
                    TrackingMetricCard(
                        icon: "scalemass.fill",
                        iconColor: Color(hex: "#FFB74D"),
                        title: "Weight",
                        value: "\(currentWeight) kg",
                        goal: "68 kg",
                        progress: 0.6
                    )

                    Spacer().frame(height: 100)
                }
                .padding(.horizontal, SE7ENSpacing.lg)
            }
            .scrollIndicators(.hidden)
            .se7enScreen()
        }
    }
}

// MARK: - Tracking Metric Card

struct TrackingMetricCard<Actions: View>: View {
    let icon: String
    let iconColor: Color
    let title: String
    let value: String
    let goal: String
    let progress: Double
    @ViewBuilder let actions: () -> Actions

    init(
        icon: String, iconColor: Color,
        title: String, value: String, goal: String, progress: Double,
        @ViewBuilder actions: @escaping () -> Actions = { EmptyView() }
    ) {
        self.icon = icon
        self.iconColor = iconColor
        self.title = title
        self.value = value
        self.goal = goal
        self.progress = progress
        self.actions = actions
    }

    var body: some View {
        GlassCard {
            VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                HStack {
                    Image(systemName: icon)
                        .foregroundStyle(iconColor)
                    Text(title)
                        .font(.system(size: SE7ENFontSize.md, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    Spacer()
                    Text(value)
                        .font(.system(size: SE7ENFontSize.md, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    Text("/ \(goal)")
                        .font(.system(size: SE7ENFontSize.xs))
                        .foregroundStyle(SE7ENColors.textMuted)
                }

                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 3)
                            .fill(SE7ENColors.divider)
                            .frame(height: 6)
                        RoundedRectangle(cornerRadius: 3)
                            .fill(iconColor)
                            .frame(width: min(geo.size.width * progress, geo.size.width), height: 6)
                    }
                }
                .frame(height: 6)

                actions()
            }
        }
    }
}
