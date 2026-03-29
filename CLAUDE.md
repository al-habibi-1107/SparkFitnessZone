# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
# Spark Fitness Zone — Claude Code Instructions

## Project Overview
Premium gym website for Spark Fitness Zone, Jamshedpur.
Next.js 16.2.1 App Router + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion.
Backend: Sanity CMS (content) + Supabase (members DB) + Razorpay (subscriptions).
Deployed on Vercel.

## Commands
- `npm run dev`        — Start dev server on http://localhost:3000
- `npm run build`      — Production build
- `npm run start`      — Run production server locally
- `npm run lint`       — ESLint check (flat config via eslint.config.mjs)
- `npx sanity dev`     — Start Sanity Studio on http://localhost:3333

## Architecture
- Source root is `src/` — path alias `@/` maps to `src/`
- All pages live in `src/app/(site)/` using Next.js App Router
- Server Components by default — use `"use client"` only when needed
- All Sanity queries go in `src/lib/sanity/queries.ts` using GROQ
- All DB access goes through `src/lib/supabase/client.ts`
- API routes live in `src/app/api/` — Razorpay webhook at `src/app/api/razorpay/webhook/`
- Reusable UI components in `src/components/ui/`
- Full page sections in `src/components/sections/`

## Conventions
- TypeScript strict mode — no `any` types
- Tailwind v4 only for styling — uses `@import "tailwindcss"` (not `@tailwind` directives)
- Use Framer Motion for all animations — not CSS keyframes
- All images go through `next/image` with proper alt text
- React Compiler is enabled (`reactCompiler: true` in next.config.ts) — do not add manual `useMemo`/`useCallback` for performance optimisation
- Commit messages: imperative mood, under 72 characters

## Environment
- Never touch .env.local — secrets are there
- Sanity project ID is in `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Razorpay webhook must verify signature before processing

## Key Business Logic
- Razorpay webhook at `/api/razorpay/webhook` handles subscription events
  and updates the `members` table in Supabase accordingly
- Cal.com is embedded via iframe in the `/book` page — do not replace with
  a custom booking form, the iframe handles all scheduling logic
- Equipment pages at `/equipment/[slug]` must have proper metadata for SEO

## UI Reference
`reference/gym_demo.html` is the approved visual target (1,292-line standalone HTML file, gitignored).
When building any frontend section, read the relevant part of that file first and match the aesthetic closely.
- Font: Bebas Neue (display) + Barlow Condensed + Barlow (body)
- Colours: `--red: #D62828`, `--black: #080808`, `--charcoal: #111111`, `--gold: #C9A84C`
- Dark theme throughout — no light mode needed

## Do Not
- Do not use `any` type in TypeScript
- Do not access Supabase directly from client components
  (use Server Actions or API routes)
- Do not hardcode prices — they come from Razorpay plan IDs in .env
- Do not commit .env.local