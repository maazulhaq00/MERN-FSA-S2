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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import { useEffect, useState } from 'react';
import axios from 'axios';
import { success } from 'src/theme/colors';
import { useNavigate } from 'react-router-dom';

function DisplayProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([])

    let imgUrl = "http://localhost:3001/uploads/"

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {

        let res = await axios.get("http://localhost:3001/products")

        console.log(res);

        if (res.data.success) {
            setProducts(res.data.products)
        }
        else {
            alert("error")
        }

    }

    // const editCategory = (id) => {
    //     navigate(`/edit-category/${id}`)
    // }
    // const deleteCategory = async (id) => {
    //     try {
    //         let res = await axios.delete(`http://localhost:3001/categories/${id}`)

    //         if(res.data.success) {
    //             alert("category deleted successfully")
    //             fetchCategory()
    //         }
    //     }
    //     catch(err){
    //         console.log(err);
    //         alert("delete failed")
    //     }
    // }

    return (
        <>
            <Helmet>
                <title>
                    Display Category | eComm Admin
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
                                Display Products
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
                                    {/* {
                                            alert.message && <Alert severity={alert.success ? "success" : "error"}>
                                                {alert.message}
                                            </Alert>
                                        } */}


                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Product Name</TableCell>
                                                    <TableCell align="left">Description</TableCell>
                                                    <TableCell align="left">Price</TableCell>
                                                    <TableCell align="left">Image</TableCell>
                                                    <TableCell align="left">Category</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {products.map((product) => (
                                                    <TableRow
                                                        key={product._id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {product.name}
                                                        </TableCell>
                                                        <TableCell align="left">{product.description}</TableCell>
                                                        <TableCell align="left">{product.price}</TableCell>
                                                        <TableCell align="left">
                                                        
                                                            {/* {product.image} */}
                                                            <img width="100" height="100"
                                                            src={imgUrl + product.image} alt="" />
                                                        
                                                        </TableCell>
                                                        <TableCell align="left">{product.categoryId.categoryName}</TableCell>

                                                      
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>


                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>)
}

export default DisplayProduct