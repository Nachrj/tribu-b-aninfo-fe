import {useEffect, useState} from "react";
import Table from "@/components/table";
import { Box, Button, Container } from "@mui/material";
import COLORS from "@/constants/colors";
import Typography from '@mui/material/Typography';
import { getProducts } from "@/requests/products";
import { Product } from "../types";
import HeaderItem from "@/components/headerItem";
import ProductGridRow from "@/components/productGridRow";

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
              Productos
            </Typography>
          </Box>
          <table className="min-w-full">
            <thead>
              <tr>
                  <HeaderItem title="Name" />
                  <HeaderItem title="Version" />
              </tr>
            </thead>

            <tbody>
                {
                    products.map((product) => ( 
                        <ProductGridRow key={product.id} product={product}/>
                    ))
                }
            </tbody>
          </table>
        </Box>
      </Container>
  )
}