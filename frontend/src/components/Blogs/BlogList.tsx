import { Box } from "@mui/material";
import BlogCard from "./BlogCard";
import Blog from "../../models/blogs";

interface Props {
  blogs: Blog[];
}
const BlogList = ({ blogs }: Props) => {
  return (
    <>
      <Box flex={4} p={2}>
        {blogs.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </Box>
    </>
  );
};

export default BlogList;
