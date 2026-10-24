# Pantry Shifts

A volunteer shift scheduler for a neighborhood food pantry, built with **React 19, TypeScript, Vite and MUI 7**. Volunteers browse upcoming shifts, sign up or cancel, see who else is helping, and manage their profile.

It runs entirely in the browser. There is no backend and no API key, and your changes are saved in `localStorage`. That makes it a good small sample project for trying out MUI theming, component work, or AI coding tools on a real but approachable codebase.

## Screenshots

### Shifts
Browse shifts as cards, filter by open spots or your own shifts, and see how full each shift is.

![Shifts screen showing six shift cards with role, date, time, location and a volunteer progress bar](docs/screenshots/shifts.png)

### Sign-up dialog
Confirm a spot and leave a note for the coordinator.

![Sign-up dialog with a note field and a reminder checkbox](docs/screenshots/sign-up-dialog.png)

### Volunteers
See everyone who has helped, with season totals and a searchable roster.

![Volunteers screen with three summary tiles and a roster table](docs/screenshots/volunteers.png)

### My profile
Update contact details and notification preferences.

![Profile screen with name and email fields and two notification switches](docs/screenshots/profile.png)

## Features

- Filter shifts: all, open spots, or just yours
- Sign up with an optional note, or cancel your spot
- Shifts that are full show a "Full" status and cannot be joined
- Searchable volunteer roster with season totals
- Profile form with notification switches
- Times display in 12-hour format (for example, 1:00 PM)
- Sign-ups persist between visits using `localStorage`
- Responsive layout (cards reflow from three columns to one)

## Getting started

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone https://github.com/jdebdesign/pantry-shifts.git
cd pantry-shifts
npm install
npm run dev
```

Open http://localhost:5173.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Type-checks, then builds to `dist/` |
| `npm run preview` | Serves the production build locally |

## Project structure

```
src/
  main.tsx                 entry point; wraps the app in ThemeProvider
  App.tsx                  app bar and tab navigation
  theme.ts                 MUI theme and the color tokens
  useLocalStorage.ts       small hook that syncs state to localStorage
  data/
    seed.ts                types plus the sample shifts and volunteers
  utils/
    time.ts                24-hour to 12-hour time formatting
  components/
    PageHeader.tsx         page title, subtitle and optional action
    ShiftCard.tsx          one shift, with status and sign-up actions
    StatusChip.tsx         "N spots left" or "Full" chip
    SignUpDialog.tsx       confirmation dialog with note and reminder
    SummaryTile.tsx        label and number tile
    InfoTile.tsx           label and text tile
  pages/
    ShiftsPage.tsx         filter, shift grid, sign-up flow
    VolunteersPage.tsx     summary tiles, search and roster table
    SettingsPage.tsx       profile form and notification switches
docs/screenshots/          images used in this README
```

## How it works

**Data.** Shifts and volunteers are defined in `src/data/seed.ts`. Times are stored as 24-hour `HH:mm` strings and converted for display by `formatTime` in `src/utils/time.ts`, so the data stays easy to sort and compare.

**Persistence.** `ShiftsPage` keeps the shift list in `localStorage` under the key `pantry-shifts`. To reset to the sample data, clear that key in your browser's developer tools, or run `localStorage.removeItem('pantry-shifts')` in the console and reload.

**Signed-in user.** There is no login. The app treats the volunteer with the id in `CURRENT_VOLUNTEER_ID` (Maya Okafor) as the person using it.

**Theming.** `src/theme.ts` defines the color tokens and the MUI theme: palette, typography, corner radius, and default styles for buttons, cards and chips. The font is Inter, loaded from Google Fonts in `index.html`, with system fonts as the fallback.

## Tech stack

- [React](https://react.dev) 19 and TypeScript
- [Vite](https://vite.dev) 5
- [MUI](https://mui.com) 7 (`@mui/material` and `@mui/icons-material`)
- [Emotion](https://emotion.sh) for MUI's styling

## License

[MIT](LICENSE). The volunteer names and email addresses are fictional.
