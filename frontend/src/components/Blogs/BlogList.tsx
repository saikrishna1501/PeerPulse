import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BlogCard from "./BlogCard";
import Blog from "../../models/blogs";
import User from "../../models/users";

interface Props {
  blogs: Blog[];
  users: User[];
}

const findUser = (id: any, users: User[]) => {
  const placeholderUser = {
    firstName: "Raveena",
    lastName: "Ing",
    profilePic: "",
  } as User;
  const user = users.find((user) => user._id === id);
  return user || placeholderUser;
};

const getThisWeek = () => {
  const currentDate = new Date();
  const firstDayOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())
  );
  return firstDayOfWeek.toISOString();
};

const getThisMonth = () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  return firstDayOfMonth.toISOString();
};

const getLastMonth = () => {
  const currentDate = new Date();
  const firstDayOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  return firstDayOfLastMonth.toISOString();
};

const BlogList: React.FC<Props> = ({ blogs, users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const titleMatch = blog.title.toLowerCase().includes(lowercasedSearchTerm);
    const tagMatch = blog?.tag?.some((tag) =>
      tag.toLowerCase().includes(lowercasedSearchTerm)
    );
    const createdAt = new Date(blog.createdAt);

    if (selectedFilter === "thisWeek") {
      const thisWeekStart = new Date(getThisWeek());
      return (titleMatch || tagMatch) && createdAt >= thisWeekStart;
    } else if (selectedFilter === "thisMonth") {
      const thisMonthStart = new Date(getThisMonth());
      return (titleMatch || tagMatch) && createdAt >= thisMonthStart;
    } else if (selectedFilter === "lastMonth") {
      const lastMonthStart = new Date(getLastMonth());
      const thisMonthStart = new Date(getThisMonth());
      return (
        (titleMatch || tagMatch) &&
        createdAt >= lastMonthStart &&
        createdAt < thisMonthStart
      );
    }

    return titleMatch || tagMatch;
  });

  return (
    <Box flex={4} p={2}>
      <Stack direction="row" spacing={20}>
        <TextField
          onChange={handleSearch}
          id="standard-basic"
          variant="standard"
          placeholder="Search Blogs"
          sx={{ paddingBottom: "20px", width: "400px", padding: "20px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
          <Grid sx={{ marginRight: "10px" }}>
            <Button
              sx={{
                backgroundColor:
                  selectedFilter === "thisWeek"
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.08)",
                width: "100px",
                borderRadius: "10px",
                color: "black",
              }}
              color="primary"
              onClick={() => handleFilterClick("thisWeek")}
            >
              This week
            </Button>
          </Grid>
          <Grid>
            <Button
              sx={{
                backgroundColor:
                  selectedFilter === "lastMonth"
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.08)",
                width: "100px",
                borderRadius: "10px",
                color: "black",
              }}
              color="primary"
              onClick={() => handleFilterClick("lastMonth")}
            >
              Last month
            </Button>
          </Grid>
        </Stack>
      </Stack>
      <br />
      {filteredBlogs.map((blog) => (
        <BlogCard blog={blog} author={findUser(blog.author, users)} />
      ))}
    </Box>
  );
};

export default BlogList;
