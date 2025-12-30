# Rdojo Kombat Timer

A simple, intuitive timer application for scoring Rdojo Kombat sparring matches. Built with vanilla HTML, CSS, and JavaScript - works completely offline with a clean, modular codebase.

## Quick Start

1. Open `index.html` in any modern web browser
2. (Optional) Click "Settings" to customize fighter names
3. Click "Start Match" to begin Round 1
4. Use arrow keys or buttons to mark who has positional control
5. Watch the 3-second countdown indicator as points accumulate automatically
6. Use round ending buttons for submissions or stoppages, or let the timer run out for a decision

## Match Format

**Best 2 out of 3 Rounds:**
- **Round 1**: 3 minutes, 30 point maximum
- **Round 2**: 2 minutes, 20 point maximum
- **Round 3**: 1 minute, 10 point maximum
- **Rest Period**: 1 minute between rounds

## How Scoring Works

### Control Points
- **1 point awarded every 3 seconds** to the fighter marked "in control"
- **Visual countdown indicator** shows time until next point is awarded
- **Standing control**: Fighter's back foot inside 6'x6' box while opponent's back foot is outside
- **Ground control**: Fighter on top of opponent (not defending a submission)
- **No control**: No points awarded when neither fighter has control

### Round Victory Conditions
- **Submission**: Fighter taps to joint lock or choke
- **Stoppage**: Fighter unable to defend strikes or visibly stunned
- **Tech Fall**: Fighter reaches maximum points before time expires (automatic)
- **Decision**: Fighter with more points when time expires (automatic)

## Controls

### Main Controls
- **Start Match**: Begin the match (Round 1)
- **Pause/Resume**: Freeze/unfreeze timer and point accumulation
- **Reset**: Choose to reset entire match or from specific round
- **Settings**: Customize fighter names and edit scores

### Control Position (Most Important!)
- **Arrow Left or 1**: Mark Fighter A in control
- **Arrow Down or 2**: No control (neutral)
- **Arrow Right or 3**: Mark Fighter B in control

### Round Ending Buttons
- **Submission A/B**: End round - Fighter wins by submission
- **Stoppage A/B**: End round - Fighter wins by stoppage (GnP or standing strike)

### Settings Panel
- **Fighter Names**: Customize names for both fighters (updates all buttons and displays)
- **Edit Scores**: Manually set exact scores for current round if needed

## Keyboard Shortcuts

All keyboard shortcuts are displayed in the app for easy reference:

- **Space**: Start match / Pause-Resume
- **← or 1**: Set Fighter A in control
- **↓ or 2**: Set no control (neutral)
- **→ or 3**: Set Fighter B in control
- **S**: Open settings panel

## Features

### Automatic Operations
- ✅ Timer counts down automatically for rounds and rest periods
- ✅ Points awarded every 3 seconds with visual countdown
- ✅ Tech fall detected automatically when max points reached
- ✅ Auto-progression to rest period then next round
- ✅ Match winner determined automatically (best 2 of 3)

### Visual Indicators
- 🟢 Fighter A: Green border and highlights
- 🔴 Fighter B: Red/orange border and highlights
- ⚪ Glowing effect shows who currently has control
- ⏱️ **3-second countdown** displays next point timing
- 🟢 Round dots show which rounds each fighter has won
- ⏰ Timer turns yellow during rest, red in final 10 seconds
- 📊 Round history displays all completed rounds
- 📱 Sticky mobile header keeps timer/scores visible while scrolling

### Manual Override Capabilities
- ✅ Pause/resume at any time
- ✅ Edit fighter names in settings
- ✅ Manually set exact scores in settings
- ✅ End round manually (submission or stoppage)
- ✅ Reset from any round or start completely over
- ✅ Full control over who has positional control

### Mobile Optimized
- 📱 Sticky header on mobile shows timer and scores at all times
- 📱 Responsive layout adapts to any screen size
- 📱 Touch-friendly button sizes
- 📱 Works great on phones and tablets

## Project Structure

```
timer/
├── index.html       # Main HTML structure
├── styles.css       # All styling and responsive design
├── config.js        # Configurable constants (durations, points, etc.)
├── state.js         # State management
├── game-logic.js    # Timer, scoring, and round management
├── app.js           # UI updates and controls
├── mobile.js        # Mobile sticky header logic
└── README.md        # This file
```

## Tips for Referees

1. **Set Fighter Names First**: Open Settings (S key) and enter names before starting
2. **Master the Arrow Keys**: ← for Fighter A, ↓ for neutral, → for Fighter B
3. **Watch the Countdown**: The big number shows when the next point awards
4. **Keep it Running**: Don't pause unless absolutely necessary - settings allow post-match adjustments
5. **Control Toggle is Key**: Your main job is keeping control position updated
6. **Tech Falls Automatic**: No need to manually end when someone hits max points
7. **Mobile Friendly**: On phones, the sticky header keeps timer visible while you scroll to controls

## Configuration

To modify the rules (durations, points, etc.), edit the `CONFIG` object in `config.js`:

```javascript
const CONFIG = {
    rounds: [
        { duration: 180, maxPoints: 30 }, // Round 1: 3 minutes, 30 points
        { duration: 120, maxPoints: 20 }, // Round 2: 2 minutes, 20 points
        { duration: 60, maxPoints: 10 }   // Round 3: 1 minute, 10 points
    ],
    restDuration: 60,        // 1 minute rest between rounds
    controlPointInterval: 3  // Award 1 point every 3 seconds
};
```

## Code Organization

The codebase is split into logical modules for maintainability:

- **config.js**: All configurable constants in one place
- **state.js**: Centralized state management with reset functions
- **game-logic.js**: Core competition logic (timer, scoring, rounds)
- **app.js**: UI updates, controls, and keyboard shortcuts
- **mobile.js**: Mobile-specific enhancements
- **styles.css**: All styling with clear section organization

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Troubleshooting

**Timer not starting**: Make sure you clicked "Start Match" or pressed Space
**Points not accumulating**: Check that you've marked a fighter as "in control" (arrows or 1/2/3 keys)
**No countdown showing**: Countdown only appears when someone has control and match is running
**Wrong fighter name on buttons**: Click Settings and update the fighter names
**Wrong score**: Click Settings to set exact scores
**Need to restart a round**: Use Reset button and choose which round to start from
**Match stuck**: Use Reset > "Reset entire match" to start completely fresh
**Mobile header not showing**: Header only appears on screens narrower than 768px

## What's New in v2

- ✨ Customizable fighter names (updates throughout UI)
- ⏱️ Visual 3-second countdown indicator for control points
- ⌨️ Enhanced keyboard shortcuts (arrow keys + number keys)
- ⚙️ Dedicated settings panel for names and scores
- 📱 Sticky mobile header for always-visible timer/scores
- 🏗️ Modular code structure for easy maintenance
- 🎨 Improved button organization and labeling

## License

Free to use for Rdojo Kombat training and competition.
