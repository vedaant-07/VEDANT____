import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type TouchableOpacityProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Radius, FontSize, Spacing } from "../../constants/colors";

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export function GradientButton({
  title,
  loading = false,
  variant = "primary",
  style,
  disabled,
  ...props
}: GradientButtonProps) {
  const isDisabled = disabled || loading;

  if (variant === "outline") {
    return (
      <TouchableOpacity
        style={[styles.base, styles.outline, style]}
        disabled={isDisabled}
        activeOpacity={0.7}
        {...props}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.neonGreen} />
        ) : (
          <Text style={styles.outlineText}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === "secondary") {
    return (
      <TouchableOpacity
        style={[styles.base, styles.secondary, style]}
        disabled={isDisabled}
        activeOpacity={0.7}
        {...props}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.neonGreen} />
        ) : (
          <Text style={styles.secondaryText}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.base, style]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      <LinearGradient
        colors={[Colors.neonGreen, Colors.neonGreenDim]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.textInverse} />
        ) : (
          <Text style={styles.primaryText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    overflow: "hidden",
    minHeight: 50,
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  primaryText: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textInverse,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: Colors.neonGreen,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    backgroundColor: "transparent",
  },
  outlineText: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.neonGreen,
  },
  secondary: {
    backgroundColor: Colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  secondaryText: {
    fontSize: FontSize.lg,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
