import {
  Button,
  Icon,
  TextField,
  Grid,
  Stack,
  MenuItem,
  Alert,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateScheduleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [booths, setBooths] = useState([]);
  const [expos, setExpos] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const [schedule, setSchedule] = useState({
    expo: "",
    title: "",
    speaker: "",
    location: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  useEffect(() => {
    loadBooths();
    loadExpos();
    if (id) loadSchedule();
  }, [id]);

  const loadBooths = async () => {
    try {
      const res = await axios.get("http://localhost:1308/booth");
      setBooths(res.data.booths);
    } catch {
      setAlert({ message: "Error loading booth data", type: "error" });
    }
  };

  const loadExpos = async () => {
    try {
      const res = await axios.get("http://localhost:1308/expo");
      setExpos(res.data.expos);
    } catch {
      setAlert({ message: "Error loading expo data", type: "error" });
    }
  };

  const loadSchedule = async () => {
    try {
      const res = await axios.get(`http://localhost:1308/schedule/${id}`);
      const data = res.data.schedule;
      setSchedule({
        expo: data.expo?._id || data.expo,
        title: data.title,
        speaker: data.speaker,
        location: data.location?._id || data.location,
        startTime: data.startTime,
        endTime: data.endTime,
        description: data.description,
      });
    } catch {
      setAlert({ message: "Error loading schedule data", type: "error" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { expo, title, speaker, topic, location, startTime, endTime } = schedule;

    if (!expo || !title || !speaker  || !location || !startTime || !endTime) {
      setAlert({ message: "Please fill in all required fields", type: "error" });
      return;
    }

    try {
      if (id) {
        await axios.put(`http://localhost:1308/schedule/${id}`, schedule);
        setAlert({ message: "Schedule updated successfully", type: "success" });
      } else {
        await axios.post("http://localhost:1308/schedule", schedule);
        setAlert({ message: "Schedule created successfully", type: "success" });
      }

      // Reset form
      setSchedule({
        expo: "",
        title: "",
        speaker: "",
        location: "",
        startTime: "",
        endTime: "",
        description: "",
      });
      if (fileInputRef.current) fileInputRef.current.value = null;

      navigate("/dashboard/viewallschedule");
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Submission failed",
        type: "error",
      });
    }
  };

  return (
    <div>
      {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

      <Grid container spacing={6} mb={4}>
        <Grid item md={6} xs={12} sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <TextField
              select
              fullWidth
              label="Select Expo"
              name="expo"
              value={schedule.expo}
              onChange={handleInputChange}
              required
            >
              {expos.map((expo) => (
                <MenuItem key={expo._id} value={expo._id}>
                  {expo.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Title"
              name="title"
              value={schedule.title}
              onChange={handleInputChange}
              fullWidth
            />

            <TextField
              label="Speaker"
              name="speaker"
              type="text"
              value={schedule.speaker}
              onChange={handleInputChange}
              fullWidth
            />

               <TextField
              select
              fullWidth
              label="Select Location"
              name="location"
              value={schedule.location}
              onChange={handleInputChange}
              required
            >
              {booths.map((booth) => (
                <MenuItem key={booth._id} value={booth._id}>
                  {booth.boothNumber}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Grid>

        <Grid item md={6} xs={12} sx={{ mt: 2 }}>
          <Stack spacing={3}>
        

            <TextField
              label="Start Time"
              name="startTime"
              type="datetime-local"
              value={schedule.startTime}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="End Time"
              name="endTime"
              type="datetime-local"
              value={schedule.endTime}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Description"
              name="description"
              value={schedule.description}
              onChange={(e) => {
                const value = e.target.value;
                const lineLimit = 3;
                const lines = value.split("\n");

                if (lines.length <= lineLimit) {
                  setSchedule((prev) => ({ ...prev, description: value }));
                } else {
                  setAlert({
                    message: `Description must not exceed ${lineLimit} lines.`,
                    type: "error",
                  });
                }
              }}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </Grid>
      </Grid>

      <Button
        onClick={handleSubmit}
        type="button"
        color="primary"
        variant="contained"
      >
        <Icon>send</Icon>
        <Span sx={{ pl: 1, textTransform: "capitalize" }}>
          {id ? "Update" : "Submit"}
        </Span>
      </Button>
    </div>
  );
};

export default UpdateScheduleForm;
