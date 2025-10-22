import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Grid,
  TextField,
  Icon
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import axios from "axios";
import { Span } from "app/components/Typography";
import Stack from "@mui/material/Stack";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";

// Styled components (same as LoginPage)
const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  },
  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
  flexGrow: 1
}));

const AddExhibitorForm = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    image: '',
    name: '',
    email: '',
    password: '',
    role: 'exhibitor'
  });

  const fileInputRef = useRef(null);

  const OnhandleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const OnhandleImageInputChange = (e) => {
    setAdmin({ ...admin, image: e.target.files[0] });
  };

  const OnhandleAddAdmin = async (e) => {
    e.preventDefault();

    if (!admin.image || !admin.name.trim() || !admin.email.trim() || !admin.password.trim()) {
      setAlert({ message: "Please fill in all fields before submitting", type: "error" });
      return;
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(admin.email)) {
      setAlert({ message: "Invalid email format", type: "error" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", admin.image);
      formData.append("name", admin.name);
      formData.append("email", admin.email);
      formData.append("password", admin.password);
      formData.append("role", admin.role);

      await axios.post("http://localhost:1308/regestration", formData);

      setAdmin({ image: '', name: '', email: '', password: '', role: 'exhibitor' });

      if (fileInputRef.current) fileInputRef.current.value = null;

      
      navigate('/login')
      setAlert({ message: "Exhibitor added successfully", type: "success" });
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Something went wrong!",
        type: "error"
      });
    }
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          {/* Left Image (just like login) */}
          <Grid item sm={6} xs={12}>
            <div className="img-wrapper">
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="Add Organizer" />
            </div>
          </Grid>

          {/* Right Form */}
          <Grid item sm={6} xs={12}>
           
   
       
            <ContentBox>
              {alert.message && (
                <Alert sx={{ mb: 3 }} severity={alert.type}>
                  {alert.message}
                </Alert>
              )}

              <form onSubmit={OnhandleAddAdmin} encType="multipart/form-data">
               <SimpleCard title="Add Exhibitor" >
                <Stack spacing={2}>
                

                  <input
  type="file"
  name="image"
  accept="image/*"
  onChange={OnhandleImageInputChange}
  ref={fileInputRef}
  style={{
    padding: '15px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }}
/>

                  {/* Name */}
                  <TextField
                    fullWidth
                    name="name"
                    type="text"
                    label="Exhibitor Name"
                    variant="outlined"
                    value={admin.name}
                    onChange={OnhandleInputChange}
                  />

                  {/* Email */}
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="Exhibitor Email"
                    variant="outlined"
                    value={admin.email}
                    onChange={OnhandleInputChange}
                  />

                  {/* Password */}
                  <TextField
                    fullWidth
                    name="password"
                    type="password"
                    label="Exhibitor Password"
                    variant="outlined"
                    value={admin.password}
                    onChange={OnhandleInputChange}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 2, display: "flex", alignItems: "center" }}
                  >
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Sign up</Span>
                  </Button>
                  <NavLink to="/login">
      <Span sx={{ mt: 2, display: "block", color: "primary.main", cursor: "pointer" }}>
        Already have an account? Login here
      </Span>
    </NavLink>
                </Stack>
                </SimpleCard>
              </form>
            </ContentBox>
             
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
};

export default AddExhibitorForm;
