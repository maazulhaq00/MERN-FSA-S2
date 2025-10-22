
import Button from "@mui/material/Button";


import Icon from "@mui/material/Icon";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { Span } from "app/components/Typography";
import { useRef, useState } from "react";

import axios from "axios";
import { Alert } from "@mui/material";



const AddAdminForm = () => {

const [alert, setAlert] = useState({
        message: "",
        type: "",
    });

    const [admin, setAdmin] = useState({
        image: '',
        name: '',
        email: '',
        password: '',
        role: 'organizer'

    });

     const fileInputRef = useRef(null);
   





    function OnhandleInputChange(e) {

        let { name, value } = e.target;

        setAdmin({
            ...admin,
            [name]: value
        })

    }


    function OnhandleImageInputChange(e) {


        setAdmin({
            ...admin,
            image : e.target.files[0]
        })

    }


    async function OnhandleAddAdmin(e) {


        if (!admin.image || !admin.name.trim() || !admin.email.trim() || !admin.password.trim()
  ) {
    setAlert({
      message: "Please fill in all fields before submitting",
      type: "error",
    });
    return;  
  }
  

   e.preventDefault();

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(admin.email)) {
    setAlert({ message: "Invalid email format", type: "error" });
    return;
  }


        try {

            const formData = new FormData();

            formData.append("image" , admin.image);
            formData.append("name" , admin.name);
            formData.append("email" , admin.email );
            formData.append("password" ,admin.password );
            formData.append("role" , admin.role);


            await axios.post('http://localhost:1308/regestration', formData)

            setAdmin({
                  image : '',
                  name : '',
                  email : '',
                  password : '',
                  role : 'organizer'
                  
            })

            if (fileInputRef.current) fileInputRef.current.value = null;

            setAlert({
                message : "Admin added successfully" , 
                type : "success"
              })
            console.log("successs")

        }
       catch (err) {
  if (err.response && err.response.data && err.response.data.message) {
    
    setAlert({
      message: err.response.data.message,
      type: "error",
    });
  } else {
    
    setAlert({
      message: "Something went wrong!",
      type: "error",
    });
  }

  console.log(err);
}



  }
 

  return (
    <div>
    <Alert severity={alert.type}>{alert.message}</Alert>
        <Grid container spacing={6} mb={4}>
          <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
         
            <Stack spacing={3}>

                 <TextField
                                            fullWidth
                                            name='image'
                                            type='file'
                                            onChange={OnhandleImageInputChange}
                                             ref={fileInputRef}
                                        />
              <TextField
                fullWidth
                type="text"
                label="Organizer Name"
                name="name"
                value={admin.name}
                onChange={OnhandleInputChange}
              />
 <TextField
                fullWidth
                type="email"
                name="email"
                label="Organizer Email"
                value={admin.email}
                onChange={OnhandleInputChange}
              />

             

            

             <TextField
                fullWidth
                type="text"
                name="password"
                label="Organizer Password"
                value={admin.password}
                onChange={OnhandleInputChange}
              />
            </Stack>
          
          </Grid>

          <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
            <Stack spacing={3}>

             


        
           
           

              
              

              

             
            </Stack>
          </Grid>
        </Grid>

        <Button onClick={OnhandleAddAdmin}  type="submit" color="primary" variant="contained" >
          <Icon>send</Icon>
          <Span  sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
     
    </div>
  );
};

export default AddAdminForm;
