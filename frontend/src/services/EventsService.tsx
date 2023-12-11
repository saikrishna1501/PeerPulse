import axios from "axios";
import { ObjectId } from 'mongodb'; 

export const getUpcomingEventDetails = async (upcomingEventsIdsList: ObjectId[] | string[]) => {
    console.log("Upcoming Events", upcomingEventsIdsList)
    const upcomingEventsDetails = await axios.get(`http://localhost:5000/events`, {
                // data: {ids : upcomingEventsIdsList},
                data: {ids : ["6576897b151d225401de4bcb"]},
                withCredentials: true
    })
    return upcomingEventsDetails.data;
}