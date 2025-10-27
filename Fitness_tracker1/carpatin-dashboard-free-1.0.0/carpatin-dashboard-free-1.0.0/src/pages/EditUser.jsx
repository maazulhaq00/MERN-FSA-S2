import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Container, TextField, Typography, Button, Stack, Paper, Avatar
} from "@mui/material";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    // password: "",
    image: ""
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:1001/user/${id}`);
        console.log(res)
        setUser(res.data);
        setPreview(`http://localhost:1001/upload/${res.data.image}`);
      } catch (err) {
        console.log("Fetch error:", err.message);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      // formData.append("password", user.password);
      if (file) formData.append("image", file);

      await axios.put(`http://localhost:1001/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("User updated successfully");
      navigate("/Users");
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
             Edit User
          </Typography>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
            <Stack spacing={2} alignItems="center">
              <Avatar
                src={preview}
                sx={{ width: 100, height: 100, border: "2px solid #eee" }}
              />
              <TextField name="name" label="Name" fullWidth value={user.name} onChange={handleChange} />
              <TextField name="email" label="Email" fullWidth value={user.email} onChange={handleChange} />
              {/* <TextField name="password" label="Password" fullWidth value={user.password} onChange={handleChange} /> */}
              <Button variant="outlined" component="label">
                Upload New Image
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              <Button type="submit" variant="contained" fullWidth>Update</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditUser;
