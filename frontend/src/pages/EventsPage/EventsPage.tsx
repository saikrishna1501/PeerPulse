import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEvent, loadEvents } from '../../store/events';
import { testEventsData } from './testEventsData';
import { Event } from '../../models/event';
import EventCard from '../../components/Events/EventCard';
import MapView from '../../components/Events/MapView';
import FiltersComponent from '../../components/Events/FiltersComponent';
import CreateEventForm from '../../components/Events/CreateEventForm';
import { Button, Container, Grid, Paper, TextField} from '@mui/material';

interface FiltersState {
  meetAndGreet: boolean;
  food: boolean;
  speakerSeries: boolean;
  onCampus: boolean;
  offCampus: boolean;
  free: boolean;
  paid: boolean;
}

const EventsPage: React.FC = () => {
  const events = useSelector((state: any) => state.entities.events.list);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = useSelector((state: any) => state.auth.user._id);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(loadEvents());
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deleteEvent(id));
  };

  const [isCreateEventFormOpen, setIsCreateEventFormOpen] = useState(false);

  const handleOpenCreateEventForm = () => setIsCreateEventFormOpen(true);
  const handleCloseCreateEventForm = () => setIsCreateEventFormOpen(false);

  const [filters, setFilters] = useState<FiltersState>({
    meetAndGreet: false,
    food: false,
    speakerSeries: false,
    onCampus: false,
    offCampus: false,
    free: false,
    paid: false,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const applyFilters = (query: string, filterOptions: FiltersState) => {
    let result = events.filter((event: Event) => {
      const queryCheck = event.title.toLowerCase().includes(query.toLowerCase());
      const categoriesCheck = (!filterOptions.meetAndGreet || event.categories.includes('Meet and Greet')) &&
                              (!filterOptions.food || event.categories.includes('Food')) &&
                              (!filterOptions.speakerSeries || event.categories.includes('Speaker Series'));

      const locationCheck = (!filterOptions.onCampus || event.location.includes('Northeastern University')) &&
                            (!filterOptions.offCampus || event.location !== 'Northeastern University');
                            
      const pricingCheck = (!filterOptions.free || !event.isPaid) && (!filterOptions.paid || event.isPaid);
    
      
      return queryCheck && categoriesCheck && locationCheck && pricingCheck;
    });
    setFilteredEvents(result);
  };

  const handleFilterChange = (name: string, checked: boolean) => {
    const newFilters = { ...filters, [name]: checked };
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const saveEvent = (eventId: string)=>{
      console.log(eventId)
  }

  const focusEventOnMap = (location: string) => {
    alert(location)
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Paper elevation={3} sx={{overflowY: 'auto', display: 'flex', flexDirection: 'column', p: 2, borderRight: '1px solid #ccc', mb: 2}}>
              <FiltersComponent filters={filters} onFilterChange={handleFilterChange} />
            </Paper>
             <Button onClick={handleOpenCreateEventForm} variant="contained" color="primary">
              Create Event
            </Button>
            <CreateEventForm open={isCreateEventFormOpen} handleClose={handleCloseCreateEventForm} />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField fullWidth sx={{paddingBottom:'10px'}} label="Search Events" variant="outlined" value={searchQuery} onChange={handleSearchChange} />
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} onSave={saveEvent} />
            ))}
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* <MapView events={filteredEvents} onLocationSelect={focusEventOnMap}/> */}
          </Grid>
          
        </Grid>
      </Container>
    </>
  );
};

export default EventsPage;