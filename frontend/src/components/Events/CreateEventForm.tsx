import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../store/events';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, InputLabel, TextField } from '@mui/material';

interface CreateEventFormProps {
  open: boolean;
  handleClose: () => void;
}

interface EventData {
  title: string;
  organizer: string;
  location: string;
  description: string;
  date: string;
  creatorId: string;
  proofDocument: File | null;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ open, handleClose }) => {
  const userId = useSelector((state: any) => state.auth.user._id);
  const [eventData, setEventData] = useState<EventData>({ title: '', organizer:'', location: '', description:'', date: '', creatorId:userId, proofDocument:null});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventData({ ...eventData, proofDocument: e.target.files[0] });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('organizer', eventData.organizer);
    formData.append('location', eventData.location);
    formData.append('description', eventData.description);
    formData.append('date', eventData.date);
    formData.append('creatorId', eventData.creatorId);
    dispatch(createEvent(formData));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create an Event</DialogTitle>
      <DialogContent>
        <TextField label="Event Name" name="title" fullWidth onChange={handleChange} value={eventData.title} />
        <TextField label="Organizer" name="organizer" fullWidth onChange={handleChange} value={eventData.organizer} />
        <TextField label="Description" name="description" fullWidth onChange={handleChange} value={eventData.description} />
        <TextField label="Location" name="location" fullWidth onChange={handleChange} value={eventData.location} />
        <TextField label="Date" name="date" fullWidth onChange={handleChange} value={eventData.date} />
        <InputLabel htmlFor="event-proof">Event Proof</InputLabel>
    <Input
      id="event-proof"
      type="file"
      onChange={handleChange}
      inputProps={{ accept: ".pdf,.doc,.docx,application/msword,application/pdf" }}
    />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventForm;
