import React from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { testEventsData } from './testEventsData';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = testEventsData.find(e => e.id === eventId); // Replace with your state management or API call

  if (!event) {
    return <Typography variant="h5">Event not found</Typography>;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <img src={event.imageUrl} alt={event.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <Typography variant="h4">{event.title}</Typography>
      <Typography variant="body1" color="text.secondary">
        <PlaceIcon /> {event.location}
      </Typography>
      <Typography variant="body1">{event.description}</Typography>
      <Button variant="contained" onClick={() => {/* logic to register for event */}}>
        Register
      </Button>
    </Paper>
  );
};

export default EventDetailsPage;