import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUpcomingEventDetails } from "../../services/EventsService";
import { Event } from "../../models/event";
import EventCard from "../../components/Events/EventCard";

const UpcomingEventsPage = () => {
    const dispatch = useDispatch();

    const userDetails = useSelector(
        (state: any) => state.auth.user
    );

    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("upcomingEvents in useEffect", userDetails)
            const loadedUpcomingEvents = await getUpcomingEventDetails(userDetails.upcomingEvents);
            setUpcomingEvents(loadedUpcomingEvents);
        }
        fetchData();
    },[]) 

    return (
    <>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            {upcomingEvents.length !== 0 ? upcomingEvents.map((event: Event, index)  => (
              <EventCard key={event._id} event={event} />
            )): <Typography variant="h4" component="h4">
            No upcoming events
          </Typography> }
          </Grid>
          
        </Grid>
      </Container>
    </>
    )
}

export default UpcomingEventsPage;