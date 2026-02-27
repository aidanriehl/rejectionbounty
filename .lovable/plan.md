

## Analysis: Comprehensive UI/UX Audit

After reviewing every page and component, here are all the issues I found with the current Kalshi-inspired palette and general UI:

### Critical Color Issues

1. **Destructive color is now invisible gray** (`0 0% 30%`). This breaks:
   - "Yes, Undo" button in the undo dialog (looks like normal text)
   - "Delete Account" in Settings (no danger signal)
   - Feed like hearts (`fill-destructive`) are now gray instead of warm/visible
   - Weekly Summary low take-rate bars are gray (no meaning)
   - Leaderboard badges for users who didn't qualify are gray-on-gray

2. **Everything is the same teal** -- checkmarks, progress bar, upload buttons, ring, links. No visual hierarchy. The eye has nowhere to rest or focus.

3. **Prize pool card blur still has `overflow-hidden`** on the outer `<button>` wrapper (line 181) causing hard-edged blur on the prize pool (subscriber card was fixed but prize pool wasn't).

### User's Previous Request Not Implemented

4. **Dark mode toggle still exists in Settings** (lines 277-298). User previously asked to "revert the night mode and remove the option in settings."

### Plan

**A. Fix destructive actions -- use a warm amber/orange instead of red or gray**
- Change `--destructive` to `30 90% 50%` (amber) in both light and dark themes
- This keeps the "no red" rule while making danger states visible and distinct from primary teal

**B. Add visual hierarchy with a second accent color**
- Completed checkmarks: keep teal (`bg-success`)
- Upload buttons: switch to a subtle warm neutral tint instead of `primary/10` to differentiate from progress
- Progress bar label text: keep teal, it's the main CTA color

**C. Fix the prize pool card blur** 
- Remove `overflow-hidden` from the prize pool button wrapper (line 181), matching the subscriber card fix

**D. Remove dark mode toggle from Settings**
- Delete the entire dark mode row (lines 277-298) from Settings.tsx

**E. Fix Feed like hearts**
- Change heart color from `destructive` to a dedicated warm color (e.g., inline `text-rose-500 fill-rose-500` or use the new amber destructive) since hearts shouldn't be gray or teal

**F. Fix Weekly Summary color usage**
- Low take-rate bars currently use `destructive` (gray). Switch to amber/warm tone for visual meaning

### Files to Edit

- `src/index.css` -- update `--destructive` to amber in both themes
- `src/pages/Challenges.tsx` -- remove `overflow-hidden` from prize pool button
- `src/pages/Settings.tsx` -- remove dark mode toggle row
- `src/pages/Feed.tsx` -- change heart color from destructive to a warm pink/rose
- `src/components/WeeklySummary.tsx` -- fix low take-rate bar color

