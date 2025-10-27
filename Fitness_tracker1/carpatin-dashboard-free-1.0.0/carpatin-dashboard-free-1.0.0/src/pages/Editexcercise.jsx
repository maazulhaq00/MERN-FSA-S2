import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, TextField, Typography, Button, Stack, Paper, MenuItem
} from '@mui/material';
import axios from 'axios';

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState({
    exercisename: '',
    sets: '',
    reps: '',
    weights: '',
    notes: '',
    userId: '',
    workcategoryID: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await axios.get(`http://localhost:1001/workouttraking/${id}`);
        setWorkout(res.data.tracking);
        // console.log(res);
        
      } catch (err) {
        console.error('Error fetching workout:', err.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const ress = await axios.get('http://localhost:1001/workcatrouter'); 
        setCategories(ress.data.tracking);
        // console.log(ress);
         
      } catch (err) {
        console.error('Error fetching categories:', err.message);
      }
    };

    fetchWorkout();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1001/workouttraking/${id}`, workout);
      alert('Workout updated');
      navigate('/Excercisetracker');
    } catch (err) {
      alert('Update failed');
      console.error(err.message);
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" mb={3} align="center">
            🏋️ Edit Workout
          </Typography>
          <form onSubmit={handleUpdate}>
            <Stack spacing={2}>
              <TextField
                select
                name="workcategoryID"
                label="Workout Category"
                value={workout.workcategoryID}
                onChange={handleChange}
                fullWidth
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.workout_name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField name="exercisename" label="Exercise Name" value={workout.exercisename} onChange={handleChange} fullWidth />
              <TextField name="sets" label="Sets" type="number" value={workout.sets} onChange={handleChange} fullWidth />
              <TextField name="reps" label="Reps" type="number" value={workout.reps} onChange={handleChange} fullWidth />
              <TextField name="weights" label="Weight (kg)" type="number" value={workout.weights} onChange={handleChange} fullWidth />
              <TextField name="notes" label="Notes" value={workout.notes} onChange={handleChange} fullWidth />
              <Button type="submit" variant="contained" fullWidth>Update</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditWorkout;
