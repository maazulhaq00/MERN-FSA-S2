import { useEffect, useState } from 'react';
import {
  Box, Card, Container, Grid, Typography, Stack, IconButton
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Excercisetracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get('http://localhost:1001/workouttraking');
      setWorkouts(res.data.tracking);
    // console.log(res);
    
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete workout?')) return;
    try {
      await axios.delete(`http://localhost:1001/workouttraking/${id}`);
      fetchWorkouts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-workout/${id}`);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" mb={3}>Workout Tracker</Typography>
        <Grid container spacing={3}>
          {workouts.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={1.5}>
  <Typography variant="h6">{item.exercisename}</Typography>
  <Typography>Category: {item.workcategoryID?.workout_name || 'N/A'}</Typography> {/* 👈 add this */}
  <Typography>Sets: {item.sets}</Typography>
  <Typography>Reps: {item.reps}</Typography>
  <Typography>Weight: {item.weights} kg</Typography>
  <Typography>Notes: {item.notes}</Typography>
                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <IconButton color="primary" onClick={() => handleEdit(item._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Excercisetracker;
