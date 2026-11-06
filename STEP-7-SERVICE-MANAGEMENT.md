# Marxleads Step 7 — Service Management

Adds service create, list, edit and delete workflows to `/dashboard/services`.
Services can optionally be associated with a business profile owned by the signed-in user.

## Install
1. Back up your current project.
2. Extract this ZIP and open the project folder.
3. Copy your existing `.env.local` into the project root.
4. Run `npm install` and `npm run dev`.

## Database
No new migration is required if `supabase/dashboard-schema.sql` has already been run. It uses the existing `services` table columns:
`id`, `owner_id`, `business_id`, `title`, `description`, `price`, `currency`, `created_at`, `updated_at`.

## Security
Server actions verify the current Supabase user. A selected business is checked against the user's own businesses. Service edits and deletes are scoped by both service ID and owner ID. Keep Supabase RLS enabled.

## Test
- Add a service with a title, description, price and currency.
- Link it to one of your own business profiles.
- Refresh and confirm it persists.
- Edit its details and save.
- Delete a test service.
- Check the page at mobile and desktop widths.
