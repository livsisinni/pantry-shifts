import type { Meta, StoryObj } from '@storybook/react-vite';
import StatusChip from './StatusChip';

const meta = {
  title: 'Molecules/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  args: { spotsLeft: 3 },
  parameters: {
    docs: { description: { component: 'Molecule. Built from the Chip atom. Figma: Molecules / StatusChip.' } }, design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=4-45' } },
} satisfies Meta<typeof StatusChip>;
export default meta;
type Story = StoryObj<typeof meta>;

// Figma models spotsLeft as a variant: 0 | 1 | 2+.
export const Full: Story = { args: { spotsLeft: 0 } };
export const OneSpotLeft: Story = { args: { spotsLeft: 1 } };
export const SpotsLeft: Story = { args: { spotsLeft: 3 } };
