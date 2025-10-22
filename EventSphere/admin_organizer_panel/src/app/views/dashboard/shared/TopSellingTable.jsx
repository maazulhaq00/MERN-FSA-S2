import { useEffect, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Select from "@mui/material/Select";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Edit from "@mui/icons-material/Edit";
import { Paragraph } from "app/components/Typography";
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
  minWidth: 600,
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
  width: "fit-content",
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
}));

export default function TopSellingTable() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;

  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const res = await axios.get("http://localhost:1308/booth");
        setProductList(res.data.booths);
        setFilteredList(res.data.booths); // Initial full list
      } catch (error) {
        console.error("Error fetching booths:", error);
      }
    };
    fetchBooths();
  }, []);

  const handleFilterChange = (event) => {
    const selected = event.target.value;
    setStatusFilter(selected);

    if (selected === "all") {
      setFilteredList(productList);
    } else {
      const filtered = productList.filter((b) => b.status === selected);
      setFilteredList(filtered);
    }
  };

  const OnhandleUpdateButton = (id) => {
    navigate(`/dashboard/updatebooth/${id}`);
  };

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>All Booths</Title>
        <Select size="small" value={statusFilter} onChange={handleFilterChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="reserved">Reserved</MenuItem>
          <MenuItem value="available">Available</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Booth Number</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Size</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Floor</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredList.slice(0, 5).map((booth) => (
              <TableRow key={booth._id} hover>
                <TableCell align="center">
                  <Paragraph>{booth.boothNumber}</Paragraph>
                </TableCell>

                <TableCell align="center">{booth.size}</TableCell>
                <TableCell align="center">{booth.floor}</TableCell>

                <TableCell align="center">
                  {booth.status === "reserved" ? (
                    <Small bgcolor={bgError}>{booth.status}</Small>
                  ) : (
                    <Small bgcolor={bgPrimary}>{booth.status}</Small>
                  )}
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={() => OnhandleUpdateButton(booth._id)}>
                    <Edit color="primary" />
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
