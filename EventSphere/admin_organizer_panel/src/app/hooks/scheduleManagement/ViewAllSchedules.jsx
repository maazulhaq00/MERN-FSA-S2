import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  textTransform: "capitalize",
}));

export default function ViewAllSchedule() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:1308/schedule");
    setSchedule(response.data.schedules);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const OnhandleDeleteButton = async (id) => {
    await axios.delete(`http://localhost:1308/schedule/${id}`);
    fetchData();
  };

  const OnhandleUpdateButton = (id) => {
    navigate(`/dashboard/updateschedule/${id}`);
  };

  // Local time formatter
  const formatTime = (time) => {
    if (!time) return "N/A";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card
      elevation={3}
      sx={{ pt: "20px", mb: 3, ml: "30px", mr: "30px", mt: "40px" }}
    >
      <CardHeader>
        <Title>All Schedules</Title>
      </CardHeader>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={3}>
          {schedule.map((schedul) => {
            const expoTitle = schedul.expo?.title || "N/A";
            const location = schedul.location;
            const locationInfo = location
              ? `${location.name || ""}${
                  location.boothNumber ? ` (Booth ${location.boothNumber})` : ""
                }`
              : "N/A";

            return (
              <Grid item xs={12} sm={6} md={6} key={schedul._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" sx={{ mb: 1.2 }}>
                      <strong>Title:</strong> {schedul.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.2 }}>
                      <strong>Expo:</strong> {expoTitle}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.2 }}>
                      <strong>Speaker:</strong> {schedul.speaker}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.2 }}>
                      <strong>Location:</strong> {locationInfo}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.2 }}>
                      <strong>Start Time:</strong> {formatTime(schedul.startTime)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.2 }}>
                      <strong>End Time:</strong> {formatTime(schedul.endTime)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1.2,
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <strong>Description:</strong> {schedul.description || "N/A"}
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      mt: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => OnhandleUpdateButton(schedul._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => OnhandleDeleteButton(schedul._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
}
