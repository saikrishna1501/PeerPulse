import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent, updateEvent } from "../../store/events";
import { Event } from "../../models/event";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import uploadFile from "../../services/ImageUploadService";

interface EventFormProps {
  open: boolean;
  handleClose: () => void;
  isEditMode?: boolean;
  initialEventData?: Event | null;
  setEvents: React.Dispatch<React.SetStateAction<any>>;
  setFilteredEvents: React.Dispatch<React.SetStateAction<any>>;
}

export interface EventData {
  title: string;
  organizer: string;
  location: string;
  description: string;
  date: Date;
  creatorId: string;
  proofDocument?: string | null;
  imageUrl?: string | null;
  latitude: number;
  longitude: number;
  type: string;
  isPaid: Boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  open,
  handleClose,
  isEditMode,
  initialEventData,
  setEvents,
  setFilteredEvents,
}) => {
  const userId = useSelector((state: any) => state.auth.user._id);
  const emptyState = {
    title: "",
    organizer: "",
    location: "",
    description: "",
    date: new Date(),
    creatorId: userId,
    proofDocument: null,
    type: "",
    latitude: 42.3,
    longitude: -71.08,
    categories: ["Meet and Greet"],
    isPaid: false,
  };
  const [eventData, setEventData] = useState<EventData>(
    initialEventData || emptyState
  );

  useEffect(() => {
    if (isEditMode && initialEventData) {
      setEventData(initialEventData);
    } else {
      setEventData(emptyState);
    }
  }, [isEditMode, initialEventData]);

  const handleChange = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setEventData({
        ...eventData,
        [e.target.name]: await uploadFile(e.target.files[0], "eventsDocuments"),
      });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const setDate = (dateVal: Date) => {
    setEventData({ ...eventData, ["date"]: dateVal });
  };

  const handleSubmit = () => {
    console.log(eventData);
    if (isEditMode && initialEventData) {
      const editEventData = async () => {
        try {
          await axios.put(
            `http://localhost:5000/events/${initialEventData._id}`,
            eventData,
            { withCredentials: true }
          );
          const updatedEvents = await axios.get(
            "http://localhost:5000/events",
            { withCredentials: true }
          );
          setEvents(updatedEvents.data);
          setFilteredEvents(updatedEvents.data);
        } catch (error) {
          console.error("Error updating event:", error);
        }
      };
      editEventData();
    } else {
      const addEventData = async () => {
        try {
          const addedEvent = await axios.post(
            "http://localhost:5000/events",
            eventData,
            { withCredentials: true }
          );

          const response = await axios.get("http://localhost:5000/events", {
            withCredentials: true,
          });
          setEvents(response.data);
          setFilteredEvents(response.data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      addEventData();
    }
    setEventData(emptyState);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "80%",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle>Create an Event</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Event Name"
          name="title"
          fullWidth
          onChange={handleChange}
          value={eventData.title}
          required
        />
        <TextField
          label="Organizer"
          name="organizer"
          fullWidth
          onChange={handleChange}
          value={eventData.organizer}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          onChange={handleChange}
          value={eventData.description}
          required
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          onChange={handleChange}
          value={eventData.location}
          required
        />
        <DatePicker
          selected={eventData.date}
          onChange={setDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={eventData.type || ""}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="virtual">Virtual</MenuItem>
            <MenuItem value="in-person">In-Person</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Paid Event:</InputLabel>
          <Select
            name="isPaid"
            value={eventData.isPaid || ""}
            label="isPaid"
            onChange={handleChange}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
        </FormControl>
        <InputLabel htmlFor="event-proof">Event Proof</InputLabel>
        <Input
          id="event-proof"
          name="proofDocument"
          type="file"
          onChange={handleChange}
          inputProps={{
            accept: ".pdf,.doc,.docx,application/msword,application/pdf",
          }}
        />
        <InputLabel htmlFor="event-image">Event Image</InputLabel>
        <Input
          id="event-image"
          name="imageUrl"
          type="file"
          onChange={handleChange}
          inputProps={{
            accept: ".jpg,.png,.jpeg",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;
