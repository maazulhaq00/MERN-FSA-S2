import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
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
  justifyContent: "space-between"
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize"
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" }
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
}));

export default function ViewAllExpos() {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const [expos, setExpos] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const imageurl = "http://localhost:1308/uploads/";

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1308/expo");
      setExpos(response.data.expos);
    } catch (error) {
      console.error("Error fetching expos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredExpo =
    selectedStatus === "all"
      ? expos
      : expos.filter((expo) => expo.status === selectedStatus);

  const handleApplicationClick = (expoId) => {
    navigate("/dashboard/registerexpo/" + expoId);
  };

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3, ml: "30px", mr: "30px", mt: "40px" }}>
      <CardHeader>
        <Title>Expo's</Title>
        <Select size="small" value={selectedStatus} onChange={handleStatusChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="upcoming">Upcoming Expo</MenuItem>
          <MenuItem value="past">Past Expo</MenuItem>
        </Select>
      </CardHeader>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          {filteredExpo.map((expo) => (
            <Grid item xs={12} sm={6} md={4} key={expo._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={imageurl + expo.expoimage}
                  alt={expo.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {expo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {expo.theme}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: <strong>{expo.status}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Date: {new Date(expo.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2,
                    pb: 2
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => handleApplicationClick(expo._id)}
                  >
                    Application
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}
