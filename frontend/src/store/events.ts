import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Event} from '../models/event';
import { apiCallBegan, apiCallFailure } from './api';
import { updateAuthDetails } from './auth';

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    list: [] as Event[],
    loading: false,
    lastFetch: null as number | null,
  },
  reducers: {
    eventsRequested: (events) => {
      events.loading = true;
    },
    eventsReceived: (events, action: PayloadAction<Event[]>) => {
      events.list = action.payload;
      events.loading = false;
      events.lastFetch = Date.now();
    },
    eventsRequestFailed: (events) => {
      events.loading = false;
    },
    eventAdded: (events, action: PayloadAction<Event>) => {
      events.list.push(action.payload);
    },
    eventUpdated: (events, action: PayloadAction<Event>) => {
      const updatedEvent = action.payload;
      const index = events.list.findIndex(event => event._id === updatedEvent._id);
      if (index !== -1) {
        events.list[index] = updatedEvent;
      }
    },
    eventDeleted: (events, action: PayloadAction<Event>) => {
      events.list = events.list.filter(event => event._id !== action.payload._id);
    }
  },
});

export const loadEvents = () => ({
  type: apiCallBegan.type,
  payload: {
    url: '/events',
    method: 'get',
    onSuccess: eventSlice.actions.eventsReceived.type,
    onError: apiCallFailure,
  },
});

export const createEvent = (data: Partial<Event>) => ({
  type: apiCallBegan.type,
  payload: {
    url: '/events',
    method: 'post',
    data,
    headers: {
        'Content-Type': 'multipart/form-data'
      },
    onSuccess: eventSlice.actions.eventAdded.type,
    onError: apiCallFailure,
  },
});

export const updateEvent = (id: string, data: Partial<Event>) => ({
  type: apiCallBegan.type,
  payload: {
    url: `/events/${id}`,
    method: 'put',
    data,
    onSuccess: eventSlice.actions.eventUpdated.type,
    onError: apiCallFailure,
  },
});

export const deleteEvent = (id: string) => ({
  type: apiCallBegan.type,
  payload: {
    url: `/events/${id}`,
    method: 'delete',
    onSuccess: eventSlice.actions.eventDeleted.type,
    onError: apiCallFailure,
  },
});

export const registerEvent = (data: {eventId: string, userId: string}) => ({
  type: apiCallBegan.type,
  payload: {
    url: `/events/register`,
    method: 'post',
    data,
    onSuccess: updateAuthDetails,
    onError: apiCallFailure,
  },
});

export const unRegisterEvent = (data: {eventId: string, userId: string}) => ({
  type: apiCallBegan.type,
  payload: {
    url: `/events/unregister`,
    method: 'post',
    data,
    onSuccess: updateAuthDetails,
    onError: apiCallFailure,
  },
});


export const { eventsRequested, eventsReceived, eventsRequestFailed, eventAdded, eventUpdated, eventDeleted } = eventSlice.actions;
export default eventSlice.reducer;