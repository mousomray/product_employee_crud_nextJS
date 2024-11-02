import React, { useState } from 'react'
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query'
import { showproduct, deleteproduct } from '../function_folder/allfunction'

// Import MUI Area
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


const index = () => {

  const [searchQuery, setSearchQuery] = useState(''); // For Search Customer
  const [visibleCards, setVisibleCards] = useState(6);

  const getData = async () => {
    const response = await showproduct()
    console.log("Product response...", response);
    return response
  }

  const { isLoading, isError, data: productlist, refetch } = useQuery({
    queryKey: ["productlist"],
    queryFn: getData
  })

  // Make Handle For Delete (Start)
  const handleDelete = async (id) => {
    // For Sweet Alert
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      await deleteproduct(id);
      refetch()
      // After Deletation Message
      Swal.fire(
        'Deleted!',
        'Product has been deleted',
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
  const filteredProduct = Array.isArray(productlist) && productlist?.filter((productlist) =>
    productlist.p_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Loadmore
  const handleLoadMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + 6);
  };

  if (isLoading) {
    return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}></h1>
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search product..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          marginTop: '80px',
          width: '100%',
          padding: '20px',
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
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={0.5} sx={{ marginTop: '20px', marginLeft: '30px', marginRight: '30px' }}> {/* Reduced spacing and negative margin */}
          {Array.isArray(filteredProduct) && filteredProduct.slice(0, filteredProduct.length).reverse().slice(0, visibleCards).map((value, index) => {
            return (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{ padding: '20px' }}
                >
                  <Card sx={{ maxWidth: 350, width: '100%', boxShadow: 3, borderRadius: 2 }}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image={value?.image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {value?.p_name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <b>Price :</b> {value?.price}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <b>Size :</b> {Array.isArray(value.p_size) ? value.p_size.join(', ') : value.p_size}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <b>Color :</b> {Array.isArray(value.p_color) ? value.p_color.join(', ') : value.p_color}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Link href={`/detailsproduct/${value._id}`}>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'blue' } }}
                        >
                          Details
                        </Button>
                      </Link>
                      <Link href={`/updateproduct/${value._id}`}>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          sx={{ backgroundColor: 'yellow', color: 'black', '&:hover': { backgroundColor: 'gold' } }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(value._id)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            )
          })}
        </Grid>
        {visibleCards < filteredProduct.length ? (
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
      </Box>
    </>
  )
}

export default index
