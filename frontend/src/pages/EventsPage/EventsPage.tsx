import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { fetchEvents } from '../features/events/eventsSlice'; to be implemented
import { testEventsData } from './testEventsData';
import { Event } from '../../models/event';
import Navbar from '../NavBar/NavBar';
import EventCard from './EventCard';
import MapView from './MapView';
import { Checkbox, FormControlLabel, FormGroup, Grid, TextField} from '@mui/material';

const EventsPage: React.FC = () => {
  // const dispatch = useDispatch();
  // const events = useSelector((state) => state.events.events);
  const events = testEventsData;
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  // useEffect(() => {
  //   dispatch(fetchEvents()); // You will need to implement this by redux
  // }, [dispatch]);

  useEffect(() => {
    // Filter events based on search term and other filters if added
    const searchResults = events.filter((event: Event) => event.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredEvents(searchResults);
  }, [searchQuery, events]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterEvents(query, filters);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, [event.target.name]: event.target.checked };
    setFilters(newFilters);
    filterEvents(searchQuery, newFilters);
  };

  const filterEvents = (query: string, filterOptions: Record<string, boolean>) => {
    let result = events.filter(e => e.name.toLowerCase().includes(query));
    Object.keys(filterOptions).forEach(filter => {
      if (filterOptions[filter]) {
        result = result.filter(e => e.location === filter);
      }
    });
    setFilteredEvents(result);
  };
  const focusEventOnMap = (location: string) => {
    // Implement the logic to focus on the event in the map based on location
    alert(location)
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth label="Search Events" variant="outlined" onChange={handleSearchChange} />
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            {/* Generate these from your event data or a predefined list */}
            <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="Boston" />} label="Boston" />
            {/* Add more checkboxes for each location */}
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </Grid>
        <Grid item xs={3}>
          <MapView events={filteredEvents} onLocationSelect={focusEventOnMap} />
        </Grid>
      </Grid>
    </div>
  );
};

export default EventsPage;