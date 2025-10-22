


import Button from "@mui/material/Button";


import Icon from "@mui/material/Icon";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { Span } from "app/components/Typography";
import { useRef, useState } from "react";

import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";



const AddExpoForm = () => {

    const navigate = useNavigate();

const [alert, setAlert] = useState({
        message: "",
        type: "",
    });

    const [expo, setExpo] = useState({
    expoimage: "",
    title: "",
    date: "",
    description: "",
    theme: "",
    status: "upcoming",
  });

     const fileInputRef = useRef(null);
   





    function OnhandleInputChange(e) {

        let { name, value } = e.target;

        setExpo({
            ...expo,
            [name]: value
        })

    }


    function OnhandleImageInputChange(e) {


        setExpo({
            ...expo,
            expoimage : e.target.files[0]
        })

    }

async function OnhandleAddExpo(e) {
  if (!expo.expoimage || !expo.title.trim() || !expo.date || !expo.theme.trim()) {
    setAlert({
      message: "Please fill in all fields before submitting",
      type: "error",
    });
    return;
  }


  const expoDate = new Date(expo.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  expoDate.setHours(0, 0, 0, 0);

  let status = "upcoming";
  if (expoDate.getTime() === today.getTime()) {
    status = "ongoing";
  } else if (expoDate < today) {
    status = "past";
  }

  try {
    const formData = new FormData();
    formData.append("expoimage", expo.expoimage);
    formData.append("title", expo.title);
    formData.append("date", expo.date);
    formData.append("description", expo.description);
    formData.append("theme", expo.theme);
    formData.append("status", status); // use calculated status

    await axios.post("http://localhost:1308/expo", formData);

    setExpo({
      expoimage: "",
      title: "",
      date: "",
      description: "",
      theme: "",
      status: "upcoming",
    });

    if (fileInputRef.current) fileInputRef.current.value = null;

    setAlert({
      message: "Expo added successfully",
      type: "success",
    });

    // navigate('/dashboard/viewallexpos') // optional
  } catch (err) {
    setAlert({
      message: err.response?.data?.message || "Something went wrong!",
      type: "error",
    });
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
                                            name='expoimage'
                                            type='file'
                                            onChange={OnhandleImageInputChange}
                                             inputRef={fileInputRef}
                                        />
               <TextField
          label="Title"
          name="title"
          value={expo.title}
          onChange={OnhandleInputChange}
          
          fullWidth
        />
<TextField
          label="Date"
          name="date"
          type="date"
          value={expo.date}
          onChange={OnhandleInputChange}
          InputLabelProps={{ shrink: true }}
       
          fullWidth
        />

<TextField
          label="Theme"
          name="theme"
          value={expo.theme}
          onChange={OnhandleInputChange}
      
          fullWidth
        />

        

          
            </Stack>
          
          </Grid>

          <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
            <Stack spacing={3}>
               

             


       

         


         {/* <TextField
          select
          label="Status"
          name="status"
          value={expo.status}
          onChange={OnhandleInputChange}
          fullWidth
        >
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="past">Past</MenuItem>
        </TextField> */}

        
           
           
  <TextField
          label="Description"
          name="description"
          value={expo.description}
          onChange={OnhandleInputChange}
          multiline
          rows={5}
          fullWidth
        />
              
              

              

             
            </Stack>
          </Grid>
        </Grid>

        <Button onClick={OnhandleAddExpo}  type="button" color="primary" variant="contained" >
          <Icon>send</Icon>
          <Span  sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
     
    </div>
  );
};

export default AddExpoForm;
