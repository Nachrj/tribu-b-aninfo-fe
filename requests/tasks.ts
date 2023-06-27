import { BASE_URL } from "@/pages/soporte/constants";

export const getTicketTasks = (setTasks, ticket_id) => {

    const ticket = fetch(`${BASE_URL}/v1/ticket/tasks?ticket_id=${ticket_id}`, {
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
                setTasks(data.result);
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}
