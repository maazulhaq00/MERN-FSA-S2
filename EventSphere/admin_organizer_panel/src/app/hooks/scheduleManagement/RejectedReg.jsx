import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";

// Styled components
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

const StyledTable = styled(Table)(() => ({
  minWidth: 600,
  "& td, & th": {
    borderBottom: "1px solid #ccc",
    textAlign: "left",
    padding: "12px",
    width: "20%",
  },
  "& td:first-of-type, & th:first-of-type": {
    paddingLeft: "25px",
  },
}));

const Small = styled("small")(({ bgcolor }) => ({
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "4px",
  fontSize: "13px",
  fontWeight: "500",
  background: bgcolor,
  textTransform: "capitalize",
  height: "24px",
  display: "inline-block",
  lineHeight: "16px",
}));

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export default function RejectedSessionRegistrations() {
  const [rejectedSessions, setRejectedSessions] = useState([]);

  const fetchRejected = async () => {
    try {
      const res = await axios.get("http://localhost:1308/attendeeeschedulereg/all");
      const rejectedOnly = res.data.registrations?.filter(
        (r) => r.status === "rejected"
      );
      setRejectedSessions(rejectedOnly);
    } catch (err) {
      console.error("Error fetching rejected session registrations:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1308/attendeeeschedulereg/all/${id}`);
      fetchRejected(); // Refresh after delete
    } catch (err) {
      console.error("Error deleting registration:", err);
    }
  };

  useEffect(() => {
    fetchRejected();
  }, []);

  return (
    <Card elevation={3} sx={{ pt: 2, mb: 3, ml: 4, mr: 4, mt: 5 }}>
      <CardHeader>
        <Title>Rejected Schedule Registrations</Title>
      </CardHeader>

      <Box overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 5 }}>User</TableCell>
              <TableCell>Schedule Title</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rejectedSessions.map((reg) => (
              <TableRow key={reg._id} hover>
                <TableCell sx={{ pl: 2 }}>
                  {reg.user?.name || "N/A"}
                </TableCell>
                <TableCell>{reg.schedule?.title || "N/A"}</TableCell>
                <TableCell>
                  {reg.schedule?.startTime
                    ? formatDate(reg.schedule.startTime)
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Small bgcolor="#f44336">{reg.status}</Small>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(reg._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Box>
    </Card>
  );
}
