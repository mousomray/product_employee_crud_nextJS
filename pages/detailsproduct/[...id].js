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
import { singleproduct } from '../function_folder/allfunction';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const defaultTheme = createTheme();

const index = () => {

    const router = useRouter();
    const { id } = router.query;

    // Get product For Single Value (Start)
    const getProduct = async () => {
        const response = await singleproduct(id);
        console.log("kakaka", response);
        return response?.data
    };

    const { isLoading, isError, data: detailsdata } = useQuery({
        queryKey: ['detailsdata', id],
        queryFn: getProduct
    })

    if (isLoading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>Loading...</h1>
    }

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="md" style={{ marginTop: '50px', padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)' }}>
                    <CssBaseline />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={`http://localhost:3004/${detailsdata?.image}`} alt="" />
                        <Typography component="h1" variant="h4" style={{ color: '#333', marginBottom: '20px', fontWeight: 'bold' }}>
                            {detailsdata?.p_name}
                        </Typography>
                        <Typography variant="h6" style={{ margin: '10px 0', color: '#555', fontStyle: 'italic' }}>
                            Price: ${detailsdata?.price}
                        </Typography>

                        <Typography variant="body1" style={{ margin: '10px 0', color: '#666' }}>
                            <strong>Size:</strong> {detailsdata && Array.isArray(detailsdata?.p_size) ? detailsdata.p_size.join(', ') : detailsdata?.p_size}
                        </Typography>

                        <Typography variant="body1" style={{ margin: '10px 0', color: '#666' }}>
                            <strong>Color:</strong> {detailsdata && Array.isArray(detailsdata?.p_color) ? detailsdata.p_color.join(', ') : detailsdata?.p_color}
                        </Typography>

                        <Typography variant="body1" style={{ margin: '10px 0', color: '#666' }}>
                            <strong>Description:</strong> {detailsdata?.p_description}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}
                            onClick={() => router.push('/product')}
                        >
                            Go to Product Page
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default index