import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Crown, Check, Sparkles, ChevronRight } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { GradientButton } from "../../src/components/GradientButton";
import { subscriptionService } from "../../src/services/subscriptionService";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function SubscriptionScreen() {
  const plans = subscriptionService.getPlans();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight
            size={20}
            color={Colors.textSecondary}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Upgrade to Premium</Text>
        <Text style={styles.subtitle}>Unlock your full fitness potential</Text>

        {/* Plan Cards */}
        {plans
          .filter((p) => p.price > 0)
          .map((plan) => (
            <GlassCard
              key={plan.id}
              glow={plan.highlighted}
              style={[
                styles.planCard,
                plan.highlighted && styles.planHighlighted,
              ]}
            >
              {plan.highlighted && (
                <View style={styles.bestValueBadge}>
                  <Sparkles size={12} color={Colors.textInverse} />
                  <Text style={styles.bestValueText}>BEST VALUE</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <Crown
                  size={20}
                  color={plan.highlighted ? Colors.neonGreen : Colors.textSecondary}
                />
                <Text style={styles.planName}>{plan.name}</Text>
              </View>
              <View style={styles.planPriceRow}>
                <Text style={styles.planCurrency}>{plan.currency}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planPeriod}>/{plan.period}</Text>
              </View>
              {plan.id === "premium_quarterly" && (
                <Text style={styles.planSavings}>Save 50% vs monthly</Text>
              )}
              {plan.id === "premium_yearly" && (
                <Text style={styles.planSavings}>Save 66% vs monthly</Text>
              )}
              <View style={styles.features}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Check size={14} color={Colors.neonGreen} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <GradientButton
                title={plan.highlighted ? "Start Free Trial" : "Choose Plan"}
                onPress={() => {}}
              />
            </GlassCard>
          ))}

        {/* Free Trial */}
        <GlassCard style={styles.trialCard} padding={Spacing.md}>
          <View style={styles.trialRow}>
            <View style={styles.trialInfo}>
              <Text style={styles.trialTitle}>7-Day Free Trial</Text>
              <Text style={styles.trialSub}>Try before you commit</Text>
            </View>
            <GradientButton title="Start Trial" onPress={() => {}} />
          </View>
        </GlassCard>

        <Text style={styles.finePrint}>
          Subscriptions auto-renew. Cancel anytime from your account settings.
          Payment will be charged to your App Store / Play Store account.
        </Text>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
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
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: "900",
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  planCard: {
    marginBottom: Spacing.md,
    position: "relative",
  },
  planHighlighted: {
    borderColor: Colors.neonGreenDim,
    borderWidth: 1.5,
  },
  bestValueBadge: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.neonGreen,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  bestValueText: {
    fontSize: FontSize.xs,
    fontWeight: "800",
    color: Colors.textInverse,
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  planName: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  planPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  planCurrency: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.textSecondary,
    marginRight: 2,
  },
  planPrice: {
    fontSize: FontSize.hero,
    fontWeight: "900",
    color: Colors.neonGreen,
  },
  planPeriod: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  planSavings: {
    fontSize: FontSize.sm,
    color: Colors.neonGreen,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  features: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  featureText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  trialCard: {
    marginBottom: Spacing.lg,
  },
  trialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trialInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  trialTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  trialSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  finePrint: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },
});
