import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEvent, loadEvents } from '../../store/events';
import { Event } from '../../models/event';
import EventCard from '../../components/Events/EventCard';
import MapView from '../../components/Events/MapView';
import FiltersComponent from '../../components/Events/FiltersComponent';
import { Button, Container, Grid, Paper, TextField} from '@mui/material';
import EventForm from '../../components/Events/EventForm';

interface FiltersState {
  meetAndGreet: boolean;
  food: boolean;
  speakerSeries: boolean;
  onCampus: boolean;
  offCampus: boolean;
  free: boolean;
  paid: boolean;
  virtual: boolean;
  inPerson: boolean
}

const EventsPage: React.FC = () => {
  const events = useSelector((state: any) => state.entities.events.list);
  // to filter events
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchQuery, setSearchQuery] = useState('');

  //to know if the author and current user are same
  const currentUserId = useSelector((state: any) => state.auth.user._id);
  const dispatch = useDispatch();

  //to open create event dialog
  const [isCreateEventFormOpen, setIsCreateEventFormOpen] = useState(false);
  const handleOpenCreateEventForm = () => setIsCreateEventFormOpen(true);
  const handleCloseCreateEventForm = () => setIsCreateEventFormOpen(false);

  //to open edit event dialog
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const handleOpenEditForm=()=>setIsEditFormOpen(true);
  const handleCloseEditForm=()=>setIsEditFormOpen(false);
  const [editingEventData, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    dispatch(loadEvents());
  }, []);

  const [filters, setFilters] = useState<FiltersState>({
    meetAndGreet: false,
    food: false,
    speakerSeries: false,
    onCampus: false,
    offCampus: false,
    free: false,
    paid: false,
    virtual: false,
    inPerson: false
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const applyFilters = (query: string, filterOptions: FiltersState) => {
    let allFiltersInactive = Object.values(filterOptions).every(val => val === false);

    let result = events.filter((event: Event) => {
      if (allFiltersInactive) return true; // If all filters are inactive, return all events
  
      const queryCheck = event.title.toLowerCase().includes(query.toLowerCase());
      // Check for each filter category
      const categoryChecks = [
        filterOptions.meetAndGreet && event.categories.includes('Meet and Greet'),
        filterOptions.food && event.categories.includes('Food'),
        filterOptions.speakerSeries && event.categories.includes('Speaker Series'),
        filterOptions.onCampus && event.location.includes('Northeastern University'),
        filterOptions.offCampus && event.location !== 'Northeastern University',
        filterOptions.free && !event.isPaid,
        filterOptions.paid && event.isPaid,
        filterOptions.inPerson && event.type === 'in-person',
        filterOptions.virtual && event.type === 'virtual'
      ];

      // Determine if the event matches any of the active filters
      const matchesFilters = categoryChecks.some(Boolean); // 'some' checks if at least one condition is true

      return queryCheck && matchesFilters;
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

  const handleEdit=(event: Event)=>{
    setEditingEvent(event);
    handleOpenEditForm();
    dispatch(loadEvents());
    setFilteredEvents(events);
  }

  const handleDelete=(eventId: string)=>{
    dispatch(deleteEvent(eventId));
    dispatch(loadEvents());
    setFilteredEvents(events);
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
            <EventForm open={isCreateEventFormOpen} handleClose={handleCloseCreateEventForm} />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField fullWidth sx={{paddingBottom:'10px'}} label="Search Events" variant="outlined" value={searchQuery} onChange={handleSearchChange} />
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} onSave={saveEvent} onEdit={handleEdit}
              onDelete={handleDelete}
              isCreator={true}/> //event.creatorId === currentUserId
            ))}
          </Grid>
          <Grid item xs={12} sm={3}>
            <EventForm open={isEditFormOpen} handleClose={handleCloseEditForm} isEditMode={Boolean(editingEventData)} initialEventData={editingEventData} />
            <MapView events={filteredEvents} onLocationSelect={focusEventOnMap}/>
          </Grid>
          
        </Grid>
      </Container>
    </>
  );
};

export default EventsPage;