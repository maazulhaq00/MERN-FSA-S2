import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Container, TextField, Typography, Button, Stack, Paper, MenuItem
} from "@mui/material";
import axios from "axios";

const EditMeal = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [meal, setMeal] = useState({
    mealname: "",
    mealcalories: "",
    mealprotein: "",
    mealfats: "",
    mealcarbs: "",
    mealtype: ""
  });

  const [mealTypes, setMealTypes] = useState([]); // for dropdown

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axios.get(`http://localhost:1001/meals/${id}`);

        setMeal(res.data.Meal);
        console.log(meal);
      } catch (err) {
        console.log("Fetch error:", err.message);
      }
    };

    const fetchTypes = async () => {
      try {
        const res = await axios.get("http://localhost:1001/mealstypes"); 
        setMealTypes(res.data.categories); 
        // console.log(res);
        
      } catch (err) {
        console.error("Error fetching meal types:", err.message);
      }
    };

    fetchMeal();
    fetchTypes();
  }, []);

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1001/meals/${id}`, meal);
      alert("Meal updated successfully");
      navigate("/Meal");
    } catch (err) {
      alert("Update failed");
      console.error(err.message);
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" mb={3} align="center">
            🍽️ Edit Meal
          </Typography>
          <form onSubmit={handleUpdate}>
            <Stack spacing={2}>
              <TextField name="mealname" label="Meal Name" value={meal.mealname} onChange={handleChange} fullWidth />
              <TextField name="mealcalories" label="Calories" value={meal.mealcalories} onChange={handleChange} fullWidth />
              <TextField name="mealprotein" label="Protein" value={meal.mealprotein} onChange={handleChange} fullWidth />
              <TextField name="mealfats" label="Fats" value={meal.mealfats} onChange={handleChange} fullWidth />
              <TextField name="mealcarbs" label="Carbs" value={meal.mealcarbs} onChange={handleChange} fullWidth />

              <TextField
                select
                name="mealtype"
                label="Meal Type"
                value={meal.mealtype}
                onChange={handleChange}
                fullWidth
                required
              >
                {mealTypes.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.Mealtype}
                  </MenuItem>
                ))}
              </TextField>

              <Button type="submit" variant="contained" fullWidth>Update</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditMeal;
