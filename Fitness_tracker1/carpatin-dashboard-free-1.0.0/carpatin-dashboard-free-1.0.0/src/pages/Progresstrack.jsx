import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Progresstrack = () => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const response = await axios.get('http://localhost:1001/progresstrack');
      setMeals(response.data.tracking);
    
    } catch (err) {
      console.error('Error fetching meals:', err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this Progress?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:1001/progresstrack/${id}`);
      fetchdata(); 
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Failed to delete Progress.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-progress/${id}`);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <Helmet>
        <title>Meals | Dashboard</title>
      </Helmet>

      <Box
        sx={{
          py: 8,
          px: 2,
          background: 'linear-gradient(to right, #ffffff, #f7f7f7)',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            fontWeight={700}
            mb={5}
            textAlign="center"
            color="text.primary"
          >
             Progress Tracker List
          </Typography>

          <Grid container spacing={4}>
            {meals.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Stack spacing={1.5}>
                    <Typography variant="h6" fontWeight="bold">
                     BodyWeight : {item.BodyWeight}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Runtime: {item.Runtime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chest: {item.Chest}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Waist: {item.Waist}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hip: {item.Hip}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Liftingweights: {item.Liftingweights}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Shoulderwidth: {item.Shoulderwidth}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sleevelength: {item.Sleevelength}
                    </Typography>
                     <Typography variant="body2" color="text.secondary">
                      Neck: {item.Neck}
                    </Typography>
                     <Typography variant="body2" color="text.secondary">
                      bodyfat: {item.bodyfat}
                    </Typography>
                     <Typography variant="body2" color="text.secondary">
                      Date: {item.Date}
                    </Typography>
                    

                    <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(item._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Progresstrack;
