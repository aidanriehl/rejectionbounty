

# Daily Rejection — App Plan

## Overview
A weekly rejection therapy challenge app where users pick 5 out of 10 weekly challenges, complete them, optionally upload 30-second videos to a public feed, and compete for a weekly prize pool funded by subscriptions. Playful, colorful design. Built as a PWA (installable from browser).

---

## Navigation (Bottom Tab Bar)
- **Challenges** (home/default) — Weekly challenge list + your progress
- **Feed** — Instagram-style scrollable video feed
- **Profile** — Your stats, streak, visual element, and settings

---

## Screen 1: Challenges (Home)
- Shows this week's **10 rejection challenges** (text descriptions)
- Users tap a challenge to mark it complete (self-mode = just check it off)
- Option to **upload a 30-sec video** per challenge — choose a thumbnail frame, then it posts to the feed (this is what makes it "public/group")
- Progress indicator: **X/5 completed** this week
- Countdown timer to Sunday reset
- Shows the **current prize pool amount** prominently

## Screen 2: Feed
Two sections/tabs within the feed:
- **This Week** — Videos from the current week's challenges, sorted by most likes
- **All Time** — Hall of fame / best videos ever, sorted by all-time likes
- Each post shows: video thumbnail (tap to play), username, challenge name, like count, comment count
- Instagram-style vertical scroll (NOT fullscreen swipe)
- Like button + comment section per video
- Upload button accessible from here too

## Screen 3: Profile
- **Streak counter** — Current weekly streak (resets to 0 if you miss completing 5 in a week)
- **Visual element** — A growing plant/garden that thrives with consistency and visibly wilts/degrades when you miss weeks
- History of completed challenges
- Subscription status
- Active user count / pool display
- Settings (logout, manage subscription)

---

## Weekly Cycle
- Every **Sunday**, a new set of 10 challenges drops (authored by you via admin)
- Users pick any 5 to complete throughout the week (no upfront commitment needed)
- At reset: top 10 most-liked videos from the past week split the prize pool **equally**
- Streak updates: +1 if you completed 5, resets to 0 if not
- Visual element updates accordingly

---

## Video Upload Flow
1. Tap a challenge → "Upload Video" option
2. Record or select video (max 30 seconds)
3. Choose thumbnail frame from the video
4. Submit → appears in the feed tied to that challenge

---

## Monetization & Prize Pool
- **Free for 1 month** (full access to everything)
- After trial: **$3.99/month** subscription required
- $3.00 per subscriber goes into the **weekly prize pool**
- Pool split equally among top 10 most-liked videos each week
- Pool amount displayed prominently on Challenges screen

---

## Admin Panel
- Simple admin interface for you to:
  - Create/edit the 10 weekly challenges
  - Schedule them (auto-drop every Sunday)
  - View/manage reported content if needed

---

## Backend (Lovable Cloud + Supabase)
- **Auth**: Email signup/login with free trial tracking
- **Database**: Users, challenges, completions, videos, likes, comments, streaks, pool tracking
- **Storage**: Video uploads (30-sec max) + thumbnails
- **Edge Functions**: Weekly reset logic, pool calculation, payout tracking
- **Stripe**: $3.99/month subscription management

---

## Design Style
- **Playful & colorful**: Bright accent colors, rounded cards, fun typography
- Mobile-first responsive layout
- PWA installable from browser (Add to Home Screen)
- Celebratory animations for completing challenges and hitting streaks

---

## Phase 1 (MVP to build now)
1. Auth + onboarding + free trial
2. Weekly challenges screen with completion tracking
3. Video upload with thumbnail selection
4. Feed (this week + all time views)
5. Likes & comments
6. Profile with streak + visual plant element
7. Admin panel for managing weekly challenges
8. Stripe subscription ($3.99/mo)
9. Prize pool display + weekly reset logic

