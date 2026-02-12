# tma-template

Universal Telegram Mini App template — the foundation for all Mini Apps Factory projects.

## Tech Stack

- **Next.js 14** — App Router, Server Components, API Routes
- **TypeScript** — strict mode
- **Tailwind CSS** — utility-first styling with Telegram theme integration
- **Supabase** — Auth, Database, Storage, Realtime
- **Telegram WebApp SDK** — native Telegram integration

## Quick Start

```bash
# Clone
git clone https://github.com/mini-apps-factory/tma-template.git my-app
cd my-app

# Install
npm install

# Configure
cp .env.example .env.local
# Edit .env.local with your Supabase and Telegram credentials

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## What's Included

### UI Components (`/components/ui/`)
| Component | Description |
|-----------|-------------|
| `Button` | 4 variants: Primary, Secondary, Ghost, Danger |
| `Card` | Container with rounded corners |
| `Input` | Text input with search variant |
| `Modal` | Bottom sheet (Telegram-style) |
| `Skeleton` | Loading placeholder with shimmer |
| `TabBar` | Bottom navigation (3-5 tabs) |
| `Header` | Top bar with back button + title |
| `EmptyState` | "No data" placeholder |

### Hooks (`/hooks/`)
| Hook | Description |
|------|-------------|
| `useTelegram` | User info, color scheme, platform |
| `useAuth` | Auth state, login/logout |
| `useSupabase` | Typed Supabase client |
| `useHaptic` | Haptic feedback (vibration) |
| `useBackButton` | Telegram back button handler |

### Layout (`/components/layout/`)
- `AppShell` — Header + scrollable content + TabBar
- `PageTransition` — Smooth page animations

### Providers (`/components/providers/`)
- `TelegramProvider` — Telegram SDK context
- `AuthProvider` — Supabase auth context
- `ThemeProvider` — Telegram theme → CSS variables

## Creating a Project

This is a **template repository**. To create a new project:

1. Click "Use this template" on GitHub
2. Or use GitHub API: `POST /repos/mini-apps-factory/tma-template/generate`
3. Update `CLAUDE.md` with project specifications
4. Run Claude Code to generate business logic

## CLAUDE.md

The `CLAUDE.md` file is the brain of each project. It contains:
- Project specs (screens, database, API)
- Coding standards
- Design tokens
- File creation rules

Pipeline C9 automatically fills `CLAUDE.md` with data from C0-C7 containers.

## CI/CD

- **Lint + TypeCheck** — runs on every push via GitHub Actions
- **Deploy** — Vercel Git Integration (auto-deploy on push to main)

## License

Private — Mini Apps Factory
