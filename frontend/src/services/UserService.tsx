import axios from "axios";
import { ObjectId } from "bson";

export const fetchUserById = async (userId: string | ObjectId | undefined) => {
  const userDetails = await axios.get(`http://localhost:5000/users/${userId}`, {
    withCredentials: true,
  });
  return userDetails.data;
};
