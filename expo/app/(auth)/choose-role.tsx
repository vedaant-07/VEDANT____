import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dumbbell, Building2, ChevronRight } from "lucide-react-native";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function ChooseRoleScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ChevronRight
          size={20}
          color={Colors.textSecondary}
          style={{ transform: [{ rotate: "180deg" }] }}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Choose your{"\n"}account type</Text>
        <Text style={styles.subtitle}>
          Select how you want to use SE7EN FIT
        </Text>
      </View>

      <View style={styles.cards}>
        <TouchableOpacity
          style={[styles.card, styles.userCard]}
          activeOpacity={0.7}
          onPress={() => router.push("/(auth)/user-login")}
        >
          <View style={[styles.iconBox, styles.userIconBox]}>
            <Dumbbell size={28} color={Colors.neonGreen} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Continue as User</Text>
            <Text style={styles.cardDesc}>
              Track workouts, nutrition, challenges & more
            </Text>
          </View>
          <ChevronRight size={20} color={Colors.neonGreen} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.ownerCard]}
          activeOpacity={0.7}
          onPress={() => router.push("/(auth)/owner-login")}
        >
          <View style={[styles.iconBox, styles.ownerIconBox]}>
            <Building2 size={28} color={Colors.limeAccent} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Continue as Gym Owner</Text>
            <Text style={styles.cardDesc}>
              Manage your gym, members, attendance & revenue
            </Text>
          </View>
          <ChevronRight size={20} color={Colors.limeAccent} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
  },
  backButton: {
    marginTop: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: "900",
    color: Colors.textPrimary,
    lineHeight: 40,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  cards: {
    gap: Spacing.md,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  userCard: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.neonGreenDim + "40",
  },
  ownerCard: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.limeAccent + "30",
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  userIconBox: {
    backgroundColor: Colors.neonGreenGlow,
  },
  ownerIconBox: {
    backgroundColor: Colors.limeAccent + "15",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
