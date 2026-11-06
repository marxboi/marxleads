# Marxleads Step 8 — Role-based dashboards

This update builds on the uploaded Marxleads project and keeps the existing homepage, Supabase client setup, authentication, onboarding, business management, service management and other existing modules.

## What's included

- A role-aware `/dashboard` entry point.
- Separate overview pages:
  - `/dashboard/customer`
  - `/dashboard/owner`
  - `/dashboard/provider`
- Role-specific sidebar navigation.
- A workspace role switcher for accounts with multiple roles.
- Server-side role switching that verifies the requested role against the signed-in user's `profiles.account_types`.
- Middleware route gating so a customer cannot open owner/provider-only dashboard routes just by typing their URL.
- Customer dashboard sections for discovery, saved businesses, enquiries, bookings and reviews.
- Provider profile and portfolio landing pages.

## Install

1. Make a backup of your current Marxleads project.
2. Extract this ZIP into a separate folder first and inspect the changes.
3. Copy/merge the extracted project files into your working project, allowing the updated files to replace their older versions.
4. Copy your existing `.env.local` from your current project into the merged project root. This ZIP intentionally does not include `.env.local` or Git history.
5. Run `npm install` if needed, then `npm run dev`.
6. Sign in and visit `http://localhost:3000/dashboard`.

## Role testing

- Customer-only account: should land at `/dashboard/customer`.
- Business-owner account: should land at `/dashboard/owner`.
- Service-provider account: should land at `/dashboard/provider`.
- Multi-role account: use the Workspace role selector in the sidebar to switch dashboard experiences.
- Try opening a route belonging to a different role directly. Middleware should send you back to your active role's overview.

## Database

No new SQL migration is required for this dashboard architecture. It uses the existing `profiles.account_types` array and existing dashboard tables.

The customer discovery, saved-business, enquiry, booking and review pages are currently role-specific landing pages. The actual public directory and customer actions will be connected in the next development phase. The provider profile and portfolio pages are also prepared as landing pages; full editors will follow.

## Important

- Do not replace your `.env.local` with a blank file. Keep your existing Supabase URL and publishable key locally.
- Do not upload or share service-role keys.
- This package does not include `.env.local`, `.git`, `node_modules`, or `.next`.
