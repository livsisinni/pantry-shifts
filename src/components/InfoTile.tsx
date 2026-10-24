import { Card, Typography } from '@mui/material';

type Props = { title: string; text: string };

export default function InfoTile({ title, text }: Props) {
  return (
    <Card style={{ padding: 20, marginBottom: 12 }}>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h2" component="p" sx={{ mt: 0.5 }}>
        {text}
      </Typography>
    </Card>
  );
}
