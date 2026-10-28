import { Chip } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

// MUI Chip as used in the code. size is always "small".
const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { size: 'small', label: 'Chip' },
  parameters: {
    docs: { description: { component: 'Atom. MUI Chip, always size small. It is the building block of StatusChip and of the role chip on ShiftCard. Figma: Atoms / Chip.' } },
    controls: { include: ['label', 'variant', 'color'] },
    design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=4-6' },
  },
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FilledDefault: Story = {};
export const OutlinedPrimary: Story = { args: { variant: 'outlined', color: 'primary', label: '3 spots left' } };
// The role chip on ShiftCard: a filled chip with an sx color override, not a prop.
export const Role: Story = { args: { label: 'Sorting', sx: { bgcolor: 'primary.light', color: 'primary.dark' } } };
