import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Button, IconButton } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Housing } from "../../models/housing";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { blueGrey } from "@mui/material/colors";
import { HousingHeader } from "./HousingHeader";

const HousingDetailsPage: React.FC = () => {
  const { housingId } = useParams<{ housingId: string }>();
  const housingList = useSelector((state: any) => state.entities.housing.list);
  const housing = housingList.find((e: Housing) => e._id === housingId);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % housing?.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? housing?.images.length - 1 : prevIndex - 1
    );
  };

  if (!housing) {
    return <Typography variant="h5">No available housing</Typography>;
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
  };

  const scrollableSectionStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'scroll',
    height: '100vh', // Adjust the height as needed
  };

  const contactCardStyle: React.CSSProperties = {
    width: '300px', // Adjust the width as needed
    height: '30vh', // Adjust the height as needed
    overflowY: 'auto',
    border: '1px solid #ccc', // Add border style
    borderRadius: '8px', // Optional: Add border radius for rounded corners
    padding: '16px', // Optional: Add padding for content
    display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center items horizontally
  justifyContent: 'center', // Center items vertically

  };
  

  return (
    
    <Paper sx={{ padding: 2 }}>
      
      <div style={{ position: "relative" }}>
        <img
          src={housing.images[currentImageIndex]}
          alt={housing.title}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
        {housing.images.length > 1 && (
          <>
            <IconButton
              style={{
                position: "absolute",
                top: "50%",
                left: "5px",
                zIndex: 1,
                color: "white", // Set color to white
                fontSize: "1.5vh", // Set font size
              }}
              onClick={handlePrevImage}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              style={{
                position: "absolute",
                top: "50%",
                right: "5px",
                zIndex: 1,
                color: "white", // Set color to white
                fontSize: "32px", // Set font size
              }}
              onClick={handleNextImage}
            >
              <ArrowForwardIcon />
            </IconButton>
          </>
        )}
      </div>
      <div style={containerStyle}>
        <div style={scrollableSectionStyle}>
          {/* Add your scrollable content here */}
          <Typography variant="h1">{housing.title}</Typography>
          <Typography variant="h3" color="text.secondary">
            <PlaceIcon /> {housing.location}
          </Typography>
          <Typography variant="body1">{housing.description}</Typography>
          <Typography variant="h4">Amenities</Typography>
          <Typography variant="body1">{housing.amenities1}</Typography>
          <Typography variant="body1">{housing.amenities2}</Typography>
          <Typography variant="body1">{housing.amenities3}</Typography>
          <Typography variant="body1">{housing.amenities4}</Typography>
          <Typography variant="body1">{housing.amenities4}</Typography>
        </div>
        <div style={contactCardStyle as React.CSSProperties}>
  {/* Add your contact card content here */}
  <h2>Contact This Property</h2>
  {/* Add more contact details here */}
  <div>
    <Button
      variant="contained"
      onClick={() => {
        /* logic to send email to the owner */
      }}
    >
      Email
    </Button>
  </div>
  
</div>
      </div>
    </Paper>
  );
};

export default HousingDetailsPage;
