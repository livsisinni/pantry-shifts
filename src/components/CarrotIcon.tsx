import { createSvgIcon } from '@mui/material/utils';

// @mui/icons-material has no carrot, so this is a custom icon built with MUI's createSvgIcon.
// It behaves like the other icons: it takes fontSize, color and sx, and inherits currentColor.
// The shapes are exported so CarrotConfetti can draw the same carrot on a canvas.
export const carrotBody = 'M3.5 20.5 11.4 7.6a3.6 3.6 0 0 1 5 5z';
export const carrotLeaf = 'M0 0Q1.5-2.8 0-5.6Q-1.5-2.8 0 0z';
export const carrotLeafAnchor = { x: 16.4, y: 7.6 };
export const carrotLeafAngles = [0, 45, 90];

const CarrotIcon = createSvgIcon(
  <g strokeLinejoin="round" stroke="currentColor" strokeWidth={0.8}>
    <path d={carrotBody} />
    {carrotLeafAngles.map((angle) => (
      <path key={angle} transform={`translate(${carrotLeafAnchor.x} ${carrotLeafAnchor.y}) rotate(${angle})`} d={carrotLeaf} />
    ))}
  </g>,
  'Carrot',
);

export default CarrotIcon;
