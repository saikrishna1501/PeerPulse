import axios from "axios";
import { ObjectId } from "mongodb";

export const getUpcomingEventDetails = async (
  upcomingEventsIdsList: ObjectId[] | string[]
) => {
  console.log("Upcoming Events", upcomingEventsIdsList);
  console.log(typeof upcomingEventsIdsList[0]);
  const upcomingEventsDetails = await axios.post(
    "http://localhost:5001/events/filter",
    { ids: upcomingEventsIdsList },
    {
      withCredentials: true,
    }
  );
  return upcomingEventsDetails.data;
};
