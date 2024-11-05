import React from "react";
import { useQuery } from "@tanstack/react-query";
import { showbrands } from "../function_folder/allfunction";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import { Paper } from "@mui/material";
import Link from "next/link";

// Styled Paper component for the brand list container
const BrandContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  margin: "10px 0",
}));

const Brand = () => {
  const getBrands = async () => {
    const response = await showbrands();
    console.log("Brand response...", response);
    return response;
  };

  const { isLoading, isError, data: mybrands } = useQuery({
    queryKey: ["mybrands"],
    queryFn: getBrands,
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
        Error fetching brands. Please try again later.
      </Typography>
    );
  }

  return (
    <BrandContainer>
      <Typography variant="h5" component="h2" gutterBottom>
        Brand Categories
      </Typography>
      <List>
        <ListItem component={Link} href="/product" sx={{ cursor: "pointer" }}>
          <ListItemText primary="All" />
        </ListItem>
        {mybrands?.map((value) => (
          <ListItem
            key={value.id}
            component={Link}
            href={`/branddetails/${value.slug}`}
          >
            <ListItemText primary={value?.name} />
          </ListItem>
        ))}
      </List>
    </BrandContainer>
  );
};

export default Brand;
