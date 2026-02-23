
# Color Theme Overhaul: Coral/Red-Orange + Light

## What's changing
Replacing the current purple-tinted theme with a warm coral/red-orange palette on a clean light background. This gives the app a social, inviting feel while keeping energy and warmth.

## New color palette

| Role | Current (Purple) | New (Coral) |
|------|-----------------|-------------|
| Primary | `250 60% 52%` (purple) | `12 76% 61%` (coral/salmon) |
| Background | `0 0% 98%` (near-white) | `20 30% 97%` (warm off-white) |
| Card | `0 0% 100%` (white) | `24 27% 99%` (warm white) |
| Ring | purple | coral to match primary |
| Border | cool gray | warm gray |
| Muted | cool gray | warm gray tones |
| Dark mode primary | purple 60% | coral shifted slightly lighter |
| Dark mode bg | neutral black | warm dark `15 10% 6%` |

Everything else (success, prize, gold/silver/bronze, destructive) stays the same since those are semantic colors that already work.

## Files to modify

**`src/index.css`** -- Update all CSS custom properties in both `:root` (light) and `.dark` sections with the new coral/warm palette values.

That's it -- since every component uses the CSS variables via `hsl(var(--primary))` etc., the entire app updates automatically with just this one file change. No component changes needed.

## Dark mode
The dark theme will also shift to warm tones -- slightly warm blacks/dark grays instead of cool neutral, with a lighter coral accent so it still pops on dark backgrounds.
