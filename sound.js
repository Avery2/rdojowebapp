// Sound utilities for timer notifications

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
    }

    // Initialize audio context (required for mobile browsers)
    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        // Resume context if suspended (common on mobile)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Play a loud alarm sound
    playTimerEndSound() {
        if (!this.enabled) return;

        this.init();

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Create three oscillators for a more attention-grabbing sound
        for (let i = 0; i < 3; i++) {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Alternating frequencies for alarm effect
            oscillator.frequency.value = i % 2 === 0 ? 800 : 600;
            oscillator.type = 'square';

            // Volume envelope
            gainNode.gain.setValueAtTime(0, now + i * 0.3);
            gainNode.gain.linearRampToValueAtTime(0.3, now + i * 0.3 + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.25);

            oscillator.start(now + i * 0.3);
            oscillator.stop(now + i * 0.3 + 0.3);
        }
    }

    // Play a short beep for control point awards
    playPointSound() {
        if (!this.enabled) return;

        this.init();

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = 880;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }
}

// Global sound manager instance
const soundManager = new SoundManager();
