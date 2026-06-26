import SwiftUI

/// Root view that routes based on auth state and role.
struct RootView: View {
    @Environment(AuthViewModel.self) private var auth

    var body: some View {
        Group {
            if auth.isLoading {
                SplashView()
            } else if auth.isAuthenticated, let role = auth.userRole {
                if role == "gym_owner" {
                    OwnerHomeView()
                } else {
                    UserHomeView()
                }
            } else {
                NavigationStack {
                    WelcomeView()
                }
                .tint(SE7ENColors.neonGreen)
            }
        }
        .animation(.easeInOut(duration: 0.3), value: auth.isAuthenticated)
    }
}

// MARK: - Splash Screen

struct SplashView: View {
    var body: some View {
        ZStack {
            SE7ENColors.background.ignoresSafeArea()

            VStack(spacing: SE7ENSpacing.lg) {
                SE7ENLogo(size: 100)

                Text("SE7EN FIT")
                    .font(.system(size: 28, weight: .black))
                    .foregroundStyle(SE7ENColors.textPrimary)
                    .kerning(3)

                ProgressView()
                    .tint(SE7ENColors.neonGreen)
                    .padding(.top, SE7ENSpacing.md)
            }
        }
    }
}
