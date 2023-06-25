import { BASE_URL } from "@/pages/constants";

export const getProducts = (setProducts) => {
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
}
