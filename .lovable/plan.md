

# Feature Tour / Onboarding Walkthrough

## Overview
After a new user completes Setup (username pick), they'll be taken through a guided 4-step tour that highlights key features. This is the classic "coach marks" pattern -- a semi-transparent overlay with a spotlight cutout on the target element, a tooltip card with explanation text, and a "Next" / "Got it" button to advance.

## Tour Steps

| Step | Page | Spotlight Target | Title | Description |
|------|------|-----------------|-------|-------------|
| 1 | `/challenges` | Prize Pool + Subscriber cards | **Win real money every week** | "Every subscriber adds to the weekly prize pool. The more people join, the bigger the pot." |
| 2 | `/challenges` | Challenge list area | **10 challenges, pick any 5** | "Each Sunday, 10 new challenges drop. Complete at least 5 to stay in the game and keep your streak alive." |
| 3 | `/challenges` | Upload button on a challenge row | **Film it to win** | "Upload a video of yourself completing a challenge. Subscribers are entered into the weekly cash lottery." |
| 4 | `/` (Feed) | Feed area | **Watch the community** | "See how others are facing their fears. Like, learn, and get inspired." |

## How it works

### New component: `FeatureTour.tsx`
- Renders a full-screen overlay with a spotlight "hole" around the target element
- A tooltip card positioned near the spotlight with step title, description, step indicator dots, and Next/Done button
- Uses `framer-motion` for smooth transitions between steps
- Steps that are on different pages will trigger `navigate()` before highlighting

### State management
- After Setup completes, a flag `tour_pending` is set in `localStorage`
- `AppRoutes` checks this flag and renders `<FeatureTour />` on top of the authenticated layout
- When tour completes, flag is cleared so it never shows again
- Tour can also be dismissed at any step via a "Skip" link

### Step targeting
- Each tour step specifies a CSS selector (e.g. `[data-tour="prize-pool"]`) for the spotlight target
- We add `data-tour` attributes to the relevant elements in `Challenges.tsx` and `Feed.tsx` (minimal changes -- just adding a data attribute to existing wrapper divs)
- The tour component uses `getBoundingClientRect()` to position the spotlight and tooltip

### Navigation between pages
- Steps 1-3 are on `/challenges`, step 4 is on `/`
- When advancing from step 3 to 4, the tour calls `navigate("/")` and waits a tick for the page to render before spotlighting

### Visual design
- Semi-transparent dark overlay (`bg-black/60`) with a rounded rectangle cutout via CSS clip-path or box-shadow trick
- Tooltip card: white card with rounded corners, step title in bold, description text, dot indicators, and a primary-colored "Next" / "Got it" button
- "Skip tour" text link in muted color
- Smooth fade/slide transitions between steps

## Files to create
- `src/components/FeatureTour.tsx` -- the tour overlay + tooltip component with all 4 steps

## Files to modify
- `src/pages/Setup.tsx` -- set `localStorage.setItem("tour_pending", "true")` before navigating after setup, and navigate to `/challenges` instead of `/profile`
- `src/pages/Challenges.tsx` -- add `data-tour="prize-pool"`, `data-tour="challenge-list"`, `data-tour="upload-btn"` attributes to target elements
- `src/pages/Feed.tsx` -- add `data-tour="feed"` attribute to the feed container
- `src/App.tsx` -- render `<FeatureTour />` inside the authenticated layout, conditionally based on the localStorage flag

## Technical details

The spotlight effect uses a box-shadow approach on a positioned div that matches the target element's bounding rect, with a massive spread `box-shadow: 0 0 0 9999px rgba(0,0,0,0.6)` to create the dark overlay around it. This avoids clip-path browser quirks.

The tooltip positions itself above or below the spotlight based on available space, with a small arrow/pointer toward the highlighted element.

Step transitions use `framer-motion` `AnimatePresence` with a fade + slight slide for the tooltip card. Page navigation transitions use a brief delay to allow the new page to mount before measuring element positions.

