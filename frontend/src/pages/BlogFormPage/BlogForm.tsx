// MyEditor.js
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";

import { Container, TextField, Button, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../../store/blogs";

const BlogForm = () => {
  // Store Config
  const dispatch = useDispatch();
  const author = "6568a18d7bb787e0dadb3081"; //useSelector((state: any) => state.auth.user.id);
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

  const onSubmit = () => {
    dispatch(
      createNewBlog({
        title: titleContent.value,
        content: editorContent,
        author,
      })
    );
  };

  const editorContent = watch("content");
  const titleContent = watch("title");

  const onEditorStateChange = (editorState: any) => {
    setValue("content", editorState);
  };

  const onTitleStateChange = (titleState: any) => {
    setValue("title", titleState.value);
  };

  useEffect(() => {
    register("title", { required: true, minLength: 5 });
    register("content", { required: true, minLength: 5 });
  }, [register]);

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

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default BlogForm;
