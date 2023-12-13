import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Alert,
  Snackbar,
  Autocomplete,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog, updateBlog } from "../../store/blogs";
import { useNavigate } from "react-router-dom";
import Blog from "../../models/blogs";
import { options } from "./Tags";

interface Props {
  blog?: Blog;
}

const BlogForm = ({ blog }: Props) => {
  // Alert Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Store Config
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const author = useSelector((state: any) => state.auth.user._id);
  const containerRef = useRef(null);

  // Quill Config
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  // Form Config
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onSubmit = () => {
    const blogData = {
      title: titleContent,
      content: editorContent,
      author,
      tag: selectedTags,
    };

    if (blog) {
      dispatch(updateBlog(blog?._id, blogData));
    } else {
      dispatch(createNewBlog(blogData));
    }

    // Open the success dialog
    handleClickOpenDialog();
  };

  const editorContent = watch("content");
  const titleContent = watch("title");

  const onEditorStateChange = (editorState: any) => {
    console.log("EditorState" + editorState);
    setValue("content", editorState);
  };

  const onTitleStateChange = (titleState: any) => {
    setValue("title", titleState.target.value);
  };

  useEffect(() => {
    register("title", { required: true });
    register("content", { required: true });
    if (blog) {
      setValue("title", blog.title || "");
      setValue("content", blog.content || "");
      setSelectedTags(blog.tag || []);
    }
  }, [register, blog]);

  return (
    <Container maxWidth="lg" className="container" ref={containerRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={titleContent}
          onChange={onTitleStateChange}
        />
        {errors.title && <Alert severity="error">{"Enter valid title"}</Alert>}

        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={onEditorStateChange}
          placeholder="Write something amazing..."
          className="ql-editor"
          modules={modules}
          formats={formats}
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            height: "700px",
            border: "none",
          }}
        />
        {errors.content && (
          <Alert severity="error">{"Enter valid content"}</Alert>
        )}

        <Autocomplete
          multiple
          id="tags"
          options={options}
          value={selectedTags}
          onChange={(_, newValue) => setSelectedTags(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Tags" placeholder="Select Tags" />
          )}
        />

        <Button
          sx={{ marginTop: "20px" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      {/* Success Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            sx={{ fontSize: "18px" }}
            id="alert-dialog-description"
          >
            Blog submitted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog();
              navigate("/blogs");
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogForm;
