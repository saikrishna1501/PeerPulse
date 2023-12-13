import { useParams } from "react-router-dom";
import BlogForm from "../BlogFormPage/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadBlogById } from "../../store/blogs";

export const BlogUpdate = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // Fetch the list of blogs from the store
  const blogs = useSelector((state: any) => state.entities.blogs.list);

  // Find the specific blog with the given id
  const blog = blogs.find((blog: any) => blog._id == id);

  useEffect(() => {
    // Dispatch the action when the id changes
    dispatch(loadBlogById(id));
    console.log("Blog", blog);
  }, [id, dispatch]); // Add id and dispatch to the dependency array
  return (
    <>
      <div>
        <BlogForm blog={blog} />
      </div>
    </>
  );
};
