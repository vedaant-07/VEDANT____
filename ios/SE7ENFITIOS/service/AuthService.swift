import Foundation

// MARK: - Auth Service

struct LoginPayload: Encodable {
    let email: String
    let password: String
    let role: String
}

struct SignupUserPayload: Encodable {
    let fullName: String
    let email: String
    let password: String
    let confirmPassword: String
    let referralCode: String?
}

struct SignupOwnerPayload: Encodable {
    let ownerName: String
    let mobile: String
    let email: String
    let password: String
    let confirmPassword: String
}

struct GoogleAuthPayload: Encodable {
    let idToken: String
    let accessToken: String
    let role: String
}

struct AuthResponseData: Codable {
    let user: UserOrOwner
    let tokens: AuthTokens
}

enum UserOrOwner: Codable {
    case user(User)
    case gymOwner(GymOwner)

    init(from decoder: any Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let user = try? container.decode(User.self), user.role == "user" {
            self = .user(user)
        } else if let owner = try? container.decode(GymOwner.self) {
            self = .gymOwner(owner)
        } else {
            // Fallback: try user first
            let user = try container.decode(User.self)
            self = .user(user)
        }
    }

    func encode(to encoder: any Encoder) throws {
        var container = encoder.singleValueContainer()
        switch self {
        case .user(let user): try container.encode(user)
        case .gymOwner(let owner): try container.encode(owner)
        }
    }

    var role: String {
        switch self {
        case .user: return "user"
        case .gymOwner: return "gym_owner"
        }
    }
}

actor AuthService {
    static let shared = AuthService()
    private let api = SE7ENAPIClient.shared

    func login(email: String, password: String, role: String) async throws {
        let endpoint = role == "gym_owner" ? "/api/auth/owner/login" : "/api/auth/user/login"
        let payload = LoginPayload(email: email, password: password, role: role)
        let res: ApiResponse<AuthResponseData> = try await api.post(endpoint, body: payload, requireAuth: false)
        await api.setAuthTokens(access: res.data.tokens.accessToken, refresh: res.data.tokens.refreshToken)
        try await saveProfileData(res.data.user)
    }

    func signupUser(fullName: String, email: String, password: String, confirmPassword: String, referralCode: String?) async throws {
        let payload = SignupUserPayload(
            fullName: fullName, email: email, password: password,
            confirmPassword: confirmPassword, referralCode: referralCode
        )
        let res: ApiResponse<AuthResponseData> = try await api.post("/api/auth/user/register", body: payload, requireAuth: false)
        await api.setAuthTokens(access: res.data.tokens.accessToken, refresh: res.data.tokens.refreshToken)
        try await saveProfileData(res.data.user)
    }

    func signupOwner(ownerName: String, mobile: String, email: String, password: String, confirmPassword: String) async throws {
        let payload = SignupOwnerPayload(
            ownerName: ownerName, mobile: mobile, email: email,
            password: password, confirmPassword: confirmPassword
        )
        let res: ApiResponse<AuthResponseData> = try await api.post("/api/auth/owner/register", body: payload, requireAuth: false)
        await api.setAuthTokens(access: res.data.tokens.accessToken, refresh: res.data.tokens.refreshToken)
        try await saveProfileData(res.data.user)
    }

    func googleAuth(idToken: String, accessToken: String, role: String) async throws {
        let payload = GoogleAuthPayload(idToken: idToken, accessToken: accessToken, role: role)
        let res: ApiResponse<AuthResponseData> = try await api.post("/api/auth/google", body: payload, requireAuth: false)
        await api.setAuthTokens(access: res.data.tokens.accessToken, refresh: res.data.tokens.refreshToken)
        try await saveProfileData(res.data.user)
    }

    func getProfile() async throws -> UserOrOwner {
        let res: ApiResponse<UserOrOwner> = try await api.get("/api/auth/me")
        try await saveProfileData(res.data)
        return res.data
    }

    func logout() async {
        try? await api.post("/api/auth/logout", body: Optional<String>.none)
        await api.clearTokens()
        UserDefaults.standard.removeObject(forKey: "se7enfit_profile")
    }

    var hasValidSession: Bool {
        get async {
            await api.hasValidSession
        }
    }

    private func saveProfileData(_ data: UserOrOwner) throws {
        let encoded = try JSONEncoder().encode(data)
        UserDefaults.standard.set(encoded, forKey: "se7enfit_profile")
    }

    func restoreProfile() -> UserOrOwner? {
        guard let data = UserDefaults.standard.data(forKey: "se7enfit_profile") else {
            return nil
        }
        return try? JSONDecoder().decode(UserOrOwner.self, from: data)
    }
}
