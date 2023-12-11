import React from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import  {Event}  from '../../models/event';
import { useSelector } from 'react-redux';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const events = useSelector((state: any) => state.entities.events.list);
  const event = events.find((e: Event)=> e._id === eventId);

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