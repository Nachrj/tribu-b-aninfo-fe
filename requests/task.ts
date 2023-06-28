import { BASE_URL } from "@/pages/soporte/constants";

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
