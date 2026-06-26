import SwiftUI

// MARK: - Gym Owner Dashboard

struct OwnerHomeView: View {
    @Environment(AuthViewModel.self) private var auth
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            OwnerDashboardContent()
                .tabItem {
                    Image(systemName: "rectangle.grid.1x2.fill")
                    Text("Dashboard")
                }
                .tag(0)

            OwnerMembersView()
                .tabItem {
                    Image(systemName: "person.2.fill")
                    Text("Members")
                }
                .tag(1)

            OwnerAttendanceView()
                .tabItem {
                    Image(systemName: "qrcode")
                    Text("Attendance")
                }
                .tag(2)

            OwnerLeadsView()
                .tabItem {
                    Image(systemName: "person.badge.plus")
                    Text("Leads")
                }
                .tag(3)

            OwnerEarningsView()
                .tabItem {
                    Image(systemName: "chart.bar.fill")
                    Text("Earnings")
                }
                .tag(4)
        }
        .tint(SE7ENColors.limeAccent)
        .onAppear {
            let appearance = UITabBarAppearance()
            appearance.configureWithOpaqueBackground()
            appearance.backgroundColor = UIColor(SE7ENColors.surface)
            UITabBar.appearance().standardAppearance = appearance
            UITabBar.appearance().scrollEdgeAppearance = appearance
        }
    }
}

// MARK: - Dashboard Content

struct OwnerDashboardContent: View {
    @Environment(AuthViewModel.self) private var auth

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.lg) {
                    // Header
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("MY GYM")
                                .font(.system(size: SE7ENFontSize.xs, weight: .semibold))
                                .foregroundStyle(SE7ENColors.textMuted)
                                .tracking(1)
                            Text(auth.gymName)
                                .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                                .foregroundStyle(SE7ENColors.limeAccent)
                        }
                        Spacer()
                        Image(systemName: "bell.fill")
                            .font(.system(size: 16))
                            .foregroundStyle(SE7ENColors.textSecondary)
                            .frame(width: 40, height: 40)
                            .background(SE7ENColors.surfaceElevated)
                            .clipShape(Circle())
                    }

                    // Stats Grid
                    LazyVGrid(columns: [.init(.flexible()), .init(.flexible())], spacing: SE7ENSpacing.sm) {
                        OwnerStatCard(
                            icon: "indianrupeesign", iconColor: SE7ENColors.limeAccent,
                            label: "Monthly Revenue", value: "₹48.5K", trend: "+12%"
                        )
                        OwnerStatSimple(
                            icon: "person.2.fill", iconColor: Color(hex: "#4FC3F7"),
                            label: "Total Members", value: "127"
                        )
                        OwnerStatSimple(
                            icon: "person.badge.plus", iconColor: Color(hex: "#FFB74D"),
                            label: "New Leads", value: "14"
                        )
                        OwnerStatSimple(
                            icon: "qrcode", iconColor: Color(hex: "#81C784"),
                            label: "Today Check-ins", value: "38"
                        )
                    }

                    // More Features
                    Text("More Features")
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)

                    LazyVGrid(columns: Array(repeating: .init(.flexible()), count: 4), spacing: SE7ENSpacing.sm) {
                        FeatureButton(icon: "building.2.fill", label: "Profile")
                        FeatureButton(icon: "gearshape.2.fill", label: "Equipment")
                        FeatureButton(icon: "trophy.fill", label: "Challenges")
                        FeatureButton(icon: "megaphone.fill", label: "Announce")
                        FeatureButton(icon: "megaphone", label: "Promotions")
                        FeatureButton(icon: "indianrupeesign", label: "Rewards")
                        FeatureButton(icon: "star.fill", label: "Reviews")
                        FeatureButton(icon: "person.line.dotted.person.fill", label: "Referrals")
                    }

                    // Recent Members
                    Text("Recent Members")
                        .font(.system(size: SE7ENFontSize.lg, weight: .bold))
                        .foregroundStyle(SE7ENColors.textPrimary)

                    ForEach(["Rahul Mehta", "Priya Sharma", "Ankit Patel"], id: \.self) { name in
                        GlassCard {
                            HStack(spacing: SE7ENSpacing.md) {
                                Circle()
                                    .fill(SE7ENColors.surface)
                                    .frame(width: 36, height: 36)
                                    .overlay(
                                        Image(systemName: "person.fill")
                                            .font(.system(size: 14))
                                            .foregroundStyle(SE7ENColors.textSecondary)
                                    )
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(name)
                                        .font(.system(size: SE7ENFontSize.md, weight: .semibold))
                                        .foregroundStyle(SE7ENColors.textPrimary)
                                    Text("Joined 2 days ago")
                                        .font(.system(size: SE7ENFontSize.xs))
                                        .foregroundStyle(SE7ENColors.textMuted)
                                }
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .font(.system(size: 12))
                                    .foregroundStyle(SE7ENColors.textMuted)
                            }
                        }
                    }

                    Spacer().frame(height: 30)
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

// MARK: - Owner Stat Cards

struct OwnerStatCard: View {
    let icon: String
    let iconColor: Color
    let label: String
    let value: String
    let trend: String

    var body: some View {
        GlassCard(glow: true) {
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(label)
                        .font(.system(size: SE7ENFontSize.xs))
                        .foregroundStyle(SE7ENColors.textSecondary)
                    Spacer()
                    Image(systemName: icon)
                        .font(.system(size: 12))
                        .foregroundStyle(iconColor)
                }
                Text(value)
                    .font(.system(size: SE7ENFontSize.xxl, weight: .bold))
                    .foregroundStyle(SE7ENColors.textPrimary)
                HStack(spacing: 2) {
                    Image(systemName: "arrow.up.right")
                        .font(.system(size: 10))
                    Text("\(trend) from last month")
                }
                .font(.system(size: SE7ENFontSize.xs))
                .foregroundStyle(SE7ENColors.success)
            }
        }
    }
}

struct OwnerStatSimple: View {
    let icon: String
    let iconColor: Color
    let label: String
    let value: String

    var body: some View {
        GlassCard(padding: SE7ENSpacing.md) {
            VStack(spacing: 6) {
                Image(systemName: icon)
                    .font(.system(size: 14))
                    .foregroundStyle(iconColor)
                    .frame(width: 32, height: 32)
                    .background(iconColor.opacity(0.12))
                    .clipShape(.rect(cornerRadius: SE7ENRadius.md))

                Text(value)
                    .font(.system(size: SE7ENFontSize.xl, weight: .bold))
                    .foregroundStyle(SE7ENColors.textPrimary)

                Text(label)
                    .font(.system(size: SE7ENFontSize.xs))
                    .foregroundStyle(SE7ENColors.textSecondary)
                    .multilineTextAlignment(.center)
            }
            .frame(maxWidth: .infinity)
        }
    }
}

struct FeatureButton: View {
    let icon: String
    let label: String

    var body: some View {
        Button {} label: {
            VStack(spacing: SE7ENSpacing.xs) {
                Image(systemName: icon)
                    .font(.system(size: 14))
                    .foregroundStyle(SE7ENColors.limeAccent)
                    .frame(width: 32, height: 32)
                    .background(SE7ENColors.limeAccent.opacity(0.08))
                    .clipShape(.rect(cornerRadius: SE7ENRadius.md))

                Text(label)
                    .font(.system(size: 9))
                    .foregroundStyle(SE7ENColors.textSecondary)
                    .lineLimit(1)
            }
        }
    }
}

// MARK: - Members View

struct OwnerMembersView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                    Text("Members")
                        .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, 60)

                    EmptyState(
                        icon: "person.2.slash",
                        title: "No Members Yet",
                        message: "Your gym members will appear here once they join."
                    )
                }
                .padding(.horizontal, SE7ENSpacing.lg)
            }
            .scrollIndicators(.hidden)
            .se7enScreen()
        }
    }
}

// MARK: - Attendance View

struct OwnerAttendanceView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                    Text("Attendance")
                        .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, 60)

                    EmptyState(
                        icon: "qrcode",
                        title: "No Check-ins Today",
                        message: "Member attendance will show here when check-ins are recorded."
                    )
                }
                .padding(.horizontal, SE7ENSpacing.lg)
            }
            .scrollIndicators(.hidden)
            .se7enScreen()
        }
    }
}

// MARK: - Leads View

struct OwnerLeadsView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                    Text("Leads")
                        .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, 60)

                    EmptyState(
                        icon: "person.badge.plus",
                        title: "No Leads Yet",
                        message: "New potential member leads will appear here."
                    )
                }
                .padding(.horizontal, SE7ENSpacing.lg)
            }
            .scrollIndicators(.hidden)
            .se7enScreen()
        }
    }
}

// MARK: - Earnings View

struct OwnerEarningsView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: SE7ENSpacing.md) {
                    Text("Earnings")
                        .font(.system(size: SE7ENFontSize.xxl, weight: .black))
                        .foregroundStyle(SE7ENColors.textPrimary)
                        .padding(.top, 60)

                    // Revenue Summary Card
                    GlassCard(glow: true) {
                        VStack(spacing: SE7ENSpacing.sm) {
                            Text("This Month")
                                .font(.system(size: SE7ENFontSize.xs))
                                .foregroundStyle(SE7ENColors.textMuted)
                            Text("₹48,500")
                                .font(.system(size: SE7ENFontSize.hero, weight: .black))
                                .foregroundStyle(SE7ENColors.limeAccent)
                            Text("+12% from last month")
                                .font(.system(size: SE7ENFontSize.sm))
                                .foregroundStyle(SE7ENColors.success)
                        }
                    }

                    EmptyState(
                        icon: "chart.bar.xaxis",
                        title: "No Transactions Yet",
                        message: "Earning details will appear here when payments are received."
                    )
                }
                .padding(.horizontal, SE7ENSpacing.lg)
            }
            .scrollIndicators(.hidden)
            .se7enScreen()
        }
    }
}
