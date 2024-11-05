import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateproduct, singleproduct } from '../function_folder/allfunction';
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { CircularProgress } from "@mui/material"; // Circle Loader 



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                CRUD webside
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

const index = () => {

    const router = useRouter();
    const { id } = router.query;

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get product For Single Value (Start)
    const getProduct = async () => {
        try {
            const response = await singleproduct(id);
            console.log("kakaka", response);

            const reg = {
                p_name: response?.data?.p_name,
                p_size: response?.data?.p_size,
                p_color: response?.data?.p_color,
                image: response?.data?.image,
                brand: response?.data?.brand,
                price: response?.data?.price,
                p_description: response?.data?.p_description
            };
            reset(reg)
            setSize(response?.data?.p_size)
            setColor(response?.data?.p_color)

        } catch (error) {
            console.log(error);
        }
    };

    useQuery({ queryFn: getProduct, queryKey: ['singleproduct', id] }) // This line of code work as same as useEffect()
    // Get product For Single Value (End)

    const onSubmit = async (data) => {
        setLoading(true);
        const reg = {
            p_name: data.p_name,
            p_size: size,
            p_color: color,
            image: data.image,
            brand: data.brand,
            price: data.price,
            p_description: data.p_description
        };
        try {
            const response = await updateproduct({ data: reg, id })
            console.log("Product Create Response...", response);
            if (response && response?.status === 200) {
                router.push('/product')
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setLoading(false)
        }
    }

    // Handle For Size Check Box
    const handleSize = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSize([...size, value]); // Add value to size array if checked
        } else {
            setSize(size.filter(item => item !== value));
        }
    };

    // Handle For Color Check Box
    const handleColor = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setColor([...color, value]); // Add value to size array if checked
        } else {
            setColor(color.filter(item => item !== value));
        }
    };

    return (
        <>


            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 10,
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 2,
                            backgroundColor: 'white',
                            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.12)'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                            Update Product
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
                            <Grid container spacing={3}>

                                {/* Product name */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="p_name"
                                        required
                                        fullWidth
                                        id="p_name"
                                        label="Product Name"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("p_name")}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(25, 118, 210, 0.5)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#1976d2',
                                                }
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Product Size */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>
                                        Product Size
                                    </Typography>
                                    <div onChange={handleSize} value={size}>
                                        {['Large', 'Medium', 'Small'].map((label) => (
                                            <label key={label} style={{ display: 'block', margin: '5px 0', color: '#555' }}>
                                                <input
                                                    type="checkbox"
                                                    value={label}
                                                    checked={Array.isArray(size) && size.includes(label)}
                                                    style={{ marginRight: '8px' }}
                                                />{" "}
                                                {label}
                                            </label>
                                        ))}
                                    </div>
                                </Grid>

                                {/* Product Color */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>
                                        Product Color
                                    </Typography>
                                    <div onChange={handleColor} value={color}>
                                        {['Red', 'Black', 'Blue', 'Orange', 'Green', 'Yellow'].map((label) => (
                                            <label key={label} style={{ display: 'block', margin: '5px 0', color: '#555' }}>
                                                <input
                                                    type="checkbox"
                                                    value={label}
                                                    checked={Array.isArray(color) && color.includes(label)}
                                                    style={{ marginRight: '8px' }}
                                                />{" "}
                                                {label}
                                            </label>
                                        ))}
                                    </div>
                                </Grid>

                                {/* Image URL Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        name="image"
                                        fullWidth
                                        id="image"
                                        label="Image URL"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("image")}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(25, 118, 210, 0.5)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#1976d2',
                                                }
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Product brand */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="brand"
                                        required
                                        fullWidth
                                        id="brand"
                                        label="Brand"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("brand")}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(25, 118, 210, 0.5)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#1976d2',
                                                }
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Product price */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="price"
                                        required
                                        fullWidth
                                        id="price"
                                        label="Price"
                                        type="number"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("price")}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(25, 118, 210, 0.5)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#1976d2',
                                                }
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Product description */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="p_description"
                                        required
                                        fullWidth
                                        id="p_description"
                                        label="Product Description"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("p_description")}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(25, 118, 210, 0.5)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#1976d2',
                                                }
                                            }
                                        }}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 4,
                                    mb: 2,
                                    paddingY: 1.2,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    backgroundColor: '#1976d2',
                                    '&:hover': {
                                        backgroundColor: '#125a9e',
                                    },
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : "Update Product"}
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5, color: '#888' }} />
                </Container>
            </ThemeProvider>



        </>
    )
}

export default index