import React, { useState } from "react";
import {
  Box,
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

const BlogList: React.FC<Props> = ({ blogs, users }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box flex={4} p={2}>
      <Stack>
        <TextField
          onChange={handleSearch}
          id="standard-basic"
          variant="standard"
          placeholder="Search Blogs"
          sx={{ paddingBottom: "20px", width: "700px", padding: "20px" }}
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
      </Stack>
      <br />
      {filteredBlogs.map((blog) => (
        <BlogCard blog={blog} author={findUser(blog.author, users)} />
      ))}
    </Box>
  );
};

export default BlogList;
