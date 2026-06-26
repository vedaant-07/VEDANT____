import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Brain,
  Send,
  Sparkles,
  Dumbbell,
  Flame,
  HeartPulse,
  Baby,
  Home,
  Building2,
  Shield,
} from "lucide-react-native";
import { GlassCard } from "../../../src/components/GlassCard";
import { AI_PROMPTS } from "../../../src/mock/dashboardData";
import { Colors, FontSize, Spacing, Radius } from "../../../constants/colors";

const PROMPT_ICONS: Record<string, React.ReactNode> = {
  build_muscle: <Dumbbell size={18} color={Colors.neonGreen} />,
  lose_fat: <Flame size={18} color={Colors.neonGreen} />,
  improve_stamina: <HeartPulse size={18} color={Colors.neonGreen} />,
  beginner_plan: <Baby size={18} color={Colors.neonGreen} />,
  home_workout: <Home size={18} color={Colors.neonGreen} />,
  gym_workout: <Building2 size={18} color={Colors.neonGreen} />,
};

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  text: string;
}

export default function AITrainerScreen() {
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const handlePrompt = (prompt: { id: string; label: string; prompt: string }) => {
    setChatStarted(true);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      text: prompt.prompt,
    };
    setMessages([userMsg]);
    // Mock AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: getMockResponse(prompt.id),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setChatStarted(true);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: getGenericResponse(input.trim()),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  if (!chatStarted) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>SE7ENFIT AI Coach</Text>
          <Text style={styles.subtitle}>Ask anything about your fitness journey</Text>

          <View style={styles.promptsGrid}>
            {AI_PROMPTS.map((prompt) => (
              <TouchableOpacity
                key={prompt.id}
                style={styles.promptCard}
                activeOpacity={0.7}
                onPress={() => handlePrompt(prompt)}
              >
                <View style={styles.promptIcon}>
                  {PROMPT_ICONS[prompt.id] || <Brain size={18} color={Colors.neonGreen} />}
                </View>
                <Text style={styles.promptLabel}>{prompt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <StatusBar style="light" />
      <ScrollView
        style={styles.chatScroll}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.type === "user" ? styles.userBubble : styles.aiBubble,
            ]}
          >
            {msg.type === "ai" && (
              <View style={styles.aiBadge}>
                <Sparkles size={10} color={Colors.neonGreen} />
                <Text style={styles.aiBadgeText}>AI COACH</Text>
              </View>
            )}
            <Text
              style={
                msg.type === "user" ? styles.userMessage : styles.aiMessage
              }
            >
              {msg.text}
            </Text>
            {msg.type === "ai" && (
              <View style={styles.disclaimer}>
                <Shield size={10} color={Colors.textMuted} />
                <Text style={styles.disclaimerText}>
                  AI-generated suggestion. Consult a professional before starting any new regimen.
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          style={styles.chatInput}
          placeholder="Ask your AI coach..."
          placeholderTextColor={Colors.textMuted}
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendDisabled]}
          onPress={handleSend}
          disabled={!input.trim()}
        >
          <Send size={18} color={input.trim() ? Colors.textInverse : Colors.textMuted} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function getMockResponse(promptId: string): string {
  const responses: Record<string, string> = {
    build_muscle:
      "🔥 **Muscle Building Plan**\n\nHere's your 4-day split:\n\n**Day 1: Push (Chest, Shoulders, Triceps)**\n• Bench Press: 4×10\n• Shoulder Press: 4×10\n• Incline DB Press: 3×12\n• Triceps Pushdown: 3×15\n\n**Day 2: Pull (Back, Biceps)**\n• Deadlift: 3×8\n• Lat Pulldown: 4×12\n• Cable Row: 3×12\n• Biceps Curl: 3×12\n\n**Nutrition Tip:** Aim for 1.8-2.2g protein per kg bodyweight daily. Include paneer, eggs, chicken, dal in meals.",
    lose_fat:
      "💪 **Fat Loss Program**\n\nFocus on calorie deficit + high protein + daily movement.\n\n**Workout: Full Body 3×/week**\n• Goblet Squat: 3×15\n• Bench Press: 3×12\n• Lat Pulldown: 3×12\n• Plank: 3×45 sec\n• 20 min incline walk post-workout\n\n**Indian Meal Plan (1800 cal):**\n• Breakfast: Poha + 2 boiled eggs\n• Lunch: 1 bowl dal + 1 roti + sabzi + curd\n• Snack: Sprouts salad\n• Dinner: Grilled paneer/chicken + salad\n• Drink 3L water daily.",
    improve_stamina:
      "🏃 **Stamina & Endurance**\n\nMix steady-state cardio with HIIT.\n\n**Weekly Plan:**\n• Mon: 30 min jog + core work\n• Tue: HIIT (30s sprint / 60s walk × 10)\n• Wed: Active rest (walking/yoga)\n• Thu: 40 min cycling\n• Fri: Stair climbing (15 min)\n• Sat: Long run/walk (5K)\n• Sun: Rest\n\n**Tip:** Start with what you can handle and increase 10% each week.",
    beginner_plan:
      "🌱 **Absolute Beginner Plan**\n\nWelcome! No equipment needed for week 1-2.\n\n**Week 1-2 (3 days/week):**\n• Bodyweight Squats: 3×10\n• Knee Push-ups: 3×8\n• Plank Hold: 3×20 sec\n• Glute Bridges: 3×12\n• Bird Dogs: 3×8 each side\n• 15 min brisk walk\n\n**Nutrition:** Eat balanced meals — dal, rice, roti, sabzi, eggs, fruits. Focus on consistency, not perfection!",
    home_workout:
      "🏠 **No-Equipment Home Workout**\n\nAll you need is your body and a mat.\n\n**Full Body (40 min):**\n• Jumping Jacks: 3×30\n• Squats: 3×15\n• Push-ups: 3×12\n• Lunges: 3×10 each leg\n• Plank: 3×45 sec\n• Mountain Climbers: 3×20 each side\n• Burpees: 3×8\n• Crunches: 3×20\n\n**Rest 60s between sets.** Do this 4×/week with 1 day rest between.",
    gym_workout:
      "🏋️ **Advanced Gym Plan — Push Pull Legs**\n\n6-day PPL split for experienced lifters.\n\n**Push Day:** Bench Press 4×8, Incline DB 3×10, Shoulder Press 4×10, Lateral Raises 3×15, Triceps Pushdown 3×12, Dips 3×AMRAP\n\n**Pull Day:** Deadlift 3×5, Weighted Pull-ups 3×8, Cable Row 3×12, Face Pulls 3×15, Biceps Curl 3×12, Hammer Curl 3×12\n\n**Leg Day:** Squat 4×8, Romanian Deadlift 3×10, Leg Press 3×12, Leg Curl 3×12, Calf Raises 4×20\n\n**Rest-Pause on last set of each exercise.**",
  };
  return responses[promptId] || "I'm here to help with your fitness journey! What would you like to know?";
}

function getGenericResponse(query: string): string {
  if (query.toLowerCase().includes("diet") || query.toLowerCase().includes("food")) {
    return "🍽️ For Indian diet, focus on balanced meals. Include protein in every meal:\n• Breakfast: Eggs, paneer, or sprouts\n• Lunch: Dal, roti, sabzi, curd, salad\n• Dinner: Light — grilled protein + veggies\n\nAvoid processed foods, limit sugar, stay hydrated. Want a specific meal plan? Tell me your goal and calorie target!";
  }
  if (query.toLowerCase().includes("protein")) {
    return "💪 For muscle building, aim for 1.8-2.2g protein per kg bodyweight daily.\n\n**Indian Sources:**\n• 100g paneer = 18g protein\n• 3 eggs = 18g protein\n• 100g chicken breast = 31g protein\n• 1 bowl dal = 10g protein\n• 1 cup curd = 8g protein\n• Soya chunks (50g) = 26g protein\n\nTry to spread protein across 4-5 meals for best absorption.";
  }
  return "I'm your SE7EN FIT AI Coach! I can help with workout plans, nutrition advice, goal setting, and more. Try asking about specific exercises, diet tips, or training programs. What would you like to know?";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: Spacing.lg,
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
  promptsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  promptCard: {
    width: "47%",
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  promptIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.neonGreenGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  promptLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.textPrimary,
    flex: 1,
  },
  chatScroll: {
    flex: 1,
  },
  chatContent: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 20,
    gap: Spacing.md,
  },
  messageBubble: {
    maxWidth: "85%",
    padding: Spacing.md,
    borderRadius: Radius.lg,
    gap: 4,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.neonGreen,
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  userMessage: {
    fontSize: FontSize.md,
    color: Colors.textInverse,
    lineHeight: 22,
  },
  aiMessage: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  aiBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.neonGreen,
    letterSpacing: 1,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  disclaimerText: {
    fontSize: 9,
    color: Colors.textMuted,
    flex: 1,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    gap: Spacing.sm,
  },
  chatInput: {
    flex: 1,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.neonGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  sendDisabled: {
    backgroundColor: Colors.divider,
  },
});
