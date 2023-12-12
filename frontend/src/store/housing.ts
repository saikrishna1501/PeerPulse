import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Housing} from '../models/housing';
import { apiCallBegan, apiCallFailure } from './api';

const housingSlice = createSlice({
    name: 'housing',
    initialState : {
        list: [] as Housing[],
        loading: false,
        lastFetch: null as number | null,
    },
    reducers: {
        housingRequested: (housing) => {
            housing.loading = true;
        },
        housingReceived: (housing, action: PayloadAction<Housing[]>) => {
            housing.list = action.payload;
            housing.loading = false;
            housing.lastFetch = Date.now()
        },
        housingRequestFailed: (housing) => {
            housing.loading = false;
        }
    }
});

export const loadHousing = () =>({
    type : apiCallBegan.type,
    payload : {
      url : '/housings',
      method : 'get',
      onSuccess : housingReceived.type, //helps dispatch another action 
      onError : apiCallFailure
    },
  });

export const { housingRequested, housingReceived, housingRequestFailed } = housingSlice.actions;

export default housingSlice.reducer;