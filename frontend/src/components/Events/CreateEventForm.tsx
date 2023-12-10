import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { createEvent } from '../store/eventsSlice'; // Import your createEvent action from Redux
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface CreateEventFormProps {
  open: boolean;
  handleClose: () => void;
}

interface EventData {
  name: string;
  location: string;
  date: string;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ open, handleClose }) => {
  const [eventData, setEventData] = useState<EventData>({ name: '', location: '', date: '' });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    //dispatch(createEvent(eventData)); // Dispatch action to create event
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create an Event</DialogTitle>
      <DialogContent>
        <TextField label="Event Name" name="name" fullWidth onChange={handleChange} value={eventData.name} />
        <TextField label="Location" name="location" fullWidth onChange={handleChange} value={eventData.location} />
        <TextField label="Date" name="date" fullWidth onChange={handleChange} value={eventData.date} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventForm;
