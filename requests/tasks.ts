import { SUPPORT_BASE_URL } from "@/constants/support";

export const getTicketTasks = (setTasks : (a: any) => void, ticketId : any) => {

    fetch(`${SUPPORT_BASE_URL}/v1/ticket/tasks?ticket_id=${ticketId}`, {
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

export const getInfoTasks = (setTasks : (a: any) => void, tasksIds : number[]) => {
    const ids = tasksIds.join(',');
    // url should be the constant of PROJECTS BASE URL
    const url = 'https://aninfo-backend-proyectos.onrender.com';
    const fullUrl = `${url}/tasks?ids=${ids}`;
    fetch(fullUrl, {
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
            setTasks(data);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}