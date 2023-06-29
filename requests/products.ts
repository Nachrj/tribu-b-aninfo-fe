import { SUPPORT_BASE_URL } from "@/constants/support";

export const getProducts = (setProducts : any) => {
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
}
