import axios from "axios";
import { ObjectId } from "bson";

export const loadComments = async (blogId: string | ObjectId | undefined) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/blogs/${blogId}/comments`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postComment = async (
  blogId: string | ObjectId | undefined,
  data: { comment: string; author: string; blog: string | ObjectId | undefined }
): Promise<any> => {
  try {
    const response: any = await axios.post(
      `http://localhost:5000/blogs/${blogId}/comments/`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editComment = async (
  blogId: string | ObjectId | undefined,
  commentId: string | ObjectId | undefined,
  data: { comment: string }
) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/blogs/${blogId}/comments/${commentId}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (
  blogId: string | ObjectId | undefined,
  commentId: string | ObjectId | undefined
) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/blogs/${blogId}/comments/${commentId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
