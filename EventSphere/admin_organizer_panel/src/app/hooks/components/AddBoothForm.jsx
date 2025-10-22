
import Button from "@mui/material/Button";


import Icon from "@mui/material/Icon";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { Span } from "app/components/Typography";
import { useRef, useState } from "react";

import axios from "axios";
import { Alert, MenuItem } from "@mui/material";
import { floor } from "lodash";



const AddBoothForm = () => {

const [alert, setAlert] = useState({
        message: "",
        type: "",
    });

    const [booth, setBooth] = useState({
         boothNumber : '',
    size: '',
    floor : '',
    status: 'available' 


    });

     const fileInputRef = useRef(null);
   





    function OnhandleInputChange(e) {

        let { name, value } = e.target;

        setBooth({
            ...booth,
            [name]: value
        })

    }


  


    async function OnhandleAddBooth(e) {


        if (!booth.boothNumber || !booth.size.trim() || !booth.floor.trim() 
  ) {
    setAlert({
      message: "Please fill in all fields before submitting",
      type: "error",
    });
    return;  
  }
  

  

        try {

            


            await axios.post("http://localhost:1308/booth", {
  boothNumber: booth.boothNumber,
  size: booth.size,
  floor: booth.floor,
  status: booth.status,
});
         


            

            setBooth({
                 boothNumber : '',
                 size : '',
                 floor : '',
                 status : ''
                  
            })

            if (fileInputRef.current) fileInputRef.current.value = null;

            setAlert({
                message : "Booth added successfully" , 
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
                type="text"
                label="Booth Number"
                name="boothNumber"
                value={booth.boothNumber}
                onChange={OnhandleInputChange}
              />


               <TextField
                fullWidth
                type="text"
                label="Booth Size"
                name="size"
                value={booth.size}
                onChange={OnhandleInputChange}
              />


<TextField
  select
  fullWidth
  label="Floor"
  name="floor"
  value={booth.floor}
  onChange={OnhandleInputChange}
>
  <MenuItem value="Floor1">Floor 1</MenuItem>
  <MenuItem value="Floor2">Floor 2</MenuItem>
  <MenuItem value="Floor3">Floor 3</MenuItem>
  <MenuItem value="Floor4">Floor 4</MenuItem>
  <MenuItem value="Floor5">Floor 5</MenuItem>

</TextField>
             



{/* <TextField
  select
  fullWidth
  label="Booth Status"
  name="status"
  value={booth.status}
  onChange={OnhandleInputChange}
>
  <MenuItem value="available">Available</MenuItem>
  <MenuItem value="reserved">Reserved</MenuItem>
</TextField> */}




            

            
            </Stack>
          
          </Grid>

          <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
            <Stack spacing={3}>

             


        
           
           

              
              

              

             
            </Stack>
          </Grid>
        </Grid>

        <Button onClick={OnhandleAddBooth}  type="submit" color="primary" variant="contained" >
          <Icon>send</Icon>
          <Span  sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
     
    </div>
  );
};

export default AddBoothForm;
