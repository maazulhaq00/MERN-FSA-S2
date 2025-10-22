

import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Card,
  Grid,
  TextField,
  Icon,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import LoadingButton from "@mui/lab/LoadingButton";
import { NavLink, useNavigate } from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import axios from "axios";
import { SimpleCard } from "app/components";

// Styled components (copied from AddExhibitorForm)
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

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required")
});

const initialValues = {
  email: "",
  password: ""
};

const LoginPage = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const theme = useTheme();
  const { login } = useAuth();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:1308/login", values);
      const { token, name, email, role, image , userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("image", image);
      localStorage.setItem("userId", userId);

      if (role === "organizer") {
        navigate("/dashboard/default");
      } else if (role === "exhibitor") {
        navigate("/dashboard/exhibitorprofile");
      } else {
        setAlert({ message: "Unauthorized role", type: "error" });
        return;
      }

      window.location.reload();
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Login failed",
        type: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          {/* Left Image Block */}
          <Grid item sm={6} xs={12}>
            <div className="img-wrapper">
              <img
                src="/assets/images/illustrations/dreamer.svg"
                width="100%"
                alt="Login Illustration"
              />
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

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    <SimpleCard title="Login" >
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />

                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={isSubmitting}
                      fullWidth
                      sx={{ mt: 2, display: "flex", alignItems: "center" }}
                    >
                      <Icon>send</Icon>
                      <span style={{ paddingLeft: 8, textTransform: "capitalize" }}>
                        Login
                      </span>
                    </Button>

                    <NavLink to="/signup">
                      <Paragraph
                        sx={{
                          mt: 2,
                          color: theme.palette.primary.main,
                          textAlign: "center",
                          cursor: "pointer"
                        }}
                      >
                        Sign up as Exhibitor
                      </Paragraph>
                    </NavLink>
                    </SimpleCard>
                  </form>
                )}
                
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
};

export default LoginPage;
