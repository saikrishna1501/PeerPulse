import axios from "axios";
import { ObjectId } from 'mongodb'; 

export const getUpcomingEventDetails = async (upcomingEventsIdsList: ObjectId[] | string[]) => {
    const upcomingEventsDetails = await axios.get(`http://localhost:5000/events`, {
                data: {ids : upcomingEventsIdsList},
                withCredentials: true
    })
    return upcomingEventsDetails.data;
}