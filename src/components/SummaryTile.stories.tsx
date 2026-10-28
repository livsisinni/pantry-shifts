import type { Meta, StoryObj } from '@storybook/react-vite';
import SummaryTile from './SummaryTile';

const meta = {
  title: 'Molecules/SummaryTile',
  component: SummaryTile,
  tags: ['autodocs'],
  args: { label: 'Active volunteers', value: 7 },
  decorators: [(Story) => <div style={{ width: 368 }}><Story /></div>],
  parameters: {
    docs: { description: { component: 'Molecule. A Card with a small label and a large value. Figma: Molecules / SummaryTile.' } }, design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Untitled?node-id=4-52' } },
} satisfies Meta<typeof SummaryTile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NumberValue: Story = {};
export const StringValue: Story = { args: { label: 'Hours this season', value: '42 hours' } };
