# Marxleads Step 4 – Authentication flow update

This update adds profile-completion-aware routing and editable profile settings.

## What's included
- Email confirmation checks the saved profile and sends incomplete users to `/onboarding` and complete users to `/dashboard`.
- Login sends users without a complete profile to `/onboarding`.
- Middleware refreshes Supabase sessions and protects `/dashboard` and `/settings`.
- Logged-in users are redirected away from login/signup pages to the correct next page.
- Completed users visiting `/onboarding` are sent to `/dashboard`.
- `/settings` lets signed-in users update their name, country, city, business name and account roles.
- Dashboard now links to Settings.

## Apply this update
1. Back up your current project folder.
2. Extract this ZIP into a new folder.
3. Copy your existing `.env.local` into the extracted project root. The ZIP intentionally does not contain secrets.
4. In the project folder run `npm install` and then `npm run dev`.
5. Test the flows listed below.

No new SQL migration is required; this update uses the existing `public.profiles` table and columns from `supabase/schema.sql`.

## Supabase URL configuration
In Authentication → URL Configuration:
- Site URL for local testing: `http://localhost:3000`
- Redirect URL: `http://localhost:3000/auth/confirm`

For production, add your real domain and its `/auth/confirm` callback URL.

## Test checklist
1. Create a brand-new account and confirm the email.
2. Confirm the callback opens `/onboarding` for the new account.
3. Complete onboarding; confirm it opens `/dashboard`.
4. Sign out and sign back in; confirm it opens `/dashboard` directly.
5. Visit `/onboarding` while signed in with a completed profile; confirm it redirects to `/dashboard`.
6. Open `/settings`, change profile details, save, and confirm the values persist in Supabase Table Editor → `profiles`.
7. Sign out and visit `/dashboard`; confirm it redirects to `/login`.

Profile completion is currently defined as a non-empty full name, country and at least one account role. The existing `profiles` table must have `full_name`, `country`, `city`, `business_name` and `account_types` columns.
