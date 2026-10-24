import { Card, Typography } from '@mui/material';

type Props = { label: string; value: string | number };

export default function SummaryTile({ label, value }: Props) {
  return (
    <Card sx={{ p: 2.5 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h2" component="p" sx={{ mt: 0.5 }}>
        {value}
      </Typography>
    </Card>
  );
}
