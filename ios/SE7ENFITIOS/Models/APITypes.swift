import Foundation

// MARK: - Core API Types

typealias UserRole = String

struct AuthTokens: Codable {
    let accessToken: String
    let refreshToken: String
}

struct User: Codable, Identifiable {
    let id: String
    let fullName: String
    let firstName: String?
    let email: String
    let phone: String?
    let role: UserRole
    let avatar: String?
    let height: Double?
    let weight: Double?
    let goal: String?
    let gymId: String?
    let subscriptionStatus: String?
    let trialEndsAt: String?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case fullName, firstName, email, phone, role, avatar, height, weight, goal, gymId, subscriptionStatus, trialEndsAt
    }
}

struct GymOwner: Codable, Identifiable {
    let id: String
    let ownerName: String
    let email: String
    let phone: String
    let role: UserRole
    let gym: Gym?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case ownerName, email, phone, role, gym
    }
}

struct Gym: Codable, Identifiable {
    let id: String
    let name: String
    let ownerName: String
    let phone: String
    let email: String
    let address: String?
    let city: String?
    let state: String?
    let pincode: String?
    let logo: String?
    let photos: [String]?
    let plans: [MembershipPlan]?
    let upiId: String?
    let rating: Double?
    let reviewCount: Int?
    let amenities: [String]?
    let openingHours: String?
    let description: String?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, ownerName, phone, email, address, city, state, pincode, logo, photos, plans, upiId, rating, reviewCount, amenities, openingHours, description
    }
}

struct MembershipPlan: Codable, Identifiable {
    let id: String?
    let name: String
    let duration: String
    let price: Double
    let features: [String]?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, duration, price, features
    }
}

struct Exercise: Codable, Identifiable {
    let id: String
    let name: String
    let targetMuscle: String
    let equipment: String
    let difficulty: String
    let sets: Int
    let reps: Int
    let restSeconds: Int
    let videoUrl: String?
    let thumbnailUrl: String?
    let formTips: [String]
    let commonMistakes: [String]
    let contentStatus: String

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, targetMuscle, equipment, difficulty, sets, reps, restSeconds, videoUrl, thumbnailUrl, formTips, commonMistakes, contentStatus
    }
}

struct WorkoutPlan: Codable, Identifiable {
    let id: String
    let name: String
    let exercises: [WorkoutExercise]
    let duration: Int
    let difficulty: String
    let targetMuscle: String?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, exercises, duration, difficulty, targetMuscle
    }
}

struct WorkoutExercise: Codable, Identifiable {
    let id: String = UUID().uuidString
    let exercise: Exercise
    let sets: Int
    let reps: Int
    let restSeconds: Int
    var completed: Bool = false

    enum CodingKeys: String, CodingKey {
        case exercise, sets, reps, restSeconds, completed
    }
}

struct NutritionEntry: Codable, Identifiable {
    let id: String?
    let type: String
    let name: String
    let calories: Int
    let protein: Int
    let carbs: Int
    let fat: Int
    let date: String

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case type, name, calories, protein, carbs, fat, date
    }
}

struct NutritionGoals: Codable {
    let calories: Int
    let protein: Int
    let carbs: Int
    let fat: Int
}

struct TrackingData: Codable {
    let water: Double
    let waterGoal: Double
    let steps: Int
    let stepGoal: Int
    let calories: Int
    let calorieGoal: Int
    let sleep: Double
    let sleepGoal: Double
    let weight: Double
    let weightGoal: Double
}

struct Challenge: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let target: String
    let rewardPoints: Int
    let duration: Int
    let difficulty: String
    let category: String
    let startDate: String?
    let endDate: String?
    let participants: Int
    var progress: Double?
    var joined: Bool?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case title, description, target, rewardPoints, duration, difficulty, category, startDate, endDate, participants, progress, joined
    }
}

struct Member: Codable, Identifiable {
    let id: String
    let fullName: String
    let email: String
    let phone: String?
    let membershipStatus: String
    let planName: String?
    let joinedAt: String
    let expiresAt: String?
    let paymentStatus: String
    let attendanceCount: Int?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case fullName, email, phone, membershipStatus, planName, joinedAt, expiresAt, paymentStatus, attendanceCount
    }
}

struct Lead: Codable, Identifiable {
    let id: String
    let name: String
    let phone: String
    let email: String?
    let status: String
    let followUpDate: String?
    let notes: String?
    let source: String?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, phone, email, status, followUpDate, notes, source
    }
}

struct AttendanceRecord: Codable, Identifiable {
    let id: String
    let memberId: String
    let memberName: String
    let checkInTime: String
    let checkOutTime: String?
    let date: String

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case memberId, memberName, checkInTime, checkOutTime, date
    }
}

struct Earning: Codable, Identifiable {
    let id: String?
    let type: String
    let amount: Double
    let date: String
    let status: String
    let memberName: String?
    let planName: String?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case type, amount, date, status, memberName, planName
    }
}

struct Announcement: Codable, Identifiable {
    let id: String
    let title: String
    let content: String
    let createdAt: String
    let expiresAt: String?
    let active: Bool

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case title, content, createdAt, expiresAt, active
    }
}

struct Promotion: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let cta: String
    let startDate: String
    let endDate: String
    let active: Bool
    let impressions: Int?
    let clicks: Int?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case title, description, cta, startDate, endDate, active, impressions, clicks
    }
}

struct Reward: Codable, Identifiable {
    let id: String
    let name: String
    let description: String
    let pointsNeeded: Int
    let image: String?
    let category: String
    let available: Bool

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, description, pointsNeeded, image, category, available
    }
}

struct Review: Codable, Identifiable {
    let id: String
    let userId: String
    let userName: String
    let rating: Int
    let comment: String
    let reply: String?
    let createdAt: String

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case userId, userName, rating, comment, reply, createdAt
    }
}

struct ReferralModel: Codable {
    let code: String
    let conversions: Int
    let rewards: Int
}

// MARK: - API Response

struct ApiResponse<T: Codable>: Codable {
    let success: Bool
    let data: T
    let message: String?
}

struct ApiErrorResponse: Codable {
    let success: Bool
    let message: String
}

enum ApiError: LocalizedError {
    case httpError(statusCode: Int, message: String)
    case networkError(String)
    case decodingError
    case htmlResponse
    case timeout

    var errorDescription: String? {
        switch self {
        case .httpError(let code, let msg):
            return msg.isEmpty ? "Request failed (status \(code))" : msg
        case .networkError(let msg):
            return msg
        case .decodingError:
            return "Failed to process server response"
        case .htmlResponse:
            return "Server returned an unexpected response. Please try again later."
        case .timeout:
            return "Request timed out. Please check your connection."
        }
    }
}
