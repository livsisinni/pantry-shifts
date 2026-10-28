import { createSvgIcon } from '@mui/material/utils';

// @mui/icons-material has no carrot, so this is a custom icon built with MUI's createSvgIcon.
// It behaves like the other icons: it takes fontSize, color and sx, and inherits currentColor.
const CarrotIcon = createSvgIcon(
  <g strokeLinejoin="round" stroke="currentColor" strokeWidth={0.8}>
    <path d="M3.5 20.5 11.4 7.6a3.6 3.6 0 0 1 5 5z" />
    <path transform="translate(16.4 7.6)" d="M0 0Q1.5-2.8 0-5.6Q-1.5-2.8 0 0z" />
    <path transform="translate(16.4 7.6) rotate(45)" d="M0 0Q1.5-2.8 0-5.6Q-1.5-2.8 0 0z" />
    <path transform="translate(16.4 7.6) rotate(90)" d="M0 0Q1.5-2.8 0-5.6Q-1.5-2.8 0 0z" />
  </g>,
  'Carrot',
);

export default CarrotIcon;
