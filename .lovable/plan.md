

# Feed Redesign: Reels-Style Grid + Full-Screen Viewer

## What Changes

The feed switches from full-width stacked cards to a **3-column grid of 9:16 thumbnails** (like Instagram's Reels tab). Tapping any thumbnail opens a **full-screen vertical viewer** with post details, like button, and double-tap-to-like.

## Layout

### Grid View (Feed page)
- 3-column grid with small gaps (2px like Instagram)
- Each cell is 9:16 aspect ratio
- Thumbnails fill the cell, no borders or rounded corners
- Rank badges (for All Time tab) overlay top-left of each thumbnail
- Like count overlaid at bottom-left with a small heart icon
- Username overlaid at bottom of thumbnail in small text
- Tabs (This Week / All Time / Friends) remain at the top

### Full-Screen Viewer (opens on tap)
- Opens as a full-screen overlay/modal
- Shows the video/thumbnail at 9:16 filling the screen
- Right side: vertical action bar (heart, like count) like Reels
- Bottom: username, avatar, challenge title overlaid on the video
- Double-tap anywhere to like (with heart animation)
- Swipe up/down or tap X to close
- Could later support vertical swiping between posts

## Technical Details

### Files to modify

**`src/pages/Feed.tsx`**
- Replace `PostCard` with a `GridThumbnail` component: just the image in 9:16 with overlaid like count and username
- Wrap each tab's content in a `grid grid-cols-3 gap-0.5` layout
- Add state to track which post is selected for the full-screen viewer
- On thumbnail tap, open the full-screen viewer

**New component: `src/components/ReelViewer.tsx`**
- Full-screen overlay (fixed inset-0, z-50, bg-black)
- Shows the selected post's thumbnail/video at full size
- Right-side action column: heart button + like count
- Bottom overlay: avatar, username, challenge title
- Double-tap-to-like with the existing heart animation
- Close button (X) top-right or swipe down to dismiss
- Receives the post data + onClose + onLike callbacks

### No new dependencies needed
- framer-motion already handles animations
- All existing like logic transfers to the viewer component
