import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import  {Event, RegistrationStatus}  from '../../models/event';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/users';
import { updateAuthDetails } from '../../store/auth';
import { ObjectId } from 'mongodb';
import { registerEvent, unRegisterEvent } from '../../store/events';


const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const events = useSelector((state: any) => state.entities.events.list);
  const event = events.find((e: Event)=> e._id === eventId);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>(RegistrationStatus.NOT_REGISTERED); 

  useEffect(() => {
    console.log(user.upcomingEvents);
    if(user.upcomingEvents.includes(event._id)) {
      setRegistrationStatus(RegistrationStatus.REGISTERED);
    }
    else if(user._id === event.creatorId) {
      setRegistrationStatus(RegistrationStatus.CANT_REGISTER);
    }
    else {
      setRegistrationStatus(RegistrationStatus.NOT_REGISTERED);
    }
  },[])

  if (!event) {
    return <Typography variant="h5">Event not found</Typography>;
  }

  const handleClick = (event: Event) => {
    try {
      if(registrationStatus === RegistrationStatus.REGISTERED) {
        dispatch(unRegisterEvent({userId: user._id, eventId: event._id}));
        setRegistrationStatus(RegistrationStatus.NOT_REGISTERED);
        alert("Unregistration Successful");
      }
      else {
        dispatch(registerEvent({userId: user._id, eventId: event._id}));
        setRegistrationStatus(RegistrationStatus.REGISTERED);
        alert("Registration Successful");
      }
      
    }
    catch(err) {
      alert("Something went wrong, please try again after sometime!!!");
    }
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <img src={event.imageUrl} alt={event.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <Typography variant="h4">{event.title}</Typography>
      <Typography variant="body1" color="text.secondary">
        <PlaceIcon /> {event.location}
      </Typography>
      <Typography variant="body1">{event.description}</Typography>
      <Button disabled={registrationStatus === RegistrationStatus.NOT_REGISTERED || registrationStatus === RegistrationStatus.REGISTERED ? false: true} variant="contained" onClick={(e) => {handleClick(event)}}>
        {registrationStatus === RegistrationStatus.NOT_REGISTERED || registrationStatus === RegistrationStatus.CANT_REGISTER ? "Register": "UnRegister"}
      </Button>
    </Paper>
  );
};

export default EventDetailsPage;