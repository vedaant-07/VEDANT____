import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import {
  Camera,
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
  Flame,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function FoodScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "SE7EN FIT needs photo library access to scan your meals. Please enable it in Settings."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      simulateScan(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "SE7EN FIT needs camera access to scan your food. Please enable it in Settings."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      simulateScan(result.assets[0].uri);
    }
  };

  const simulateScan = (_uri: string) => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult({
        name: "Chicken Biryani",
        calories: 550,
        protein: 30,
        carbs: 55,
        fat: 20,
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.scroll}>
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

        <Text style={styles.title}>Food Scan</Text>
        <Text style={styles.subtitle}>
          Snap a photo to detect calories & macros
        </Text>

        {!image && !result && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.7}
              onPress={takePhoto}
            >
              <GlassCard padding={Spacing.xl} style={styles.actionInner}>
                <Camera size={40} color={Colors.neonGreen} />
                <Text style={styles.actionLabel}>Take Photo</Text>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.7}
              onPress={pickImage}
            >
              <GlassCard padding={Spacing.xl} style={styles.actionInner}>
                <ImageIcon size={40} color={Colors.neonGreen} />
                <Text style={styles.actionLabel}>Upload Image</Text>
              </GlassCard>
            </TouchableOpacity>
          </View>
        )}

        {image && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image }} style={styles.previewImage} />
          </View>
        )}

        {scanning && (
          <GlassCard style={styles.scanningCard}>
            <Sparkles size={24} color={Colors.neonGreen} />
            <Text style={styles.scanningText}>AI analyzing your food...</Text>
          </GlassCard>
        )}

        {result && (
          <GlassCard glow style={styles.resultCard}>
            <Text style={styles.resultTitle}>{result.name}</Text>
            <View style={styles.resultGrid}>
              <ResultItem icon={<Flame size={18} color="#FF6B35" />} label="Calories" value={result.calories} unit="kcal" color="#FF6B35" />
              <ResultItem icon={<Beef size={18} color="#E57373" />} label="Protein" value={result.protein} unit="g" color="#E57373" />
              <ResultItem icon={<Wheat size={18} color="#FFB74D" />} label="Carbs" value={result.carbs} unit="g" color="#FFB74D" />
              <ResultItem icon={<Droplets size={18} color="#4FC3F7" />} label="Fat" value={result.fat} unit="g" color="#4FC3F7" />
            </View>
            <Text style={styles.aiNote}>
              ⚡ AI-powered estimate. Results may vary. Use for tracking guidance.
            </Text>
            <TouchableOpacity style={styles.logButton}>
              <Text style={styles.logButtonText}>Log to Diary</Text>
            </TouchableOpacity>
          </GlassCard>
        )}

        {!scanning && !result && (
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>AI Food Scanner</Text>
            <Text style={styles.placeholderText}>
              Snap or upload a photo of your meal and our AI will estimate the
              calories, protein, carbs, and fat content.
            </Text>
            <Text style={styles.placeholderText}>
              Works best with Indian meals like dal rice, roti sabzi, biryani,
              paneer, and more.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function ResultItem({
  icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <View style={resultStyles.item}>
      <View style={[resultStyles.iconBox, { backgroundColor: color + "20" }]}>
        {icon}
      </View>
      <Text style={resultStyles.value}>
        {value}
        <Text style={resultStyles.unit}> {unit}</Text>
      </Text>
      <Text style={resultStyles.label}>{label}</Text>
    </View>
  );
}

const resultStyles = StyleSheet.create({
  item: {
    width: "47%",
    alignItems: "center",
    gap: 6,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  unit: {
    fontSize: FontSize.sm,
    fontWeight: "500",
    color: Colors.textMuted,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
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
  actions: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  actionCard: {
    flex: 1,
  },
  actionInner: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  actionLabel: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  imagePreview: {
    borderRadius: Radius.lg,
    overflow: "hidden",
    marginBottom: Spacing.md,
  },
  previewImage: {
    width: "100%",
    height: 250,
    borderRadius: Radius.lg,
  },
  scanningCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  scanningText: {
    fontSize: FontSize.md,
    color: Colors.neonGreen,
    fontWeight: "600",
  },
  resultCard: {
    marginBottom: Spacing.md,
  },
  resultTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  resultGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  aiNote: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  logButton: {
    backgroundColor: Colors.neonGreen,
    paddingVertical: 12,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  logButtonText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textInverse,
  },
  placeholderCard: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginTop: Spacing.md,
  },
  placeholderTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  placeholderText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
});
