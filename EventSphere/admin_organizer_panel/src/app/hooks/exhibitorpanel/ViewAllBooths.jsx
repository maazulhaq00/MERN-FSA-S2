import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled components
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

export default function ViewAllBooths() {
  const navigate = useNavigate();
  const [booths, setBooths] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1308/booth");
      setBooths(response.data.booths);
    } catch (error) {
      console.error("Error fetching booths:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredBooths =
    selectedStatus === "all"
      ? booths
      : booths.filter((booth) => booth.status === selectedStatus);

  return (
    <Card elevation={3} sx={{ pt: 2, mb: 3, ml: 4, mr: 4, mt: 5 }}>
      <CardHeader>
        <Title>All Booths</Title>
        <Select
          size="small"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="reserved">Reserved</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 2 }}>Booth Number</TableCell>
              <TableCell sx={{ px: 2 }}>Size</TableCell>
              <TableCell sx={{ px: 2 }}>Floor</TableCell>
              <TableCell sx={{ px: 2 }}>Status</TableCell>
              <TableCell sx={{ px: 2 }}>Created At</TableCell>
              <TableCell sx={{ px: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBooths.map((booth, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ px: 2 }}>{booth.boothNumber}</TableCell>
                <TableCell sx={{ px: 2 }}>{booth.size}</TableCell>
                <TableCell sx={{ px: 2 }}>{booth.floor}</TableCell>
                <TableCell sx={{ px: 2 }}>{booth.status}</TableCell>
                <TableCell sx={{ px: 2 }}>
                  {new Date(booth.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ px: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/dashboard/boothdetails/${booth._id}`)}
                  >
                    Manage Booth
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
}
