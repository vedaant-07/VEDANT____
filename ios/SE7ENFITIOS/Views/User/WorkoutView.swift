import SwiftUI

// MARK: - Workout List View

struct WorkoutListView: View {
    let exercises = ExerciseData.exercises

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                    // Today's Workout Card
                    VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                        Text("TODAY'S WORKOUT")
                            .font(.system(size: SE7ENFontSize.xs, weight: .semibold))
                            .foregroundStyle(SE7ENColors.textMuted)
                            .tracking(1)

                        Text("Push Day — Chest & Triceps")
                            .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                            .foregroundStyle(SE7ENColors.textPrimary)

                        HStack(spacing: SE7ENSpacing.lg) {
                            Label("45 min", systemImage: "clock")
                            Label("6 exercises", systemImage: "list.bullet")
                            Label("320 kcal", systemImage: "flame")
                        }
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)

                        Button {} label: {
                            Text("Start Workout")
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
                    .padding(SE7ENSpacing.lg)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(SE7ENColors.surfaceElevated)
                    .clipShape(.rect(cornerRadius: SE7ENRadius.lg))
                    .overlay(
                        RoundedRectangle(cornerRadius: SE7ENRadius.lg)
                            .stroke(SE7ENColors.neonGreenDim.opacity(0.3), lineWidth: 1)
                    )
                    .shadow(color: SE7ENColors.neonGreenGlow, radius: 12)

                    // Progress Card
                    GlassCard {
                        HStack(spacing: SE7ENSpacing.md) {
                            ZStack {
                                Circle()
                                    .stroke(SE7ENColors.divider, lineWidth: 6)
                                    .frame(width: 60, height: 60)
                                Circle()
                                    .trim(from: 0, to: 0.35)
                                    .stroke(SE7ENColors.neonGreen, lineWidth: 6)
                                    .frame(width: 60, height: 60)
                                    .rotationEffect(.degrees(-90))
                                Text("35%")
                                    .font(.system(size: SE7ENFontSize.sm, weight: .bold))
                                    .foregroundStyle(SE7ENColors.neonGreen)
                            }

                            VStack(alignment: .leading, spacing: 4) {
                                Text("Weekly Progress")
                                    .font(.system(size: SE7ENFontSize.md, weight: .bold))
                                    .foregroundStyle(SE7ENColors.textPrimary)
                                Text("2 of 6 workouts completed")
                                    .font(.system(size: SE7ENFontSize.sm))
                                    .foregroundStyle(SE7ENColors.textSecondary)
                            }
                        }
                    }

                    // Exercise Library
                    Text("Exercise Library")
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)

                    ForEach(exercises) { exercise in
                        ExerciseCardView(exercise: exercise)
                    }

                    // Workout History
                    Text("Recent Workouts")
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, SE7ENSpacing.md)

                    ForEach(["Upper Body — 2 days ago", "Leg Day — 4 days ago", "Full Body — 6 days ago"], id: \.self) { item in
                        GlassCard {
                            HStack {
                                Image(systemName: "checkmark.circle.fill")
                                    .foregroundStyle(SE7ENColors.neonGreen)
                                Text(item)
                                    .font(.system(size: SE7ENFontSize.md))
                                    .foregroundStyle(SE7ENColors.textPrimary)
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .font(.system(size: 12))
                                    .foregroundStyle(SE7ENColors.textMuted)
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
}

// MARK: - Exercise Card

struct ExerciseCardView: View {
    let exercise: Exercise

    var difficultyColor: Color {
        switch exercise.difficulty {
        case "beginner": return .green
        case "advanced": return .red
        default: return .orange
        }
    }

    var body: some View {
        GlassCard {
            HStack(spacing: SE7ENSpacing.md) {
                RoundedRectangle(cornerRadius: SE7ENRadius.sm)
                    .fill(SE7ENColors.neonGreenDim.opacity(0.2))
                    .frame(width: 56, height: 56)
                    .overlay(
                        Image(systemName: "figure.strengthtraining.traditional")
                            .foregroundStyle(SE7ENColors.neonGreen)
                    )

                VStack(alignment: .leading, spacing: 4) {
                    Text(exercise.name)
                        .font(.system(size: SE7ENFontSize.md, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    Text(exercise.targetMuscle)
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)
                    HStack(spacing: SE7ENSpacing.sm) {
                        Text("\(exercise.sets)×\(exercise.reps)")
                            .font(.system(size: SE7ENFontSize.xs, weight: .semibold))
                            .foregroundStyle(SE7ENColors.neonGreen)
                        Text("·")
                            .foregroundStyle(SE7ENColors.textMuted)
                        Text(exercise.equipment)
                            .font(.system(size: SE7ENFontSize.xs))
                            .foregroundStyle(SE7ENColors.textMuted)
                    }
                }

                Spacer()

                VStack(spacing: 2) {
                    Text(exercise.difficulty.capitalized)
                        .font(.system(size: 9, weight: .bold))
                        .foregroundStyle(difficultyColor)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(difficultyColor.opacity(0.15))
                        .clipShape(Capsule())

                    Spacer()

                    Image(systemName: "play.circle.fill")
                        .font(.system(size: 24))
                        .foregroundStyle(SE7ENColors.neonGreen)
                }
            }
        }
    }
}
