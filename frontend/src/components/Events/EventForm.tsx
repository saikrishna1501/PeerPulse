import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../../store/events';
import { Event } from '../../models/event';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';

interface EventFormProps {
     open: boolean, 
     handleClose: () => void, 
     isEditMode?: boolean, 
     initialEventData?: Event | null
}

export interface EventData {
  title: string;
  organizer: string;
  location: string;
  description: string;
  date: string;
  creatorId: string;
  proofDocument?: File | null ;
  latitude: number;
  longitude: number;
  type: string;
}

const EventForm: React.FC<EventFormProps> = ({ open, handleClose, isEditMode = false, initialEventData }) => {
  const events = useSelector((state:any)=>state.entities.events.list);
  const userId = useSelector((state: any) => state.auth.user._id);
  const [eventData, setEventData] = useState<EventData>(initialEventData ||{ title: '', organizer:'', location: '', description:'', date: '', creatorId:userId, proofDocument:null, type:'', latitude:0,longitude:0});
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode && initialEventData) {
      setEventData(initialEventData);
    } else {
      setEventData({ title: '', organizer:'', location: '', description:'', date: '', creatorId:userId, proofDocument:null,type:'',latitude:0,longitude:0});
    }
  }, [isEditMode, initialEventData]);

  const handleChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setEventData({ ...eventData, proofDocument: e.target.files[0] });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    // const formData = new FormData();
    // formData.append('title', eventData.title);
    // formData.append('organizer', eventData.organizer);
    // formData.append('location', eventData.location);
    // formData.append('description', eventData.description);
    // formData.append('date', eventData.date);
    // formData.append('creatorId', eventData.creatorId);
    // if(eventData.proofDocument){
    //   eventData.proofDocument = 
    // }
    if(isEditMode && initialEventData){
      dispatch(updateEvent(initialEventData._id, eventData));
    }
    else{
      dispatch(createEvent(eventData));
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create an Event</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Event Name" name="title" fullWidth onChange={handleChange} value={eventData.title} required />
        <TextField label="Organizer" name="organizer" fullWidth onChange={handleChange} value={eventData.organizer} required/>
        <TextField label="Description" name="description" fullWidth onChange={handleChange} value={eventData.description} required />
        <TextField label="Location" name="location" fullWidth onChange={handleChange} value={eventData.location} required/>
        <TextField label="Date" name="date" fullWidth onChange={handleChange} value={eventData.date} required/>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={eventData.type || ''}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="virtual">Virtual</MenuItem>
            <MenuItem value="in-person">In-Person</MenuItem>
          </Select>
        </FormControl>
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

export default EventForm;
