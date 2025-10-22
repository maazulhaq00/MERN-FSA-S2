import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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


export default function ViewAllAdminBooths() {
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

  const OnhandleDeleteButton = async (id) => {
    try {
      await axios.delete(`http://localhost:1308/booth/${id}`);
      fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const OnhandleUpdateButton = (id) => {
    navigate(`/dashboard/updatebooth/${id}`);
  };

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
              <TableCell sx={{ px: 4 }}>Size</TableCell>
              <TableCell sx={{ px: 4 }}>Floor</TableCell>
              <TableCell sx={{ px: 4 }}>Status</TableCell>
              <TableCell sx={{ px: 3 }}>Created At</TableCell>
              <TableCell sx={{ px: 5 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBooths.map((booth, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ px: 3 }}>{booth.boothNumber}</TableCell>
                <TableCell sx={{ px: 3 }}>{booth.size}</TableCell>
                <TableCell sx={{ px: 3 }}>{booth.floor}</TableCell>
                <TableCell sx={{ px: 3 }}>
                  <Small
                    bgcolor={
                      booth.status === "reserved"
                        ? "#f44336"
                        : "#1565c0"

                    }
                  >
                    {booth.status}
                  </Small>
                </TableCell>
                <TableCell sx={{ px: 3 }}>
                  {new Date(booth.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ px: 3 }}>
                  <IconButton onClick={() => OnhandleUpdateButton(booth._id)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => OnhandleDeleteButton(booth._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
}
