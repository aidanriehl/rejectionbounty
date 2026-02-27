

## Plan: Remove Custom PremiumGate and Prepare for Apple IAP

Since this is an iOS app, Apple's StoreKit handles the subscription UI natively. The custom PremiumGate modal should be removed and replaced with a simple placeholder that will later call the native IAP API via a Capacitor plugin.

### Changes

1. **`src/pages/Challenges.tsx`**
   - Remove the `PremiumGate` import and component usage
   - Remove `showPremiumGate` state
   - Replace `setShowPremiumGate(true)` calls with a placeholder function (e.g., `triggerSubscribe()`) that shows a toast saying "Coming soon" for now — this is where the native IAP call will go later
   - The blurred premium cards and upload buttons still gate on `isPremium`, just without the custom modal

2. **`src/components/PremiumGate.tsx`**
   - Delete this file entirely — Apple's native purchase sheet replaces it

### What stays the same
- The `isPremium` flag and all gating logic (blurred cards, upload button behavior) remain
- The challenge list, progress bar, countdown — all unchanged

### Future step (not in this plan)
- When you're ready to wire up actual IAP, you'd use a Capacitor plugin like `@capgo/capacitor-purchases` (RevenueCat) or `cordova-plugin-purchase` to trigger the native StoreKit purchase flow from `triggerSubscribe()`.

