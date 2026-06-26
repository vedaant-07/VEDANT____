import SwiftUI

// MARK: - Glass Card

struct GlassCard<Content: View>: View {
    let glow: Bool
    let padding: CGFloat
    let content: Content

    init(
        glow: Bool = false,
        padding: CGFloat = SE7ENSpacing.md,
        @ViewBuilder content: () -> Content
    ) {
        self.glow = glow
        self.padding = padding
        self.content = content()
    }

    var body: some View {
        content
            .padding(padding)
            .frame(maxWidth: .infinity)
            .background(SE7ENColors.surfaceElevated)
            .clipShape(.rect(cornerRadius: SE7ENRadius.lg))
            .overlay(
                RoundedRectangle(cornerRadius: SE7ENRadius.lg)
                    .stroke(glow ? SE7ENColors.neonGreenDim : SE7ENColors.cardBorder, lineWidth: 1)
            )
            .shadow(color: glow ? SE7ENColors.neonGreenGlow : .clear, radius: glow ? 12 : 0)
    }
}

// MARK: - Neon Button

struct NeonButton: View {
    let title: String
    let isLoading: Bool
    let variant: NeonButtonVariant
    let action: () -> Void

    enum NeonButtonVariant {
        case primary
        case secondary
        case outline
    }

    init(
        title: String,
        isLoading: Bool = false,
        variant: NeonButtonVariant = .primary,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.isLoading = isLoading
        self.variant = variant
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            Group {
                if isLoading {
                    ProgressView()
                        .tint(variant == .primary ? SE7ENColors.textInverse : SE7ENColors.neonGreen)
                } else {
                    Text(title)
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                }
            }
            .frame(maxWidth: .infinity)
            .frame(minHeight: 50)
            .padding(.horizontal, SE7ENSpacing.lg)
        }
        .disabled(isLoading)
        .buttonStyle(NeonButtonStyle(variant: variant))
    }
}

struct NeonButtonStyle: ButtonStyle {
    let variant: NeonButton.NeonButtonVariant

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .background(background)
            .clipShape(.rect(cornerRadius: SE7ENRadius.md))
            .overlay(
                RoundedRectangle(cornerRadius: SE7ENRadius.md)
                    .stroke(borderColor, lineWidth: variant == .outline ? 1.5 : 0)
            )
            .foregroundStyle(foregroundColor)
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
            .animation(.easeOut(duration: 0.15), value: configuration.isPressed)
    }

    private var background: some ShapeStyle {
        switch variant {
        case .primary:
            AnyShapeStyle(
                LinearGradient(
                    colors: [SE7ENColors.neonGreen, SE7ENColors.neonGreenDim],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
        case .secondary:
            AnyShapeStyle(SE7ENColors.surfaceElevated)
        case .outline:
            AnyShapeStyle(Color.clear)
        }
    }

    private var foregroundColor: Color {
        switch variant {
        case .primary: SE7ENColors.textInverse
        case .secondary: SE7ENColors.textPrimary
        case .outline: SE7ENColors.neonGreen
        }
    }

    private var borderColor: Color {
        variant == .secondary ? SE7ENColors.cardBorder : SE7ENColors.neonGreen
    }
}

// MARK: - Input Field

struct SE7ENInputField: View {
    let label: String
    let placeholder: String
    let icon: String
    @Binding var text: String
    var isSecure: Bool = false
    var keyboardType: UIKeyboardType = .default
    var autocapitalization: TextInputAutocapitalization = .never

    @State private var showSecureText = false

    var body: some View {
        VStack(alignment: .leading, spacing: SE7ENSpacing.xs) {
            Text(label)
                .font(.system(size: SE7ENFontSize.sm, weight: .semibold))
                .foregroundStyle(SE7ENColors.textSecondary)
                .padding(.leading, 4)

            HStack(spacing: SE7ENSpacing.sm) {
                Image(systemName: icon)
                    .font(.system(size: 14))
                    .foregroundStyle(SE7ENColors.textMuted)

                if isSecure && !showSecureText {
                    SecureField(placeholder, text: $text)
                        .textContentType(.password)
                } else {
                    TextField(placeholder, text: $text)
                        .keyboardType(keyboardType)
                        .textInputAutocapitalization(autocapitalization)
                        .autocorrectionDisabled()
                }

                if isSecure {
                    Button {
                        showSecureText.toggle()
                    } label: {
                        Image(systemName: showSecureText ? "eye.slash" : "eye")
                            .font(.system(size: 14))
                            .foregroundStyle(SE7ENColors.textMuted)
                    }
                }
            }
            .padding(.horizontal, SE7ENSpacing.md)
            .frame(height: 50)
            .background(SE7ENColors.surfaceElevated)
            .clipShape(.rect(cornerRadius: SE7ENRadius.md))
            .overlay(
                RoundedRectangle(cornerRadius: SE7ENRadius.md)
                    .stroke(SE7ENColors.cardBorder, lineWidth: 1)
            )
            .foregroundStyle(SE7ENColors.textPrimary)
            .font(.system(size: SE7ENFontSize.md))
        }
    }
}

// MARK: - Error Banner

struct ErrorBanner: View {
    let message: String

    var body: some View {
        HStack(spacing: SE7ENSpacing.sm) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 13))
            Text(message)
                .font(.system(size: SE7ENFontSize.sm))
        }
        .foregroundStyle(SE7ENColors.error)
        .padding(SE7ENSpacing.md)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(SE7ENColors.error.opacity(0.08))
        .clipShape(.rect(cornerRadius: SE7ENRadius.md))
        .overlay(
            RoundedRectangle(cornerRadius: SE7ENRadius.md)
                .stroke(SE7ENColors.error.opacity(0.25), lineWidth: 1)
        )
    }
}

// MARK: - Empty State

struct EmptyState: View {
    let icon: String
    let title: String
    let message: String

    var body: some View {
        VStack(spacing: SE7ENSpacing.md) {
            Image(systemName: icon)
                .font(.system(size: 48))
                .foregroundStyle(SE7ENColors.textMuted)
            Text(title)
                .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                .foregroundStyle(SE7ENColors.textPrimary)
            Text(message)
                .font(.system(size: SE7ENFontSize.sm))
                .foregroundStyle(SE7ENColors.textSecondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, SE7ENSpacing.xxl)
    }
}

// MARK: - Glowing "7" Logo

struct SE7ENLogo: View {
    let size: CGFloat

    var body: some View {
        ZStack {
            Circle()
                .stroke(SE7ENColors.neonGreen, lineWidth: 2.5)
                .frame(width: size, height: size)

            Text("7")
                .font(.system(size: size * 0.5, weight: .black))
                .foregroundStyle(SE7ENColors.neonGreen)
        }
        .background(Circle().fill(SE7ENColors.neonGreenGlow))
        .shadow(color: SE7ENColors.neonGreen.opacity(0.4), radius: 16)
    }
}

// MARK: - Screen Modifier

struct SE7ENScreenModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(SE7ENColors.background)
            .preferredColorScheme(.dark)
    }
}

extension View {
    func se7enScreen() -> some View {
        modifier(SE7ENScreenModifier())
    }
}
