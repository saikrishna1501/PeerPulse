import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/users';
import { apiCallBegan } from './api';
import {produce} from "immer";

const authUrl = '/users/auth';

const userSlice = createSlice({
    name : 'auth',
    initialState : {
        user: null as User | null,
        isAuthenticated: false,
        accessToken: null as string | null,
        refreshToken: null as string | null,
    },
    reducers : {
        loginSuccess: (state, action: any) => {
            const {message,...response} = action.payload;
            console.log(response);
            state.user = response;
            state.isAuthenticated = true;
        },

        loginFailed : (state : any, action: any) => {

        }
    }

});

// Creator for logIn action
export const apiCallForLogin = (email: string, password: string) => ({
    type: apiCallBegan.type,
    meta: {
        skipAuth: true
    },
    payload: {
        url: authUrl,
        method: 'post',
        data: { email, password },
        onSuccess: userSlice.actions.loginSuccess.type,
        onError: loginFailed.type,
    }
})

// Selector to check if the user is logged in
export const selectIsLoggedIn = createSelector(
    (state: { auth: any }) => state.auth,
    (auth) => auth.isAuthenticated
);

export const { loginSuccess, loginFailed } = userSlice.actions;
export default userSlice.reducer;