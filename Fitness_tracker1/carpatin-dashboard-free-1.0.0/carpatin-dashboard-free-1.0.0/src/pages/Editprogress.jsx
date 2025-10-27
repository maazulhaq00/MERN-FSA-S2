import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Container, TextField, Typography, Button, Stack, Paper
} from "@mui/material";
import axios from "axios";

const EditProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [progress, setProgress] = useState({
    BodyWeight: '',
    Runtime: '',
    Chest: '',
    Waist: '',
    Hip: '',
    Liftingweights: '',
    Shoulderwidth: '',
    Sleevelength: '',
    Neck: '',
    bodyfat: '',
    Date: ''
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`http://localhost:1001/progresstrack/${id}`);
        setProgress({
          ...res.data.tracking,
          
          Date: res.data.Date?.slice(0, 10) || ''
        });
      } catch (err) {
        console.log("Fetch error:", err.message);
      }
    };
    fetchProgress();
  }, [id]);

  const handleChange = (e) => {
    setProgress({ ...progress, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1001/progresstrack/${id}`, progress);
      alert("Progress updated successfully");
      navigate("/Progresstrack");
    } catch (err) {
      alert("Update failed");
      console.error(err.message);
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" mb={3} align="center">
            📝 Edit Progress Entry
          </Typography>
          <form onSubmit={handleUpdate}>
            <Stack spacing={2}>
              <TextField label="Body Weight" name="BodyWeight" type="number" value={progress.BodyWeight} onChange={handleChange} fullWidth required />
              <TextField label="Runtime" name="Runtime" type="number" value={progress.Runtime} onChange={handleChange} fullWidth required />
              <TextField label="Chest" name="Chest" type="number" value={progress.Chest} onChange={handleChange} fullWidth required />
              <TextField label="Waist" name="Waist" type="number" value={progress.Waist} onChange={handleChange} fullWidth required />
              <TextField label="Hip" name="Hip" type="number" value={progress.Hip} onChange={handleChange} fullWidth required />
              <TextField label="Lifting Weights" name="Liftingweights" type="number" value={progress.Liftingweights} onChange={handleChange} fullWidth required />
              <TextField label="Shoulder Width" name="Shoulderwidth" type="number" value={progress.Shoulderwidth} onChange={handleChange} fullWidth required />
              <TextField label="Sleeve Length" name="Sleevelength" type="number" value={progress.Sleevelength} onChange={handleChange} fullWidth required />
              <TextField label="Neck" name="Neck" type="number" value={progress.Neck} onChange={handleChange} fullWidth required />
              <TextField label="Body Fat" name="bodyfat" type="number" value={progress.bodyfat} onChange={handleChange} fullWidth required />
              <TextField
                label="Date"
                name="Date"
                type="date"
                value={progress.Date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <Button type="submit" variant="contained" fullWidth>
                Update
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditProgress;
