import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

const AssignmentTable = styled(Table)(() => ({
  minWidth: 500,
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

export default function ViewAllBoothAssignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:1308/boothassign");
      setAssignments(response.data.boothAssigns);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const OnhandleDeleteButton = async (id) => {
    try {
      await axios.delete(`http://localhost:1308/boothassign/${id}`);
      fetchAssignments();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

   async function OnhandleUpdateButton(id){

        navigate(`/dashboard/updateboothassign/${id}`)

      
        }


  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredAssignments =
    statusFilter === "all"
      ? assignments
      : assignments.filter((a) => a.status === statusFilter);

  return (
    <Card elevation={3} sx={{ pt: 2, mb: 3, ml: 4, mr: 4, mt: 5 }}>
      <CardHeader>
        <Title>All Booth Assignments</Title>
        <Select size="small" value={statusFilter} onChange={handleStatusChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="assigned">Assigned</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <AssignmentTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 2 }}>Booth Name</TableCell>
              <TableCell sx={{ px: 3 }}>Expo Name</TableCell>
              <TableCell sx={{ px: 3 }}>Assign Exhibitor</TableCell>
              <TableCell sx={{ px: 4 }}>Status</TableCell>
              <TableCell sx={{ px: 3 }}>Assigned At</TableCell>
              <TableCell sx={{ px: 5 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredAssignments.map((item, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ px: 3 }}>{item.booth?.boothNumber || "N/A"}</TableCell>
                <TableCell sx={{ px: 3 }}>{item.expo?.title || "N/A"}</TableCell>
                <TableCell sx={{ px: 3 }}>{item.assignedTo?.name || "N/A"}</TableCell>
               
                 <TableCell sx={{ px: 3 }}>
                                  <Small
                                    bgcolor={
                                      item.status === "pending"
                                        ? "#f44336"
                                        : "#1565c0"
                
                                    }
                                  >
                                    {item.status}
                                  </Small>
                                </TableCell>

                <TableCell sx={{ px: 3 }}>
                  {new Date(item.assignedAt).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ px: 3 }}>
                  <IconButton onClick={() => OnhandleUpdateButton(item._id)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => OnhandleDeleteButton(item._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </AssignmentTable>
      </Box>
    </Card>
  );
}
