import React from "react";
import { Box } from "@mui/material";

const Filters = () => {
  return (
    <Box
      sx={{
        flexGrow: 2,
        textAlign: "center",
        marginTop: "2rem",
        background: "blue",
        display: { xs: "none", sm: "block" },
      }}
    >
      Filters
    </Box>
  );
};

export default Filters;
