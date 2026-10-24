export type Shift = {
  id: string;
  title: string;
  date: string; // ISO date
  start: string;
  end: string;
  location: string;
  role: 'Sorting' | 'Packing' | 'Delivery' | 'Front desk';
  capacity: number;
  volunteerIds: string[];
};

export type Volunteer = {
  id: string;
  name: string;
  email: string;
  hours: number;
};

export const CURRENT_VOLUNTEER_ID = 'v1';

export const volunteers: Volunteer[] = [
  { id: 'v1', name: 'Maya Okafor', email: 'maya.okafor@example.org', hours: 42 },
  { id: 'v2', name: 'Daniel Reyes', email: 'daniel.reyes@example.org', hours: 118 },
  { id: 'v3', name: 'Priya Natarajan', email: 'priya.n@example.org', hours: 64 },
  { id: 'v4', name: 'Tom Lindqvist', email: 'tom.lindqvist@example.org', hours: 23 },
  { id: 'v5', name: 'Amara Diallo', email: 'amara.diallo@example.org', hours: 87 },
  { id: 'v6', name: 'Chen Wei', email: 'chen.wei@example.org', hours: 9 },
  { id: 'v7', name: 'Rosa Alvarez', email: 'rosa.alvarez@example.org', hours: 156 },
];

export const initialShifts: Shift[] = [
  { id: 's1', title: 'Morning produce sort', date: '2026-11-02', start: '08:00', end: '11:00', location: 'Eastside Pantry', role: 'Sorting', capacity: 6, volunteerIds: ['v2', 'v3', 'v5'] },
  { id: 's2', title: 'Weekly grocery boxes', date: '2026-11-03', start: '13:00', end: '16:00', location: 'Eastside Pantry', role: 'Packing', capacity: 8, volunteerIds: ['v1', 'v2', 'v4', 'v5', 'v6', 'v7'] },
  { id: 's3', title: 'Senior home deliveries', date: '2026-11-04', start: '10:00', end: '13:00', location: 'Route A', role: 'Delivery', capacity: 4, volunteerIds: ['v7', 'v3', 'v2', 'v5'] },
  { id: 's4', title: 'Client check-in', date: '2026-11-05', start: '09:00', end: '12:00', location: 'Main Hall', role: 'Front desk', capacity: 3, volunteerIds: ['v3'] },
  { id: 's5', title: 'Holiday meal prep', date: '2026-11-07', start: '09:00', end: '14:00', location: 'Community Kitchen', role: 'Packing', capacity: 10, volunteerIds: ['v1', 'v7'] },
  { id: 's6', title: 'Evening restock', date: '2026-11-09', start: '17:00', end: '19:30', location: 'Eastside Pantry', role: 'Sorting', capacity: 5, volunteerIds: [] },
];
