import { View, StyleSheet, type ViewProps } from "react-native";
import { Colors, Radius, Spacing } from "../../constants/colors";

interface GlassCardProps extends ViewProps {
  glow?: boolean;
  padding?: number;
}

export function GlassCard({
  glow = false,
  padding = Spacing.md,
  style,
  children,
  ...props
}: GlassCardProps) {
  return (
    <View
      style={[
        styles.card,
        padding !== undefined && { padding },
        glow && styles.glow,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  glow: {
    borderColor: Colors.neonGreenDim,
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
});
