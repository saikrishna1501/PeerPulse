import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import FiltersComponent from "../EventsPage/FiltersComponent";
import EventCard from "../EventsPage/EventCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ObjectId } from 'mongodb'; 
import { useEffect, useState } from "react";
import { getUpcomingEventDetails } from "../../services/EventsService";
import { Event } from "../../models/event";

const UpcomingEventsPage = () => {
    const dispatch = useDispatch();

    const userDetails = useSelector(
        (state: any) => state.auth.user
    );

    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const loadedUpcomingEvents = await getUpcomingEventDetails(userDetails.upcomingEvents);
            setUpcomingEvents(loadedUpcomingEvents);
        }
        fetchData();
    },[]) 

    return (
    <>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>Create Event</Button>
          </Grid>
          <Grid item xs={12} sm={7}>
            {upcomingEvents.map((event: Event, index)  => (
              <EventCard key={event._id} event={event} onSave={saveEvent} />
            ))}
          </Grid>
          
        </Grid>
      </Container>
    </>
    )
}

export default UpcomingEventsPage;