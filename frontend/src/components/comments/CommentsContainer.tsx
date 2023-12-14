import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";
import Blog from "../../models/blogs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Comment from "../../models/comments";
import {
  deleteComment,
  editComment,
  loadComments,
  postComment,
} from "../../services/CommentsService";
import { fetchUserById } from "../../services/UserService";
import { ObjectId } from "bson";
import {
  addACommentToBlog,
  blogUpdated,
  removeACommentFromBlog,
} from "../../store/blogs";
import { toast } from "react-toastify";

const commentContainer = {
  marginLeft: 6,
  marginRight: 6,
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
};

const mainContainer = {
  textAlign: "left",
};

interface Props {
  blog: Blog;
}

const CommentsContainer = ({ blog }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  // const comments = useSelector((state: any) => state.entities.comments.list)
  const [commentsList, setCommentsList] = useState<any>([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await loadComments(blog._id);

        // Check if the response status is 403 (Forbidden)
        // if (response.status === 403) {
        //   // Do nothing or handle the case as needed
        //   console.error("Forbidden: Unable to fetch comments.");
        //   return;
        // }

        const fetchedComments: Comment[] = await response;

        // Use map and Promise.all to fetch user details for each comment
        const commentsList = await Promise.all(
          fetchedComments.map(async (comment: Comment) => {
            const author = await fetchUserById(comment.author);
            return {
              ...comment,
              authorName: author.firstName + " " + author.lastName,
              avatarUrl: author.profilePic,
            };
          })
        );

        setCommentsList(commentsList);
      } catch (error) {
        console.error("Error fetching comments:", error);
        // Handle other errors if needed
      }
    };

    fetchComments();
  }, []);

  const onCommentPost = async (content: string) => {
    const response = await postComment(blog._id, {
      comment: content,
      author: user._id,
      blog: blog._id,
    });
    if (response) {
      setCommentsList([
        ...commentsList,
        {
          ...response,
          authorName: user.firstName + " " + user.lastName,
          avatarUrl: user.profilePic,
        },
      ]);
      dispatch(
        addACommentToBlog({
          blogId: blog._id,
          comment: {
            _id: response._id,
            comment: response.comment,
            author: response.author,
            blog: response.blog,
          },
        })
      );
    }
  };

  const onCommentEdit = async (
    content: string,
    commentId: string | ObjectId | undefined
  ) => {
    const response = await editComment(blog._id, commentId, {
      comment: content,
    });
    if (response) {
      setCommentsList(
        commentsList.map((comment: any) => {
          if (comment._id === commentId) {
            return { ...comment, comment: content };
          } else {
            return comment;
          }
        })
      );
    }
  };

  const onCommentDelete = async (commentId: string | ObjectId | undefined) => {
    const response = await deleteComment(blog._id, commentId);
    dispatch(removeACommentFromBlog({ blogId: blog._id, commentId }));
    if (response) {
      setCommentsList(
        commentsList.filter((comment: any) => comment._id !== commentId)
      );
    }
  };

  const renderedComments = commentsList.map((comment: any) => {
    const onCommentDelete = async (
      commentId: string | ObjectId | undefined
    ) => {
      const response = await deleteComment(blog._id, commentId);
      dispatch(removeACommentFromBlog({ blogId: blog._id, commentId }));
      if (response) {
        setCommentsList(
          commentsList.filter((comment: any) => comment._id !== commentId)
        );
      }
      toast.error("Deleted Comment Successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    };

    const renderedComments = commentsList.map((comment: any) => {
      return (
        <Box sx={commentContainer}>
          <CommentCard
            key={comment._id}
            authorName={comment.authorName}
            authorId={comment.author}
            commentId={comment._id}
            content={comment.comment}
            avatarUrl={comment.avatarUrl}
            onCommentEdit={onCommentEdit}
            onCommentDelete={onCommentDelete}
          />
        </Box>
      );
    });

    return (
      <Box sx={commentContainer}>
        <CommentCard
          key={comment._id}
          authorName={comment.authorName}
          authorId={comment.author}
          commentId={comment._id}
          content={comment.comment}
          avatarUrl={comment.avatarUrl}
          onCommentEdit={onCommentEdit}
          onCommentDelete={onCommentDelete}
        />
      </Box>
    );
  });

  return (
    <Box sx={mainContainer}>
      <div id="my-child-component"></div>
      <Box>
        <Box sx={{ ...commentContainer, border: 0 }}>
          <Typography
            mb={2}
            variant="h3"
            style={{ textAlign: "left", fontWeight: 600 }}
          >
            Responses ({blog.comments?.length})
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box sx={{ ...commentContainer, border: 0 }}>
          <CommentInput
            authorName={user.firstName + " " + user.lastName}
            avatarUrl={user.profilePic}
            onCommentPost={onCommentPost}
          />
        </Box>
      </Box>

      <Box>{renderedComments}</Box>
    </Box>
  );
};

export default CommentsContainer;
