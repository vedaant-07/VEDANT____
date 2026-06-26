import Foundation

// MARK: - API Client

actor SE7ENAPIClient {
    static let shared = SE7ENAPIClient()
    private let baseURL = "https://se7enfit-original.onrender.com"
    private let timeout: TimeInterval = 15
    private let tokenKey = "se7enfit_tokens"

    private var accessToken: String?
    private var refreshToken: String?

    private init() {
        restoreTokens()
    }

    private func restoreTokens() {
        guard let data = UserDefaults.standard.data(forKey: tokenKey),
              let tokens = try? JSONDecoder().decode(AuthTokens.self, from: data) else {
            return
        }
        accessToken = tokens.accessToken
        refreshToken = tokens.refreshToken
    }

    private func saveTokens(access: String, refresh: String) {
        accessToken = access
        refreshToken = refresh
        let tokens = AuthTokens(accessToken: access, refreshToken: refresh)
        if let data = try? JSONEncoder().encode(tokens) {
            UserDefaults.standard.set(data, forKey: tokenKey)
        }
    }

    func clearTokens() {
        accessToken = nil
        refreshToken = nil
        UserDefaults.standard.removeObject(forKey: tokenKey)
    }

    var hasValidSession: Bool {
        accessToken != nil
    }

    // MARK: - Request

    func request<T: Codable>(
        _ endpoint: String,
        method: String = "GET",
        body: (any Encodable)? = nil,
        requireAuth: Bool = true
    ) async throws -> ApiResponse<T> {
        guard let url = URL(string: baseURL + endpoint) else {
            throw ApiError.networkError("Invalid URL")
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.timeoutInterval = timeout
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        if requireAuth, let token = accessToken {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        if let body = body {
            request.httpBody = try? JSONEncoder().encode(AnyEncodable(body))
        }

        do {
            let (data, response) = try await URLSession.shared.data(for: request)

            guard let httpResponse = response as? HTTPURLResponse else {
                throw ApiError.networkError("Invalid response")
            }

            // Check for HTML
            if let contentType = httpResponse.allHeaderFields["Content-Type"] as? String,
               !contentType.contains("application/json") {
                if let text = String(data: data, encoding: .utf8),
                   text.trimmingCharacters(in: .whitespaces).hasPrefix("<") {
                    throw ApiError.htmlResponse
                }
            }

            if httpResponse.statusCode == 401, requireAuth, let refresh = refreshToken {
                // Try refresh
                if try await refreshAccessToken(refreshToken: refresh) {
                    // Retry with new token
                    return try await performRequest(url: url, method: method, body: body)
                }
                clearTokens()
                throw ApiError.httpError(statusCode: 401, message: "Session expired. Please log in again.")
            }

            if !(200...299).contains(httpResponse.statusCode) {
                if let errorResp = try? JSONDecoder().decode(ApiErrorResponse.self, from: data) {
                    throw ApiError.httpError(statusCode: httpResponse.statusCode, message: errorResp.message)
                }
                throw ApiError.httpError(statusCode: httpResponse.statusCode, message: "Request failed (status \(httpResponse.statusCode))")
            }

            let decoded = try JSONDecoder().decode(ApiResponse<T>.self, from: data)
            return decoded

        } catch let error as ApiError {
            throw error
        } catch is DecodingError {
            throw ApiError.decodingError
        } catch {
            if (error as NSError).code == NSURLErrorTimedOut {
                throw ApiError.timeout
            }
            throw ApiError.networkError(error.localizedDescription)
        }
    }

    private func performRequest<T: Codable>(
        url: URL,
        method: String,
        body: (any Encodable)?,
        requireAuth: Bool = true
    ) async throws -> ApiResponse<T> {
        var req = URLRequest(url: url)
        req.httpMethod = method
        req.timeoutInterval = timeout
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue("application/json", forHTTPHeaderField: "Accept")

        if requireAuth, let token = accessToken {
            req.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        if let body = body {
            req.httpBody = try? JSONEncoder().encode(AnyEncodable(body))
        }

        let (data, response) = try await URLSession.shared.data(for: req)
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw ApiError.httpError(statusCode: (response as? HTTPURLResponse)?.statusCode ?? 0, message: "Request failed")
        }
        return try JSONDecoder().decode(ApiResponse<T>.self, from: data)
    }

    private func refreshAccessToken(refreshToken token: String) async throws -> Bool {
        guard let url = URL(string: baseURL + "/api/auth/refresh") else { return false }
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try? JSONEncoder().encode(["refreshToken": token])

        let (data, response) = try await URLSession.shared.data(for: req)
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else { return false }

        if let result = try? JSONDecoder().decode(ApiResponse<AuthTokens>.self, from: data) {
            saveTokens(access: result.data.accessToken, refresh: result.data.refreshToken)
            return true
        }
        return false
    }

    // MARK: - Auth Helpers

    func setAuthTokens(access: String, refresh: String) {
        saveTokens(access: access, refresh: refresh)
    }

    // MARK: - Convenience

    func get<T: Codable>(_ endpoint: String, requireAuth: Bool = true) async throws -> ApiResponse<T> {
        try await request(endpoint, method: "GET", requireAuth: requireAuth)
    }

    func post<T: Codable>(_ endpoint: String, body: (any Encodable)? = nil, requireAuth: Bool = true) async throws -> ApiResponse<T> {
        try await request(endpoint, method: "POST", body: body, requireAuth: requireAuth)
    }

    func put<T: Codable>(_ endpoint: String, body: (any Encodable)? = nil, requireAuth: Bool = true) async throws -> ApiResponse<T> {
        try await request(endpoint, method: "PUT", body: body, requireAuth: requireAuth)
    }

    func delete<T: Codable>(_ endpoint: String, requireAuth: Bool = true) async throws -> ApiResponse<T> {
        try await request(endpoint, method: "DELETE", requireAuth: requireAuth)
    }
}

/// Wrapper to encode arbitrary Encodable values
struct AnyEncodable: Encodable {
    let value: any Encodable

    init(_ value: any Encodable) {
        self.value = value
    }

    func encode(to encoder: any Encoder) throws {
        try value.encode(to: encoder)
    }
}
