import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PageHeader from './PageHeader';

const meta = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  args: {
    title: 'Volunteers',
    subtitle: 'Everyone who has helped this season.',
    action: <Button variant="contained">Print roster</Button>,
  },
  argTypes: { action: { control: false } },
  decorators: [(Story) => <div style={{ maxWidth: 1152 }}><Story /></div>],
  parameters: {
    docs: { description: { component: 'Molecule. A title, an optional subtitle and an optional action slot. The default action in Figma is a Button atom. Figma: Molecules / PageHeader.' } }, design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=4-46' } },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
// subtitle and action are optional in code; Figma exposes them as showSubtitle / showAction.
export const WithoutSubtitle: Story = { args: { subtitle: undefined } };
export const WithoutAction: Story = { args: { action: undefined } };
export const WithToggleButtonGroup: Story = {
  args: {
    title: 'Upcoming shifts',
    subtitle: 'Pick a shift that fits your week. Every hour helps a neighbor eat.',
    action: (
      <ToggleButtonGroup exclusive size="small" value="all" aria-label="Filter shifts">
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="open">Open spots</ToggleButton>
        <ToggleButton value="mine">My shifts</ToggleButton>
      </ToggleButtonGroup>
    ),
  },
};
