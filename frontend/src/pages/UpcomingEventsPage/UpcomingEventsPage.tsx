import { Button, Container, Grid, Paper, TextField } from "@mui/material";
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
        <h1>{userDetails.upcomingEvents.length}</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            {upcomingEvents.map((event: Event, index)  => (
              <EventCard key={event._id} event={event} />
            ))}
          </Grid>
          
        </Grid>
      </Container>
    </>
    )
}

export default UpcomingEventsPage;