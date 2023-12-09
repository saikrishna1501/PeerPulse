import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import BlogList from "../../components/Blogs/BlogList";
import Filters from "../../components/BlogsFilter/Filters";
import Rightbar from "../../components/BlogsFilter/Rightbar";
import { BlogHeader } from "../../components/Blogs/BlogHeader";
import Blog from "../../models/blogs";
import { useDispatch } from "react-redux";
import { loadBlogs } from "../../store/blogs";
import { useSelector } from "react-redux";
import EditNoteIcon from "@mui/icons-material/EditNote";
const BlogsPage = (props: any) => {
  const dispatch = useDispatch();

  // Initial state with at least two blog objects
  const blogs = useSelector((state: any) => state.entities.blogs.list);

  useEffect(() => {
    dispatch(loadBlogs());
  }, []);

  return (
    <>
      <BlogHeader />
      <Container>
        <Stack
          direction="row"
          spacing={2}
          marginTop={5}
          justifyContent="space-between"
        >
          <BlogList blogs={blogs} />
          <Stack direction="column" spacing={5}>
            <Button
              variant="contained"
              sx={{
                fontWeight: "bold",
                borderRadius: "25px",
                height: "50px",
                width: "180px",
                position: "sticky",
                top: 100,
              }}
            >
              <EditNoteIcon />
              <Typography
                sx={{
                  marginLeft: 1,
                  fontSize: "17px",
                  fontWeight: "bold",
                }}
              >
                Write
              </Typography>
            </Button>
            <Filters />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default BlogsPage;
