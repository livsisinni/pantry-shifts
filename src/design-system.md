# Pantry Shifts design system

The design system is MUI 7 plus the theme in `src/theme.ts`. Read this file before changing any UI, styling or component.

## Principle

Components read from the theme (palette, spacing, shape, typography) instead of hardcoding values. This is stated at the top of `src/theme.ts`.

## Foundations

### Color tokens

Defined in the `tokens` object in `src/theme.ts` and mapped into the MUI palette. Use the palette key in components, not the hex value and not the `tokens` object.

| Token | Hex | Palette key |
| --- | --- | --- |
| `green` | `#2F6B4F` | `primary.main` |
| `greenDark` | `#1F4A36` | `primary.dark` |
| `greenLight` | `#E4F0E9` | `primary.light` |
| (none) | `#FFFFFF` | `primary.contrastText` |
| `amber` | `#C9791B` | `secondary.main` |
| `amberLight` | `#FCEFD9` | `secondary.light` |
| `ink` | `#1D2521` | `text.primary` |
| `muted` | `#5B6761` | `text.secondary` |
| `line` | `#DCE3DF` | `divider` |
| `surface` | `#FFFFFF` | `background.paper` |
| `canvas` | `#F5F7F5` | `background.default` |

### Typography

- Font family: `"Inter", "Helvetica Neue", Arial, sans-serif`. Inter 400, 500, 600 and 700 are loaded from Google Fonts in `index.html`.
- `h1`: 2rem, weight 700, letter spacing -0.02em.
- `h2`: 1.5rem, weight 700.
- `h3`: 1.125rem, weight 600.
- `button`: no text transform, weight 600.
- All other variants use MUI defaults.

### Spacing and shape

- Spacing unit is 8px. Use `sx` spacing units (`p: 2.5` is 20px, `mb: 3` is 24px).
- Border radius is 12 (`shape.borderRadius`).

### Component defaults set by the theme

Do not repeat these on individual components.

- `Button`: no elevation, border radius 10, horizontal padding 20.
- `Card`: `variant="outlined"`, border color is the `line` token.
- `Chip`: label weight 600.
- `AppBar`: no elevation, `color="inherit"`.

## Custom components (`src/components`)

All are default exports with a `type Props` declared at the top of the file.

| Component | Props | Use |
| --- | --- | --- |
| `PageHeader` | `title: string`, `subtitle?: string`, `action?: ReactNode` | Top of every page. Renders `h1`, optional secondary-text subtitle, and an action slot aligned to the right. |
| `ShiftCard` | `shift`, `signedUp`, `onSignUp`, `onCancel` | One shift: role chip, `StatusChip`, title, date and time row, location row, progress bar of filled spots, and a sign-up or cancel button. |
| `StatusChip` | `spotsLeft: number` | "Full" chip when 0, otherwise an outlined primary chip reading "N spot(s) left". |
| `SignUpDialog` | `shift: Shift \| null`, `onClose`, `onConfirm` | Confirmation dialog with a note field and a reminder checkbox. Renders nothing when `shift` is null. Parent passes a `key` so state resets per shift. |
| `SummaryTile` | `label: string`, `value: string \| number` | Card with a small secondary-text label and a large `h2` value. |
| `InfoTile` | `title: string`, `text: string` | Card with a small secondary-text title and a large `h2` text. Same visual pattern as `SummaryTile` with different prop names. |

Reuse these before building new ones. `SummaryTile` and `InfoTile` overlap, so check both before adding a third tile.

## MUI components in use

- Layout: `Box`, `Container` (`maxWidth="lg"`), `Stack`, `Grid` with the `size` prop.
- Navigation: `AppBar`, `Toolbar`, `Tabs`, `Tab`.
- Surfaces: `Card`, `CardContent`, `CardActions`, `Dialog`, `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions`.
- Inputs: `Button`, `TextField`, `Checkbox`, `Switch`, `FormControlLabel`, `ToggleButtonGroup`, `ToggleButton`, `InputAdornment`.
- Data display: `Typography`, `Chip`, `Avatar`, `LinearProgress`, `Table`, `TableContainer`, `TableHead`, `TableBody`, `TableRow`, `TableCell`.
- Feedback: `Snackbar`, `Alert`.
- Icons: `@mui/icons-material` with the `Rounded` variant (`EventRounded`, `PlaceRounded`, `SearchRounded`, `VolunteerActivismRounded`).

## Usage patterns

- Import MUI components from `@mui/material`. Import icons from their own path, for example `@mui/icons-material/EventRounded`.
- Style with the `sx` prop using palette keys: `color="text.secondary"`, `bgcolor: 'primary.light'`, `borderColor: 'divider'`.
- Page layout: `PageHeader`, then content in a `Grid container spacing={3}`. Shift cards use `size={{ xs: 12, sm: 6, lg: 4 }}`. Summary tiles use `size={{ xs: 12, sm: 4 }}`.
- Primary actions are `Button variant="contained"`. Secondary actions on a card are `variant="outlined"`. Dismiss actions in dialogs are plain `Button`.
- Typography variants: `h1` for the page title (via `PageHeader`), `h3` with `component="h2"` for card titles, `body2` with `color="text.secondary"` for meta text, `caption` for small notes.
- Role and secondary chips use `size="small"`. The role chip is `bgcolor: 'primary.light'` with `color: 'primary.dark'`.
- Selected-state and filter controls use `ToggleButtonGroup exclusive size="small"` with an `aria-label`.
- User feedback uses `Snackbar` (plain message for quick confirmations, `Alert` inside it for saved states).
- Icon plus text rows are a `Stack direction="row"` with `spacing={1}` and `alignItems="center"`.

## Rules

- Use palette keys, not hex values. If a color is not in the palette, add a token in `src/theme.ts` first.
- Use `sx` spacing units, not px strings, for padding, margin and gaps.
- Use MUI components, not raw HTML elements such as `<button>`, for interactive controls.
- Give every form control an accessible name: a `label`, an `aria-label`, or a `FormControlLabel`.
- Keep times in 24-hour `HH:mm` in data and format them with `formatTime` or `formatTimeRange` from `src/utils/time.ts` for display.
- Do not override Button, Card, Chip or AppBar defaults per component. Change them in the theme.

## Literal sizes found in components

These are hardcoded in the code and are not tokens: avatar 32px with 14px text (`VolunteersPage`), progress bar height 8px with radius 4 (`ShiftCard`), caption text 13px (`SettingsPage`), form column max width 560 (`SettingsPage`), search field max width 360 (`VolunteersPage`).
