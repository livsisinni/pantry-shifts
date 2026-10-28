import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import { useState } from 'react';
import CarrotConfetti from './components/CarrotConfetti';
import SettingsPage from './pages/SettingsPage';
import ShiftsPage from './pages/ShiftsPage';
import VolunteersPage from './pages/VolunteersPage';

const pages = [
  { label: 'Shifts', element: <ShiftsPage /> },
  { label: 'Volunteers', element: <VolunteersPage /> },
  { label: 'My profile', element: <SettingsPage /> },
];

export default function App() {
  const [tab, setTab] = useState(() => {
    const t = Number(new URLSearchParams(window.location.search).get('tab'));
    return Number.isInteger(t) && t >= 0 && t < pages.length ? t : 0;
  });

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <CarrotConfetti />
      <AppBar position="sticky" sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Toolbar sx={{ gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
            <VolunteerActivismRoundedIcon />
            <Typography variant="h3" component="span" color="text.primary">
              Pantry Shifts
            </Typography>
          </Box>
          <Tabs value={tab} onChange={(_, v: number) => setTab(v)} aria-label="Sections">
            {pages.map((p) => (
              <Tab key={p.label} label={p.label} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {pages[tab].element}
      </Container>
    </Box>
  );
}
