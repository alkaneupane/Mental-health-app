# SafeSpace 🌿

**Nepal–US AI Hackathon 2026 — Problem Statement 2**

> An anonymous peer support platform for mental wellness in culturally conservative communities.

---

## What is SafeSpace?

SafeSpace is a free, anonymous, community-driven peer support platform where people can express their mental health struggles, connect with others who understand them, and receive human and AI-assisted support — without fear of identity exposure, judgment, or cost.

Built for South Asian communities where mental health stigma remains high, SafeSpace removes the three biggest barriers to early support: **cost** (free), **identity** (anonymous by default), and **stigma** (community-normalised).

---

## Features

### 🟢 The Reach Button
A subtle, one-tap signal a user can send when they're struggling but not ready to speak. Silent. Anonymous. The community sees you without you having to say a word.

### 💬 Anonymous Feed
A Reddit-style post feed designed for emotional safety — no engagement metrics, no real names. Post how you feel and receive genuine support from the community.

### 📊 AI Wellbeing Metric
A background AI system that tracks emotional tone across posts and check-ins, generating a personal wellbeing score visible **only to the user**. Automatically surfaces crisis resources when the score drops critically low.

### 🤝 AI Check-in Companion
A conversational companion UI with gentle, scripted responses and crisis-aware messaging — a first point of contact. Not a replacement for therapy — a bridge that helps people take the first step.

---

## Tech Stack

### Core app
- **UI library:** [React](https://react.dev/) 19 + [React DOM](https://react.dev/) — components, hooks, context (e.g. auth)
- **Build tool:** [Vite](https://vite.dev/) 6 — dev server, HMR, production bundling
- **React integration:** [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) — Fast Refresh

### Styling & typography
- **CSS:** Global styles in `src/index.css` — **CSS custom properties** (design tokens: colors, radii, spacing), no Tailwind/Bootstrap
- **Fonts:** [Google Fonts](https://fonts.google.com/) — **DM Sans** (body/UI), **DM Serif Display** (headings), imported in `src/index.css`

### Backend & data
- **BaaS / Auth / DB:** [Supabase](https://supabase.com/) via [`@supabase/supabase-js`](https://github.com/supabase/supabase-js) — email/password-style auth (User ID → synthetic email), optional anonymous sign-in, **PostgreSQL** tables `posts` / `replies`, **Row Level Security**, RPC `increment_post_relates`
- **Schema / migrations:** SQL in `supabase/schema.sql` (and helper migrations under `supabase/`) — run in Supabase SQL Editor
- **Environment:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (see `.env.example`)

### Networking (development)
- **Vite proxy:** `vite.config.js` proxies `/__supabase` → your Supabase project URL so the browser can call the API same-origin in dev (reduces CORS / network issues). Optional `VITE_SUPABASE_NO_PROXY` to talk to Supabase directly.

### Icons & quality
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Linting:** ESLint 9 + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` + `@eslint/js` / `globals`

### Tooling
- **Language:** JavaScript (ES modules) — `type: "module"` in `package.json`
- **Type hints (editor):** `@types/react`, `@types/react-dom` (dev)

---

## Setup & Running

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repo
git clone <your-repo-url>
cd Mental-health-app

# Install dependencies
npm install

# Start development server
npm run dev

NOTE: A .env file at the project root is required for Supabase (PostgreSQL, auth, and login). It holds private API credentials so it's not included in this repository. Copy .env.example to .env and fill in your project URL and anon key, please contact the team if you need shared credentials to test this build — we can supply them separately.

```

Open [http://localhost:###](http://localhost:###) in your browser.

### Build for Production

```bash
npm run build
```

---

## Team

| Name | Role |
|------|------|
| Alka Neupane | Concept Lead / Design Lead |
| Bhaju Khanal | Team Lead / Strategy |
| Abhinav Purja Pun | Technical Lead / Prototype |
| Leeha Chhantyal | AI Feature & Backend Developer |
| Abina KC | UX / Design / Business |

---

## Notes for Judges

- The **Reach button** is our most original feature — a silent distress signal that requires no words.
- All posts are anonymous by default. The platform has no engagement metrics by design.
- The AI Companion in this build uses gentle, rule-based responses and crisis keyword detection; messaging is written for South Asian cultural context.
- Crisis resources (iCall Nepal, Crisis Text Line) are surfaced automatically when distress signals are detected.
- Business model: grant/NGO funded, with institutional (university/employer) partnerships for sustainability. Individual users are always free.

---

*SafeSpace — Nepal–US AI Hackathon 2026*
