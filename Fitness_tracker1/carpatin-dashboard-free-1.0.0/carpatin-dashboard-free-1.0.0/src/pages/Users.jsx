import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [products, setProducts] = useState([]);
  const imgurl = 'http://localhost:1001/upload/';
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const response = await axios.get('http://localhost:1001/');
      setProducts(response.data.user); 
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  };

  // const handleDelete = async (id) => {
  //   const confirm = window.confirm("Are you sure you want to delete this user?");
  //   if (!confirm) return;
  //   try {
  //     await axios.delete(`http://localhost:1001/${id}`); // adjust if your delete route is different
  //     fetchdata(); // refresh after delete
  //   } catch (err) {
  //     alert("Delete failed");
  //   }
  // };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <Helmet>
        <title>Products | Dashboard</title>
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
            Users
          </Typography>

          <Grid container spacing={4}>
            {products.map((item) => (
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
                  <Stack spacing={2} alignItems="center">
                    <Avatar
                      src={imgurl + item.image}
                      alt={item.name}
                      sx={{
                        width: 100,
                        height: 100,
                        border: '3px solid white',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold" textAlign="center">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.email}
                    </Typography>
                    {/* <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: '#eee',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    >
                      {item.password}
                    </Typography> */}

                    <Stack direction="row" spacing={1} mt={1}>
                      {/* <IconButton color="error" onClick={() => handleDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton> */}
                      <IconButton color="primary" onClick={() => handleEdit(item._id)}>
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

export default Users;
