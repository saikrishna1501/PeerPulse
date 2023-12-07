import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import BlogPost from "../../components/Blogs/BlogCard";
import Filters from "../../components/BlogsFilter/Filters";
import Rightbar from "../../components/BlogsFilter/Rightbar";

const BlogsPage = (props: any) => {
  // Initial state with at least two blog objects
  const [blogs, setBlogs] = useState([
    {
      id: "1",
      title: "Introduction to React18",
      content: "Lorem ipsum dolor sit, amet consectetur...",
      createdAt: new Date(),
      tag: ["React", "Web Development"],
      author: {
        id: "author1",
        name: "John Doe",
        avatarUrl: "url_to_avatar",
      },
    },
    {
      id: "2",
      title: "Getting Started with MUI5",
      content: "Lorem ipsum dolor sit, amet consectetur...",
      createdAt: new Date(),
      tag: ["Material-UI", "React"],
      author: {
        id: "author2",
        name: "Jane Doe",
        avatarUrl: "url_to_avatar",
      },
    },
  ]);

  return (
    <Container>
      <Stack
        direction="row"
        spacing={2}
        marginTop={50}
        justifyContent="space-between"
      >
        <BlogPost />
        <Filters />
      </Stack>
    </Container>
  );
};

export default BlogsPage;
