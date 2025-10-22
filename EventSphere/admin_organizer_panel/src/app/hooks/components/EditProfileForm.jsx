import {
  TextField,
  Grid,
  Stack,
  Button,
  Icon,
  Alert,
  Avatar,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfileForm() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");

    if (name && email) {
      setUserData({ name, email, image: null });
      setPreviewImage(`http://localhost:1308/uploads/${image}`);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setAlert({ message: "", type: "" });

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      if (userData.image) {
        formData.append("image", userData.image);
      }

      const res = await axios.put("http://localhost:1308/updateuser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      const { name, email, image, token: newToken, role } = res.data;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("image", image);
      localStorage.setItem("token", newToken);
      localStorage.setItem("role", role);

       setTimeout(() => {
        navigate("/dashboard/profile");
        window.location.reload();
      }, 1000);

      setAlert({ message: "Profile updated successfully!", type: "success" });

     
    } catch (err) {
      if (err.response?.status === 400) {
        setAlert({ message: err.response.data.message, type: "error" });
      } else {
        setAlert({ message: "Something went wrong while updating.", type: "error" });
      }
    }
  };

  return (
    <div>
      {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

      <Grid container spacing={6} mb={4}>
        <Grid item md={6} xs={12} sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Avatar
              alt="Profile Preview"
              src={previewImage}
              sx={{ width: 120, height: 120 }}
            />

            <Button variant="outlined" component="label">
              Upload New Image
              <input hidden accept="image/*" type="file" onChange={handleFileChange} />
            </Button>

            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              type="email"
              label="Your Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </Stack>
        </Grid>

        <Grid item md={6} xs={12} sx={{ mt: 2 }}>
          {/* Additional Fields (optional) */}
        </Grid>
      </Grid>

      <Button onClick={handleSubmit} variant="contained" color="primary">
        <Icon>save</Icon>
        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save Changes</Span>
      </Button>
    </div>
  );
}

export default EditProfileForm;
