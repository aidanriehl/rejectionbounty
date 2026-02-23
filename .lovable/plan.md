

## Remove Placeholder Content from Profile

### Problem
The Profile page displays hardcoded mock data (`mockUserProfile`, `mockUserVideos`) instead of the real user's profile from the database. A brand new user sees "47 Challenges Completed", a "4 Day Streak", and stock photos — which is confusing and misleading.

### What Changes

**1. Use real profile data from the auth hook**
- Replace `mockUserProfile` with the actual `profile` from `useAuth()`
- Display the user's real username, avatar, avatar stage, streak, and total completed count
- A new user will correctly see 0 streak, 0 challenges, and the proper starting avatar

**2. Remove fake video grid for now**
- Remove `mockUserVideos` stock photos from the grid
- Show an empty state instead: a subtle message like "Complete challenges and post videos to fill your grid" with a camera icon
- Once real video uploads exist in the database, this grid can be wired up later

**3. Handle zero/new-user states gracefully**
- Streak card: show "0 Day Streak" with "Best: 0 days"
- Challenges card: show "0 Challenges Completed" with progress bar at 0%
- Hide the "weekly completion rate" percentage when there's no data (avoid 0/0 = NaN)

### Technical Details

**File: `src/pages/Profile.tsx`**
- Import `useAuth` hook instead of `mockUserProfile` / `mockUserVideos`
- Pull `profile` from `useAuth()` and map its fields (`streak`, `total_completed`, `avatar`, `avatar_stage`) to the UI
- Replace the video grid with an empty state component when no videos exist
- Guard against division-by-zero on completion rate

**File: `src/lib/mock-data.ts`**
- No changes needed — mock data can stay for other pages (Feed, Challenges) that still use it

