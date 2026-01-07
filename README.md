# Rdojo Kombat Timer

A timer app for scoring Rdojo Kombat sparring matches with multiplayer support and sound notifications.

## Features

- **Automatic Timer** - Timer runs automatically with round and rest periods
- **Sound Notifications** - Loud alarm when timer ends (works on mobile and web)
- **Multiplayer Mode** - Share timer with a friend using room codes
- **Auto-save** - Never lose your match progress
- **Mobile Friendly** - Responsive design with sticky header

## Quick Start

**Use Online:** www.averychan.site/rdojowebapp/

**Use Locally:** Download this folder and open `index.html` in your web browser (Chrome, Firefox, Safari, etc.)

## How to Use

### Before Starting
1. Click **Settings** (or press **S**)
2. Enter fighter names (optional)
3. Click **Save Changes**

### During the Match
1. Click **Start Match** (or press **Space**)
2. Use the control buttons or arrow keys to mark who has control:
   - **← or 1** = Fighter A has control
   - **↓ or 2** = No control (neutral)
   - **→ or 3** = Fighter B has control
3. Watch the countdown in each fighter's card - points award automatically every 3 seconds

### Ending a Round
- Click **Submission** or **Stoppage**, then choose which fighter won
- Or let the timer run out for a decision

### Other Controls
- **Space** = Pause/Resume
- **S** = Open settings
- **Reset** = Start over from any round

### Multiplayer Mode (NEW!)

Use the timer with a friend on different devices:

1. **Host** clicks **Multiplayer** → **Host Timer**
2. Share the **6-character room code** with your friend
3. **Guest** clicks **Multiplayer** → **Join Timer** and enters the code
4. Both devices will now see the same timer in real-time!

**Note:** Only the host can control the timer. The guest sees updates in real-time.

### Important Notes
- The app auto-saves your match - you can refresh without losing anything
- Sound notifications work best after you interact with the page (click/tap)
- On mobile, scores and timer stay visible at the top while scrolling
- Customize round durations and points in `config.js` if needed
- Multiplayer uses localStorage for sync (same device/network recommended)

## Support

For rule details, see the official Rdojo Kombat rulebook PDF.
