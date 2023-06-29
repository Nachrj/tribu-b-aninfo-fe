import { useEffect, useState } from "react";
import { SUPPORT_BASE_URL } from "@/constants/support";
import { Product } from "@/utils/types";

export function useProductsData() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        fetch(`${SUPPORT_BASE_URL}/v1/products`)
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

