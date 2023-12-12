import React from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Button} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import {Housing} from '../../models/housing'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const HousingDetailsPage: React.FC = () => {
  const { housingId } = useParams<{ housingId: string }>();
  const housingList = useSelector((state: any) => state.entities.housing.list.data);
  const housing = housingList.find((e: Housing)=> e._id === housingId);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  if (!housing) {
    return <Typography variant="h5">No available housing</Typography>;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <img src={housing.imageUrl} alt={housing.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <Typography variant="h2">{housing.title}</Typography>
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