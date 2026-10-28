import EventRoundedIcon from '@mui/icons-material/EventRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import { SvgIcon } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CarrotIcon from '../../components/CarrotIcon';

// The four @mui/icons-material icons used in the code, plus the custom CarrotIcon. fontSize is small (20px) or medium (24px, default).
const meta = {
  title: 'Atoms/Icons',
  component: SvgIcon,
  tags: ['autodocs'],
  args: { fontSize: 'medium' },
  argTypes: { fontSize: { control: 'inline-radio', options: ['small', 'medium'] } },
  parameters: {
    docs: { description: { component: 'Atom. The icons used in the code. SearchRounded sits in TextField, EventRounded and PlaceRounded in ShiftCard, VolunteerActivismRounded in the app bar, and the custom CarrotIcon is the Button end icon. Figma: Atoms / icon sets.' } }, controls: { include: ['fontSize'] } },
} satisfies Meta<typeof SvgIcon>;
export default meta;
type Story = StoryObj<typeof meta>;

const icon = (Icon: typeof EventRoundedIcon): Story['render'] => (args) => <Icon fontSize={args.fontSize as 'small' | 'medium'} />;

export const EventRounded: Story = {
  render: icon(EventRoundedIcon),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=3-85' } },
};
export const PlaceRounded: Story = {
  render: icon(PlaceRoundedIcon),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=3-92' } },
};
export const SearchRounded: Story = {
  render: icon(SearchRoundedIcon),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=3-99' } },
};
export const VolunteerActivismRounded: Story = {
  render: icon(VolunteerActivismRoundedIcon),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=3-106' } },
};
// Custom icon (no carrot in @mui/icons-material). It is the Button end icon through the theme.
export const Carrot: Story = {
  render: icon(CarrotIcon),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/IPcWrmWuclsYviyq4sJ5NS/Design-Lab-X-AI?node-id=17-317' } },
};
