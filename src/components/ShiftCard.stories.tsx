import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { initialShifts, type Shift } from '../data/seed';
import ShiftCard from './ShiftCard';

// ShiftCard derives its state from the shift: spotsLeft is capacity minus volunteerIds.
const base = initialShifts[0]; // capacity 6
const withVolunteers = (n: number): Shift => ({ ...base, volunteerIds: Array.from({ length: n }, (_, i) => `v${i + 1}`) });

const meta = {
  title: 'Organisms/ShiftCard',
  component: ShiftCard,
  tags: ['autodocs'],
  args: { shift: withVolunteers(3), signedUp: false, onSignUp: fn(), onCancel: fn() },
  decorators: [(Story) => <div style={{ width: 368 }}><Story /></div>],
  parameters: {
    docs: { description: { component: 'Organism. Built from the Chip atom (role), the StatusChip molecule, the EventRounded and PlaceRounded icon atoms, a LinearProgress bar and the Button atom. Figma: Organisms / ShiftCard.' } }, design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Untitled?node-id=5-179' } },
} satisfies Meta<typeof ShiftCard>;
export default meta;
type Story = StoryObj<typeof meta>;

// The six stories match the Figma variants: signedUp (false | true) x spotsLeft (2+ | 1 | 0).
export const Open: Story = {};
export const LastSpot: Story = { args: { shift: withVolunteers(5) } };
export const Full: Story = { args: { shift: withVolunteers(6) } };
export const SignedUp: Story = { args: { signedUp: true } };
export const SignedUpLastSpot: Story = { args: { signedUp: true, shift: withVolunteers(5) } };
export const SignedUpFull: Story = { args: { signedUp: true, shift: withVolunteers(6) } };
