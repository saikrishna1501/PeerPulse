import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Blog from "../models/blogs";

const slice = createSlice({
  name: 'blogs',
  initialState: {
    list: [] as Blog[],
    loading: false,
    lastFetch: null as number | null,
  },
  reducers: {
    blogsRequested: (blogs) => {
      blogs.loading = true;
    },
    blogsReceived: (blogs, action: PayloadAction<Blog[]>) => {
      blogs.list = action.payload;
      blogs.loading = false;
      blogs.lastFetch = Date.now();
    },
    blogsRequestFailed: (blogs) => {
      blogs.loading = false;
    },
    blogAdded: (blogs, action: PayloadAction<Blog>) => {
      blogs.list.push(action.payload);
    },
    blogUpdated: (blogs, action: PayloadAction<Blog>) => {
      const updatedBlog = action.payload;
      const index = blogs.list.findIndex(blog => blog.id === updatedBlog.id);

      if (index !== -1) {
        // Update the blog if found
        blogs.list[index] = updatedBlog;
      }
    },
    blogDeleted: (blogs, action: PayloadAction<string>) => {
        const blogIdToDelete = action.payload;
        blogs.list = blogs.list.filter(blog => {
          // Check if both ids exist and are equal
          if (blog.id && blogIdToDelete && blog.id.toString() === blogIdToDelete) {
            return false; // Exclude the blog with the matching id
          }
          return true; // Include other blogs
        });
      },
  },
});

export const { blogsRequested, blogsReceived, blogsRequestFailed, blogAdded, blogUpdated, blogDeleted } = slice.actions;
export default slice.reducer;
