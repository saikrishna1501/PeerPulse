import { Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";

type props = {
    onPageChange: (clickedPage: number) => void,
    currentPage: number,
    noOfPages: number
} 

const PaginationContainer = ({onPageChange, currentPage, noOfPages}: props) => {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    }

    return (
        <Stack spacing={2}>
          <Pagination count={noOfPages} page={currentPage} onChange={handleChange} />
        </Stack>
    );
}

export default PaginationContainer;