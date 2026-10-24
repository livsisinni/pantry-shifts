import { Grid, Snackbar, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ShiftCard from '../components/ShiftCard';
import SignUpDialog from '../components/SignUpDialog';
import { CURRENT_VOLUNTEER_ID, initialShifts, type Shift } from '../data/seed';
import { useLocalStorage } from '../useLocalStorage';

type Filter = 'all' | 'open' | 'mine';

export default function ShiftsPage() {
  const [shifts, setShifts] = useLocalStorage<Shift[]>('pantry-shifts', initialShifts);
  const [filter, setFilter] = useState<Filter>('all');
  const [pending, setPending] = useState<Shift | null>(null);
  const [message, setMessage] = useState('');

  const visible = shifts.filter((s) => {
    if (filter === 'open') return s.volunteerIds.length < s.capacity;
    if (filter === 'mine') return s.volunteerIds.includes(CURRENT_VOLUNTEER_ID);
    return true;
  });

  const update = (id: string, fn: (ids: string[]) => string[]) =>
    setShifts((all) => all.map((s) => (s.id === id ? { ...s, volunteerIds: fn(s.volunteerIds) } : s)));

  return (
    <>
      <PageHeader
        title="Upcoming shifts"
        subtitle="Pick a shift that fits your week. Every hour helps a neighbor eat."
        action={
          <ToggleButtonGroup
            exclusive
            size="small"
            value={filter}
            onChange={(_, v: Filter | null) => v && setFilter(v)}
            aria-label="Filter shifts"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="open">Open spots</ToggleButton>
            <ToggleButton value="mine">My shifts</ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <Grid container spacing={3}>
        {visible.map((shift) => (
          <Grid key={shift.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <ShiftCard
              shift={shift}
              signedUp={shift.volunteerIds.includes(CURRENT_VOLUNTEER_ID)}
              onSignUp={setPending}
              onCancel={(s) => {
                update(s.id, (ids) => ids.filter((id) => id !== CURRENT_VOLUNTEER_ID));
                setMessage('Your spot was cancelled.');
              }}
            />
          </Grid>
        ))}
      </Grid>
      <SignUpDialog
        key={pending?.id ?? 'none'}
        shift={pending}
        onClose={() => setPending(null)}
        onConfirm={(s) => {
          update(s.id, (ids) => [...ids, CURRENT_VOLUNTEER_ID]);
          setPending(null);
          setMessage("You're signed up. Thank you!");
        }}
      />
      <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage('')} message={message} />
    </>
  );
}
