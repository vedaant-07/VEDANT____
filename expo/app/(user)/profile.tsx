import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  User,
  Mail,
  Phone,
  Scale,
  Target,
  Crown,
  Building2,
  LogOut,
  ChevronRight,
  Settings,
  HelpCircle,
  Shield,
} from "lucide-react-native";
import type { User as UserType } from "../../src/api/types";
import { useAuth } from "../../src/hooks/useAuth";
import { GlassCard } from "../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function ProfileScreen() {
  const { user: authUser, logout } = useAuth();
  const user = authUser as UserType;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/welcome");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight
            size={20}
            color={Colors.textSecondary}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <User size={36} color={Colors.neonGreen} />
          </View>
          <Text style={styles.name}>{user?.fullName || "Fitness User"}</Text>
          <Text style={styles.email}>{user?.email || "user@email.com"}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Scale size={16} color={Colors.neonGreen} />
            <Text style={styles.statValue}>{user?.weight || 72} kg</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Target size={16} color={Colors.neonGreen} />
            <Text style={styles.statValue}>{user?.goal || "Muscle Gain"}</Text>
            <Text style={styles.statLabel}>Goal</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Crown size={16} color={Colors.neonGreen} />
            <Text style={styles.statValue}>{user?.subscriptionStatus || "Free"}</Text>
            <Text style={styles.statLabel}>Plan</Text>
          </View>
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Account</Text>

        <MenuItem icon={<Mail size={18} />} label="Email" value={user?.email || "Not set"} />
        <MenuItem icon={<Phone size={18} />} label="Phone" value={user?.phone || "Add phone"} />
        <MenuItem
          icon={<Building2 size={18} />}
          label="Linked Gym"
          value={user?.gymId ? "View gym" : "Not linked"}
        />

        <Text style={styles.sectionTitle}>Fitness</Text>

        <MenuItem icon={<Scale size={18} />} label="Height & Weight" value="Update" />
        <MenuItem icon={<Target size={18} />} label="Fitness Goal" value={user?.goal || "Set goal"} />

        <Text style={styles.sectionTitle}>Subscription</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(user)/subscription")}
        >
          <GlassCard padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Crown size={18} color={Colors.neonGreen} />
                <Text style={styles.menuLabel}>Upgrade to Premium</Text>
              </View>
              <ChevronRight size={18} color={Colors.textMuted} />
            </View>
          </GlassCard>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>App</Text>

        <MenuItem icon={<Settings size={18} />} label="Theme" value="Dark" />
        <MenuItem icon={<HelpCircle size={18} />} label="Support" value="" />
        <MenuItem icon={<Shield size={18} />} label="Privacy Policy" value="" />

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <LogOut size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>SE7EN FIT v1.0.0</Text>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

function MenuItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <GlassCard padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
      <View style={styles.menuRow}>
        <View style={styles.menuLeft}>
          <View style={styles.menuIcon}>{icon}</View>
          <Text style={styles.menuLabel}>{label}</Text>
        </View>
        <View style={styles.menuRight}>
          {value ? <Text style={styles.menuValue}>{value}</Text> : null}
          <ChevronRight size={16} color={Colors.textMuted} />
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.neonGreenGlow,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.neonGreenDim,
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  email: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.divider,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  menuValue: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    paddingVertical: 14,
    borderRadius: Radius.md,
    backgroundColor: Colors.error + "10",
    borderWidth: 1,
    borderColor: Colors.error + "30",
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.error,
  },
  versionText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.lg,
  },
});
