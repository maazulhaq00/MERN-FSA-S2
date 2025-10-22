// import React, {  useState } from 'react';
// // import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom';
// import {
//     Box,
//     Button,
//     Card,
//     Container,
//     Stack,
//     TextField,
//     Typography,
//     Unstable_Grid2 as Grid,
//     MenuItem,
//     Alert
// } from '@mui/material';
// import axios from 'axios';



// const AddAdmin = () => {

   

//     const [alert, setAlert] = useState({
//         message: "",
//         type: "",
//     });

//     const [admin, setAdmin] = useState({
//         image: '',
//         name: '',
//         email: '',
//         password: '',
//         role: ''

//     });

   





//     function OnhandleInputChange(e) {

//         let { name, value } = e.target;

//         setAdmin({
//             ...admin,
//             [name]: value
//         })

//     }


//     function OnhandleImageInputChange(e) {


//         setAdmin({
//             ...admin,
//             image : e.target.files[0]
//         })

//     }

//     async function OnhandleAddAdmin() {

//         try {

//             const formData = new FormData();

//             formData.append("image" , admin.image);
//             formData.append("name" , admin.name);
//             formData.append("email" , admin.email );
//             formData.append("password" ,admin.password );
//             formData.append("role" , admin.role);


//             await axios.post('http://localhost:1308/regestration', formData)

//             setAdmin({
//                    image: '',
//         name: '',
//         email: '',
//         password: '',
//         role: ''
//             })

//             setAlert({
//                 message : "Data added" , 
//                 type : "success"
//               })
//             console.log("successs")

//         }
//         catch (err) {
//             setAlert({
//                 message :  err.message, 
//                 type : "error"
//               })
//             console.log(err)

//         }




//     }






//     return (
//         <>
//             <Helmet>
//                 <title>
//                     Orders | Carpatin Free
//                 </title>
//             </Helmet>
//             <Box
//                 sx={{
//                     flexGrow: 1,
//                     py: 8
//                 }}
//             >
//                 <Container maxWidth="xl">
//                     <Stack spacing={3}>
//                         <Stack
//                             alignItems="flex-start"
//                             direction="row"
//                             justifyContent="space-between"
//                             spacing={3}
//                         >
//                             <Typography variant="h4">
//                                 Add Product
//                             </Typography>
//                             <Link to="/productlist">
//                                 <Button
//                                     color="primary"
//                                     size="large"
//                                     variant="contained"
//                                 >
//                                     Product List
//                                 </Button>
//                             </Link>
//                         </Stack>
//                         <div>
//                         <Alert severity={alert.type}>{alert.message}</Alert>
//                             <Card sx={{ p: 3 }}>

                            
//                                 <Stack
//                                     alignItems="center"
//                                     direction="row"
//                                     spacing={2}
//                                     sx={{ mb: 3 }}
//                                 >
//                                 </Stack>
//                                 <Box sx={{ maxWidth: 420 }}>
//                                     <Stack spacing={3}>

//                                          <TextField
//                                             fullWidth
//                                             label="Organizer Image"
//                                             name='image'
//                                             type='file'
//                                             onChange={OnhandleImageInputChange}
//                                         />



//                                         <TextField
//                                             fullWidth
//                                             label="Organizer Name"
//                                             name='name'
//                                             value={admin.name}
//                                             onChange={OnhandleInputChange}
//                                         />

//                                         <TextField
//                                             fullWidth
//                                             label="Organizer Email"
//                                             name='email'
//                                             value={admin.email}
//                                             onChange={OnhandleInputChange}
//                                         />

//                                         <TextField
//                                             fullWidth
//                                             label="Organizer Password"
//                                             name='password'
//                                             value={admin.password}
//                                             onChange={OnhandleInputChange}
//                                         />

                                       


//                                         <TextField

//                                             fullWidth

//                                             label="Role"
//                                             name="role"
//                                             value={admin.role}
//                                             onChange={OnhandleInputChange}
//                                             select

//                                         >
                                
                                               
//                                                      <MenuItem value="organizer">Organizer</MenuItem>
                                              
                                        
//                                         </TextField>



//                                     </Stack>

//                                     <Box sx={{ mt: 3 }}>
//                                         <Button
//                                             color="primary"
//                                             size="large"
//                                             type="submit"
//                                             variant="contained"
//                                             onClick={OnhandleAddAdmin}
//                                         >
//                                             Add Product
//                                         </Button>
//                                     </Box>
//                                 </Box>



//                             </Card>
//                         </div>
//                     </Stack>
//                 </Container>
//             </Box>
//         </>
//     );
// };

// export default AddAdmin;






import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";

import AddAdminForm from "../components/AddAdminForm";


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function AddAdmin() {
  return (
    <Container>
     

      <Stack spacing={3}>
        <SimpleCard title="Add Admin">
     <AddAdminForm/>
        </SimpleCard>

       
      </Stack>
    </Container>
  );
}


