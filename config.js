// ==================== CONFIGURATION ====================
const CONFIG = {
    rounds: [
        { duration: 180, maxPoints: 30 }, // Round 1: 3 minutes, 30 points
        { duration: 120, maxPoints: 20 }, // Round 2: 2 minutes, 20 points
        { duration: 60, maxPoints: 10 }   // Round 3: 1 minute, 10 points
    ],
    restDuration: 60,        // 1 minute rest between rounds
    controlPointInterval: 3  // Award 1 point every 3 seconds
};
