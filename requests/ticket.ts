import { SUPPORT_BASE_URL } from "@/constants/support";

export const getTicket = (setTicket : (a: any) => void, ticketId : any) => {

    fetch(`${SUPPORT_BASE_URL}/v1/ticket?ticket_id=${ticketId}`, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then((data) => {
        try {
            if (data.result) {
                setTicket(data.result);
            }  else {
                setTicket({}); // Set an empty value instead of undefined
              }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

export const deleteTicket = (ticketId : any) => {
    fetch(`${SUPPORT_BASE_URL}/v1/ticket?ticket_id=${ticketId}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then((data) => {
        try {
            console.log(data.result)
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

export const editTicket = (setTicket : any, body : any) => {
    fetch(`${SUPPORT_BASE_URL}/v1/ticket`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
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
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

export const createTicket = (body : any) => {
    fetch(`${SUPPORT_BASE_URL}/v1/ticket`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
            console.log(data);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}