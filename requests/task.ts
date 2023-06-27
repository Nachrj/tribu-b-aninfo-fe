import { BASE_URL } from "@/pages/soporte/constants";

export const getTask = (setTask, task_id) => {

    const ticket = fetch(`${BASE_URL}/tasks/${task_id}`, {
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
                setTask(data.result);
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}
