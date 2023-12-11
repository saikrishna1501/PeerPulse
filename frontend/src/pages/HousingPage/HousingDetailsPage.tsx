import React from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { testhousingdata } from './testhousingdata';

const HousingDetailsPage: React.FC = () => {
  const { housingId } = useParams<{ housingId: string }>();
  const housing = testhousingdata.find(e => e.id === housingId); // Replace with your state management or API call

  if (!housing) {
    return <Typography variant="h5">Event not found</Typography>;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <img src={housing.imageUrl} alt={housing.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <Typography variant="h4">{housing.title}</Typography>
      <Typography variant="body1" color="text.secondary">
        <PlaceIcon /> {housing.location}
      </Typography>
      <Typography variant="body1">{housing.description}</Typography>
      <Typography variant="body1">{housing.amenities}</Typography>
      <Button variant="contained" onClick={() => {/* logic to send email to the owner */}}>
        Email
      </Button>
      <Button variant="contained" onClick={() => {/* logic to directly call owner */}}>
        Phone
      </Button>
    </Paper>
  );
};

export default HousingDetailsPage;