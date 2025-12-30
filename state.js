// ==================== STATE MANAGEMENT ====================
const STORAGE_KEY = 'rdojoKombatState';

const state = {
    // Fighter names
    fighterAName: 'Fighter A',
    fighterBName: 'Fighter B',

    // Match state
    currentRound: 0,
    timeRemaining: CONFIG.rounds[0].duration,
    isRunning: false,
    isPaused: false,
    isRest: false,

    // Scores
    scoreA: 0,
    scoreB: 0,
    roundsWonA: 0,
    roundsWonB: 0,

    // Control
    control: 'none', // 'none', 'A', or 'B'
    controlTimeRemaining: CONFIG.controlPointInterval, // Countdown for next point

    // History
    roundHistory: [],
    matchEnded: false,

    // Intervals (not saved to localStorage)
    timerInterval: null,
    controlInterval: null,
    lastControlTick: 0
};

// Save state to localStorage
function saveState() {
    try {
        // Create a copy of state without the interval properties
        const stateToSave = {
            fighterAName: state.fighterAName,
            fighterBName: state.fighterBName,
            currentRound: state.currentRound,
            timeRemaining: state.timeRemaining,
            isRunning: state.isRunning,
            isPaused: state.isPaused,
            isRest: state.isRest,
            scoreA: state.scoreA,
            scoreB: state.scoreB,
            roundsWonA: state.roundsWonA,
            roundsWonB: state.roundsWonB,
            control: state.control,
            controlTimeRemaining: state.controlTimeRemaining,
            roundHistory: state.roundHistory,
            matchEnded: state.matchEnded,
            lastControlTick: state.lastControlTick
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
        console.error('Failed to save state:', error);
    }
}

// Load state from localStorage
function loadState() {
    try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            const parsed = JSON.parse(savedState);

            // Restore all saved properties
            Object.assign(state, parsed);

            // Reset intervals (these should not be restored)
            state.timerInterval = null;
            state.controlInterval = null;

            // If the match was running when saved, mark it as paused
            if (state.isRunning && !state.isPaused) {
                state.isPaused = true;
            }

            return true;
        }
    } catch (error) {
        console.error('Failed to load state:', error);
    }
    return false;
}

// Clear saved state
function clearSavedState() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear state:', error);
    }
}

// Reset state to initial values
function resetState() {
    const fighterAName = state.fighterAName;
    const fighterBName = state.fighterBName;

    clearInterval(state.timerInterval);
    clearInterval(state.controlInterval);

    Object.assign(state, {
        currentRound: 0,
        timeRemaining: CONFIG.rounds[0].duration,
        isRunning: false,
        isPaused: false,
        isRest: false,
        scoreA: 0,
        scoreB: 0,
        roundsWonA: 0,
        roundsWonB: 0,
        control: 'none',
        controlTimeRemaining: CONFIG.controlPointInterval,
        roundHistory: [],
        matchEnded: false,
        timerInterval: null,
        controlInterval: null,
        lastControlTick: 0,
        fighterAName: fighterAName,
        fighterBName: fighterBName
    });

    saveState();
}

// Reset from a specific round
function resetFromRound(roundIndex) {
    if (roundIndex < 0 || roundIndex > 2) return;

    const fighterAName = state.fighterAName;
    const fighterBName = state.fighterBName;

    clearInterval(state.timerInterval);
    clearInterval(state.controlInterval);

    state.currentRound = roundIndex;
    state.timeRemaining = CONFIG.rounds[roundIndex].duration;
    state.isRunning = false;
    state.isPaused = false;
    state.isRest = false;
    state.scoreA = 0;
    state.scoreB = 0;
    state.control = 'none';
    state.controlTimeRemaining = CONFIG.controlPointInterval;
    state.matchEnded = false;
    state.timerInterval = null;
    state.controlInterval = null;
    state.lastControlTick = 0;

    // Keep rounds won and history up to the previous round
    state.roundHistory = state.roundHistory.slice(0, roundIndex);
    state.roundsWonA = state.roundHistory.filter(r => r.winner === 'A').length;
    state.roundsWonB = state.roundHistory.filter(r => r.winner === 'B').length;

    state.fighterAName = fighterAName;
    state.fighterBName = fighterBName;

    saveState();
}
