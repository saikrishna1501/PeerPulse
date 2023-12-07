// components/EventCard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Event } from '../../models/event';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{event.name}</Typography>
        <Typography color="text.secondary">{event.location}</Typography>
        <Typography>{event.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
