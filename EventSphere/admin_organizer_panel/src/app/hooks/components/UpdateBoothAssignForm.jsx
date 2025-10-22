


import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Alert,
  Box,
  Grid,
  Icon,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Span } from "app/components/Typography";

export default function UpdateBoothAssignForm() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    const fetchAll = async () => {
      await Promise.all([FetchBooth(), FetchExpo(), FetchUser()]);
      await fetchAssignment();
    };
    fetchAll();
  }, []);

  const FetchBooth = async () => {
    try {
      const res = await axios.get("http://localhost:1308/booth");
      setBooths(res.data.booths);
    } catch (err) {
      setAlert({ message: "Error loading booth data", type: "error" });
    }
  };

  const FetchExpo = async () => {
    try {
      const res = await axios.get("http://localhost:1308/expo");
      setExpos(res.data.expos);
    } catch (err) {
      setAlert({ message: "Error loading expo data", type: "error" });
    }
  };

  const FetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:1308/users");
      setUsers(res.data.users || res.data);
    } catch (err) {
      setAlert({ message: "Error loading user data", type: "error" });
    }
  };

  const fetchAssignment = async () => {
    try {
      const res = await axios.get(`http://localhost:1308/boothassign/${id}`);
      const data = res.data.boothAssign;
      setFormData({
        booth: data.booth?._id || data.booth,
        expo: data.expo?._id || data.expo,
        assignedTo: data.assignedTo?._id || data.assignedTo,
        status: data.status,
      });
    } catch (err) {
      setAlert({ message: "Error loading assignment data", type: "error" });
    }
  };

  const OnhandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const OnhandleUpdateAssignment = async () => {
    const { booth, expo, assignedTo, status } = formData;

    if (!booth || !expo || !assignedTo) {
      setAlert({
        message: "Booth, Expo, and AssignedTo fields are required.",
        type: "error",
      });
      return;
    }

    try {
      const res = await axios.put(`http://localhost:1308/boothassign/${id}`, {
        booth,
        expo,
        assignedTo,
        status,
      });

      setAlert({
        message: res.data.message || "Assignment Updated Successfully",
        type: "success",
      });

      navigate("/dashboard/viewallboothassignment");
    } catch (err) {
      setAlert({
        message:
          err.response?.data?.message ||
          "An error occurred while updating assignment.",
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
              {!booths.find((b) => b._id === formData.booth) && formData.booth && (
                <MenuItem value={formData.booth}>Previously Selected Booth</MenuItem>
              )}
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
              {!expos.find((e) => e._id === formData.expo) && formData.expo && (
                <MenuItem value={formData.expo}>Previously Selected Expo</MenuItem>
              )}
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
              {!users.find((u) => u._id === formData.assignedTo) && formData.assignedTo && (
                <MenuItem value={formData.assignedTo}>Previously Assigned User</MenuItem>
              )}
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
  

     <Button onClick={OnhandleUpdateAssignment}  type="submit" color="primary" variant="contained" >
              <Icon>send</Icon>
              <Span  sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
            </Button> 

</Grid>
        </Grid>
      </Box>

  );
}

