# Marxleads Step 6 — Business Profile Management

This update expands the My Business page with responsive create, list, edit and delete workflows.

## Installation
1. Back up your current project.
2. Extract this ZIP.
3. Copy your existing `.env.local` into the project root.
4. Run `npm install`, then `npm run dev`.

## Database
No new SQL migration is required. This version uses the existing `public.businesses` table and its `owner_id`, `name`, `category`, `city`, `description`, `created_at`, and `updated_at` columns from `supabase/dashboard-schema.sql`.

## Security
Server actions obtain the authenticated user from Supabase and scope updates/deletes by both the record ID and `owner_id`. The existing Supabase Row Level Security policies remain essential and must stay enabled.

## Test
- Create a business.
- Refresh the page and confirm it remains listed.
- Expand “Edit business details”, change the name or description, and save.
- Delete a test business and confirm it disappears.
- Test at mobile and desktop widths.
