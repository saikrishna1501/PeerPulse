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
  Typography,
  Stack,
  Button,
} from "@mui/material";
import theme from "../../theme/theme";

interface Props {
  onFilterChange?: (filtername: string, value: boolean) => void;
}
const Filters = ({ onFilterChange }: Props) => {
  const [pastWeek, setPastWeek] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);

  // Handler
  const handleResetFilters = () => {
    setResetFilters(!resetFilters);
    onFilterChange!("ResetFilters", !resetFilters);
  };

  const handlePastWeekChange = () => {
    setPastWeek(!pastWeek);
    onFilterChange!("Last7Days", !pastWeek);
  };

  // Define filterOptions array
  const filterOptions = [
    {
      label: "Last 7 Days",
      onChange: handlePastWeekChange,
      checked: pastWeek,
    },
    {
      label: "Reset",
      onChange: handleResetFilters,
      checked: resetFilters,
    },
  ];

  return (
    <List sx={{ position: "sticky", top: 180 }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          paddingBottom: "10px",
          marginBottom: "10px",
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
              width: "100px",
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
