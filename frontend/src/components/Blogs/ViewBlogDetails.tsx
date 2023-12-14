import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Container,
  Avatar,
  CardHeader,
  Stack,
  Divider,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import Blog from "../../models/blogs";
import ReactQuill from "react-quill";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { getAllUsers } from "../../store/users";
import CommentsContainer from "../comments/CommentsContainer";
import _ from "lodash";
import { loadBlogs, upvoteBlog } from "../../store/blogs";

interface Props {
  blog: Blog;
}

const ViewBlogDetails = ({ blog }: Props) => {
  const dispatch = useDispatch();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvote, setUpvote] = useState(blog ? blog.upvotes.count : 0);

  const users = useSelector((state: any) => state.entities.users.list);
  const user = users && users.find((user: any) => user._id == blog.author);
  const loggedIn = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (!blog) dispatch(loadBlogs());
  }, []);

  useEffect(() => {
    // Set initial upvote state
    setIsUpvoted(
      blog.upvotes.count > 0 && blog.upvotes.users.includes(loggedIn._id)
    );

    // Dispatch the action when the id changes
    dispatch(getAllUsers());
  }, [dispatch, blog.upvotes.count, blog.upvotes.users, loggedIn._id]);

  const handleUpvote = _.debounce(() => {
    const action = upvoteBlog(blog._id, loggedIn._id);
    dispatch(action);

    // Update upvote state
    setIsUpvoted(!isUpvoted);
    // Update upvote count
    setUpvote(isUpvoted ? upvote - 1 : upvote + 1);
  }, 1000);

  const handleComment = () => {
    const childElement = document.getElementById("my-child-component");
    if (childElement) {
      childElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Stack spacing={2} sx={{ width: "100%", margin: "80px" }}>
        <Typography
          sx={{
            marginTop: "80px",
            fontWeight: "800",
            fontSize: "60px",
            textAlign: "left",
          }}
        >
          {blog.title}
        </Typography>
        <CardHeader
          className="view-blog-author-header"
          avatar={
            <>
              <Avatar
                alt="Author Avatar"
                src={(user && user.profilePic) || ""}
                sx={{ width: 36, height: 36 }}
              />
              <Stack>
                <Typography
                  sx={{
                    fontSize: "18px",
                    padding: "0px",
                    marginLeft: "15px",
                    color: "#242424",
                  }}
                >
                  {(user && user.firstName + " " + user.lastName) || "Raveena"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgb(117, 117, 117)",
                    padding: "0px",
                    marginLeft: "15px",
                  }}
                >
                  {new Date(blog!.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ paddingLeft: "20px", ml: "auto", textAlign: "center" }}
              >
                {blog.tag?.map((t) => (
                  <Chip label={t} key={t} />
                ))}
              </Stack>
            </>
          }
        />
        <Divider
          sx={{ width: "100%", my: 2, opacity: 0.5, marginTop: "8px" }}
        />
        <Box
          sx={{
            display: "inline-flex",
            textAlign: "center",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <IconButton onClick={handleUpvote}>
            <ThumbUpIcon
              sx={{
                color: isUpvoted ? "primary.main" : "rgb(117, 117, 117)",
              }}
            />
          </IconButton>

          <Typography sx={{ textAlign: "center" }}>{upvote}</Typography>
          <IconButton onClick={handleComment}>
            <ChatBubbleOutlineIcon sx={{ color: "rgb(117, 117, 117)" }} />
          </IconButton>
          <Typography>{blog.comments!.length}</Typography>
        </Box>

        <Divider
          sx={{ width: "100%", my: 2, opacity: 0.5, marginTop: "8px" }}
        />

        <ReactQuill
          value={blog.content}
          readOnly={true} // Make the editor read-only
          theme="bubble" // or use another theme
        />

        <CommentsContainer blog={blog} />
      </Stack>
    </Container>
  );
};

export default ViewBlogDetails;
