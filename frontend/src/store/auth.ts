import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/users';
import { apiCallBegan } from './api';

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
        loginSuccess: (state: any, action: any) => {
            const response = action.payload;
            state.user = response.data;
            state.isAuthenticated = true;
        },

        loginFailed : (state : any, action: any) => {

        }
    }

});

// Creator for logIn action
export const apiCallForLogin = (email: string, password: string) => ({
    type: apiCallBegan.type,
    payload: {
        url: authUrl,
        method: 'post',
        data: { email, password },
        onSuccess: loginSuccess.type,
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