import SwiftUI

// MARK: - SE7EN FIT Design System

enum SE7ENColors {
    static let background = Color(hex: "#050505")
    static let surface = Color(hex: "#0A0A0A")
    static let surfaceElevated = Color(hex: "#111111")
    static let card = Color(hex: "#0D0D0D")
    static let cardBorder = Color(hex: "#1A1A1A")

    static let neonGreen = Color(hex: "#29E06B")
    static let neonGreenDim = Color(hex: "#1DB954")
    static let neonGreenGlow = Color(hex: "#29E06B").opacity(0.15)
    static let limeAccent = Color(hex: "#D4FF00")
    static let limeAccentDim = Color(hex: "#A8CC00")

    static let textPrimary = Color.white
    static let textSecondary = Color(hex: "#999999")
    static let textMuted = Color(hex: "#666666")
    static let textInverse = Color(hex: "#050505")

    static let success = neonGreen
    static let error = Color(hex: "#FF4444")
    static let warning = Color(hex: "#FFB444")
    static let info = Color(hex: "#44A4FF")

    static let divider = Color(hex: "#1A1A1A")
    static let overlay = Color.black.opacity(0.6)
}

enum SE7ENSpacing {
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
    static let xxl: CGFloat = 48
}

enum SE7ENRadius {
    static let sm: CGFloat = 8
    static let md: CGFloat = 12
    static let lg: CGFloat = 16
    static let xl: CGFloat = 20
    static let xxl: CGFloat = 24
    static let full: CGFloat = 9999
}

enum SE7ENFontSize {
    static let xs: CGFloat = 11
    static let sm: CGFloat = 13
    static let md: CGFloat = 15
    static let lg: CGFloat = 17
    static let xl: CGFloat = 20
    static let xxl: CGFloat = 24
    static let xxxl: CGFloat = 32
    static let hero: CGFloat = 40
}

// MARK: - Color Hex Init

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6:
            (a, r, g, b) = (255, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = ((int >> 24) & 0xFF, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
