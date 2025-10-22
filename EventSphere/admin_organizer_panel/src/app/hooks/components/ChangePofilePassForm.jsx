import {
  TextField,
  Grid,
  Stack,
  Button,
  Icon,
  Alert,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangeProfilePassForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword.trim() || !newPassword.trim()) {
      setAlert({ message: "Please fill in all fields", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:1308/changepassword",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setAlert({ message: "Password updated successfully", type: "success" });

      setTimeout(() => {
        navigate("/dashboard/profile");
        window.location.reload();
      }, 1000);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <div>
      {alert.message && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={6} mb={4}>
        <Grid item md={6} xs={12} sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="password"
                label="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Button type="submit" variant="contained" color="primary">
                <Icon>lock</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                  Update Password
                </Span>
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChangeProfilePassForm;
