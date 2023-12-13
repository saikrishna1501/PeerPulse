import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import Blog from "../../models/blogs";
import { useNavigate } from "react-router-dom";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { deleteBlogById } from "../../store/blogs";
import User from "../../models/users";

interface Props {
  blog: Blog;
  author: User;
}

const BlogCard = ({ blog, author }: Props) => {
  const dispatch = useDispatch();

  const stripHtmlTags = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Remove img tags
    const imgTags = doc.body.querySelectorAll("img");
    imgTags.forEach((img) => img.remove());

    return doc.body.textContent?.slice(0, 150) || "";
  };

  const loggedIn = useSelector((state: any) => state.auth.user);

  const navigate = useNavigate();
  const handleCardClick = () => {
    // Navigate to /blogs/:id when the CardContent is clicked
    navigate(`/blogs/${blog!._id}`);
  };

  const isAuthor = (blog: any) => {
    console.log("User Id ", loggedIn._id);
    console.log("Blog Author ", blog.author);

    return loggedIn._id == blog.author;
  };

  const deleteBlog = (blog: any) => {
    const input = window.confirm(
      "Are you sure you want to delete this blog permanently?"
    );

    if (input) {
      dispatch(deleteBlogById(blog._id));
    }

    // navigate("/blogs");
  };

  const updateBlog = (blog: any) => {
    navigate(`/blogs/${blog._id}/edit`);
  };

  return (
    <>
      <Card
        sx={{
          borderBottom: "1px solid #F2F2F2",
          paddingBottom: "20px",
          marginBottom: "40px",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
        }}
      >
        <CardHeader
          sx={{ padding: "0px", marginBottom: "15px" }}
          avatar={
            <>
              <Avatar
                alt="Author Avatar"
                src={author.profilePic}
                sx={{ width: 26, height: 26 }}
              />
              <Typography
                variant="h5"
                fontWeight="500"
                sx={{ padding: "0px", marginLeft: 1, color: "#242424" }}
              >
                {author.firstName + " " + author.lastName || "Raveena"}
              </Typography>
            </>
          }
        />

        <CardContent sx={{ padding: "0px" }}>
          <Stack direction={"row"} sx={{ alignItems: "center" }}>
            <Typography
              sx={{
                marginBottom: "10px",
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline", // Add your desired hover effect
                },
              }}
              variant="h3"
              fontWeight="bold"
              onClick={handleCardClick}
            >
              {blog.title}
            </Typography>
            {isAuthor(blog) && (
              <>
                <RemoveCircleIcon
                  sx={{ marginLeft: "10px" }}
                  onClick={() => deleteBlog(blog)}
                />
                <EditIcon
                  sx={{ marginLeft: "10px" }}
                  onClick={() => updateBlog(blog)}
                />
              </>
            )}
          </Stack>

          <Typography
            sx={{ marginBottom: "10px", fontSize: "20px" }}
            variant="inherit"
            color="text.secondary"
          >
            {blog.content && blog.content.length > 150
              ? `${stripHtmlTags(blog.content)}...`
              : stripHtmlTags(blog.content)}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Typography sx={{ fontSize: "15px", marginRight: "2px" }}>
            {new Date(blog!.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </Typography>
          <Box /> {/* Added Box with flexGrow to push the Chip to the right */}
          <Stack direction="row" spacing={1}>
            {blog.tag?.map((t) => (
              <Chip label={t} />
            ))}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default BlogCard;
