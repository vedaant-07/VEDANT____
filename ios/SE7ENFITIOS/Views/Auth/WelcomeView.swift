import SwiftUI

// MARK: - Welcome Screen

struct WelcomeView: View {
    @Environment(AuthViewModel.self) private var auth

    var body: some View {
        ZStack {
            SE7ENColors.background.ignoresSafeArea()

            VStack(spacing: 0) {
                Spacer()

                // Logo
                VStack(spacing: SE7ENSpacing.lg) {
                    SE7ENLogo(size: 120)

                    Text("SE7EN FIT")
                        .font(.system(size: 36, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .kerning(3)

                    Text("Your AI-powered fitness journey\nstarts here.")
                        .font(.system(size: SE7ENFontSize.lg))
                        .foregroundStyle(SE7ENColors.textSecondary)
                        .multilineTextAlignment(.center)
                        .lineSpacing(6)
                }

                Spacer()

                // CTA
                VStack(spacing: SE7ENSpacing.md) {
                    NavigationLink(destination: ChooseRoleView()) {
                        Text("Get Started")
                            .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                            .foregroundStyle(SE7ENColors.textInverse)
                            .frame(maxWidth: .infinity)
                            .frame(minHeight: 50)
                            .background(
                                LinearGradient(
                                    colors: [SE7ENColors.neonGreen, SE7ENColors.neonGreenDim],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .clipShape(.rect(cornerRadius: SE7ENRadius.md))
                    }

                    Text("By continuing, you agree to our Terms & Privacy Policy")
                        .font(.system(size: SE7ENFontSize.xs))
                        .foregroundStyle(SE7ENColors.textMuted)
                        .multilineTextAlignment(.center)
                }
                .padding(.horizontal, SE7ENSpacing.xl)
                .padding(.bottom, 60)
            }
        }
    }
}

// MARK: - Choose Role Screen

struct ChooseRoleView: View {
    var body: some View {
        ZStack {
            SE7ENColors.background.ignoresSafeArea()

            VStack(alignment: .leading, spacing: 0) {
                // Header
                VStack(alignment: .leading, spacing: SE7ENSpacing.sm) {
                    Text("Choose your\naccount type")
                        .font(.system(size: SE7ENFontSize.xxxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .lineSpacing(4)

                    Text("Select how you want to use SE7EN FIT")
                        .font(.system(size: SE7ENFontSize.md))
                        .foregroundStyle(SE7ENColors.textSecondary)
                }
                .padding(.top, 100)
                .padding(.horizontal, SE7ENSpacing.xl)

                Spacer().frame(height: SE7ENSpacing.xxl)

                // Card options
                VStack(spacing: SE7ENSpacing.md) {
                    RoleCard(
                        icon: "dumbbell.fill",
                        title: "Continue as User",
                        description: "Track workouts, nutrition, challenges & more",
                        accentColor: SE7ENColors.neonGreen,
                        destination: AnyView(UserLoginView())
                    )

                    RoleCard(
                        icon: "building.2.fill",
                        title: "Continue as Gym Owner",
                        description: "Manage your gym, members, attendance & revenue",
                        accentColor: SE7ENColors.limeAccent,
                        destination: AnyView(OwnerLoginView())
                    )
                }
                .padding(.horizontal, SE7ENSpacing.xl)

                Spacer()
            }
        }
        .navigationBarBackButtonHidden(false)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                CircleButton(systemName: "chevron.left")
            }
        }
    }
}

// MARK: - Role Card

struct RoleCard: View {
    let icon: String
    let title: String
    let description: String
    let accentColor: Color
    let destination: AnyView

    var body: some View {
        NavigationLink(destination: destination) {
            HStack(spacing: SE7ENSpacing.md) {
                Image(systemName: icon)
                    .font(.system(size: 22))
                    .foregroundStyle(accentColor)
                    .frame(width: 52, height: 52)
                    .background(accentColor.opacity(0.12))
                    .clipShape(.rect(cornerRadius: SE7ENRadius.md))

                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    Text(description)
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)
                        .lineLimit(2)
                }

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(accentColor)
            }
            .padding(SE7ENSpacing.lg)
            .background(SE7ENColors.surfaceElevated)
            .clipShape(.rect(cornerRadius: SE7ENRadius.lg))
            .overlay(
                RoundedRectangle(cornerRadius: SE7ENRadius.lg)
                    .stroke(accentColor.opacity(0.2), lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Circle Button

struct CircleButton: View {
    let systemName: String
    var action: (() -> Void)?

    var body: some View {
        Button(action: { action?() }) {
            Image(systemName: systemName)
                .font(.system(size: 16, weight: .medium))
                .foregroundStyle(SE7ENColors.textSecondary)
                .frame(width: 40, height: 40)
                .background(SE7ENColors.surfaceElevated)
                .clipShape(Circle())
        }
    }
}
