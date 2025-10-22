



import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { Span } from "app/components/Typography";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateExpoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const [expo, setExpo] = useState({
    expoimage: "",
    title: "",
    date: "",
    description: "",
    theme: "",
    status: "upcoming",
  });

  let fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:1308/expo/${id}`);
      const data =response.data.expo;
       const formattedDate = new Date(data.date).toISOString().split('T')[0];
       setExpo({
      ...data,
      date: formattedDate,
    });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function OnhandleInputChange(e) {
    let { name, value } = e.target;
    setExpo({
      ...expo,
      [name]: value,
    });
  }

  function OnhandleImageInputChange(e) {
    setExpo({
      ...expo,
      expoimage: e.target.files[0],
    });
  }

  async function OnhandleUpdateExpo(e) {
    if (
      !expo.expoimage ||
      !expo.title.trim() ||
      !expo.date ||
      !expo.theme.trim()
    ) {
      setAlert({
        message: "Please fill in all fields before submitting",
        type: "error",
      });
      const d = new Date(expo.date);
      if (isNaN(d.getTime())) return "Invalid date format.";
      return null;
    }

    try {
      const formData = new FormData();
     if (expo.expoimage && typeof expo.expoimage !== "string") {
  formData.append("expoimage", expo.expoimage);
}
      formData.append("title", expo.title);
      formData.append("date", expo.date);
      formData.append("description", expo.description);
      formData.append("theme", expo.theme);
      formData.append("status", expo.status);

      await axios.put(`http://localhost:1308/expo/${id}`, formData);

      setAlert({
        message: "Expo Updated successfully",
        type: "success",
      });

      console.log("success");
      navigate("/dashboard/viewallexpos");
    } catch (err) {
      if (err.response?.data?.message) {
        setAlert({ message: err.response.data.message, type: "error" });
      } else {
        setAlert({ message: "Something went wrong!", type: "error" });
      }
      console.log(err);
    }
  }

  return (
    <div>
      <Alert severity={alert.type}>{alert.message}</Alert>
      <Grid container spacing={6} mb={4}>
        <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              name="expoimage"
              type="file"
              onChange={OnhandleImageInputChange}
            />
            {/* Show previous image if available and not a File object */}

            {expo.expoimage && typeof expo.expoimage === "string" && (
  <span style={{ marginTop: "8px", display: "block" }}>
    Existing file: <strong>{expo.expoimage}</strong>
  </span>
)}



            {expo.expoimage && typeof expo.expoimage === "string" && (
              <img
                src={`http://localhost:1308/uploads/${expo.expoimage}`}
                alt="Expo"
                width="50"
                height="50"
              />
            )}

            <TextField
              label="Title"
              name="title"
              value={expo.title}
              onChange={OnhandleInputChange}
              fullWidth
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={expo.date}
              onChange={OnhandleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
           
          </Stack>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <TextField
              label="Theme"
              name="theme"
              value={expo.theme}
              onChange={OnhandleInputChange}
              fullWidth
            />

            {/* <TextField
              select
              label="Status"
              name="status"
              value={expo.status}
              onChange={OnhandleInputChange}
              fullWidth
            >
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="past">Past</MenuItem>
            </TextField> */}

            <TextField
              label="Description"
              name="description"
              value={expo.description}
              onChange={OnhandleInputChange}
              multiline
              rows={5}
              fullWidth
            />
          </Stack>
        </Grid>
      </Grid>

      <Button
        onClick={OnhandleUpdateExpo}
        type="button"
        color="primary"
        variant="contained"
      >
        <Icon>send</Icon>
        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
      </Button>
    </div>
  );
};

export default UpdateExpoForm;
