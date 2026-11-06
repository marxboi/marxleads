# Marxleads Step 5 — Dashboard foundation

This update uses the latest Step 4 authentication archive available in the conversation as its base. It adds a responsive authenticated dashboard shell, live account record counts, business and service creation forms, and initial Leads, Bookings, Messages and Analytics screens.

## Apply the update
1. Back up your current project.
2. Extract this project and copy your existing `.env.local` into its root.
3. Run `npm install` and `npm run dev`.
4. In Supabase SQL Editor, run `supabase/dashboard-schema.sql` once. Keep the existing `profiles` table and its data.
5. Sign in and visit `/dashboard`.

## Current scope
- Business profiles: create and list your own business records.
- Services: create and list your own service records.
- Leads and bookings: read views are ready for records created by a future public enquiry/booking flow.
- Messages: inbox placeholder; realtime/private conversation UI is not implemented yet.
- Analytics: live counts only; no traffic/revenue tracking yet.
- Settings: retains the existing Step 4 settings page.

The `businesses` and `services` forms write to Supabase. The other modules are foundations and should not be represented as fully operational until their customer-facing flows and update actions are implemented.
