// Multiplayer functionality using PeerJS for peer-to-peer connections

class MultiplayerManager {
    constructor() {
        this.peer = null;
        this.connection = null;
        this.roomId = null;
        this.isHost = false;
        this.isConnected = false;
        this.onStateUpdate = null;
    }

    // Initialize PeerJS
    init() {
        if (typeof Peer === 'undefined') {
            console.error('PeerJS library not loaded');
            return false;
        }

        // Create peer with random ID
        this.peer = new Peer();

        this.peer.on('open', (id) => {
            console.log('Peer ID:', id);
        });

        this.peer.on('connection', (conn) => {
            this.handleConnection(conn);
        });

        this.peer.on('error', (err) => {
            console.error('Peer error:', err);
            this.showError('Connection error: ' + err.message);
        });

        return true;
    }

    // Create a new room (host)
    createRoom() {
        if (!this.peer) {
            if (!this.init()) return null;
        }

        this.isHost = true;
        this.roomId = this.generateRoomId();

        // Wait for peer to be ready
        if (this.peer.id) {
            return this.roomId;
        } else {
            this.peer.on('open', () => {
                return this.roomId;
            });
        }

        return this.roomId;
    }

    // Join an existing room (guest)
    joinRoom(roomId) {
        if (!this.peer) {
            if (!this.init()) return false;
        }

        this.isHost = false;
        this.roomId = roomId;

        // Wait for peer to be ready before connecting
        const connectToPeer = () => {
            const peerId = this.decodePeerId(roomId);
            this.connection = this.peer.connect(peerId);
            this.handleConnection(this.connection);
        };

        if (this.peer.id) {
            connectToPeer();
        } else {
            this.peer.on('open', connectToPeer);
        }

        return true;
    }

    // Handle incoming/outgoing connections
    handleConnection(conn) {
        this.connection = conn;

        conn.on('open', () => {
            this.isConnected = true;
            this.showMessage('Connected to partner!');

            // If host, send current state immediately
            if (this.isHost) {
                this.sendState(state);
            }
        });

        conn.on('data', (data) => {
            if (data.type === 'state') {
                this.receiveState(data.state);
            }
        });

        conn.on('close', () => {
            this.isConnected = false;
            this.showMessage('Partner disconnected');
        });

        conn.on('error', (err) => {
            console.error('Connection error:', err);
            this.showError('Connection error: ' + err.message);
        });
    }

    // Send state to connected peer
    sendState(gameState) {
        if (this.connection && this.connection.open) {
            this.connection.send({
                type: 'state',
                state: gameState
            });
        }
    }

    // Receive state from peer
    receiveState(receivedState) {
        if (this.onStateUpdate) {
            this.onStateUpdate(receivedState);
        }
    }

    // Generate a shareable room ID
    generateRoomId() {
        if (!this.peer || !this.peer.id) return null;
        return this.encodePeerId(this.peer.id);
    }

    // Encode peer ID to a shorter, shareable code
    encodePeerId(peerId) {
        // Create a shorter code from the peer ID
        const hash = this.simpleHash(peerId);
        return hash.toString(36).toUpperCase().substring(0, 6);
    }

    // Decode room ID back to peer ID (this is a simplified version)
    decodePeerId(roomId) {
        // In a real implementation, you'd need to store/retrieve the mapping
        // For now, we'll use a different approach: share the full peer ID
        return roomId;
    }

    // Simple hash function
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    // Disconnect from room
    disconnect() {
        if (this.connection) {
            this.connection.close();
        }
        if (this.peer) {
            this.peer.destroy();
        }
        this.isConnected = false;
        this.roomId = null;
        this.isHost = false;
    }

    // Show message to user
    showMessage(msg) {
        const statusEl = document.getElementById('multiplayerStatus');
        if (statusEl) {
            statusEl.textContent = msg;
            statusEl.className = 'multiplayer-status success';
        }
    }

    // Show error to user
    showError(msg) {
        const statusEl = document.getElementById('multiplayerStatus');
        if (statusEl) {
            statusEl.textContent = msg;
            statusEl.className = 'multiplayer-status error';
        }
    }
}

// Global multiplayer manager instance
const multiplayerManager = new MultiplayerManager();
