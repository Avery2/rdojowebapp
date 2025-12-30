// ==================== GAME LOGIC ====================

// Start the match
function startMatch() {
    if (state.matchEnded) {
        if (!confirm('Match has ended. Start a new match?')) return;
        resetMatch();
    }

    state.isRunning = true;
    state.isPaused = false;

    startTimers();
    saveState();
    updateDisplay();
}

// Start timer intervals
function startTimers() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    if (state.controlInterval) clearInterval(state.controlInterval);

    state.lastControlTick = Date.now();
    state.controlTimeRemaining = CONFIG.controlPointInterval;

    // Main timer (1 second intervals)
    state.timerInterval = setInterval(() => {
        if (!state.isPaused) {
            state.timeRemaining--;

            if (state.timeRemaining <= 0) {
                handleTimerEnd();
            }

            // Save state every second during match
            saveState();
            updateDisplay();
        }
    }, 1000);

    // Control point ticker (100ms for smooth countdown)
    state.controlInterval = setInterval(() => {
        if (!state.isPaused && !state.isRest && state.control !== 'none') {
            const now = Date.now();
            const elapsed = (now - state.lastControlTick) / 1000;
            state.controlTimeRemaining = CONFIG.controlPointInterval - elapsed;

            if (state.controlTimeRemaining <= 0) {
                awardControlPoint();
                state.lastControlTick = now;
                state.controlTimeRemaining = CONFIG.controlPointInterval;
            }

            updateDisplay();
        } else if (state.control === 'none' || state.isRest) {
            state.controlTimeRemaining = CONFIG.controlPointInterval;
            updateDisplay();
        }
    }, 100);
}

// Toggle pause state
function togglePause() {
    state.isPaused = !state.isPaused;

    if (!state.isPaused) {
        state.lastControlTick = Date.now();
    }

    saveState();
    updateDisplay();
}

// Handle timer reaching zero
function handleTimerEnd() {
    if (state.isRest) {
        // Rest period ended, start next round
        state.currentRound++;
        state.isRest = false;
        state.timeRemaining = CONFIG.rounds[state.currentRound].duration;
        state.scoreA = 0;
        state.scoreB = 0;
        state.control = 'none';
        state.controlTimeRemaining = CONFIG.controlPointInterval;
        updateDisplay();
    } else {
        // Round ended by time
        endRoundByDecision();
    }
}

// Award a control point
function awardControlPoint() {
    if (state.control === 'A') {
        state.scoreA++;
    } else if (state.control === 'B') {
        state.scoreB++;
    }

    // Check for tech fall
    const maxPoints = CONFIG.rounds[state.currentRound].maxPoints;
    if (state.scoreA >= maxPoints) {
        endRound('tech-fall-a');
    } else if (state.scoreB >= maxPoints) {
        endRound('tech-fall-b');
    }

    saveState();
    updateDisplay();
}

// Set control state
function setControl(fighter) {
    state.control = fighter;
    state.lastControlTick = Date.now();
    state.controlTimeRemaining = CONFIG.controlPointInterval;
    saveState();
    updateDisplay();
}

// Adjust score manually
function adjustScore(fighter, delta) {
    if (fighter === 'A') {
        state.scoreA = Math.max(0, state.scoreA + delta);
    } else {
        state.scoreB = Math.max(0, state.scoreB + delta);
    }
    saveState();
    updateDisplay();
}

// End round with specific reason
function endRound(reason) {
    if (!state.isRunning || state.isRest) return;

    let winner = '';
    let method = '';

    switch(reason) {
        case 'submission-a':
            winner = 'A';
            method = 'Submission';
            break;
        case 'submission-b':
            winner = 'B';
            method = 'Submission';
            break;
        case 'stoppage-a':
            winner = 'A';
            method = 'Stoppage';
            break;
        case 'stoppage-b':
            winner = 'B';
            method = 'Stoppage';
            break;
        case 'tech-fall-a':
            winner = 'A';
            method = 'Tech Fall';
            break;
        case 'tech-fall-b':
            winner = 'B';
            method = 'Tech Fall';
            break;
    }

    recordRoundEnd(winner, method);
}

// End round by decision (time expired)
function endRoundByDecision() {
    let winner = '';
    let method = 'Decision';

    if (state.scoreA > state.scoreB) {
        winner = 'A';
    } else if (state.scoreB > state.scoreA) {
        winner = 'B';
    } else {
        winner = 'Draw';
    }

    recordRoundEnd(winner, method);
}

// Record round ending and check for match winner
function recordRoundEnd(winner, method) {
    // Record round in history
    state.roundHistory.push({
        round: state.currentRound + 1,
        winner: winner,
        method: method,
        scoreA: state.scoreA,
        scoreB: state.scoreB
    });

    // Update rounds won
    if (winner === 'A') state.roundsWonA++;
    if (winner === 'B') state.roundsWonB++;

    // Check for match winner (best 2 of 3)
    if (state.roundsWonA >= 2 || state.roundsWonB >= 2) {
        endMatch();
        return;
    }

    // Check if we've completed all 3 rounds
    if (state.currentRound >= 2) {
        endMatch();
        return;
    }

    // Start rest period
    state.isRest = true;
    state.timeRemaining = CONFIG.restDuration;
    state.control = 'none';
    state.controlTimeRemaining = CONFIG.controlPointInterval;
    saveState();
    updateDisplay();
}

// End the match
function endMatch() {
    state.matchEnded = true;
    state.isRunning = false;
    clearInterval(state.timerInterval);
    clearInterval(state.controlInterval);

    saveState();
    updateDisplay();
}

// Reset entire match
function resetMatch() {
    resetState();
    updateDisplay();
}
