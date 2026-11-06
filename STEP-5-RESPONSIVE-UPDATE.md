# Marxleads dashboard responsive update

This update improves the dashboard navigation on phones and small tablets.

## Changes
- Replaced the full-height mobile sidebar with a compact mobile header.
- Added a slide-in navigation drawer with a backdrop and close controls.
- Added active navigation styling and `aria-current` state.
- Kept the fixed-width sidebar on desktop and tablet layouts.
- Made the dashboard content area use responsive padding and prevent horizontal overflow.

## Apply the update
1. Back up your current project.
2. Extract this ZIP.
3. Copy your existing `.env.local` into the extracted project root.
4. Run `npm install` and `npm run dev`.
5. Test at desktop, tablet, and mobile widths.

No Supabase schema changes are required for this UI-only update.
