import { SUPPORT_BASE_URL } from "@/pages/soporte/constants";

export const getTask = (setTask, task_id) => {

    fetch(`https://aninfo-backend-proyectos.onrender.com/tasks/${task_id}`, {
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
            setTask(data.result);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}


export const addTaskToTicket = (ticket_id, task_id) => {

    const body = {
        'ticket_id': ticket_id,
        'task_id': task_id
    }
    fetch(`${SUPPORT_BASE_URL}/v1/ticket/task`, {
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