import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/users';
import { apiCallBegan } from './api';
import { toast } from 'react-toastify';


const authUrl = '/users/auth';


const userSlice = createSlice({
    name : 'auth',
    initialState : {
        user: null as User | null,
        isAuthenticated: false,
        accessToken: null as string | null,
        refreshToken: null as string | null,
        isEmailSent: null as string | null,
    },
    reducers : {
        loginSuccess: (state, action: any) => {
            const {message,...response} = action.payload;
            state.user = response;
            state.isAuthenticated = true;
        },

        loginFailed : (state : any, action: any) => {
            toast.error('Invalid Credentials', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        },
        updateAuthDetails: (state: any, action: Partial<PayloadAction<User>>) => {
            // Update only the values of keys sent by the action payload
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        },
        forgotPasswordSucess: (state, action: any) => {
            toast.success('Password reset email sent!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            // state.isEmailSent = 'Hey, email has been sent successfully for the registered email.'
        },

        forgotPasswordFailure : (state : any, action: any) => {
            toast.error('Provided email doesnot exist', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            // state.isEmailSent = 'Provided email doesnot exist. Please sign up to explore PEER PULSE!'
        },
        logoutUser: (state: any) => {
            return {
                user: null as User | null,
                isAuthenticated: false,
                accessToken: null as string | null,
                refreshToken: null as string | null,
                isEmailSent: null as string | null,
            }
        },
        forgotPasswordMessage: (state: any, action: PayloadAction<string | null>) => {
            state.isEmailSent = action.payload;
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

export const apiCallForForgotPassword = (email: string) => ({
    type: apiCallBegan.type,
    meta: {
        skipAuth: true
    },
    payload: {
        url: `${authUrl}/requestResetPassword`,
        method: 'post',
        data: { email },
        onSuccess: forgotPasswordSucess.type,
        onError: forgotPasswordFailure.type,
    }
})

export const apiCallForPasswordReset = (email: string, password: string, token:string) => ({
    type: apiCallBegan.type,
    meta: {
        skipAuth: true
    },
    payload: {
        url: `${authUrl}/resetPassword?activation_token=${token}`,
        method: 'post',
        data: { email, password },
        onSuccess: forgotPasswordSucess.type,
        onError: forgotPasswordFailure.type,
    }
})

export const apiCallForLogout = (email: string) => ({
    type: apiCallBegan.type,
    meta: {
        skipAuth: true
    },
    payload: {
        url: `users/logout`,
        method: 'post',
        data: { email },
        onSuccess: userSlice.actions.logoutUser,
        onError: loginFailed.type,
    }
})


export const { loginSuccess, loginFailed, updateAuthDetails, forgotPasswordSucess, forgotPasswordFailure, forgotPasswordMessage } = userSlice.actions;
export default userSlice.reducer;