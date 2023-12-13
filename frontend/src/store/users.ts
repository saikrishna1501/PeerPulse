import { createSlice } from "@reduxjs/toolkit";
import User from "../models/users";
import { apiCallBegan, apiCallFailure } from "./api";
import axios from "axios";

const slice = createSlice({
    name: 'users',
    initialState: {
        list: [] as User[],
        numberOfPages: 2,
        pageSize: 2
    },
    reducers: {
        usersReceived: (users, action: any) => {
            users.list = action.payload.users
            users.numberOfPages = action.payload.numberOfPages
            users.pageSize = action.payload.pageSize
        },
        userUpdated: (users, action: any) => {
            const updatedUserDetails = action.payload.userDetails;
            const index = users.list.findIndex((user) => user._id === updatedUserDetails._id);
            if(index !== -1) {
                //if users not found
                users.list[index] = updatedUserDetails;
            }
        },
        userDeleted: (users, action: any) => {
            const deletedUserDetails = action.payload.userDetails;
            console.log("At the start of delete, value of users.number of pages", users.numberOfPages);
            users.list = users.list.filter(user => {
                if(user._id && deletedUserDetails._id && user._id === deletedUserDetails._id) {
                    return false;
                }
                return true;
            })
            axios.get(`http://localhost:5000/users/pages?pageSize=${users.pageSize}`, {
                withCredentials: true
            })
            .then((response) =>{
                console.log(response.data)
                users.numberOfPages = response.data.numberOfPages;
            } )
            .catch((error) => {
                console.log(error);
            })
            // users.numberOfPages = Math.ceil(users.list.length / users.pageSize);
            // console.log("At the end of delete, value of users.number of pages", users.numberOfPages);
        }
    }
})

export const getAllUsers = () => ({
    type: apiCallBegan.type,
    payload: {
        url: `/users`,
        method: 'get',
        onSuccess: slice.actions.usersReceived.type,
        onError: apiCallFailure.type
    }
});
export const loadUsers = (pageNumber: number, pageSize: number) => ({
    type: apiCallBegan.type,
    payload: {
        url: `/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'get',
        onSuccess: slice.actions.usersReceived.type,
        onError: apiCallFailure.type
    }
})

export const updateUser = (data: Partial<User>, userId: string) => ({
    type: apiCallBegan.type,
    payload: {
        url: `/users/${userId}`,
        method: 'put',
        data,
        onSuccess: slice.actions.userUpdated.type,
        onError: apiCallFailure.type
    }
})

export const deleteUser = (userId: string) => ({
    type: apiCallBegan.type,
    payload: {
        url: `/users/${userId}`,
        method: 'delete',
        onSuccess: slice.actions.userDeleted.type,
        onError: apiCallFailure.type
    }
})


export const { usersReceived, userUpdated, userDeleted } = slice.actions;
export default slice.reducer;