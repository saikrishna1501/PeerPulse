import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Button } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { Event, RegistrationStatus } from "../../models/event";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { registerEvent, unRegisterEvent } from "../../store/events";
import { toast } from "react-toastify";
import axios from "axios";

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/events`, {
        withCredentials: true,
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  const event = events.find((e: Event) => e._id === eventId) || ({} as Event);
  console.log(event);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const googleMapsUrl = `https://www.google.com/maps/?q=${event.latitude},${event.longitude}`;

  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>(RegistrationStatus.NOT_REGISTERED);

  useEffect(() => {
    fetchEvents();
    console.log(user.upcomingEvents);
    if (user.upcomingEvents.includes(event._id)) {
      setRegistrationStatus(RegistrationStatus.REGISTERED);
    } else if (user._id === event.creatorId) {
      setRegistrationStatus(RegistrationStatus.CANT_REGISTER);
    } else {
      setRegistrationStatus(RegistrationStatus.NOT_REGISTERED);
    }
  }, []);

  if (!event) {
    return <Typography variant="h5">Event not found</Typography>;
  }

  const handleClick = (event: Event) => {
    try {
      if (registrationStatus === RegistrationStatus.REGISTERED) {
        dispatch(unRegisterEvent({ userId: user._id, eventId: event._id }));
        setRegistrationStatus(RegistrationStatus.NOT_REGISTERED);
        toast.success("Successfully Unregistered!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        dispatch(registerEvent({ userId: user._id, eventId: event._id }));
        setRegistrationStatus(RegistrationStatus.REGISTERED);
        toast.success("Successfully Registered!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      alert("Something went wrong, please try again after sometime!!!");
    }
  };

  return (
    <Paper sx={{ padding: 2, margin: "20px" }}>
      <img
        src={event.imageUrl}
        alt={event.title}
        style={{ width: "100%", maxHeight: "50vh", objectFit: "cover" }}
      />
      <Typography variant="h4">{event.title}</Typography>
      <Typography variant="body1" color="text.secondary">
        <PlaceIcon /> {event.location}
      </Typography>
      <Typography variant="body1">{event.description}</Typography>
      <Button
        variant="contained"
        color="primary"
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginRight: "20px" }}
      >
        Location Details
      </Button>
      <Button
        disabled={
          registrationStatus === RegistrationStatus.NOT_REGISTERED ||
          registrationStatus === RegistrationStatus.REGISTERED
            ? false
            : true
        }
        variant="contained"
        onClick={(e) => {
          handleClick(event);
        }}
      >
        {registrationStatus === RegistrationStatus.NOT_REGISTERED ||
        registrationStatus === RegistrationStatus.CANT_REGISTER
          ? "Register"
          : "UnRegister"}
      </Button>
    </Paper>
  );
};

export default EventDetailsPage;
