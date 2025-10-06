import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    FormHelperText,
    MenuItem,
    Stack,
    TextField,
    Typography,
    TextareaAutosize,
    Unstable_Grid2 as Grid,
    Alert
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';


import { useEffect, useState } from 'react';
import axios from 'axios';
import { success } from 'src/theme/colors';
import { useNavigate, useParams } from 'react-router-dom';

function EditCategory() {
    const [category, setCategory] = useState({
        categoryName: "",
        categoryDescription: ""
    })

    const navigate = useNavigate();
    const {id} = useParams()
   
    useEffect(()=> {
        fetchCategory()
    }, [])
    
    const fetchCategory = async () => {
        
        let res = await axios.get(`http://localhost:3001/categories/${id}`)
        
        if(res.data.success){
            setCategory(res.data.category)
        }
    }

    




    const [alert, setAlert] = useState({
        success: true,
        message: ""
    })

    const handleInputChange = (e) => {
        let { name, value } = e.target
        setCategory((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const handleUpdateCategory = async () => {
        // console.log("clickedddd");
        try {
            let res = await axios.put(
                `http://localhost:3001/categories/${id}`, 
                category
            )
            console.log(res)

            if (res.data.success) {
                navigate("/display-category")
            }
            else {
                // alert(res.data.message)
                setAlert({
                    success: false,
                    message: res.data.message
                })
            }
        }
        catch (error) {
            console.log(error)
            if (error.response) {
                // alert(error.response.data.message)
                setAlert({
                    success: false,
                    message: error.response.data.message
                })
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>
                    Edit Category | eComm Admin
                </title>
            </Helmet>
            <Box
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                                Edit Category
                            </Typography>
                        </div>
                        <div>
                            <Grid
                                container
                                spacing={3}
                            >

                                <Grid
                                    xs={12}
                                    md={8}
                                >
                                    <Card sx={{ p: 3 }}>
                                        {
                                            alert.message && <Alert severity={alert.success ? "success" : "error"}>
                                                {alert.message}
                                            </Alert>
                                        }
                                        <Box sx={{ maxWidth: 420 }}>



                                            <Stack spacing={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Category Name"
                                                    name="categoryName"
                                                    value={category.categoryName}
                                                    onChange={handleInputChange}

                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Category Description"
                                                    name="categoryDescription"
                                                    value={category.categoryDescription}
                                                    onChange={handleInputChange}

                                                />

                                            </Stack>

                                            <Box sx={{ mt: 3 }}>
                                                <Button
                                                    color="primary"
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    onClick={handleUpdateCategory}
                                                >
                                                    Edit                                                </Button>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>)
}

export default EditCategory