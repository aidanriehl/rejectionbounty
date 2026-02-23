

# Weekly Challenge Backlog System

## Overview
Create a database-driven challenge system where you pre-load many weeks of challenges at once. Each Sunday, the next batch of 10 automatically becomes the active set. You'll manage this through a simple admin page in the app (only visible to you).

## How It Works

1. You load challenges into the database, each tagged with a `week_number` (1, 2, 3, etc.)
2. A `challenge_weeks` table tracks which week is currently active and when it started
3. Every Sunday, a scheduled backend function advances to the next week automatically
4. Users see only the current week's 10 challenges

## Database Changes

### New tables

**`challenges`** -- stores all challenges across all weeks
- `id` (UUID, primary key)
- `week_number` (integer) -- which week batch this belongs to
- `position` (integer, 1-10) -- order within the week
- `title` (text)
- `description` (text)
- `emoji` (text)
- `created_at` (timestamp)

**`challenge_weeks`** -- tracks current active week
- `id` (integer, always 1 -- single row)
- `current_week` (integer, default 1)
- `week_started_at` (timestamp)

**`user_challenges`** -- tracks each user's completions
- `id` (UUID, primary key)
- `user_id` (UUID, references auth.users)
- `challenge_id` (UUID, references challenges)
- `completed_at` (timestamp)

**`user_roles`** -- admin role (required for security)
- `id` (UUID)
- `user_id` (UUID, references auth.users)
- `role` (enum: admin, user)

### RLS Policies
- `challenges`: everyone can read; only admins can insert/update/delete
- `challenge_weeks`: everyone can read; only admins can update
- `user_challenges`: users can read/insert their own completions
- `user_roles`: only the `has_role()` security definer function accesses this

### Scheduled function (cron)
- A backend function runs every Sunday at midnight
- It increments `current_week` in `challenge_weeks` and resets the week timer
- Uses `pg_cron` + `pg_net` to call an edge function on schedule

## App Changes

### Admin page (`/admin`)
- Only accessible if your user has the `admin` role
- Simple form to bulk-add challenges: pick a week number, then enter 10 challenge titles + emojis
- View upcoming weeks and edit/reorder challenges
- Button to manually advance the week (for testing)

### Challenges page update
- Fetch current week's challenges from the database instead of mock data
- Track completions in `user_challenges` table instead of local state
- Keep the existing UI (progress bar, confetti, upload button)

### Route guard
- Add `/admin` route, only rendered when user has admin role

## File Changes

### New files
- `supabase/functions/advance-week/index.ts` -- edge function to advance the week
- `src/pages/Admin.tsx` -- admin page for managing challenge backlog
- `src/hooks/useAdmin.ts` -- hook to check admin role

### Modified files
- `src/pages/Challenges.tsx` -- fetch from database instead of mock data
- `src/App.tsx` -- add `/admin` route with role guard

## Step-by-step

1. Create database tables (`challenges`, `challenge_weeks`, `user_challenges`, `user_roles`) with RLS
2. Create `has_role()` security definer function
3. Assign your user the admin role
4. Build the `advance-week` edge function
5. Set up the Sunday cron job
6. Build the admin page for loading challenges
7. Update the Challenges page to read from the database
8. Add admin route to App.tsx

