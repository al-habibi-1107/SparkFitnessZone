@AGENTS.md
# Spark Fitness Zone — Claude Code Instructions

## Project Overview
Premium gym website for Spark Fitness Zone, Jamshedpur.
Next.js 15 App Router + TypeScript + Tailwind CSS + Framer Motion.
Backend: Sanity CMS (content) + Supabase (members DB) + Razorpay (subscriptions).
Deployed on Vercel.

## Commands
- `npm run dev`        — Start dev server on http://localhost:3000
- `npm run build`      — Production build
- `npm run lint`       — ESLint check
- `npx sanity dev`     — Start Sanity Studio on http://localhost:3333

## Architecture
- All pages live in app/(site)/ using Next.js App Router
- Server Components by default — use "use client" only when needed
- All Sanity queries go in lib/sanity/queries.ts using GROQ
- All DB access goes through lib/supabase/client.ts
- API routes live in app/api/ — Razorpay webhook in app/api/razorpay/webhook/
- Reusable UI components in components/ui/
- Full page sections in components/sections/

## Conventions
- TypeScript strict mode — no `any` types
- Tailwind only for styling — no inline styles
- Use Framer Motion for all animations
- All images go through next/image with proper alt text
- Commit messages: imperative mood, under 72 characters

## Environment
- Never touch .env.local — secrets are there
- Sanity project ID is in NEXT_PUBLIC_SANITY_PROJECT_ID
- Razorpay webhook must verify signature before processing

## Key Business Logic
- Razorpay webhook at /api/razorpay/webhook handles subscription events
  and updates the `members` table in Supabase accordingly
- Cal.com is embedded via iframe in the /book page — do not replace with
  a custom booking form, the iframe handles all scheduling logic
- Equipment pages at /equipment/[slug] must have proper metadata for SEO

## Do Not
- Do not use `any` type in TypeScript
- Do not access Supabase directly from client components
  (use Server Actions or API routes)
- Do not hardcode prices — they come from Razorpay plan IDs in .env
- Do not commit .env.local