import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Building2, MapPin, Clock, ChevronRight, Star } from "lucide-react-native";
import { GlassCard } from "../../src/components/GlassCard";
import { GradientButton } from "../../src/components/GradientButton";
import { Colors, FontSize, Spacing, Radius } from "../../constants/colors";

export default function GymProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronRight size={20} color={Colors.textSecondary} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>

        <Text style={styles.title}>Gym Profile</Text>

        <GlassCard glow style={styles.headerCard}>
          <View style={styles.profileHeader}>
            <View style={styles.logoPlaceholder}>
              <Building2 size={36} color={Colors.limeAccent} />
            </View>
            <Text style={styles.gymName}>Iron Paradise Gym</Text>
            <View style={styles.ratingRow}>
              <Star size={14} color="#FFB74D" /><Text style={styles.rating}>4.8 (124 reviews)</Text>
            </View>
          </View>
        </GlassCard>

        <InfoRow icon={<MapPin size={16} />} label="Address" value="123, MG Road, Indiranagar, Bangalore" />
        <InfoRow icon={<Clock size={16} />} label="Hours" value="5:00 AM - 11:00 PM" />
        <InfoRow icon={<Building2 size={16} />} label="Amenities" value="AC, Lockers, Showers, Parking, WiFi" />

        <Text style={styles.sectionTitle}>Membership Plans</Text>
        {[{ name: "Basic Monthly", price: "₹299/mo" }, { name: "Premium Monthly", price: "₹499/mo" }, { name: "Annual", price: "₹5,999/yr" }].map((p, i) => (
          <GlassCard key={i} padding={Spacing.md} style={{ marginBottom: Spacing.xs }}>
            <View style={styles.planRow}>
              <Text style={styles.planName}>{p.name}</Text>
              <Text style={styles.planPrice}>{p.price}</Text>
            </View>
          </GlassCard>
        ))}

        <GradientButton title="Save Profile" onPress={() => {}} />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <GlassCard padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
      <View style={infoStyles.row}>
        <View style={infoStyles.left}>
          <View style={infoStyles.icon}>{icon}</View>
          <Text style={infoStyles.label}>{label}</Text>
        </View>
        <Text style={infoStyles.value}>{value}</Text>
      </View>
    </GlassCard>
  );
}

const infoStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  left: { flexDirection: "row", alignItems: "center", gap: Spacing.sm, flex: 1 },
  icon: { width: 32, height: 32, borderRadius: Radius.md, backgroundColor: Colors.surface, alignItems: "center", justifyContent: "center" },
  label: { fontSize: FontSize.sm, color: Colors.textSecondary },
  value: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: "600" },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingTop: 60, paddingHorizontal: Spacing.lg },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surfaceElevated, alignItems: "center", justifyContent: "center", marginBottom: Spacing.md },
  title: { fontSize: FontSize.xxxl, fontWeight: "900", color: Colors.limeAccent, marginBottom: Spacing.lg },
  headerCard: { marginBottom: Spacing.lg },
  profileHeader: { alignItems: "center" },
  logoPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.limeAccent + "10", alignItems: "center", justifyContent: "center", marginBottom: Spacing.md },
  gymName: { fontSize: FontSize.xxl, fontWeight: "800", color: Colors.textPrimary, marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  rating: { fontSize: FontSize.sm, color: Colors.textSecondary },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: "700", color: Colors.textPrimary, marginTop: Spacing.md, marginBottom: Spacing.md },
  planRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  planName: { fontSize: FontSize.md, fontWeight: "600", color: Colors.textPrimary },
  planPrice: { fontSize: FontSize.md, fontWeight: "700", color: Colors.limeAccent },
});
