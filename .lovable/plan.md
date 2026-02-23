

# Profile Page Redesign

## What's Changing

Remove the Instagram-style stats row and "Member since" text. Replace with two stacked full-width cards below the avatar and username.

## New Layout (top to bottom)

1. **Top bar** -- username left, settings gear right (stays the same)
2. **Avatar** -- centered, with stage label below (stays the same)
3. **Streak Card** -- full-width card containing:
   - Current streak number with fire emoji (e.g. "4 🔥")
   - Label: "Day Streak"
   - Progress bar showing progress toward a 7-day weekly goal
   - Best streak displayed as secondary text (e.g. "Best: 12 days")
4. **Challenges Card** -- full-width card containing:
   - Total completed count (e.g. "47")
   - Label: "Challenges Completed"
   - Completion rate as secondary text (e.g. "78% completion rate")
5. **Video Grid** -- the 3x3 grid stays as-is below the cards

## What's Removed

- The side-by-side stats row (Challenges / Streak / Friends)
- The "DailyRejecter" name repetition and "Member since Jan 2026" text below the stats
- Friends count entirely

## Technical Details

### File: `src/pages/Profile.tsx`
- Remove the stats row (`flex flex-1 justify-around` block with Challenges/Streak/Friends)
- Remove the name + bio section ("Member since" text)
- Add a `bestStreak` field usage from mock data (will add to mock data)
- Add two stacked Card components using the existing `Card` UI component
- First card: streak number, fire emoji, 7-day progress bar (using the existing `Progress` component), best streak text
- Second card: total completed, "Challenges Completed" label, completion rate text

### File: `src/lib/mock-data.ts`
- Add `bestStreak` field to `UserProfile` interface and mock data (e.g. 12)
- Add `totalAttempted` field to calculate completion rate (e.g. 60, giving 78%)

