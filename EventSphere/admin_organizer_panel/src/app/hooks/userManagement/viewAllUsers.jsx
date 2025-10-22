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


import Delete from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import axios from "axios";


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








export default function ViewAllUsers() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const [users , setUsers] = useState([]);
   const [selectedRole, setSelectedRole] = useState("all");
const imagrurl = "http://localhost:1308/uploads/"

  let fetchData = async () => {

    const response = await axios.get('http://localhost:1308/users');
    console.log(response);
    setUsers(response.data.users);



  }

  useEffect(() => {
    fetchData();
  }
    , [])


      function handleRoleChange(e){

    setSelectedRole(e.target.value);
    
      }



     const filteredUsers =
    selectedRole === "all" ? users : users.filter((user) => user.role === selectedRole);


    async function OnhandleDeleteButton(id){

      await axios.delete(`http://localhost:1308/users/${id}`)

      fetchData();
    
      }






  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 , ml : "30px" , mr : "30px" , mt : "40px"}}>
      <CardHeader>
        <Title>Users</Title>
        <Select
          size="small"
          value={selectedRole}
          // onChange={(e) => setSelectedRole(e.target.value)}
          onChange={handleRoleChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="organizer">Organizer</MenuItem>
          <MenuItem value="exhibitor">Exhibitor</MenuItem>
          <MenuItem value="attendee">Attendee</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>

                <TableCell  colSpan={2} sx={{ px: 3 }}>
                Image
              </TableCell>
              <TableCell  colSpan={2} sx={{ px: 3 }}>
                Name
              </TableCell>

              <TableCell colSpan={3} sx={{ px: 5 }}>
                Email
              </TableCell>

               <TableCell colSpan={2} sx={{ px: 2 }}>
                Role
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Created At
              </TableCell>

              <TableCell colSpan={1} sx={{ px: 0 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index} hover>

                 <TableCell align="left" colSpan={2}>

                  <img 
  src={imagrurl + user.image} 
  alt={user.name} 
  width={50} 
  height={50}
  style={{ borderRadius: "50%" }}
/>
                           
                            </TableCell>
                
                  <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {user.name}
                </TableCell>


                  <TableCell align="left" colSpan={3} sx={{ px: 0,  }}>
                 {user.email}
                </TableCell>


                {/* <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                {user.role}
                </TableCell> */}


                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                                  <Small
                                      bgcolor={
    user.role === "organizer"
      ? "#1565c0" 
      : user.role === "exhibitor"
      ? "#4caf50" 
      : user.role === "attendee"
      ? "#ff9800" 
      : "#9e9e9e" 
  }
                                  >
                                    {user.role}
                                  </Small>
                                </TableCell>

                 <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
               {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>

              

                <TableCell align="left" sx={{ px: 0 }} colSpan={1}>
                  <IconButton onClick={()=>OnhandleDeleteButton(user._id)}> 
                   
                    <Delete color="error" />
                    

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


