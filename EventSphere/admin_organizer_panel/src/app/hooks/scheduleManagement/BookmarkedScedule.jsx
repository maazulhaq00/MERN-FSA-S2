import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";

// Styled Components
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

const formatTime = (timeStr) => {
  const time = new Date(timeStr);
  return time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ViewBookmarkedSessions() {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get("http://localhost:1308/schedulebookmark/all");
      setBookmarks(res.data.bookmarks); // ✅ Fix here
    } catch (err) {
      console.error("Error fetching bookmarked sessions:", err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <Card elevation={3} sx={{ pt: 2, mb: 3, ml: 4, mr: 4, mt: 5 }}>
      <CardHeader>
        <Title>Bookmarked Sessions</Title>
      </CardHeader>

      <Box overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>

  <TableBody>
  {bookmarks.map((item) => (
    <TableRow key={item._id} hover>
      <TableCell>{item.userId?.name || "N/A"}</TableCell>
      <TableCell>{item.scheduleId?.title || "N/A"}</TableCell>
      <TableCell>
        {item.scheduleId?.startTime
          ? formatTime(item.scheduleId.startTime)
          : "N/A"}
      </TableCell>
      <TableCell>
        {item.scheduleId?.endTime
          ? formatTime(item.scheduleId.endTime)
          : "N/A"}
      </TableCell>
    </TableRow>
  ))}
</TableBody>


        </StyledTable>
      </Box>
    </Card>
  );
}
