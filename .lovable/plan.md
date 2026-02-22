

# Daily Rejection — Major UI/UX Overhaul

## Summary
A comprehensive redesign covering navigation, visual style, interactions, feed logic, profile system, and avatar system.

---

## 1. Navigation Changes

- **Swap tab order**: Feed (Home) becomes the first/default tab at `/`, Challenges moves to `/challenges`
- **Feed icon**: Change from `Play` to `Home` icon
- **Remove labels**: Bottom nav shows only icons, no text underneath
- Update `App.tsx` routes accordingly

---

## 2. Design Overhaul: Clean and Minimal

- **Remove Fredoka font** entirely — use a clean sans-serif system font stack (Inter or just the system default)
- **Replace Nunito** with Inter (or similar clean font)
- **Tone down colors**: More muted/neutral palette — think blacks, whites, subtle grays, with one accent color (keep the purple or switch to a clean blue)
- **Remove emojis** from headers (no more "Feed TV", "Profile man", "Daily Rejection fire")
- **Simplify card styles**: Less rounded corners (round-xl instead of round-3xl), less gradients, more whitespace
- Overall vibe: Instagram/clean mobile app, not a kids' game

---

## 3. Challenge Completion Celebrations

- **Haptic feedback**: Use `navigator.vibrate()` on challenge completion (works on Android, gracefully ignored on iOS)
- **Confetti animation**: Full-screen confetti burst using canvas-confetti (lightweight library) when a challenge is checked off
- **Progressive messages** based on completion count:
  - 1/5: "Great start!"
  - 2/5: "We're getting somewhere..."
  - 3/5: "Halfway there!"
  - 4/5: "One more to go!"
  - 5/5: "You crushed it this week!"
- Show the message as a toast or inline animated text after each completion

---

## 4. Challenges Screen Updates

- Add **subscriber count** displayed above the weekly prize pool card
- Keep the progress bar but update messaging per above

---

## 5. Profile Redesign — Instagram Style

- **Layout**: Profile photo centered at top, name underneath
- **Stats row** (like Instagram): 3 columns showing:
  - Challenges Completed (total)
  - Weekly Streak
  - Friends count
- **Add friend button**: Plus icon on the SE corner of other users' profile photos (in feed/friends list)
- **3x3 video grid**: Show user's uploaded videos in a grid (like Instagram profile)
- **Privacy setting**: Toggle to make profile public/private (videos can still be posted to public feed regardless)

---

## 6. Avatar System — 5 Character Icons

Instead of uploading a real photo, users choose from 5 illustrated avatar characters:

1. **Dragon** (silly, cute — like the reference image but without the chef hat)
2. **Tree**
3. **Fox**
4. **Owl**
5. **Cat**

**Evolution mechanic**:
- Avatars evolve based on streak/consistency
- **Stage 0 (dead/grave)**: Missed weeks — avatar shown as a tombstone/grave
- **Stage 1 (basic)**: Just started or recovering
- **Stage 2 (growing)**: Building streak
- **Stage 3 (legend/gold)**: Long streak — gold version with accessories (crown, fruit on tree, sparkles, etc.)

These will be rendered as emoji/SVG combinations for the MVP, with the option to replace with custom illustrations later.

---

## 7. Feed Overhaul

### Autoplay behavior
- Remove the play button overlay from video thumbnails
- Videos auto-play (muted) when scrolled into view using Intersection Observer
- Users just keep scrolling if they don't want to watch

### Remove comments
- Remove the comment icon and comment count from feed posts entirely

### Friends tab
- Add a third tab: **This Week** | **All Time** | **Friends**
- Friends tab shows only videos from people you've added as friends

### All Time ranking
- Show rank numbers (1, 2, 3...) next to each video in the All Time tab
- Style top 3 with gold/silver/bronze accents

### Feed algorithm / sorting question
- **This Week** tab: Sort by likes, but add a **time-decay weighting** so newer posts get a boost. Formula concept: `score = likes + (recency_bonus)` where recency bonus decreases over 7 days. This prevents early-posters from having an unfair advantage.
- **All Time** tab: Pure like count, no decay — the best videos of all time rise to top
- **Friends** tab: Chronological (newest first)

---

## 8. Technical Details

### Files to create:
- `src/lib/confetti.ts` — confetti animation utility (using canvas-confetti package)
- `src/components/AvatarPicker.tsx` — avatar selection component with 5 character options
- `src/components/AvatarDisplay.tsx` — renders avatar at correct evolution stage
- `src/components/ProfileGrid.tsx` — 3x3 video grid for profile

### Files to modify:
- `src/index.css` — Replace fonts, tone down color palette to clean/minimal
- `tailwind.config.ts` — Update font families, adjust color tokens
- `src/components/BottomNav.tsx` — Swap order, change icon, remove labels
- `src/App.tsx` — Update routes (Feed at `/`, Challenges at `/challenges`)
- `src/pages/Challenges.tsx` — Add subscriber count, celebration logic, progressive messages
- `src/pages/Feed.tsx` — Remove play button, remove comments, add Friends tab, add ranking numbers on All Time, autoplay with Intersection Observer
- `src/pages/Profile.tsx` — Full redesign: Instagram layout, avatar display, stats row, video grid, privacy toggle
- `src/lib/mock-data.ts` — Add friend/avatar mock data, update FeedPost interface (remove comments field)

### New dependency:
- `canvas-confetti` — lightweight confetti animation library

---

## 9. Implementation Order

1. Design system overhaul (fonts, colors, clean minimal style)
2. Navigation restructure (swap tabs, remove labels, change icon)
3. Avatar system (picker + display with evolution stages)
4. Profile redesign (Instagram layout, stats, video grid)
5. Challenge celebrations (vibration, confetti, progressive messages)
6. Feed updates (autoplay, remove comments/play button, Friends tab, All Time rankings, time-decay sorting)
7. Mock data updates throughout

