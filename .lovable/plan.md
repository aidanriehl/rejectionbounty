

## Weekly Drop Reveal Animation

A full-screen reveal experience that plays when users open the Challenges page and haven't "unwrapped" the current week's drop yet. Inspired by Claim's tap-to-reveal mechanic.

### The Experience

1. **Full-screen overlay** with a bold gradient background (deep purple to black, matching the app's primary color)
2. **A bounty chest graphic** (fits the "Rejection Bounty" brand) built as an SVG -- a stylized treasure chest with a lock
3. **3 taps to unlock:**
   - **Tap 1**: Chest shakes, lock cracks, particles fly out. Text: "Keep going..."
   - **Tap 2**: Chest lid lifts slightly, golden light leaks out, more particles. Text: "Almost there..."
   - **Tap 3**: Chest bursts open, big confetti explosion, golden light fills screen, then transitions to reveal the challenge list with a staggered card-flip animation
4. **Challenge reveal**: Each challenge card fades/scales in one-by-one with a short stagger delay

### Visual Details

- The chest SVG will use the app's `primary` and `gold` color tokens
- Each tap stage has a subtle scale bounce (framer-motion spring)
- The "crack" and "light leak" effects are layered div glows with opacity transitions
- Final reveal uses the existing `fireBigConfetti()` function
- A pulsing "Tap to open" prompt below the chest guides the user

### State Management

- A `dropRevealed` flag stored in `localStorage` (keyed by week number) tracks whether the user has already seen the reveal
- If already revealed, the Challenges page loads normally with no animation
- The reveal only plays once per weekly reset cycle

### Technical Plan

1. **New component**: `src/components/DropReveal.tsx`
   - Full-screen overlay with the 3-stage tap interaction
   - Custom `BountyChest` SVG component with 3 visual states (locked, cracking, open)
   - Framer Motion for shake, scale, and transition animations
   - Calls `fireBigConfetti()` on final reveal

2. **Update**: `src/pages/Challenges.tsx`
   - Add `dropRevealed` state initialized from localStorage
   - If not revealed, render `<DropReveal />` overlay instead of the challenge list
   - On reveal complete, set localStorage flag and fade into normal challenge view

3. **Update**: `src/lib/mock-data.ts`
   - Add helper `getCurrentWeekKey()` to generate a consistent week identifier for the localStorage key

4. **No new dependencies needed** -- framer-motion and canvas-confetti are already installed

