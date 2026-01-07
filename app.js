// ==================== UI UPDATES ====================

function updateDisplay() {
    // Timer
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    document.getElementById('timer').textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Timer styling
    const timerEl = document.getElementById('timer');
    timerEl.classList.remove('rest', 'warning');
    if (state.isRest) {
        timerEl.classList.add('rest');
    } else if (state.timeRemaining <= 10) {
        timerEl.classList.add('warning');
    }

    // Round info
    if (state.isRest) {
        document.getElementById('roundInfo').textContent =
            `Rest Period - Round ${state.currentRound + 2} Coming Up`;
    } else {
        const maxPoints = CONFIG.rounds[state.currentRound].maxPoints;
        document.getElementById('roundInfo').textContent =
            `Round ${state.currentRound + 1} of 3 (Max: ${maxPoints} pts)`;
    }

    // Control interval countdown - display in fighter cards
    const countdown = Math.ceil(state.controlTimeRemaining);

    if (state.control === 'A' && !state.isRest && state.isRunning && !state.isPaused) {
        document.getElementById('countdownA').textContent = countdown;
        document.getElementById('countdownB').textContent = '';
    } else if (state.control === 'B' && !state.isRest && state.isRunning && !state.isPaused) {
        document.getElementById('countdownB').textContent = countdown;
        document.getElementById('countdownA').textContent = '';
    } else {
        document.getElementById('countdownA').textContent = '';
        document.getElementById('countdownB').textContent = '';
    }

    // Scores
    document.getElementById('scoreA').textContent = state.scoreA;
    document.getElementById('scoreB').textContent = state.scoreB;

    // Fighter names
    document.getElementById('fighterANameDisplay').textContent = state.fighterAName;
    document.getElementById('fighterBNameDisplay').textContent = state.fighterBName;

    // Update button labels with fighter names
    const shortNameA = state.fighterAName.split(' ')[0]; // Use first name if multiple words
    const shortNameB = state.fighterBName.split(' ')[0];
    document.getElementById('controlABtnLabel').textContent = shortNameA;
    document.getElementById('controlBBtnLabel').textContent = shortNameB;

    // Update round end modal button labels
    document.getElementById('roundEndFighterA').textContent = state.fighterAName;
    document.getElementById('roundEndFighterB').textContent = state.fighterBName;

    // Rounds won
    document.getElementById('roundsWonA').textContent = state.roundsWonA;
    document.getElementById('roundsWonB').textContent = state.roundsWonB;

    // Round dots
    for (let i = 1; i <= 3; i++) {
        const dotA = document.getElementById(`roundDotA${i}`);
        const dotB = document.getElementById(`roundDotB${i}`);
        dotA.classList.remove('won');
        dotB.classList.remove('won');

        if (state.roundHistory[i-1]) {
            if (state.roundHistory[i-1].winner === 'A') {
                dotA.classList.add('won');
            } else if (state.roundHistory[i-1].winner === 'B') {
                dotB.classList.add('won');
            }
        }
    }

    // Control indicators on fighter cards
    document.getElementById('fighterACard').classList.remove('in-control');
    document.getElementById('fighterBCard').classList.remove('in-control');
    if (state.control === 'A') {
        document.getElementById('fighterACard').classList.add('in-control');
    } else if (state.control === 'B') {
        document.getElementById('fighterBCard').classList.add('in-control');
    }

    // Control button states
    document.getElementById('controlABtn').classList.remove('btn-active');
    document.getElementById('controlNoneBtn').classList.remove('btn-active');
    document.getElementById('controlBBtn').classList.remove('btn-active');

    if (state.control === 'A') {
        document.getElementById('controlABtn').classList.add('btn-active');
    } else if (state.control === 'B') {
        document.getElementById('controlBBtn').classList.add('btn-active');
    } else {
        document.getElementById('controlNoneBtn').classList.add('btn-active');
    }

    // Match status
    if (!state.matchEnded && !state.isPaused) {
        if (state.isRest) {
            document.getElementById('matchStatus').textContent =
                `Rest Period - Round ${state.currentRound + 2} Coming Up`;
        } else if (state.isRunning) {
            document.getElementById('matchStatus').textContent =
                `Round ${state.currentRound + 1} in Progress`;
        } else {
            document.getElementById('matchStatus').textContent = 'Ready to Start';
        }
    } else if (state.isPaused) {
        document.getElementById('matchStatus').textContent = 'PAUSED';
    }

    // Button states
    document.getElementById('startBtn').disabled = state.isRunning && !state.matchEnded;
    document.getElementById('pauseBtn').disabled = !state.isRunning;
    document.getElementById('pauseBtn').textContent = state.isPaused ? 'Resume' : 'Pause';

    // Round history
    if (state.roundHistory.length > 0) {
        document.getElementById('roundHistory').style.display = 'block';
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = state.roundHistory.map(r => {
            const winnerName = r.winner === 'A' ? state.fighterAName :
                             r.winner === 'B' ? state.fighterBName : 'Draw';
            return `<div class="history-item">
                <span>Round ${r.round}: ${winnerName} wins by ${r.method}</span>
                <span>Score: ${r.scoreA} - ${r.scoreB}</span>
            </div>`;
        }).join('');
    } else {
        document.getElementById('roundHistory').style.display = 'none';
    }

    // Match winner
    if (state.matchEnded) {
        let matchWinner = '';
        if (state.roundsWonA > state.roundsWonB) {
            matchWinner = state.fighterAName;
        } else if (state.roundsWonB > state.roundsWonA) {
            matchWinner = state.fighterBName;
        } else {
            matchWinner = 'Draw';
        }

        document.getElementById('matchWinner').style.display = 'block';
        document.getElementById('winnerText').textContent = matchWinner;
        document.getElementById('matchStatus').textContent = `Match Complete: ${matchWinner} Wins!`;
    } else {
        document.getElementById('matchWinner').style.display = 'none';
    }
}

// ==================== UI CONTROLS ====================

function showResetOptions() {
    document.getElementById('resetModal').style.display = 'flex';
}

function closeResetModal() {
    document.getElementById('resetModal').style.display = 'none';
}

function confirmReset(option) {
    switch(option) {
        case 'full':
            resetMatch();
            break;
        case 'round1':
            resetFromRound(0);
            updateDisplay();
            break;
        case 'round2':
            resetFromRound(1);
            updateDisplay();
            break;
        case 'round3':
            resetFromRound(2);
            updateDisplay();
            break;
    }
    closeResetModal();
}

function toggleSettings() {
    const modal = document.getElementById('settingsModal');
    const isVisible = modal.style.display === 'flex';
    modal.style.display = isVisible ? 'none' : 'flex';

    if (!isVisible) {
        // Populate current scores in the modal
        document.getElementById('editScoreA').value = state.scoreA;
        document.getElementById('editScoreB').value = state.scoreB;
    }
}

function saveSettings() {
    // Save fighter names
    const nameA = document.getElementById('fighterANameInput').value.trim();
    const nameB = document.getElementById('fighterBNameInput').value.trim();

    if (nameA) state.fighterAName = nameA;
    if (nameB) state.fighterBName = nameB;

    // Save scores
    const scoreA = parseInt(document.getElementById('editScoreA').value) || 0;
    const scoreB = parseInt(document.getElementById('editScoreB').value) || 0;

    state.scoreA = Math.max(0, scoreA);
    state.scoreB = Math.max(0, scoreB);

    toggleSettings();
    saveState();
    updateDisplay();
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Prevent shortcuts when typing in input fields
    if (e.target.tagName === 'INPUT') return;

    switch(e.key) {
        case ' ':
            e.preventDefault();
            if (!state.isRunning) {
                startMatch();
            } else {
                togglePause();
            }
            break;
        case 'ArrowLeft':
        case '1':
            e.preventDefault();
            setControl('A');
            break;
        case 'ArrowDown':
        case '2':
            e.preventDefault();
            setControl('none');
            break;
        case 'ArrowRight':
        case '3':
            e.preventDefault();
            setControl('B');
            break;
        case 's':
        case 'S':
            e.preventDefault();
            toggleSettings();
            break;
    }
});

// ==================== ROUND ENDING MODAL ====================
let pendingRoundEndType = null;

function showRoundEndModal(type) {
    pendingRoundEndType = type;
    const title = type === 'submission' ? 'Submission' : 'Stoppage';
    document.getElementById('roundEndTitle').textContent = title;
    document.getElementById('roundEndModal').style.display = 'flex';
}

function closeRoundEndModal() {
    pendingRoundEndType = null;
    document.getElementById('roundEndModal').style.display = 'none';
}

function confirmRoundEnd(fighter) {
    if (!pendingRoundEndType) return;

    const reason = pendingRoundEndType + '-' + fighter.toLowerCase();
    endRound(reason);
    closeRoundEndModal();
}

// ==================== MULTIPLAYER MODAL ====================

function toggleMultiplayer() {
    const modal = document.getElementById('multiplayerModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    showMultiplayerOptions();
}

function closeMultiplayerModal() {
    document.getElementById('multiplayerModal').style.display = 'none';
}

function showMultiplayerOptions() {
    document.getElementById('multiplayerOptions').style.display = 'block';
    document.getElementById('hostRoomSection').style.display = 'none';
    document.getElementById('joinRoomSection').style.display = 'none';
}

function createMultiplayerRoom() {
    simpleMultiplayer.createRoom();
    document.getElementById('multiplayerOptions').style.display = 'none';
    document.getElementById('hostRoomSection').style.display = 'block';
    document.getElementById('roomCodeDisplay').textContent = simpleMultiplayer.roomCode;

    // Update status
    const statusEl = document.getElementById('multiplayerStatus');
    statusEl.textContent = `Hosting room: ${simpleMultiplayer.roomCode}`;
    statusEl.style.display = 'block';
    statusEl.style.color = '#4CAF50';
}

function showJoinRoom() {
    document.getElementById('multiplayerOptions').style.display = 'none';
    document.getElementById('joinRoomSection').style.display = 'block';
}

function joinMultiplayerRoom() {
    const code = document.getElementById('roomCodeInput').value.trim().toUpperCase();
    if (code.length !== 6) {
        alert('Please enter a 6-character room code');
        return;
    }

    simpleMultiplayer.joinRoom(code);
    closeMultiplayerModal();

    // Update status
    const statusEl = document.getElementById('multiplayerStatus');
    statusEl.textContent = `Joined room: ${code}`;
    statusEl.style.display = 'block';
    statusEl.style.color = '#2196F3';
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load saved state from localStorage
    const stateLoaded = loadState();

    // Set initial fighter names in input fields
    document.getElementById('fighterANameInput').value = state.fighterAName;
    document.getElementById('fighterBNameInput').value = state.fighterBName;

    // If state was loaded and match was running, restart timers
    if (stateLoaded && state.isRunning) {
        state.lastControlTick = Date.now();
        startTimers();
    }

    // Initialize audio on first user interaction (required for mobile browsers)
    const initAudio = () => {
        if (typeof soundManager !== 'undefined') {
            soundManager.init();
        }
        // Remove listeners after first interaction
        document.removeEventListener('click', initAudio);
        document.removeEventListener('touchstart', initAudio);
        document.removeEventListener('keydown', initAudio);
    };
    document.addEventListener('click', initAudio);
    document.addEventListener('touchstart', initAudio);
    document.addEventListener('keydown', initAudio);

    // Initial display update
    updateDisplay();
});
