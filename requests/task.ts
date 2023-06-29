import { SUPPORT_BASE_URL } from "@/constants/support";

export const getTask = (setTask : (a: any) => void, taskId : number) => {

    fetch(`https://aninfo-backend-proyectos.onrender.com/tasks/${taskId}`, {
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

export const addTaskToTicket = (ticketId : any, taskId : any) => {

    const body = {
        'ticket_id': ticketId,
        'task_id': taskId
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