import SwiftUI

// MARK: - User Login Screen

struct UserLoginView: View {
    @Environment(AuthViewModel.self) private var auth
    @State private var email = ""
    @State private var password = ""
    @State private var showGoogleAlert = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                Spacer().frame(height: 20)

                // Header
                VStack(alignment: .leading, spacing: 4) {
                    Text("Welcome back")
                        .font(.system(size: SE7ENFontSize.xxxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    Text("Log in to your account")
                        .font(.system(size: SE7ENFontSize.md))
                        .foregroundStyle(SE7ENColors.textSecondary)
                }

                Spacer().frame(height: SE7ENSpacing.xl)

                // Error
                if let error = auth.errorMessage {
                    ErrorBanner(message: error)
                    Spacer().frame(height: SE7ENSpacing.md)
                }

                // Google Login
                GoogleButton(action: { showGoogleAlert = true })

                Spacer().frame(height: SE7ENSpacing.lg)

                // Divider
                HStack(spacing: SE7ENSpacing.md) {
                    Rectangle().fill(SE7ENColors.divider).frame(height: 1)
                    Text("or")
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textMuted)
                    Rectangle().fill(SE7ENColors.divider).frame(height: 1)
                }

                Spacer().frame(height: SE7ENSpacing.lg)

                // Email
                SE7ENInputField(
                    label: "Email", placeholder: "your@email.com", icon: "envelope",
                    text: $email, keyboardType: .emailAddress
                )

                Spacer().frame(height: SE7ENSpacing.md)

                // Password
                SE7ENInputField(
                    label: "Password", placeholder: "Enter your password", icon: "lock",
                    text: $password, isSecure: true
                )

                // Forgot password
                HStack {
                    Spacer()
                    Button("Forgot password?") {}
                        .font(.system(size: SE7ENFontSize.sm, weight: .medium))
                        .foregroundStyle(SE7ENColors.neonGreen)
                }
                .padding(.top, SE7ENSpacing.sm)

                Spacer().frame(height: SE7ENSpacing.lg)

                // Login button
                NeonButton(
                    title: "Log In",
                    isLoading: auth.isLoading,
                    action: {
                        Task { await auth.login(email: email, password: password, role: "user") }
                    }
                )

                Spacer().frame(height: SE7ENSpacing.lg)

                // Footer
                HStack(spacing: 4) {
                    Text("Don't have an account?")
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)
                    NavigationLink("Create Account") {
                        UserSignupView()
                    }
                    .font(.system(size: SE7ENFontSize.sm, weight: .semibold))
                    .foregroundStyle(SE7ENColors.neonGreen)
                }
                .frame(maxWidth: .infinity)

                Spacer().frame(height: 40)
            }
            .padding(.horizontal, SE7ENSpacing.xl)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
        .navigationBarBackButtonHidden(false)
        .toolbarBackground(.hidden, for: .navigationBar)
        .alert("Google Login", isPresented: $showGoogleAlert) {
            Button("OK", role: .cancel) {}
        } message: {
            Text("Google login is temporarily unavailable. Please use email login.")
        }
    }
}

// MARK: - User Signup Screen

struct UserSignupView: View {
    @Environment(AuthViewModel.self) private var auth
    @State private var fullName = ""
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var referralCode = ""

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                Spacer().frame(height: 20)

                VStack(alignment: .leading, spacing: 4) {
                    Text("Create Account")
                        .font(.system(size: SE7ENFontSize.xxxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                    Text("Join thousands on their fitness journey")
                        .font(.system(size: SE7ENFontSize.md))
                        .foregroundStyle(SE7ENColors.textSecondary)
                }

                Spacer().frame(height: SE7ENSpacing.lg)

                if let error = auth.errorMessage {
                    ErrorBanner(message: error)
                    Spacer().frame(height: SE7ENSpacing.md)
                }

                SE7ENInputField(label: "Full Name", placeholder: "Vedant Sharma", icon: "person.fill", text: $fullName, autocapitalization: .words)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Email", placeholder: "your@email.com", icon: "envelope", text: $email, keyboardType: .emailAddress)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Password", placeholder: "At least 6 characters", icon: "lock", text: $password, isSecure: true)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Confirm Password", placeholder: "Re-enter your password", icon: "lock", text: $confirmPassword, isSecure: true)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Gym Referral Code (Optional)", placeholder: "Enter referral code", icon: "gift", text: $referralCode, autocapitalization: .allCharacters)

                Spacer().frame(height: SE7ENSpacing.lg)

                NeonButton(
                    title: "Create Account",
                    isLoading: auth.isLoading,
                    action: {
                        let finalPassword = password
                        let finalConfirm = confirmPassword
                        if finalPassword.count < 6 {
                            auth.errorMessage = "Password must be at least 6 characters"
                            return
                        }
                        if finalPassword != finalConfirm {
                            auth.errorMessage = "Passwords do not match"
                            return
                        }
                        Task {
                            await auth.signupUser(
                                fullName: fullName, email: email,
                                password: finalPassword, confirmPassword: finalConfirm,
                                referralCode: referralCode.isEmpty ? nil : referralCode
                            )
                        }
                    }
                )

                Spacer().frame(height: SE7ENSpacing.lg)

                HStack(spacing: 4) {
                    Text("Already have an account?")
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)
                    NavigationLink("Log In") {
                        UserLoginView()
                    }
                    .font(.system(size: SE7ENFontSize.sm, weight: .semibold))
                    .foregroundStyle(SE7ENColors.neonGreen)
                }
                .frame(maxWidth: .infinity)

                Spacer().frame(height: 40)
            }
            .padding(.horizontal, SE7ENSpacing.xl)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
        .navigationBarBackButtonHidden(false)
        .toolbarBackground(.hidden, for: .navigationBar)
    }
}

// MARK: - Owner Login Screen

struct OwnerLoginView: View {
    @Environment(AuthViewModel.self) private var auth
    @State private var email = ""
    @State private var password = ""
    @State private var showGoogleAlert = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                Spacer().frame(height: 20)

                VStack(alignment: .leading, spacing: 4) {
                    Text("Gym Owner Login")
                        .font(.system(size: SE7ENFontSize.xxxl, weight: .black))
                        .foregroundStyle(SE7ENColors.limeAccent)
                    Text("Manage your gym, members & revenue")
                        .font(.system(size: SE7ENFontSize.md))
                        .foregroundStyle(SE7ENColors.textSecondary)
                }

                Spacer().frame(height: SE7ENSpacing.xl)

                if let error = auth.errorMessage {
                    ErrorBanner(message: error)
                    Spacer().frame(height: SE7ENSpacing.md)
                }

                GoogleButton(action: { showGoogleAlert = true })

                Spacer().frame(height: SE7ENSpacing.lg)

                HStack(spacing: SE7ENSpacing.md) {
                    Rectangle().fill(SE7ENColors.divider).frame(height: 1)
                    Text("or")
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textMuted)
                    Rectangle().fill(SE7ENColors.divider).frame(height: 1)
                }

                Spacer().frame(height: SE7ENSpacing.lg)

                SE7ENInputField(label: "Email", placeholder: "owner@gym.com", icon: "envelope", text: $email, keyboardType: .emailAddress)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Password", placeholder: "Enter your password", icon: "lock", text: $password, isSecure: true)

                HStack {
                    Spacer()
                    Button("Forgot password?") {}
                        .font(.system(size: SE7ENFontSize.sm, weight: .medium))
                        .foregroundStyle(SE7ENColors.limeAccent)
                }
                .padding(.top, SE7ENSpacing.sm)

                Spacer().frame(height: SE7ENSpacing.lg)

                NeonButton(
                    title: "Log In as Gym Owner",
                    isLoading: auth.isLoading,
                    action: {
                        Task { await auth.login(email: email, password: password, role: "gym_owner") }
                    }
                )

                Spacer().frame(height: SE7ENSpacing.lg)

                HStack(spacing: 4) {
                    Text("New gym owner?")
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)
                    NavigationLink("Register Your Gym") {
                        OwnerSignupView()
                    }
                    .font(.system(size: SE7ENFontSize.sm, weight: .semibold))
                    .foregroundStyle(SE7ENColors.limeAccent)
                }
                .frame(maxWidth: .infinity)

                Spacer().frame(height: 40)
            }
            .padding(.horizontal, SE7ENSpacing.xl)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
        .navigationBarBackButtonHidden(false)
        .toolbarBackground(.hidden, for: .navigationBar)
        .alert("Google Login", isPresented: $showGoogleAlert) {
            Button("OK", role: .cancel) {}
        } message: {
            Text("Google login is temporarily unavailable. Please use email login.")
        }
    }
}

// MARK: - Owner Signup Screen

struct OwnerSignupView: View {
    @Environment(AuthViewModel.self) private var auth
    @State private var ownerName = ""
    @State private var mobile = ""
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                Spacer().frame(height: 20)

                VStack(alignment: .leading, spacing: 4) {
                    Text("Register Your Gym")
                        .font(.system(size: SE7ENFontSize.xxxl, weight: .black))
                        .foregroundStyle(SE7ENColors.limeAccent)
                    Text("Start managing your gym with SE7EN FIT")
                        .font(.system(size: SE7ENFontSize.md))
                        .foregroundStyle(SE7ENColors.textSecondary)
                }

                Spacer().frame(height: SE7ENSpacing.lg)

                if let error = auth.errorMessage {
                    ErrorBanner(message: error)
                    Spacer().frame(height: SE7ENSpacing.md)
                }

                SE7ENInputField(label: "Owner Name", placeholder: "Your full name", icon: "person.fill", text: $ownerName, autocapitalization: .words)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Mobile Number", placeholder: "+91 9876543210", icon: "phone.fill", text: $mobile, keyboardType: .phonePad)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Email", placeholder: "owner@gym.com", icon: "envelope", text: $email, keyboardType: .emailAddress)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Password", placeholder: "At least 6 characters", icon: "lock", text: $password, isSecure: true)

                Spacer().frame(height: SE7ENSpacing.md)

                SE7ENInputField(label: "Confirm Password", placeholder: "Re-enter your password", icon: "lock", text: $confirmPassword, isSecure: true)

                Spacer().frame(height: SE7ENSpacing.lg)

                NeonButton(
                    title: "Register Gym",
                    isLoading: auth.isLoading,
                    action: {
                        let finalPassword = password
                        let finalConfirm = confirmPassword
                        if finalPassword.count < 6 {
                            auth.errorMessage = "Password must be at least 6 characters"
                            return
                        }
                        if finalPassword != finalConfirm {
                            auth.errorMessage = "Passwords do not match"
                            return
                        }
                        if mobile.count < 10 {
                            auth.errorMessage = "Please enter a valid mobile number"
                            return
                        }
                        Task {
                            await auth.signupOwner(
                                ownerName: ownerName, mobile: mobile,
                                email: email, password: finalPassword, confirmPassword: finalConfirm
                            )
                        }
                    }
                )

                Spacer().frame(height: SE7ENSpacing.lg)

                HStack(spacing: 4) {
                    Text("Already registered?")
                        .font(.system(size: SE7ENFontSize.sm))
                        .foregroundStyle(SE7ENColors.textSecondary)
                    NavigationLink("Log In") {
                        OwnerLoginView()
                    }
                    .font(.system(size: SE7ENFontSize.sm, weight: .semibold))
                    .foregroundStyle(SE7ENColors.limeAccent)
                }
                .frame(maxWidth: .infinity)

                Spacer().frame(height: 40)
            }
            .padding(.horizontal, SE7ENSpacing.xl)
        }
        .scrollIndicators(.hidden)
        .se7enScreen()
        .navigationBarBackButtonHidden(false)
        .toolbarBackground(.hidden, for: .navigationBar)
    }
}

// MARK: - Google Button

struct GoogleButton: View {
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: SE7ENSpacing.md) {
                Text("G")
                    .font(.system(size: SE7ENFontSize.xl, weight: .bold))
                    .foregroundStyle(SE7ENColors.textPrimary)
                Text("Continue with Google")
                    .font(.system(size: SE7ENFontSize.md, weight: .semibold))
                    .foregroundStyle(SE7ENColors.textSecondary)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 50)
            .background(SE7ENColors.surfaceElevated)
            .clipShape(.rect(cornerRadius: SE7ENRadius.md))
            .overlay(
                RoundedRectangle(cornerRadius: SE7ENRadius.md)
                    .stroke(SE7ENColors.cardBorder, lineWidth: 1)
            )
        }
    }
}
