// ==================== MOBILE HEADER UPDATES ====================

// Update mobile header whenever display is updated
function updateMobileHeader() {
    // Update fighter names
    document.getElementById('mobileNameA').textContent = state.fighterAName;
    document.getElementById('mobileNameB').textContent = state.fighterBName;

    // Update scores
    document.getElementById('mobileScoreA').textContent = state.scoreA;
    document.getElementById('mobileScoreB').textContent = state.scoreB;

    // Update timer
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    document.getElementById('mobileTime').textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Update round
    document.getElementById('mobileRound').textContent =
        state.isRest ? 'REST' : `R${state.currentRound + 1}`;

    // Update countdown indicators
    const countdown = Math.ceil(state.controlTimeRemaining);
    const mobileCountdownA = document.getElementById('mobileCountdownA');
    const mobileCountdownB = document.getElementById('mobileCountdownB');

    if (state.control === 'A' && !state.isRest && state.isRunning && !state.isPaused) {
        mobileCountdownA.textContent = countdown;
        mobileCountdownA.style.display = 'block';
        mobileCountdownB.style.display = 'none';
    } else if (state.control === 'B' && !state.isRest && state.isRunning && !state.isPaused) {
        mobileCountdownB.textContent = countdown;
        mobileCountdownB.style.display = 'block';
        mobileCountdownA.style.display = 'none';
    } else {
        mobileCountdownA.style.display = 'none';
        mobileCountdownB.style.display = 'none';
    }
}

// Hook into the existing updateDisplay function
const originalUpdateDisplay = updateDisplay;
updateDisplay = function() {
    originalUpdateDisplay();
    updateMobileHeader();
};

// Initial mobile header update
updateMobileHeader();
