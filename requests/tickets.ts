import { SUPPORT_BASE_URL } from "@/constants/support";

export const getTickets = (setTickets : any, body : any) => {

    fetch(`${SUPPORT_BASE_URL}/v1/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then((data) => {
        try {
            setTickets(data.result);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}