// ==================== CONFIGURATION ====================
const CONFIG = {
    rounds: [
        { duration: 180, maxPoints: 24 }, // Round 1: 3 minutes, 24 points
        { duration: 120, maxPoints: 16 }, // Round 2: 2 minutes, 16 points
        { duration: 60, maxPoints: 8 }   // Round 3: 1 minute, 8 points
    ],
    restDuration: 60,        // 1 minute rest between rounds
    controlPointInterval: 3  // Award 1 point every 3 seconds
};
