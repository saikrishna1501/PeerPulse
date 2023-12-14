import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/users';
import { apiCallBegan } from './api';
import { toast } from 'react-toastify';
import Language from '../models/language';

const languageSlice = createSlice({
    name : 'language',
    initialState : {
        selectedLanguage: Language.ENGLISH
    },
    reducers : {
        changeLanguage: (state, action: PayloadAction<{ language: Language }>) => {
            state.selectedLanguage = action.payload.language
        }
       }
});

export const {changeLanguage} = languageSlice.actions;

export default languageSlice.reducer;