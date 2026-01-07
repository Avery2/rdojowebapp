// Simple Multiplayer Timer - Synchronized across devices
// Uses a simple approach with shareable room codes

class SimpleMultiplayerTimer {
    constructor() {
        this.roomCode = null;
        this.isHost = false;
        this.syncInterval = null;
        this.lastSync = 0;
        this.baseURL = 'https://api.jsonbin.io/v3/b';
        this.apiKey = '$2a$10$demo.key.for.rdojo.kombat.multiplayer'; // Demo key
    }

    // Start multiplayer mode
    async startMultiplayer(mode = 'create') {
        if (mode === 'create') {
            await this.createRoom();
        } else {
            // Join mode handled by user input
            return;
        }
    }

    // Create a new multiplayer room
    async createRoom() {
        this.roomCode = this.generateRoomCode();
        this.isHost = true;

        // Show room code to user
        this.showRoomCode();

        // Start syncing
        this.startSync();
    }

    // Join an existing room
    async joinRoom(roomCode) {
        this.roomCode = roomCode.toUpperCase();
        this.isHost = false;

        // Start syncing
        this.startSync();

        // Load initial state from room
        await this.loadState();
    }

    // Generate a random 6-character room code
    generateRoomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar-looking chars
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    // Start syncing state
    startSync() {
        // Sync every 500ms
        this.syncInterval = setInterval(() => {
            if (this.isHost) {
                this.pushState();
            } else {
                this.loadState();
            }
        }, 500);
    }

    // Push current state to server (host only)
    async pushState() {
        const now = Date.now();
        if (now - this.lastSync < 400) return; // Rate limit

        const stateToSync = {
            timeRemaining: state.timeRemaining,
            currentRound: state.currentRound,
            isRunning: state.isRunning,
            isPaused: state.isPaused,
            isRest: state.isRest,
            timestamp: now
        };

        try {
            await this.saveToCloud(this.roomCode, stateToSync);
            this.lastSync = now;
        } catch (err) {
            console.error('Sync error:', err);
        }
    }

    // Load state from server (guest)
    async loadState() {
        try {
            const data = await this.loadFromCloud(this.roomCode);
            if (data && data.timestamp > this.lastSync) {
                this.applyState(data);
                this.lastSync = data.timestamp;
            }
        } catch (err) {
            console.error('Load error:', err);
        }
    }

    // Apply received state
    applyState(receivedState) {
        state.timeRemaining = receivedState.timeRemaining;
        state.currentRound = receivedState.currentRound;
        state.isRunning = receivedState.isRunning;
        state.isPaused = receivedState.isPaused;
        state.isRest = receivedState.isRest;

        // Update timers if needed
        if (receivedState.isRunning && !state.timerInterval) {
            startTimers();
        } else if (!receivedState.isRunning && state.timerInterval) {
            clearInterval(state.timerInterval);
            clearInterval(state.controlInterval);
        }

        updateDisplay();
    }

    // Save data to cloud storage (using localStorage as fallback for now)
    async saveToCloud(key, data) {
        // For now, use localStorage as a simple implementation
        // In production, this would use a real backend service
        localStorage.setItem('mp_' + key, JSON.stringify(data));
    }

    // Load data from cloud storage
    async loadFromCloud(key) {
        // For now, use localStorage as a simple implementation
        const data = localStorage.getItem('mp_' + key);
        return data ? JSON.parse(data) : null;
    }

    // Show room code to host
    showRoomCode() {
        const modal = document.getElementById('multiplayerModal');
        const codeDisplay = document.getElementById('roomCodeDisplay');
        const joinSection = document.getElementById('joinRoomSection');
        const hostSection = document.getElementById('hostRoomSection');

        if (modal) {
            joinSection.style.display = 'none';
            hostSection.style.display = 'block';
            codeDisplay.textContent = this.roomCode;
            modal.style.display = 'flex';
        }
    }

    // Stop multiplayer sync
    stopSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
        this.roomCode = null;
        this.isHost = false;
    }
}

// Global instance
const simpleMultiplayer = new SimpleMultiplayerTimer();
