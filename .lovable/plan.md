
# Onboarding Page with Google + Apple Sign-In

## Overview
Create a single-page onboarding screen with Google and Apple sign-in buttons. After signing in, users see a quick username input before entering the app. An avatar creature is auto-assigned randomly.

This requires connecting a backend (Lovable Cloud) for authentication.

## Flow

1. **Onboarding screen** (`/onboarding`) -- the landing page for unauthenticated users
   - App logo/name and tagline (e.g. "Face your fears. One challenge at a time.")
   - "Sign in with Google" button
   - "Sign in with Apple" button
   - Clean, minimal design matching the app's style

2. **Username setup** (`/setup`) -- shown once after first sign-in
   - Simple input: "Pick a username"
   - Auto-assigns a random avatar creature (dragon, tree, fox, owl, cat)
   - "Let's go" button to confirm and enter the app

3. **Auth guard** -- redirects unauthenticated users to `/onboarding`, and authenticated users without a username to `/setup`

## Backend Requirements

Before implementing, we need to **connect Lovable Cloud** to your project. This gives you:
- Supabase auth with Google + Apple sign-in (managed for you)
- A database for storing user profiles (username, avatar, streak, etc.)

### Database

A `profiles` table will be created:
- `id` (UUID, references auth.users)
- `username` (text, unique)
- `avatar` (text -- dragon/tree/fox/owl/cat)
- `avatar_stage` (integer, default 0)
- `streak` (integer, default 0)
- `total_completed` (integer, default 0)
- `created_at` (timestamp)

A trigger will auto-create a profile row when a user signs up.

### RLS Policies
- Users can read any profile (for the feed)
- Users can only update their own profile

## File Changes

### New files
- `src/lib/supabase.ts` -- Supabase client setup
- `src/pages/Onboarding.tsx` -- Sign-in screen with Google/Apple buttons
- `src/pages/Setup.tsx` -- Username picker (post-signup)
- `src/hooks/useAuth.ts` -- Auth state hook (current user, loading, profile)

### Modified files
- `src/App.tsx` -- Add routes for `/onboarding` and `/setup`, wrap with auth context, redirect logic
- `src/lib/mock-data.ts` -- Keep mock data for now but the profile will eventually come from the database

## Step-by-step

1. Connect Lovable Cloud to the project
2. Create the `profiles` table with trigger and RLS
3. Build the Supabase client and auth hook
4. Build the Onboarding page (Google + Apple buttons, app branding)
5. Build the Setup page (username input, random avatar assignment)
6. Update App.tsx routing to guard pages behind auth
