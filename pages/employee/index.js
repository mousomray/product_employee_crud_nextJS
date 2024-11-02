import React, { useState } from 'react';
import { showemployee, deleteemployee } from '../function_folder/allfunction';
import { useQuery } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import Link from 'next/link';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

// Styled TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // Hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const index = () => {

    const [searchQuery, setSearchQuery] = useState(''); // For Search Customer
    const [visibleRows, setVisibleRows] = useState(6);

    // Get Answer For Use Query 
    const getRead = async () => {
        const response = await showemployee() // Call Read function
        return response
    }

    // Use Query Area
    const { isLoading, isError, data: showdata, error, refetch } = useQuery({
        queryKey: ['showdata'],
        queryFn: getRead // This line of code work as same as useEffect()
    })

    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Employee Data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await deleteemployee(id);
            refetch()
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Employee has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)

    // Handle For Search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter name based on search query
    const filteredEmployee = Array.isArray(showdata) && showdata?.filter((showdata) =>
        showdata.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    // Handle Loadmore
    const handleLoadMore = () => {
        setVisibleRows(prevVisibleRows => prevVisibleRows + 6);
    };

    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <div style={{ padding: '20px' }}>
                <input
                    type="text"
                    placeholder="Search employee..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        marginTop: '80px',
                        width: '100%',
                        padding: '15px',
                        borderRadius: '25px',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        backgroundImage: 'linear-gradient(to right, #ffffff, #f2f2f2)',
                        backgroundSize: '200% auto',
                        transition: 'background-position 0.5s ease',
                    }}
                />

                <TableContainer component={Paper} sx={{ marginTop: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>Picture</StyledTableCell>
                                <StyledTableCell sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>Name</StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>Email</StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>Phone</StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>City</StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>Pin</StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>Position</StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>Edit</StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: 'linear-gradient(to right, #6a11cb, #2575fc)', color: '#fff' }}>Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(filteredEmployee) && filteredEmployee?.slice(0, showdata.length).reverse().slice(0, visibleRows)?.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        <img
                                            src={row?.image}
                                            alt=""
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{row?.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.phone}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.city}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.pin}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.position}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Link href={`/updateemployee/${row._id}`}>
                                            <button
                                                style={{
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    padding: '8px',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
                                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
                                            >
                                                <EditIcon />
                                            </button>
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <button
                                            onClick={() => handleDelete(row._id)}
                                            style={{
                                                backgroundColor: '#f44336',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                padding: '8px',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e53935')}
                                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {visibleRows < filteredEmployee.length ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Button
                                onClick={handleLoadMore}
                                sx={{
                                    padding: '10px 30px',
                                    borderRadius: '25px',
                                    background: 'linear-gradient(to right, #4a90e2, #007aff)',
                                    color: 'white',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #007aff, #4a90e2)',
                                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Load More
                            </Button>
                        </Box>
                    ) : null}
                </TableContainer>
            </div>
        </>
    )
}

export default index