import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
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

export default function ViewAllRegistrations() {
  const [pendingRegs, setPendingRegs] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:1308/attendeeexporeg/all");
      const pendingOnly = res.data.registrations?.filter(
        (r) => r.status === "pending"
      );
      setPendingRegs(pendingOnly);
    } catch (err) {
      console.error("Error fetching pending registrations:", err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:1308/attendeeexporeg/all/${id}`, {
        status: newStatus,
      });
      fetchPending(); // Refresh list after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <Card elevation={3} sx={{ pt: 2, mb: 3, ml: 4, mr: 4, mt: 5 }}>
      <CardHeader>
        <Title>Expo Registration Applications</Title>
      </CardHeader>

      <Box overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Expo</TableCell>
              <TableCell>Expo Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pendingRegs.map((reg) => (
              <TableRow key={reg._id} hover>
                <TableCell>{reg.user?.name || "N/A"}</TableCell>
                <TableCell>{reg.expo?.title || "N/A"}</TableCell>
                <TableCell>
                  {reg.expo?.date ? formatDate(reg.expo.date) : "N/A"}
                </TableCell>
                <TableCell>
                  <Small bgcolor="#ff9800">{reg.status}</Small>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleStatusUpdate(reg._id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleStatusUpdate(reg._id, "rejected")}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Box>
    </Card>
  );
}
