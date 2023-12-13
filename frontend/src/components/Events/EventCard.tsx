// components/EventCard.tsx
import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Event } from '../../models/event';

interface EventCardProps {
  event: Event;
  onSave?: (eventId: string) => void;
  onEdit?: (event: any) => void;
  onDelete?: (eventId: string) => void;
  isCreator?: boolean
}

const EventCard: React.FC<EventCardProps> = ({ event, onSave, onEdit, onDelete, isCreator }) => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <CardActionArea onClick={() => window.open(`/event/${event._id}`, '_blank')}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="h5">{event.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          <EventIcon fontSize="small" /> {new Date(event.date).toISOString().split('T')[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <PlaceIcon fontSize="small" /> {event.location}
        </Typography>
        <Typography variant="body2">{event.isPaid ? 'Paid' : 'Free'}</Typography>
        <Typography variant="body2">Organized by {event.organizer}</Typography>
      </CardContent>
      </CardActionArea>
      <CardActions>
      {
        onSave ? 
      <IconButton onClick={() => onSave(event._id)}>
          <FavoriteIcon />
        </IconButton>: null
      }
        {isCreator && (
        <>
          {
            onEdit? <IconButton onClick={() => onEdit(event)}>Edit</IconButton>: null
          }
          {
            onDelete? <IconButton onClick={() => onDelete(event._id)}>Delete</IconButton>: null
          }
        </>
      )}
      </CardActions>
    </Card>
  );
};

export default EventCard;
