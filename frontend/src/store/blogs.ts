import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Blog from "../models/blogs";
import { apiCallBegan, apiCallFailure } from './api';

const slice = createSlice({
  name: 'blogs',
  initialState: {
    list:  [] as Blog[],
    loading: false,
    lastFetch: null as number | null,
  },

  reducers: {
    blogsRequested: (blogs) => {
      blogs.loading = true;
    },
    blogsReceived: (blogs, action: any) => {
      blogs.list = action.payload;
      blogs.loading = false;
      blogs.lastFetch = Date.now();
    },
    blogsRequestFailed: (blogs) => {
      blogs.loading = false;
    },
    blogAdded: (blogs, action: PayloadAction<Blog>) => {
      const newBlog = action.payload;
    
      // Check if the blog with the same ID already exists in the list
      const existingBlogIndex = blogs.list.findIndex(blog => blog._id === newBlog._id);
    
      if (existingBlogIndex === -1) {
        // If not, add the new blog to the list
        blogs.list.push(newBlog);
      } else {
        // If it exists, update the existing blog with the new data
        blogs.list[existingBlogIndex] = newBlog;
      }
    },
    
    blogUpdated: (blogs, action: PayloadAction<Blog>) => {
      const updatedBlog = action.payload;
      const index = blogs.list.findIndex(blog => blog._id === updatedBlog._id);

      if (index !== -1) {
        // Update the blog if found
        blogs.list[index] = updatedBlog;
      }
    },
    blogDeleted: (blogs, action: PayloadAction<string>) => {
        const blogIdToDelete = action.payload;
        blogs.list = blogs.list.filter(blog => {
          // Check if both ids exist and are equal
          if (blog._id && blogIdToDelete && blog._id.toString() === blogIdToDelete) {
            return false; // Exclude the blog with the matching id
          }
          return true; // Include other blogs
        });
      },
  },
});

export const loadBlogs = () =>({
  type : apiCallBegan.type,
  payload : {
    url : '/blogs',
    method : 'get',
    onSuccess : blogsReceived.type, //helps dispatch another action 
    onError : apiCallFailure
  }
});

export const loadBlogById = (id: any) => ({
  type: apiCallBegan.type,
  payload: {
    url: `/blogs/${id}`,
    method: "get",
  },
  onSuccess: blogAdded.type,
  onError: apiCallFailure
})


export const createNewBlog = (data: Partial<Blog>) => ({
  type : apiCallBegan.type,
  payload : {
    url : '/blogs',
    method : 'post',
    data,
    onSuccess : blogAdded.type,
    onError : apiCallFailure
  }
});

export const updateBlog = (id:any, data: Partial<Blog>) => ({
  type: apiCallBegan.type,
  payload :{
    url : `/blogs/${id}`,
    method: "put",
    data,
    onSuccess: blogUpdated.type,
    onError: apiCallFailure
  }
})

export const deleteBlogById = (id: any) => ({
  type : apiCallBegan.type,
  payload : {
    url : `/blogs/${id}`,
    method : 'delete',
    data: id,
    onSuccess : blogDeleted.type,
    onError : apiCallFailure
  }
});


export const { blogsRequested, blogsReceived, blogsRequestFailed, blogAdded, blogUpdated, blogDeleted } = slice.actions;
export default slice.reducer;
