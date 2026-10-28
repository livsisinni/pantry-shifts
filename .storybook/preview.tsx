import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/react-vite';
import CarrotConfetti from '../src/components/CarrotConfetti';
import { theme } from '../src/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CarrotConfetti />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    options: { storySort: { order: ['Foundations', 'Atoms', 'Molecules', 'Organisms'] } },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: {
      // 'todo' shows a11y violations in the test UI only
      test: 'todo',
    },
  },
};

export default preview;
