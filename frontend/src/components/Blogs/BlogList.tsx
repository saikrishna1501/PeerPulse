import { Box } from "@mui/material";
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
  const user = users.find((user) => user._id == id);
  return user ? user : placeholderUser;
};

const BlogList = ({ blogs, users }: Props) => {
  return (
    <>
      <Box flex={4} p={2}>
        {blogs.map((blog) => (
          <BlogCard blog={blog} author={findUser(blog.author, users)} />
        ))}
      </Box>
    </>
  );
};

export default BlogList;
