import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { fetchEvents } from '../features/events/eventsSlice'; to be implemented
import { testhousingdata } from './testhousingdata';
import { Housing } from '../../models/housing';
import HousingCard from './HousingCard';
//import MapView from './MapView';
import FiltersComponent from './FiltersComponent';
import { Button, Container, Grid, Paper, TextField} from '@mui/material';

interface FiltersState {
  upto1K: boolean;
  upto3K: boolean;
  upto5K: boolean;
  more5K: boolean;
  apartments: boolean;
  condos: boolean;
  houses: boolean;
  one: boolean;
  two: boolean;
  three: boolean;
  fourPlus: boolean;
  laundry: boolean;
  dishwasher: boolean;
  ac: boolean;
  parking: boolean;
}

const HousingPage: React.FC = () => {
  const [housing, setHousing] = useState<Housing[]>([]);
  const [filteredHousing, setFilteredHousing] = useState<Housing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  // let state = useSelector(state=> state);
  const userid = useSelector(
    (state: any) => state
  );
  const [filters, setFilters] = useState<FiltersState>({
    upto1K: false,
    upto3K: false,
    upto5K: false,
    more5K: false,
    apartments: false,
    condos: false,
    houses: false,
    one: false,
    two: false,
    three: false,
    fourPlus: false,
    laundry: false,
    dishwasher: false,
    ac: false,
    parking: false
  });

  useEffect(() => {
    // Mock data fetching
    setHousing(testhousingdata);
    setFilteredHousing(testhousingdata);
  }, []);

  const handleSearchChange = (housingLocation: React.ChangeEvent<HTMLInputElement>) => {
    const query = housingLocation.target.value;
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const applyFilters = (query: string, filterOptions: FiltersState) => {
    let result = housing.filter((housing) => {
      const queryCheck = housing.location.toLowerCase().includes(query.toLowerCase());
      const priceCheck = (!filterOptions.upto1K || housing.price.includes('$500 - $1000')) &&
                              (!filterOptions.upto3K || housing.price.includes('$1001 - $3000')) &&
                              (!filterOptions.upto5K || housing.price.includes('$3001 - $5000')) &&
                              (!filterOptions.more5K || housing.price.includes('$5001 - more'));

      const typeCheck = (!filterOptions.apartments || housing.location.includes('Northeastern University')) &&
                            (!filterOptions.condos || housing.location !== 'Northeastern University') &&
                            (!filterOptions.apartments || housing.location.includes('Northeastern University'));

                            
      //const pricingCheck = (!filterOptions.free || !housing.isPaid) && (!filterOptions.paid || housing.isPaid);
    
      
      return queryCheck && priceCheck && typeCheck; //&& pricingCheck;
    });
    setFilteredHousing(result);
  };

  const handleFilterChange = (name: string, checked: boolean) => {
    const newFilters = { ...filters, [name]: checked };
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const saveEvent = (eventId: string)=>{
      console.log(eventId)
  }

//   const focusEventOnMap = (location: string) => {
//     alert(location)
//   };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Paper elevation={3} sx={{overflowY: 'auto', display: 'flex', flexDirection: 'column', p: 2, borderRight: '1px solid #ccc', mb: 2}}>
              <FiltersComponent filters={filters} onFilterChange={handleFilterChange} />
            </Paper>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>Create Event</Button>
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField fullWidth sx={{paddingBottom:'10px'}} label="Search Events" variant="outlined" value={searchQuery} onChange={handleSearchChange} />
            {filteredHousing.map(housing => (
              <HousingCard key={housing.id} housing={housing} onSave={saveEvent} />
            ))}
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <MapView events={filteredHousing} onLocationSelect={focusEventOnMap}/>
          </Grid> */}
          
        </Grid>
      </Container>
    </>
  );
};



export default HousingPage;