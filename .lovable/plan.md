
# Chest-to-Challenge Card Reveal Animation

## What Changes

Instead of confetti when the chest opens, the challenge cards will visually emerge from the chest's position and dramatically animate ("wave") into their final positions in the normal challenges list.

## How It Will Feel

1. User taps the chest for the 3rd time
2. The chest lid flies open fully and the chest fades/scales away
3. The full-screen overlay fades out, revealing the challenges page behind it
4. The challenge cards appear stacked at the center of the screen (where the chest was) and then one-by-one fly/wave into their final list positions with a spring animation and staggered timing
5. Each card starts small, slightly rotated, and elevated -- then settles into place with a satisfying bounce
6. The cascade sound effect still plays during the card entrance

## Technical Details

### 1. `DropReveal.tsx` changes
- Remove the `fireBigConfetti()` call on final tap
- Keep `playBigWin()` sound and haptic feedback
- On stage 3: chest opens fully (lid rotates far back), then the overlay fades out after a shorter delay (~600ms instead of 1200ms)

### 2. `Challenges.tsx` animation changes
- Update the `justRevealed` entrance animation for each challenge card:
  - **Initial state**: `opacity: 0`, `y: -200` (coming from above, where the chest was), `scale: 0.6`, `rotate: -8` (slight tilt for the "wave" feel)
  - **Animate to**: `opacity: 1`, `y: 0`, `scale: 1`, `rotate: 0`
  - **Transition**: Longer stagger per card (`delay: i * 0.12`), spring with lower stiffness for a more dramatic wobble (`stiffness: 300, damping: 18`)
- Increase the `justRevealed` timeout from 1500ms to ~2500ms to account for the longer staggered entrance (10 cards x 120ms = 1200ms + spring settle time)

### 3. `confetti.ts` -- no changes needed
The confetti import in `DropReveal.tsx` will simply be removed. The confetti functions remain available for challenge completion celebrations.

### Files Modified
- `src/components/DropReveal.tsx` -- remove confetti, adjust timing
- `src/pages/Challenges.tsx` -- dramatic card entrance animation
