# Marxleads — complete homepage starter

This project contains the homepage source code with the React components separated into a `components/` folder.

## Requirements
- Node.js 20.9 or newer
- npm
- VS Code (recommended)

## Run locally
1. Extract the ZIP archive.
2. Open the `marxleads-platform` folder in VS Code.
3. Open the terminal in that folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open `http://localhost:3000`.

## Production build
```bash
npm run build
npm run start
```

## Project structure
```text
marxleads-platform/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── DashboardPreview.tsx
│   ├── Directory.tsx
│   ├── FAQ.tsx
│   ├── Features.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Logo.tsx
│   ├── Navbar.tsx
│   ├── Pricing.tsx
│   ├── ProductSection.tsx
│   └── TrustStrip.tsx
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## What's included
- Responsive homepage and mobile navigation
- Separate reusable React components
- Dark dashboard mockup with illustrative sample data
- Features grid and services directory
- How-it-works section
- Suggested pricing section
- Interactive FAQ accordion
- Early-access CTA and footer
- Tailwind CSS setup, TypeScript configuration and SEO metadata

## Important notes before launch
- Marxleads is a proposed working name. Check domain, company-name and trademark availability before committing.
- Replace `hello@marxleads.com` with an email address you own and monitor.
- Pricing is a hypothesis for testing, not a live offer.
- The dashboard data is illustrative.
- There is no backend yet: authentication, database, business accounts, live listings, bookings, payment processing and subscriptions still need implementation.
- Add real Privacy Policy and Terms pages before collecting customer data.
- For production SEO, add your actual domain, favicon, social preview image and analytics with appropriate privacy disclosures.

## Recommended next build stage
1. Add Supabase authentication and database.
2. Build onboarding and business profile creation.
3. Create tenant-aware public business pages.
4. Implement enquiries and lead management.
5. Add booking management.
6. Integrate payment providers with server-side verification and webhooks.
7. Implement subscription plans and permissions.
