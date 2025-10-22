
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";

import Stack from "@mui/material/Stack";
import { Span } from "app/components/Typography";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Alert, MenuItem } from "@mui/material";




const AddScheduleForm = () => {

   
  const [booths, setBooths] = useState([]);
  const [expos, setExpos] = useState([]);

const [alert, setAlert] = useState({
        message: "",
        type: "",
    });

    const [schedule, setSchedule] = useState({
        expo :"",
        title   :"",
        speaker: "", 
        location: "",
        startTime:  "",
        endTime:  "",
        description:  "",

  });

     const fileInputRef = useRef(null);
   
useEffect(() => {
    FetchBooth();
    FetchExpo();
    
  }, []);


  const FetchBooth = async () => {
    try {
      const res = await axios.get("http://localhost:1308/booth");
      setBooths(res.data.booths);
    } catch {
      setAlert({ message: "Error loading booth data", type: "error" });
    }
  };

  const FetchExpo = async () => {
    try {
      const res = await axios.get("http://localhost:1308/expo");
      setExpos(res.data.expos);
    } catch {
      setAlert({ message: "Error loading expo data", type: "error" });
    }
  };





    function OnhandleInputChange(e) {

        let { name, value } = e.target;

        setSchedule({
            ...schedule,
            [name]: value
        })

    }


   



    async function OnhandleAddSchedule() {

      const { expo, title, speaker, location, startTime, endTime } = schedule;

        if (!expo || !title || !speaker || !location || !startTime || !endTime
  ) {
    setAlert({
      message: "Please fill in all fields before submitting",
      type: "error",
    });

    
 const sd = new Date(schedule.startTime);
if (isNaN(sd.getTime())) {
  setAlert({ message: "Invalid start time format", type: "error" });
  return;
}

const ed = new Date(schedule.endTime);
if (isNaN(ed.getTime())) {
  setAlert({ message: "Invalid end time format", type: "error" });
  return;
}
  }
  

  


        try {
console.log(schedule)
            


            await axios.post('http://localhost:1308/schedule', schedule);

           setSchedule({
            expo :"",
            title   :"",
            speaker: "", 
            location: "",
            startTime:  "",
            endTime:  "",
            description:  "",
      });

            if (fileInputRef.current) fileInputRef.current.value = null;

            setAlert({
                message : "Schedule added successfully" , 
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
            select
            fullWidth
            label="Select Expo"
            name="expo"
            value={schedule.expo}
            onChange={OnhandleInputChange}
            required
          >
            {expos.map((expo) => (
              <MenuItem key={expo._id} value={expo._id}>
                {expo.title}
              </MenuItem>
            ))}
          </TextField>

               
               <TextField
          label="Title"
          name="title"
          value={schedule.title}
          onChange={OnhandleInputChange}
          
          fullWidth
        />
<TextField
          label="Speaker"
          name="speaker"
          type="text"
          value={schedule.speaker}
          onChange={OnhandleInputChange}
          InputLabelProps={{ shrink: true }}
       
          fullWidth
        />


        <TextField
            select
            fullWidth
            label="Select Location"
            name="location"
            value={schedule.location}
            onChange={OnhandleInputChange}
            required
          >
            {booths.map((booth) => (
              <MenuItem key={booth._id} value={booth._id}>
                {booth.boothNumber}
              </MenuItem>
            ))}
          </TextField>


        

        

          
            </Stack>
          
          </Grid>

          <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
            <Stack spacing={3}>
      
         
        
      

        
           
           
          <TextField
          label="StartTime"
          name="startTime"
          type="datetime-local"
          value={schedule.startTime}
          onChange={OnhandleInputChange}
          InputLabelProps={{ shrink: true }}
       
          fullWidth
        />
        <TextField
          label="EndTime"
          name="endTime"
          type="datetime-local"
          value={schedule.endTime}
          onChange={OnhandleInputChange}
          InputLabelProps={{ shrink: true }}
       
          fullWidth
        />

      <TextField
  label="Description"
  name="description"
  value={schedule.description}
  onChange={(e) => {
    const value = e.target.value;

    // Allow max 3 lines
    const lines = value.split("\n");

    // Count how many visible lines (after wrapping etc.)
    const lineLimit = 3;

    // If line count is within limit, allow update
    if (lines.length <= lineLimit) {
      setSchedule({ ...schedule, description: value });
    } else {
      // Optional: Show an alert or message
      setAlert({
        message: `Description must not exceed ${lineLimit} lines.`,
        type: "error",
      });
    }
  }}
  multiline
  rows={3}
  fullWidth
/>


             
            </Stack>
          </Grid>
        </Grid>

        <Button onClick={OnhandleAddSchedule}  type="button" color="primary" variant="contained" >
          <Icon>send</Icon>
          <Span  sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
     
    </div>
  );
};

export default AddScheduleForm;
