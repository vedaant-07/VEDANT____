import Foundation

// MARK: - Mock Exercise Data

struct ExerciseData {
    static let exercises: [Exercise] = [
        Exercise(
            id: "1", name: "Bench Press", targetMuscle: "Chest", equipment: "Barbell",
            difficulty: "intermediate", sets: 4, reps: 10, restSeconds: 90,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Keep feet planted firmly on the ground", "Arch your back slightly", "Lower the bar to your chest with control"],
            commonMistakes: ["Bouncing the bar off chest", "Flaring elbows too wide", "Uneven grip"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "2", name: "Incline Dumbbell Press", targetMuscle: "Upper Chest", equipment: "Dumbbell",
            difficulty: "intermediate", sets: 3, reps: 12, restSeconds: 75,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Set bench to 30-45 degree angle", "Keep shoulders retracted", "Control the descent"],
            commonMistakes: ["Too steep incline angle", "Using momentum", "Locking out elbows"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "3", name: "Lat Pulldown", targetMuscle: "Back", equipment: "Cable",
            difficulty: "beginner", sets: 3, reps: 12, restSeconds: 60,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Pull to upper chest", "Squeeze shoulder blades", "Control the negative"],
            commonMistakes: ["Leaning too far back", "Using momentum", "Grip too wide"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "4", name: "Goblet Squat", targetMuscle: "Legs", equipment: "Dumbbell",
            difficulty: "beginner", sets: 3, reps: 15, restSeconds: 60,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Hold dumbbell at chest height", "Keep chest up", "Go below parallel"],
            commonMistakes: ["Heels lifting off ground", "Rounding lower back", "Knees caving in"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "5", name: "Plank", targetMuscle: "Core", equipment: "Bodyweight",
            difficulty: "beginner", sets: 3, reps: 1, restSeconds: 30,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Keep body in straight line", "Engage your core", "Breathe steadily"],
            commonMistakes: ["Hips sagging", "Looking up straining neck", "Holding breath"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "6", name: "Shoulder Press", targetMuscle: "Shoulders", equipment: "Dumbbell",
            difficulty: "intermediate", sets: 4, reps: 10, restSeconds: 75,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Press straight up", "Don't arch back excessively", "Control the descent"],
            commonMistakes: ["Pressing in front of body", "Using legs for momentum", "Shrugging shoulders"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "7", name: "Deadlift", targetMuscle: "Full Body", equipment: "Barbell",
            difficulty: "advanced", sets: 3, reps: 8, restSeconds: 120,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Keep bar close to shins", "Hinge at hips", "Brace core throughout"],
            commonMistakes: ["Rounding lower back", "Jerking the bar up", "Looking up excessively"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "8", name: "Squat", targetMuscle: "Legs", equipment: "Barbell",
            difficulty: "intermediate", sets: 4, reps: 10, restSeconds: 90,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Feet shoulder-width apart", "Break at hips and knees simultaneously", "Keep weight mid-foot"],
            commonMistakes: ["Knees caving inward", "Heels lifting", "Not hitting depth"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "9", name: "Cable Row", targetMuscle: "Back", equipment: "Cable",
            difficulty: "beginner", sets: 3, reps: 12, restSeconds: 60,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Pull to lower chest", "Squeeze shoulder blades", "Keep back straight"],
            commonMistakes: ["Using too much weight", "Rounding shoulders", "Leaning back too much"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "10", name: "Triceps Pushdown", targetMuscle: "Triceps", equipment: "Cable",
            difficulty: "beginner", sets: 3, reps: 15, restSeconds: 45,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Keep elbows at sides", "Full range of motion", "Control the weight"],
            commonMistakes: ["Using body weight to push down", "Elbows moving forward", "Partial reps"],
            contentStatus: "placeholder"
        ),
        Exercise(
            id: "11", name: "Biceps Curl", targetMuscle: "Biceps", equipment: "Dumbbell",
            difficulty: "beginner", sets: 3, reps: 12, restSeconds: 45,
            videoUrl: nil, thumbnailUrl: nil,
            formTips: ["Keep elbows at sides", "Squeeze at top", "Control the negative"],
            commonMistakes: ["Swinging the weights", "Not full range of motion", "Using too much weight"],
            contentStatus: "placeholder"
        ),
    ]
}

// MARK: - Mock Challenge Data

struct ChallengeData {
    static let challenges: [Challenge] = [
        Challenge(
            id: "1", title: "7-Day Beginner Challenge", description: "Perfect for getting started! Complete daily workouts for 7 days straight.",
            target: "7 workouts", rewardPoints: 100, duration: 7, difficulty: "beginner",
            category: "workout", startDate: nil, endDate: nil, participants: 1250, progress: 0, joined: false
        ),
        Challenge(
            id: "2", title: "Fat Loss Challenge", description: "Burn 500+ calories daily. Combine nutrition tracking with cardio.",
            target: "Burn 3500 calories", rewardPoints: 250, duration: 14, difficulty: "intermediate",
            category: "weight_loss", startDate: nil, endDate: nil, participants: 843, progress: 35, joined: true
        ),
        Challenge(
            id: "3", title: "Muscle Gain Challenge", description: "Increase protein intake and hit the gym. Track your progress.",
            target: "Gain 2kg muscle", rewardPoints: 300, duration: 30, difficulty: "advanced",
            category: "muscle_gain", startDate: nil, endDate: nil, participants: 612, progress: 0, joined: false
        ),
        Challenge(
            id: "4", title: "Steps Challenge", description: "Walk 10,000 steps every day for 2 weeks. Every step counts!",
            target: "140,000 steps", rewardPoints: 150, duration: 14, difficulty: "beginner",
            category: "steps", startDate: nil, endDate: nil, participants: 2130, progress: 60, joined: true
        ),
        Challenge(
            id: "5", title: "Protein Challenge", description: "Hit your daily protein goals consistently for 21 days.",
            target: "21 days", rewardPoints: 200, duration: 21, difficulty: "intermediate",
            category: "nutrition", startDate: nil, endDate: nil, participants: 478, progress: 0, joined: false
        ),
    ]
}

// MARK: - Mock Dashboard Data

struct DashboardData {
    static let tracking = TrackingData(
        water: 1500, waterGoal: 3000,
        steps: 6800, stepGoal: 10000,
        calories: 450, calorieGoal: 500,
        sleep: 6.5, sleepGoal: 8,
        weight: 72, weightGoal: 68
    )

    static let aiPrompts = [
        "Build muscle",
        "Lose fat",
        "Improve stamina",
        "Beginner plan",
        "Home workout",
        "Gym workout"
    ]
}
