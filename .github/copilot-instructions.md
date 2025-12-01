# Scoreboard App - GitHub Copilot Instructions

## Project Overview

This is a **TanStack-based React application** for managing scoreboards and game tracking. The project is called *
*@cptnfizzbin/scoreboard-app** and uses modern web development tools and frameworks.

### Technology Stack

**Runtime & Build:**

- Node.js ≥ 24.0.0
- Vite 7.1.7 (build tool and dev server on port 3000)
- React 19.2.0 with React Compiler (Babel plugin)
- TypeScript 5.7.2 (strict mode enabled)

**State Management & Data Fetching:**

- Redux Toolkit 2.11.0 with React-Redux 9.2.0
- TanStack React Query 5.66.5
- TanStack React Router 1.132.0 with automatic route code-splitting

**UI & Styling:**

- Material-UI (MUI) 7.3.5
- Material Icons 7.3.5
- Emotion 11.14.0+ (CSS-in-JS)
- Sass 1.94.2

**Development & Testing:**

- Vitest 3.0.5 with jsdom
- Biome 2.2.4 (linting & formatting)
- TanStack Devtools for debugging

**Package Manager:** Yarn 4.12.0

## Project Structure

```
src/
├── components/           # Reusable UI components
│   └── ui/
│       ├── header.tsx
│       └── counters/     # Counter UI components
├── integrations/         # Framework integrations
│   ├── mui/             # Material-UI provider & themes
│   ├── redux/           # Redux utilities
│   ├── tanstack-query/  # React Query setup
│   └── tanstack-router/ # Router configuration
├── lib/games/           # Game logic
│   └── wizard/          # Wizard card game implementation
│       ├── players/     # Player management
│       ├── bids/        # Bidding logic
│       ├── tricks/      # Trick tracking
│       ├── score/       # Scoring system
│       └── round/       # Round management
├── routes/              # TanStack Router routes
├── index.tsx            # App entry point
└── index.scss           # Global styles
```

## Key Development Guidelines

### 1. **Tree-Shakeable Imports (Important!)**

When importing from **Material-UI (@mui/material)** and **Material Icons (@mui/icons-material)**, always use named
imports to enable tree-shaking and reduce bundle size:

```typescript
// ✅ CORRECT - Tree-shakeable
import { Button, Card, TextField } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// ❌ WRONG - Prevents tree-shaking
import MUI from '@mui/material';
import * as Icons from '@mui/icons-material';
```

### 2. **Redux & State Management**

- Use Redux Toolkit for state management
- Organize state by feature (e.g., `players`, `bids`, `tricks`, `score`)
- Create reducers, actions, and selectors in separate files
- Use the `create-thunk-action.ts` utility for async thunks
- Use selectors to derive state (see `player.selectors.ts`, `score.selectors.ts`)

Example patterns:

```typescript
// reducers: feature.reducer.ts
// actions: feature.actions.ts
// selectors: feature.selectors.ts
```

### 3. **React Router (TanStack Router)**

- Router configuration is in `src/integrations/tanstack-router/`
- Routes are defined in `src/routes/`
- Router automatically code-splits routes for better performance
- Use `route-tree.gen.ts` (generated file - don't edit manually)

### 4. **Styling**

- Use Sass/SCSS for global and component-level styles (`index.scss`)
- MUI components use Emotion (CSS-in-JS) - prefer MUI's `sx` prop for styling
- MUI themes are organized in `src/integrations/mui/themes/` (dark and light)
- Import theme-related items from `@mui/material/styles`

### 5. **Component Organization**

- Place reusable UI components in `src/components/ui/`
- Game-specific logic lives in `src/lib/games/`
- Each game feature has its own directory with:
  - Component files (`.tsx`)
  - Redux files (actions, reducers, selectors)
  - Type definitions

### 6. **Testing**

- Use Vitest for unit and integration tests
- Test files: `*.test.ts` or `*.test.tsx`
- Tests are configured in `vitest.setup.ts`
- Run tests: `yarn test`

### 7. **Code Quality**

- Use Biome for linting and formatting
- Commands:
  - `yarn lint` - Check for issues
  - `yarn fix` - Auto-fix formatting and some issues
  - `yarn check` - Run Biome checks

### 8. **Development Workflow**

- `yarn dev` - Start dev server (http://localhost:3000)
- `yarn build` - Build for production and type-check
- `yarn test` - Run tests
- `yarn serve` - Preview production build

## Path Aliases

The project uses path aliases defined in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": [
      "./src/*"
    ]
  }
}
```

Use `@/` to import from src:

```typescript
import { Button } from '@/components/ui/header';
import { playerSelector } from '@/lib/games/wizard/players/player.selectors';
```

## TypeScript Configuration

- **Target:** ES2022
- **Module Resolution:** Bundler mode
- **Strict Mode:** Enabled
- **Unused variables/parameters:** Errors
- **JSX:** React 17+ transform enabled

## Important Conventions

1. **Named exports** - Prefer named exports for tree-shaking
2. **Type safety** - Always use TypeScript for components and functions
3. **Component patterns** - Use functional components with hooks
4. **Selectors** - Use Redux selectors for state access (don't directly access state)
5. **Actions** - Dispatch Redux actions for state mutations
6. **Error handling** - Type errors properly with TypeScript

## Git & Repository

- Repository uses `.gitignore` and `.editorconfig` for consistency
- Yarn is the package manager (not npm)
- All dependencies should be added via `yarn add`

## Development Environment

### WSL (Windows Subsystem for Linux)

This project runs on Windows using WSL2. When working with file paths:

- **WSL absolute paths:** Use forward slashes and WSL format
  - e.g. `/home/cptn-fizzbin/projects/scoreboard-io`
- **Windows UNC paths:** Use backslashes and UNC format
  - e.g. `\\wsl.localhost\Ubuntu\home\user\cptn-fizzbin\projects\scoreboard-io`
- **In terminal commands:** Always use WSL paths with forward slashes
- **For file operations within the IDE:** Can use either format, but forward slashes are preferred

Example terminal commands:

```bash
# ✅ CORRECT - Use WSL paths with forward slashes
cd ~/linux-dev/cptn-fizzbin/scoreboard-io
yarn install
yarn dev

# ❌ WRONG - Don't mix Windows and WSL paths
cd \\wsl.localhost\Ubuntu\home\zeragamba\...
```

