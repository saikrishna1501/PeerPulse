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
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers, loadUsers } from "../../store/users";
import CommentCard from "../Comments/CommentCard";
import CommentInput from "../Comments/CommentInput";
import { textAlign } from "@mui/system";
import CommentsContainer from "../Comments/CommentsContainer";
import { useRef } from "react";

interface Props {
  blog: Blog;
}

const ViewBlogDetails = ({ blog }: Props) => {
  const dispatch = useDispatch();

  const users = useSelector((state: any) => state.entities.users.list);

  const user = users.find((user: any) => user._id == blog.author);

  const handleUpvote = () => {
    // Add your upvote logic here
    console.log("Upvoted!");
  };

  const handleDownvote = () => {
    // Add your downvote logic here
    console.log("Downvoted!");
  };

  useEffect(() => {
    // Dispatch the action when the id changes
    dispatch(getAllUsers());
  }, []);
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
                  <Chip label={t} />
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
            <ThumbUpIcon sx={{ color: "rgb(117, 117, 117)" }} />
          </IconButton>
          <Typography sx={{ textAlign: "center" }}>{blog.upvotes}</Typography>
          <IconButton onClick={handleDownvote}>
            <ThumbDownIcon sx={{ color: "rgb(117, 117, 117)" }} />
          </IconButton>
          <Typography>{blog.downvotes}</Typography>
          <IconButton onClick={handleComment}>
            <ChatBubbleOutlineIcon sx={{ color: "rgb(117, 117, 117)" }} />
          </IconButton>
          <Typography>{blog.comments!.length}</Typography>
          <IconButton onClick={handleDownvote} sx={{ marginLeft: "600px" }}>
            <MoreHorizIcon sx={{ color: "rgb(117, 117, 117)" }} />
          </IconButton>
        </Box>
        <Divider
          sx={{ width: "100%", my: 2, opacity: 0.5, marginTop: "8px" }}
        />
        <ReactQuill
          value={blog.content}
          readOnly={true} // Make the editor read-only
          theme="bubble" // or use another theme
        />
        <ReactQuill
          value={blog.content}
          readOnly={true} // Make the editor read-only
          theme="bubble" // or use another theme
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
