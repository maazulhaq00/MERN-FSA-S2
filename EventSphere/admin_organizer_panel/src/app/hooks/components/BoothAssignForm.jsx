
import {
  Button,
  MenuItem,
  Grid,
  TextField,
  Alert,
  Box,
  Icon,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Span } from "app/components/Typography";

export default function BoothAssignForm() {
  const [formData, setFormData] = useState({
    booth: "",
    expo: "",
    assignedTo: "",
    status: "assigned",
  });

  const [booths, setBooths] = useState([]);
  const [expos, setExpos] = useState([]);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    FetchBooth();
    FetchExpo();
    FetchUser();
  }, []);

  const FetchBooth = async () => {
    try {
      const res = await axios.get("http://localhost:1308/booth");
      setBooths(res.data.booths);
    } catch {
      setAlert({ message: "Error loading booth data", type: "error" });
    }
  };

  const FetchExpo = async () => {
    try {
      const res = await axios.get("http://localhost:1308/expo");
      setExpos(res.data.expos);
    } catch {
      setAlert({ message: "Error loading expo data", type: "error" });
    }
  };

  const FetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:1308/users");
      setUsers(res.data.users || res.data);
    } catch {
      setAlert({ message: "Error loading user data", type: "error" });
    }
  };

  const OnhandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const OnhandleBoothAssign = async () => {
    const { booth, expo, assignedTo, status } = formData;

    if (!booth || !expo || !assignedTo) {
      setAlert({
        message: "Booth, Expo, and AssignedTo fields are required.",
        type: "error",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:1308/boothassign", {
        booth,
        expo,
        assignedTo,
        status,
      });

      setAlert({
        message: res.data.message || "Booth Assigned Successfully",
        type: "success",
      });

      setFormData({
        booth: "",
        expo: "",
        assignedTo: "",
        status: "assigned",
      });
    } catch (err) {
      setAlert({
        message:
          err.response?.data?.message ||
          "An error occurred while assigning booth.",
        type: "error",
      });
    }
  };

  return (
    <Box pt={5}>
      <Grid container spacing={3}>
        {alert.message && (
          <Grid item xs={12}>
            <Alert severity={alert.type}>{alert.message}</Alert>
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Select Booth"
            name="booth"
            value={formData.booth}
            onChange={OnhandleInputChange}
            required
          >
            {booths.map((booth) => (
              <MenuItem key={booth._id} value={booth._id}>
                {booth.boothNumber}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Select Expo"
            name="expo"
            value={formData.expo}
            onChange={OnhandleInputChange}
            required
          >
            {expos.map((expo) => (
              <MenuItem key={expo._id} value={expo._id}>
                {expo.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Assign To User"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={OnhandleInputChange}
            required
          >
            {users
              .filter((user) => user.role === "exhibitor")
              .map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={OnhandleInputChange}
          >
            <MenuItem value="assigned">Assigned</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={OnhandleBoothAssign}
            type="submit"
            color="primary"
            variant="contained"
          >
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
