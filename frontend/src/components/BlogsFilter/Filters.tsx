import React, { useState } from "react";
import FilterIcon from "@mui/icons-material/Filter";
import {
  List,
  Button, // Import Button from @mui/material
  Typography,
  Stack,
} from "@mui/material";

interface Props {
  onFilterChange?: (filtername: string, value: boolean) => void;
}

const Filters = ({ onFilterChange }: Props) => {
  const [pastWeek, setPastWeek] = useState(false);
  const [postUpvotes, setPostUpvotes] = useState(false);
  const [sortByTitle, setSortByTitle] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);

  const handlePastWeekChange = () => {
    setPastWeek(!pastWeek);
    onFilterChange!("Last7Days", !pastWeek);
  };

  const handlePostUpvotesChange = () => {
    setPostUpvotes(!postUpvotes);
    onFilterChange!("PostGreaterThan10upvotes", !postUpvotes);

    // Perform any additional actions when Post > 10 upvotes changes
  };

  const handleSortByTitle = () => {
    setSortByTitle(!sortByTitle);
    onFilterChange!("Last7Days", !sortByTitle);
  };

  const handleResetFilters = () => {
    setResetFilters(!resetFilters);
    onFilterChange!("ResetFilters", !resetFilters);
  };

  // Define filterOptions array
  const filterOptions = [
    {
      label: "Last 7 Days",
      onChange: handlePastWeekChange,
      checked: pastWeek,
    },
    {
      label: "Post > 10 Upvotes",
      onChange: handlePostUpvotesChange,
      checked: postUpvotes,
    },
    {
      label: "Sort By Title",
      onChange: handleSortByTitle,
      checked: sortByTitle,
    },
    {
      label: "Reset",
      onChange: handleResetFilters,
      checked: sortByTitle,
    },
  ];

  return (
    <List sx={{ position: "sticky", top: 180 }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          paddingBottom: "10px",
          borderBottom: "1px solid #F2F2F2",
        }}
      >
        Search Criteria
      </Typography>

      <Stack direction="column" spacing={1}>
        {filterOptions.map((option) => (
          <Button
            onClick={option.onChange}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "10px",
              color: "black",
            }}
            color="primary"
          >
            {option.label}
          </Button>
        ))}
      </Stack>
    </List>
  );
};

export default Filters;
