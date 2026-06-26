import SwiftUI
import Observation

// MARK: - Auth ViewModel

@MainActor
@Observable
final class AuthViewModel {
    var isAuthenticated = false
    var isLoading = true
    var userRole: String?
    var userProfile: UserOrOwner?
    var errorMessage: String?

    private let authService = AuthService.shared

    var firstName: String {
        if case .user(let user) = userProfile {
            return user.firstName ?? user.fullName.components(separatedBy: " ").first ?? "Vedant"
        }
        if case .gymOwner(let owner) = userProfile {
            return owner.ownerName.components(separatedBy: " ").first ?? "Owner"
        }
        return "Vedant"
    }

    var gymName: String {
        if case .gymOwner(let owner) = userProfile, let gym = owner.gym {
            return gym.name
        }
        return "Iron Paradise Gym"
    }

    func restoreSession() async {
        isLoading = true
        let hasSession = await authService.hasValidSession
        guard hasSession else {
            isLoading = false
            return
        }

        if let saved = authService.restoreProfile() {
            userProfile = saved
            userRole = saved.role
            isAuthenticated = true
        } else {
            do {
                let profile = try await authService.getProfile()
                userProfile = profile
                userRole = profile.role
                isAuthenticated = true
            } catch {
                await authService.logout()
            }
        }
        isLoading = false
    }

    func login(email: String, password: String, role: String) async {
        errorMessage = nil
        isLoading = true
        do {
            try await authService.login(email: email, password: password, role: role)
            let profile = try await authService.getProfile()
            userProfile = profile
            userRole = profile.role
            isAuthenticated = true
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }

    func signupUser(fullName: String, email: String, password: String, confirmPassword: String, referralCode: String?) async {
        errorMessage = nil
        isLoading = true
        do {
            try await authService.signupUser(fullName: fullName, email: email, password: password, confirmPassword: confirmPassword, referralCode: referralCode)
            let profile = try await authService.getProfile()
            userProfile = profile
            userRole = profile.role
            isAuthenticated = true
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }

    func signupOwner(ownerName: String, mobile: String, email: String, password: String, confirmPassword: String) async {
        errorMessage = nil
        isLoading = true
        do {
            try await authService.signupOwner(ownerName: ownerName, mobile: mobile, email: email, password: password, confirmPassword: confirmPassword)
            let profile = try await authService.getProfile()
            userProfile = profile
            userRole = profile.role
            isAuthenticated = true
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }

    func logout() async {
        await authService.logout()
        isAuthenticated = false
        userProfile = nil
        userRole = nil
    }
}
