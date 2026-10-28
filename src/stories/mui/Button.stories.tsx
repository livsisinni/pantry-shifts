import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

// MUI Button as used in the code: variant, disabled and children only. Color is the default (primary).
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button', variant: 'contained', disabled: false, onClick: fn() },
  argTypes: { variant: { control: 'inline-radio', options: ['contained', 'outlined', 'text'] } },
  parameters: {
    docs: { description: { component: 'Atom. MUI Button as used in the code: variant, disabled and children. Figma: Atoms / Button.' } },
    controls: { include: ['children', 'variant', 'disabled'] },
    design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Untitled?node-id=3-119' },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = { args: { children: 'Sign up' } };
export const Outlined: Story = { args: { variant: 'outlined', children: 'Cancel my spot' } };
export const Text: Story = { args: { variant: 'text', children: 'Not now' } };
export const ContainedDisabled: Story = { args: { children: 'Sign up', disabled: true } };
export const OutlinedDisabled: Story = { args: { variant: 'outlined', children: 'Cancel my spot', disabled: true } };
export const TextDisabled: Story = { args: { variant: 'text', children: 'Not now', disabled: true } };
