import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

// The shift filter from ShiftsPage: exclusive, size small, three buttons.
type Filter = 'all' | 'open' | 'mine';

const meta = {
  title: 'Molecules/ToggleButtonGroup',
  component: ToggleButtonGroup,
  tags: ['autodocs'],
  args: { exclusive: true, size: 'small', value: 'all' as Filter, onChange: fn(), 'aria-label': 'Filter shifts' },
  argTypes: { value: { control: 'inline-radio', options: ['all', 'open', 'mine'] } },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="open">Open spots</ToggleButton>
      <ToggleButton value="mine">My shifts</ToggleButton>
    </ToggleButtonGroup>
  ),
  parameters: {
    docs: { description: { component: 'Molecule. A group of three toggle buttons, used as the shift filter on ShiftsPage. Figma keeps it on the Screens page as a local helper, not on the Molecules page.' } },
    controls: { include: ['value'] },
    design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Untitled?node-id=6-23' },
  },
} satisfies Meta<typeof ToggleButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
export const OpenSpots: Story = { args: { value: 'open' } };
export const MyShifts: Story = { args: { value: 'mine' } };
