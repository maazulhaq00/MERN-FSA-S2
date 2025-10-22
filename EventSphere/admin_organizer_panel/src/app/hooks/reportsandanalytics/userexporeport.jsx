import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { styled } from "@mui/material/styles";


const CardHeader = styled(Box)(() => ({
  display: "flex",
  padding: "16px 24px",
  justifyContent: "space-between",
  alignItems: "center",
}));

const Title = styled("h2")(() => ({
  fontSize: "1.2rem",
  fontWeight: "600",
}));

export default function UserExpoReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const res = await axios.get("http://localhost:1308/attendeeexporeg/report");
      setReport(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch report", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!report) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">Failed to load report</Typography>
      </Box>
    );
  }

  const dateData = Object.entries(report.registrationsByDate).map(([date, count]) => ({
    date,
    count,
  }));

  const expoData = Object.entries(report.registrationsByExpo).map(([expo, count]) => ({
    expo,
    count,
  }));

  return (
    <Box p={4}>
      {/* <Typography variant="h5" gutterBottom>User Engagement Report</Typography> */}
      <CardHeader>
        <Title>Attendee Expo Engagement Report</Title>
      </CardHeader>

      {/* Summary Cards */}
      <Grid container spacing={3} mt={2} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Registrations</Typography>
              <Typography variant="h6">{report.total}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Approved</Typography>
              <Typography variant="h6" color="green">{report.approved}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Pending</Typography>
              <Typography variant="h6" color="orange">{report.pending}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Rejected</Typography>
              <Typography variant="h6" color="red">{report.rejected}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Registrations by Date Chart */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📅Today Registrations
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dateData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Registrations by Expo */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🏢 Registrations by Expo
          </Typography>
          {expoData.map(({ expo, count }) => (
            <Box key={expo} display="flex" justifyContent="space-between" py={1} borderBottom="1px solid #eee">
              <Typography>{expo}</Typography>
              <Typography fontWeight={600}>{count}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
