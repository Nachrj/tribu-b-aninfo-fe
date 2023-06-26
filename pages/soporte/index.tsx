import {useEffect, useState} from "react";
import Table from "@/components/table";
import { Box, Button, Container } from "@mui/material";
import COLORS from "@/constants/colors";
import Typography from '@mui/material/Typography';
import { getProducts } from "@/requests/products";
import { Product } from "../types";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        getProducts(setProducts);
    }, []);

    return (
      <Container component="main" sx={{ backgroundColor: 'white', color: 'black', mt: 4 }}>
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <Typography variant="h3" component="h1">
              Proyectos
            </Typography>
            <Button 
                type="submit"
                fullWidth
                style={{backgroundColor: COLORS.button, height: '50px'}}
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '10%' }} 
                href="./soporte/crear/modificar">
                  Crear
            </Button>
          </Box>
          
          <Table 
            headerItems={["id", "name", "version_name"]}
            rowItems={products}
            linkTo="/soporte"
          />
        </Box>
      </Container>
  )
}