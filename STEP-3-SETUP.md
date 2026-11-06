# Marxleads — Step 3 setup

This update adds Supabase authentication routes and the first user profile flow while keeping the existing homepage/components.

## 1. Install the Supabase packages

From the project root, run:

```bash
npm install @supabase/ssr @supabase/supabase-js
```

## 2. Check `.env.local`

Keep your existing credentials and make sure the variable names match exactly:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Do not commit `.env.local`. Never put a Supabase secret/service-role key in a `NEXT_PUBLIC_` variable.

## 3. Create the profiles table

In Supabase, open **SQL Editor → New query**. Copy the contents of `supabase/schema.sql`, paste it into the editor and click **Run**. This creates the `profiles` table and row-level security policies so signed-in users can access only their own profile.

## 4. Configure email confirmation

In Supabase, open **Authentication → URL Configuration**.

- Set Site URL to `http://localhost:3000` while testing locally.
- Add `http://localhost:3000/auth/confirm` to Redirect URLs.

For production, add your real domain and its `/auth/confirm` route too. Use the matching production URL in `NEXT_PUBLIC_SITE_URL` when deployed.

## 5. Run and test

```bash
npm run dev
```

Visit `/signup`, create a test account, confirm the email using the message Supabase sends, complete onboarding, and verify that `/dashboard` opens. Then sign out and test `/login` and `/forgot-password`.

## Routes added

- `/signup`
- `/login`
- `/forgot-password`
- `/update-password`
- `/auth/confirm`
- `/onboarding`
- `/dashboard`

Account roles are stored as an array, so one user can select multiple roles. This is the initial authentication/profile foundation; business listings, services, enquiries and role-specific dashboards are subsequent build phases.
