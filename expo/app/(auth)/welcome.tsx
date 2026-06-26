import { View, Text, StyleSheet, Dimensions } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { GradientButton } from "../../src/components/GradientButton";
import { Colors, FontSize, Spacing } from "../../constants/colors";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#050505", "#0A0A0A", "#050505"]}
        style={styles.background}
      />

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <View style={styles.glowRing}>
            <Text style={styles.logoText}>7</Text>
          </View>
        </View>
        <Text style={styles.brandName}>SE7EN FIT</Text>
        <Text style={styles.tagline}>
          Your AI-powered fitness journey{"\n"}starts here.
        </Text>
      </View>

      {/* Bottom CTA */}
      <View style={styles.ctaSection}>
        <GradientButton
          title="Get Started"
          onPress={() => router.push("/(auth)/choose-role")}
        />
        <Text style={styles.finePrint}>
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  glowRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.neonGreen,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.neonGreenGlow,
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 64,
    fontWeight: "900",
    color: Colors.neonGreen,
    textShadowColor: Colors.neonGreen,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  brandName: {
    fontSize: 36,
    fontWeight: "900",
    color: Colors.textPrimary,
    letterSpacing: 3,
    marginBottom: Spacing.md,
  },
  tagline: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 26,
  },
  ctaSection: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 60,
    gap: Spacing.md,
  },
  finePrint: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: "center",
  },
});
