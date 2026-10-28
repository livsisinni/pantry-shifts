# Pantry Shifts

A volunteer shift scheduler for a neighborhood food pantry. Volunteers browse shifts, sign up or cancel, see the roster, and edit a profile. It runs entirely in the browser with no backend or API key. See `README.md` for screenshots and a longer walkthrough.

Stack: React 19, TypeScript (strict), Vite 7, MUI 7 with Emotion, Storybook 10. Node 20.19 or newer.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server with hot reload at http://localhost:5173
npm run build      # tsc --noEmit, then vite build to dist/
npm run preview    # serve the production build
npm run storybook        # Storybook at http://localhost:6006 (MCP endpoint at /mcp)
npm run build-storybook  # static Storybook build to storybook-static/
npx vitest run --project storybook  # smoke-test every story in headless Chromium
```

There is no linter. `npm run build` (the type check, which also covers the stories) is the main automated check, and the Storybook smoke tests render every story.

## Architecture

- `src/main.tsx`: entry. Wraps `App` in `ThemeProvider` and `CssBaseline`.
- `src/App.tsx`: sticky app bar with tabs. There is no router. The tab is local state and can be preset with `?tab=<index>`.
- `src/pages/`: `ShiftsPage`, `VolunteersPage`, `SettingsPage`, one per tab.
- `src/components/`: shared components (`PageHeader`, `ShiftCard`, `StatusChip`, `SignUpDialog`, `SummaryTile`, `InfoTile`).
- `src/theme.ts`: the MUI theme and the color tokens.
- `src/data/seed.ts`: the `Shift` and `Volunteer` types, sample data, and `CURRENT_VOLUNTEER_ID`.
- `src/utils/time.ts`: `formatTime` and `formatTimeRange`.
- `src/useLocalStorage.ts`: hook that syncs state to `localStorage`.

Data and state:

- Shifts are kept in `localStorage` under the key `pantry-shifts` by `ShiftsPage`. To reset to the sample data, run `localStorage.removeItem('pantry-shifts')` and reload.
- There is no login. The app treats the volunteer with id `CURRENT_VOLUNTEER_ID` (`v1`, Maya Okafor) as the current user.
- Profile edits and notification switches in `SettingsPage` are local state only and are not saved.

## Conventions

- Components and pages are default exports. Props are declared as `type Props` at the top of the file.
- Use `import type` for type-only imports.
- Import MUI components from `@mui/material` and icons from their own path (`@mui/icons-material/EventRounded`).
- Times are stored as 24-hour `HH:mm` strings and displayed in 12-hour format through `formatTime` or `formatTimeRange`.
- Style with the MUI `sx` prop and theme values.

## Storybook

Storybook 10 (`@storybook/react-vite`) documents the design system. Config is in `.storybook/` (`preview.tsx` wraps every story in the real `theme` and `CssBaseline`).

- The sidebar follows the atomic levels of the Figma file (order set in `.storybook/preview.tsx`): `Foundations/Tokens`, `Atoms/` (`Button`, `TextField`, `Chip`, `Icons`), `Molecules/` (`StatusChip`, `PageHeader`, `SummaryTile`, `ToggleButtonGroup`), `Organisms/` (`ShiftCard`). Set the level in the story `title`, and say what the component is built from in `parameters.docs.description.component`.
- The code itself stays flat. Stories for the custom components sit next to them: `src/components/*.stories.tsx`. Stories for the MUI components used in the code are in `src/stories/mui/`.
- The tokens docs page is `src/stories/Tokens.mdx`. It reads `src/theme.ts`, so it cannot drift from the code.
- Each story links to its component in the Figma file through `parameters.design` (addon-designs). When a component's props or variants change, update its stories and check the Figma component still matches.
- `SignUpDialog` and `InfoTile` have no stories because they are not in the Figma file yet.
- Story IDs and Figma node IDs for every component are in `src/design-system.map.json`.

The Storybook MCP server is registered in `.mcp.json` as `pantry-shifts-storybook` (`http://localhost:6006/mcp`). It only works while `npm run storybook` is running. When working on UI, use its tools: `docs-list` and `docs-show` to read documented components and props, `stories-preview` after any change that affects how the UI looks, and `test-run` to run the story tests. Use only the props the documentation lists.

## Design system

For any design system task (UI, styling, components, tokens, Storybook or Figma), read both of these first, before changing any code:

1. `src/design-system.md`: the rules. It documents the tokens, the custom components and the usage rules.
2. `src/design-system.map.json`: the lookup between Figma, code and Storybook. For each component in the Figma file it gives the Figma node ID and URL, the code file and export, the Storybook story IDs, and the matching variants, props and tokens (look up token names in its `tokenIndex`). It also lists known mismatches.

How to use the map:

- Find a component's Figma node, code file or story from its entry. Do not guess a mapping that is not in the file.
- `status: "unmapped"` means the component exists in Figma but has no standalone code component (`ToggleButtonGroup` and `AppBar` are inline JSX). Do not invent a code file for it.
- `figmaOnly` props exist only in Figma and `codeOnly` props only in code. Respect `mismatches` and do not "fix" one side to match the other without being asked.
- When you change a component's props, variants or tokens, update its entry in the map, its Storybook story and (when asked) its Figma component. Story IDs come from story titles, so retitling a story means updating the map.
- `SignUpDialog` and `InfoTile` are not in the Figma file, so they are not in the map.
