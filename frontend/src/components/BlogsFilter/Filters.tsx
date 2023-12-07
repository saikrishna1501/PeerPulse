import React, { useState } from "react";
import FilterIcon from "@mui/icons-material/Filter";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import theme from "../../theme/theme";

const Filters = () => {
  const [pastWeek, setPastWeek] = useState(false);
  const [pastMonth, setPastMonth] = useState(false);
  const [postUpvotes, setPostUpvotes] = useState(false);

  const handlePastWeekChange = () => {
    setPastWeek(!pastWeek);
    // Perform any additional actions when Past 1 week changes
  };

  const handlePastMonthChange = () => {
    setPastMonth(!pastMonth);
    // Perform any additional actions when Past 1 month changes
  };

  const handlePostUpvotesChange = () => {
    setPostUpvotes(!postUpvotes);
    // Perform any additional actions when Post > 10 upvotes changes
  };

  return (
    <Card
      sx={{
        flex: 1.5,
        textAlign: "center",
        height: "300px",
        display: { xs: "none", sm: "block" },
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow for a subtle effect
        borderRadius: theme.shape.borderRadius * 2, // Rounded corners
        backgroundColor: "#f0f0f0", // Grey background color
        transition: "transform 0.3s ease-in-out", // Smooth transition effect
        "&:hover": {
          transform: "scale(1.05)", // Scale up on hover
        },
      }}
    >
      <CardContent>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <FilterIcon sx={{ width: 30, height: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Filters" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handlePastWeekChange}>
              <Checkbox checked={pastWeek} />
              <ListItemText
                primary="Past 1 week"
                sx={{
                  fontSize: "1.5rem",
                  fontFamily: theme.typography.fontFamily,
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handlePastMonthChange}>
              <Checkbox checked={pastMonth} color="primary" />
              <ListItemText
                primary="Past 1 month"
                sx={{
                  fontSize: "1.5rem",
                  fontFamily: theme.typography.fontFamily,
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handlePostUpvotesChange}>
              <Checkbox checked={postUpvotes} color="primary" />
              <ListItemText
                primary="Post > 10 upvotes"
                sx={{
                  fontSize: "1.5rem",
                  fontFamily: theme.typography.fontFamily,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Filters;
