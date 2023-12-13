import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Blog from "../models/blogs";
import { apiCallBegan, apiCallFailure } from './api';
import { ObjectId } from "bson";
import Comment from "../models/comments";

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
    blogsReceived: (blogs, action: any) => {
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
      const index = blogs.list.findIndex(blog => blog._id === updatedBlog._id);

      if (index !== -1) {
        // Update the blog if found
        blogs.list[index] = updatedBlog;
      }
    },
    removeACommentFromBlog: (blogs, action: PayloadAction<{blogId: string | ObjectId | undefined, commentId: string | ObjectId | undefined}>) => {
      blogs.list = blogs.list.map((blog: Blog)=> {
        if(blog._id === action.payload.blogId) {
          blog.comments = blog.comments?.filter((comment) => comment._id !== action.payload.commentId)
        }
        return blog;
      })
    },
    addACommentToBlog: (blogs, action: PayloadAction<{blogId: string | ObjectId | undefined, comment: Comment}>) => {
      blogs.list = blogs.list.map((blog: Blog)=> {
        if(blog._id === action.payload.blogId) {
          blog.comments?.push(action.payload.comment);
        }
        return blog;
      })
    },
    blogDeleted: (blogs, action: PayloadAction<string>) => {
        const blogIdToDelete = action.payload;
        blogs.list= blogs.list.filter(blog => {
          // Check if both ids exist and are equal
          if (blog._id && blogIdToDelete && blog._id.toString() === blogIdToDelete) {
            return false; // Exclude the blog with the matching id
          }
          return true; // Include other blogs
        });
      },
  }
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
    dataInStoreCheck: 'entities.blogs.list',
    onSuccess: blogAdded.type,
    onError: apiCallFailure,
  },
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


export const { blogsRequested, blogsReceived, blogsRequestFailed, blogAdded, blogUpdated, blogDeleted, removeACommentFromBlog, addACommentToBlog } = slice.actions;
export default slice.reducer;
