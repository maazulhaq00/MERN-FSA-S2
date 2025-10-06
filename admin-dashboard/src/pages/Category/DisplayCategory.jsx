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

function DisplayCategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchCategory = async () => {

        let res = await axios.get("http://localhost:3001/categories")

        console.log(res);

        if (res.data.success) {
            setCategories(res.data.categories)
        }
        else {
            alert("error")
        }

    }

    const editCategory = (id) => {
        navigate(`/edit-category/${id}`)
    }
    const deleteCategory = async (id) => {
        try {
            let res = await axios.delete(`http://localhost:3001/categories/${id}`)

            if(res.data.success) {
                alert("category deleted successfully")
                fetchCategory()
            }
        }
        catch(err){
            console.log(err);
            alert("delete failed")
        }
    }

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
                                Display Category
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
                                                    <TableCell>Category Name</TableCell>
                                                    <TableCell align="left">Category Description</TableCell>
                                                    <TableCell align="left">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {categories.map((cat) => (
                                                    <TableRow
                                                        key={cat._id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {cat.categoryName}
                                                        </TableCell>
                                                        <TableCell align="left">{cat.categoryDescription}</TableCell>

                                                        <TableCell align="left">
                                                            <Stack direction="row" spacing={1}>
                                                                <IconButton aria-label="delete" onClick={() => editCategory(cat._id)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton aria-label="delete" onClick={() => deleteCategory(cat._id)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Stack>
                                                        </TableCell>

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

export default DisplayCategory