import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Exsercisetracker = () => {
  const navigate = useNavigate();

  

  const [categoryArr, setCategoryArr] = useState([]);
  const [product, setProduct] = useState({
    exercisename: '',
    sets: '',
    reps: '',
    weights: '',
    notes: '',
    workcategoryID: '',
    userId: ''
  });

  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1001/categoryw');
        setCategoryArr(response.data.tracking || []);
      } catch (err) {
        console.log('Category Fetch Error:', err.message);
      }
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const storedUserId = user?._id;

    if (!storedUserId) {
      navigate('/Login');
      return;
    }

    setProduct((prev) => ({ ...prev, userId: storedUserId }));
    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!product.userId) {
      setAlert({
        message: 'Please login first.',
        type: 'error'
      });
      return;
    }

    axios
      .post('http://localhost:1001/workouttraking', product)
      .then(() => {
        setAlert({ message: 'Exercise added successfully!', type: 'success' });
        setProduct((prev) => ({
          ...prev,
          exercisename: '',
          sets: '',
          reps: '',
          weights: '',
          notes: '',
          workcategoryID: ''
        }));
      })
      .catch((err) => {
        console.log('Submit Error:', err.message);
        setAlert({ message: 'Something went wrong. Try again.', type: 'error' });
      });
  };
  useEffect(() => {
    const bgElements = document.querySelectorAll("[data-setbg]");
    bgElements.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      el.style.backgroundImage = `url(${bg})`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
    });
  }, []);

  return (

<>
<section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb-bg.jpg" style={{ height: 220 }}>
        <div className="container">
          <div className="breadcrumb-text text-center"></div>
        </div>
      </section>
    <Box
      sx={{
        backgroundColor: '#f2f2f2', // 🟠 bg color changed here
        minHeight: '100vh',
        py: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            background: '#fff',
            padding: { xs: 3, sm: 5 },
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            Add New Exercise
          </Typography>

          <Stack spacing={2.5} mt={3}>
            <TextField
              fullWidth
              label="Exercise Name"
              name="exercisename"
              value={product.exercisename}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Sets"
              name="sets"
              type="number"
              value={product.sets}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Reps"
              name="reps"
              type="number"
              value={product.reps}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Weights (kg)"
              name="weights"
              type="number"
              value={product.weights}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              multiline
              rows={3}
              value={product.notes}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              select
              label="Workout Category"
              name="workcategoryID"
              value={product.workcategoryID}
              onChange={handleChange}
            >
              {categoryArr.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.workout_name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#ff5722',
                py: 1.4,
                fontWeight: 600,
                fontSize: 16,
                '&:hover': {
                  backgroundColor: '#e64a19'
                }
              }}
            >
              Add Exercise
            </Button>
          </Stack>

          {alert.message && (
            <Box mt={2}>
              <Typography
                variant="body2"
                sx={{
                  color: alert.type === 'error' ? '#d32f2f' : '#388e3c',
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
                {alert.message}
              </Typography>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
    </>
  );
};

export default Exsercisetracker;
