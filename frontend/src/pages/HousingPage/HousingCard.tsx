
import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Housing } from '../../models/housing';

interface HousingCardProps {
    housing: Housing;
    onSave: (housingId: string) => void;
  }

const housingCard: React.FC<HousingCardProps> = ({ housing, onSave }) => {
    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', mb:2}}>
            <CardActionArea onClick={() => window.open(`/housing/${housing._id}`, '_blank')}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography variant="h5" >{housing.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        <PlaceIcon fontSize='small'/> {housing.location} </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize='small'> {housing.price} </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize='small'> {housing.type} - {housing.beds} beds</Typography>
                    <Typography variant="body2" color="text.secondary" fontSize='small'> {housing.amenities1}</Typography>
                    <Typography variant="body2" color="text.secondary" fontSize='small'> {housing.amenities2}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton onClick={() => onSave(housing._id)}>
                    <FavoriteIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default housingCard;