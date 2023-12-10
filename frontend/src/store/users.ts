import { createSlice } from "@reduxjs/toolkit";
import User from "../models/users";
import { apiCallBegan, apiCallFailure } from "./api";

const slice = createSlice({
    name: 'users',
    initialState: {
        list: [] as User[]
    },
    reducers: {
        usersReceived: (users, action: any) => {
            users.list = (action.payload)
        },
        userAdded: (users, action: any) => {
            const updatedUserDetails = action.payload.userDetails;
            const index = users.list.findIndex((user) => user._id === updatedUserDetails._id);
            if(index !== -1) {
                //if users not found
                users.list[index] = updatedUserDetails;
            }
        },
        userDeleted: (users, action: any) => {
            const deletedUserDetails = action.payload.userDetails;
            const index = users.list.filter(user => {
                if(user._id && deletedUserDetails._id && user._id === deletedUserDetails._id) {
                    return false;
                }
                return true;
            })
        }
    }
})

export const loadUsers = () => ({
    type: apiCallBegan.type,
    payload: {
        url: '/users',
        method: 'post',
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
        onSuccess: slice.actions.userAdded.type,
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


export const { usersReceived, userAdded, userDeleted } = slice.actions;
export default slice.reducer;