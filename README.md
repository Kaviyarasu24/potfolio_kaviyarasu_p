# Kaviyarasu P — Portfolio

A dark-themed personal portfolio for **Kaviyarasu P** — AI & Data Science student from K.S.Rangasamy College of Technology, focused on full-stack development, data analytics, Power BI, and GenAI-powered solutions.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**. Designed for one-click deployment on **Vercel**.

## Stack

- React 18 / TypeScript
- Vite (build tool)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations + scroll effects)
- Lucide React (icons)
- Kanit font (Google Fonts, weights 300–900)

## Sections

1. **Hero** — full-screen video background, name, tagline, nav, mute toggle
2. **About** — bio, scroll-driven animated text, skills grouped by category
3. **Education** — sticky-stacking white cards (B.Tech + HSC)
4. **Experience** — horizontal drag-to-scroll cards (Inaiyam Innovations, EduSkills Foundation)
5. **Projects** — sticky-stacking dark cards with landscape / portrait / terminal layouts
6. **Contact** — Email, WhatsApp, LinkedIn, GitHub

## Projects

| # | Project | Tech | Layout |
|---|---|---|---|
| 01 | IPL Analysis Dashboard (2008–2024) | Power BI · DAX | Landscape image |
| 02 | J.A.R.V.I.S — Personal Voice Assistant | Python · AI · Voice | Landscape image |
| 03 | FinanceFlow — Personal Finance App | React Native · Expo · Supabase | Portrait strip |
| 04 | Farm Vehicle Security Monitoring System | Python · YOLO · OpenCV · ANPR | Terminal |
| 05 | Auto-Mail-Reply — Intelligent Email Automation | Python · IMAP · Fuzzy Logic | Terminal |
| 06 | Agentic Coding AI — React App Generator | Python · LangChain · OpenRouter | Terminal |
| 07 | Farm Sage — AI Agricultural Assistant | Next.js · OpenRouter · Open-Meteo | Terminal |

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # serve /dist locally
```

## Deploy to Vercel

Push to GitHub → import the repo at [vercel.com/new](https://vercel.com/new) → click Deploy. No environment variables needed.

## Project structure

```
src/
├── App.tsx                    # composes all sections
├── main.tsx                   # React entry
├── index.css                  # global styles + .hero-heading gradient
└── components/
    ├── HeroSection.tsx        # navbar, video background, mute toggle
    ├── AboutSection.tsx       # bio, animated text, skills grid, contact button
    ├── EducationSection.tsx   # white sticky-stacking education cards
    ├── ExperienceSection.tsx  # horizontal drag-to-scroll experience cards
    ├── ProjectsSection.tsx    # sticky-stacking project cards (3 layouts)
    ├── ContactSection.tsx     # 4 contact methods with icons
    │
    ├── ContactButton.tsx      # gradient pill CTA with magnetic hover
    ├── LiveProjectButton.tsx  # ghost outline pill (GitHub / Live Preview)
    ├── FadeIn.tsx             # whileInView animation wrapper
    ├── Magnet.tsx             # mouse-following magnetic hover effect
    └── AnimatedText.tsx       # char-by-char scroll-driven text reveal

public/
    ├── intro.mp4              # hero background video
    ├── project01_01.webp      # IPL Dashboard screenshot
    ├── project02_*.webp       # JARVIS screenshots
    ├── financeflow-*.webp     # FinanceFlow mobile screenshots (01–09)
    └── ...                    # other project images
```

## Customisation

| Want to change | Open this file |
|---|---|
| Name, nav links, hero text | `src/components/HeroSection.tsx` |
| About paragraph, skills list | `src/components/AboutSection.tsx` |
| Education entries | `src/components/EducationSection.tsx` (`EDUCATION` array) |
| Experience entries | `src/components/ExperienceSection.tsx` (`EXPERIENCE` array) |
| Projects, screenshots, live URLs | `src/components/ProjectsSection.tsx` (`PROJECTS` array) |
| Contact methods | `src/components/ContactSection.tsx` (`CONTACT_METHODS` array) |
| Project screenshots | Drop images in `public/` and reference as `/filename.ext` |
| Brand gradient, font, dark colour | `src/index.css` and `tailwind.config.js` |
| Page title, meta description | `index.html` |

## Image layout types (ProjectsSection)

| Layout | Use case | Behaviour |
|---|---|---|
| `landscape` | Desktop/window screenshots | Full-width auto-sliding carousel |
| `portrait` | Mobile app screenshots | Horizontal strip of phone-frame cards |
| `terminal` | CLI / backend projects | Animated typewriter terminal window |

## Credits

Designed & built by **Kaviyarasu P**
