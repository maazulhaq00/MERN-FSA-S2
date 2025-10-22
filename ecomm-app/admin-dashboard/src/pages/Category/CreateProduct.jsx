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
    Stack,
    TextField,
    Typography,
    TextareaAutosize,
    Unstable_Grid2 as Grid,
    Alert
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import CheckIcon from '@mui/icons-material/Check';


import { useEffect, useState } from 'react';
import axios from 'axios';
import { success } from 'src/theme/colors';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
    const navigate = useNavigate();

    const [categoryArray, setCategoryArray] = useState([])

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        categoryId: ""
    })


    useEffect(() => {
        fetchCategories()
    }, [])



    const fetchCategories = async () => {

        let res = await axios.get("http://localhost:3001/categories")

        console.log(res);

        setCategoryArray(res.data.categories)

    }

    const handleInputChange = (e) => {
        let { name, value } = e.target
        setProduct((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }
    const handleImageInputChange = (e) => {
        setProduct((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.files[0]
            }
        })
    }


    const handleAddProduct = async () => {
        // console.log("clickedddd");
        try {

            let formData = new FormData();

            formData.append("name", product.name)
            formData.append("description", product.description)
            formData.append("price", product.price)
            formData.append("image", product.image)
            formData.append("categoryId", product.categoryId)

            let res = await axios.post(
                "http://localhost:3001/products", formData)
            console.log(res)

            if (res.data.success) {
                alert("Product Added Successfully")
                navigate("/display-product")

            }
            else {
                alert(res.data.message)
                // setAlert({
                //     success: false,
                //     message: res.data.message
                // })
            }
        }
        catch (error) {
            console.log(error)
            if (error.response) {
                alert(error.response.data.message)
                // setAlert({
                //     success: false,
                //     message: error.response.data.message
                // })
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>
                    Create Product | eComm Admin
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
                                Create Product
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

                                        <Box sx={{ maxWidth: 420 }}>



                                            <Stack spacing={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Product Name"
                                                    name="name"
                                                    value={product.name}
                                                    onChange={handleInputChange}

                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Product Description"
                                                    name="description"
                                                    value={product.description}
                                                    onChange={handleInputChange}

                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Price"
                                                    name="price"
                                                    value={product.price}
                                                    onChange={handleInputChange}

                                                />
                                                <TextField
                                                    type='file'
                                                    fullWidth
                                                    label="Product Image"
                                                    name="image"
                                                    onChange={handleImageInputChange}

                                                />
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Category"
                                                        name='categoryId'
                                                        onChange={handleInputChange}
                                                    >
                                                        {
                                                            categoryArray.map((category) => {
                                                                return (
                                                                    <MenuItem value={category._id}>{category.categoryName}</MenuItem>
                                                                )
                                                            })
                                                        }

                                                    </Select>
                                                </FormControl>


                                            </Stack>

                                            <Box sx={{ mt: 3 }}>
                                                <Button
                                                    color="primary"
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    onClick={handleAddProduct}
                                                >
                                                    Create                                                </Button>
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

export default CreateProduct