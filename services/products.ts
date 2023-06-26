import { useEffect, useState } from "react";
import { BASE_URL } from "@/pages/soporte/constants";
import { Product } from "@/pages/types";

export function useProductsData() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        fetch(`${BASE_URL}/v1/products`)
        .then(response =>
        {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            try {
                setProducts(data.result);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });
      
    }, []);

    return products;

}

