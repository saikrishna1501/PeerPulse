import { useParams } from "react-router-dom";
import { loadBlogById } from "../../store/blogs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch the list of blogs from the store
  const blogs = useSelector((state: any) => state.entities.blogs.list.data);

  // Find the specific blog with the given id
  const blog = blogs.find((blog: any) => blog._id == id);

  useEffect(() => {
    // Dispatch the action when the id changes
    dispatch(loadBlogById(id));
    console.log("Blog", blog);
  }, [id, dispatch]); // Add id and dispatch to the dependency array

  return (
    <>
      <div>Blog View</div>
      <p>Blog ID: {id}</p>
      {blog.title}
      {blog.content}
    </>
  );
};

export default BlogView;
