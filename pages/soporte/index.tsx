import {useEffect, useState} from "react";
import { Box, Button, Container } from "@mui/material";
import { getProducts } from "@/requests/products";
import { Product } from "@/utils/types";
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
            <div className="text-4xl font-bold decoration-gray-400 w-fit text-black">Productos</div>
          </Box>
          <table className="min-w-full">
            <thead>
              <tr>
                  <HeaderItem title="Nombre" />
                  <HeaderItem title="Versión" />
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