import { Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type props = {
    onPageChange: (clickedPage: number) => void,
    currentPage: number,
    noOfPages: number
} 

const PaginationContainer = ({onPageChange, currentPage, noOfPages}: props) => {
    useEffect(() => {
        if(currentPage > noOfPages) {
            console.log("Use effect executing" + currentPage + noOfPages);
            onPageChange(currentPage - 1);
        }
    }, [noOfPages])
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