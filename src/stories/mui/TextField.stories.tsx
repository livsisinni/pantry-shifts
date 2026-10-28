import { InputAdornment, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

// MUI TextField (outlined) with the props used in the code.
const meta = {
  title: 'Atoms/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Full name', value: 'Maya Okafor', fullWidth: true, onChange: fn() },
  argTypes: { size: { control: 'inline-radio', options: ['small', 'medium'] } },
  decorators: [(Story) => <div style={{ maxWidth: 474 }}><Story /></div>],
  parameters: {
    docs: { description: { component: 'Atom. MUI TextField (outlined) as used in the code. Its start adornment holds the SearchRounded icon atom. Figma: Atoms / TextField.' } },
    controls: { include: ['label', 'placeholder', 'value', 'size', 'multiline', 'type'] },
    design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=4-34' },
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {};
export const Email: Story = { args: { label: 'Email', type: 'email', value: 'maya.okafor@example.org' } };
// The roster search field: small, no label, a start adornment with a small SearchRounded icon.
export const SmallWithSearchAdornment: Story = {
  args: {
    size: 'small',
    label: undefined,
    value: '',
    placeholder: 'Search by name or email',
    fullWidth: false,
    slotProps: {
      input: { startAdornment: (<InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment>) },
      htmlInput: { 'aria-label': 'Search volunteers' },
    },
    sx: { maxWidth: 360 },
  },
};
export const Multiline: Story = {
  args: {
    label: 'Note for the coordinator',
    placeholder: 'Allergies, mobility needs, or a friend joining you',
    value: '',
    multiline: true,
    minRows: 3,
  },
};
