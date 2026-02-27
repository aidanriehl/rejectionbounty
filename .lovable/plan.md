

## Plan: Gentle spacing reduction on challenge rows

One small change to `src/pages/Challenges.tsx`:

- **Line 217**: Reduce challenge row vertical padding from `py-3.5` to `py-2.5`

That's it. This shaves ~10px per row (100px total across 10 challenges) without touching anything else. Keeps the UI looking clean.

