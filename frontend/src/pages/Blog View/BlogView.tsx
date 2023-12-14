import { useParams } from "react-router-dom";
import { loadBlogById } from "../../store/blogs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import ViewBlogDetails from "../../components/Blogs/ViewBlogDetails";

const BlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch the list of blogs from the store
  const blogs = useSelector((state: any) => state.entities.blogs.list);

  // Find the specific blog with the given id
  const blog = blogs.find((blog: any) => blog._id == id);

  useEffect(() => {
    // Dispatch the action when the id changes
    dispatch(loadBlogById(id));
  }, []); // Add id and dispatch to the dependency array

  return (
    <>
      <Container maxWidth="md">
        <ViewBlogDetails blog={blog} />
      </Container>
    </>
  );
};

export default BlogView;
