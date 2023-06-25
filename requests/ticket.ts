import { BASE_URL } from "@/pages/constants";

export const getTicket = (setTicket, ticket_id) => {

    const ticket = fetch(`${BASE_URL}/v1/ticket?ticket_id=${ticket_id}`, {
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
            setTicket(data.result);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

export const deleteTicket = (ticket_id) => {
    fetch(`${BASE_URL}/v1/ticket?ticket_id=${ticket_id}`, {
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

export const editTicket = (setTicket, body) => {
    fetch(`${BASE_URL}/v1/ticket`, {
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

export const createTicket = (body) => {
    fetch(`${BASE_URL}/v1/ticket`, {
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