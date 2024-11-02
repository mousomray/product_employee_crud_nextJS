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
import { updateemployee, singleemployee } from '../function_folder/allfunction';
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
    const [loading, setLoading] = useState(false);

    // Get product For Single Value (Start)
    const getEmployee = async () => {
        try {
            const response = await singleemployee(id);
            console.log("kakaka", response);

            const reg = {
                name: response?.data?.name,
                email: response?.data?.email,
                phone: response?.data?.phone,
                city: response?.data?.city,
                pin: response?.data?.pin,
                position: response?.data?.position,
                image: response?.data?.image
            };
            reset(reg)
        } catch (error) {
            console.log(error);
        }
    };

    useQuery({ queryFn: getEmployee, queryKey: ['singleemployee', id] }) // This line of code work as same as useEffect()
    // Get product For Single Value (End)

    const onSubmit = async (data) => {

        setLoading(true);

        const reg = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            pin: data.pin,
            position: data.position,
            image: data.image
        };

        try {
            const response = await updateemployee({ data: reg, id })
            console.log("Employee Create Response...", response);
            if (response && response?.status === 200) {
                reset()
                router.push('/employee')
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setLoading(false)
        }
    }

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
                            Update Employee
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
                            <Grid container spacing={3}>

                                {/* Employee name */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Employee Name"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("name")}
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

                                {/* Employee email */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="email"
                                        type='email'
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("email")}
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

                                {/* Phone */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="phone"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("phone")}
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

                                {/* City */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="city"
                                        required
                                        fullWidth
                                        id="city"
                                        label="City"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("city")}
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

                                {/* Pin */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="pin"
                                        required
                                        fullWidth
                                        id="pin"
                                        label="Pin"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("pin")}
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

                                {/* Position */}
                                <Grid item xs={12}>
                                    <TextField
                                        name="position"
                                        required
                                        fullWidth
                                        id="position"
                                        label="Position"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("position")}
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

                                {/* Image URL Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        name="image"
                                        fullWidth
                                        id="image"
                                        label="Image URL"
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
                                {loading ? <CircularProgress size={24} /> : "Update Employee"}
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