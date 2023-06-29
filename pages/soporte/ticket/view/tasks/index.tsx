import TasksGridRow from "@/components/tasksGridRow";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HeaderItem from "@/components/headerItem";
import GoBack from '@/components/backButton';
import { getInfoTasks, getTicketTasks } from "@/requests/tasks";
import { Button } from "@mui/material";
import COLORS from "@/constants/colors";
import { TicketTask } from "@/utils/types";
import { Task } from "@/utils/types";

export default function Tasks() {

    const router = useRouter();
    const {ticket_id, ticket_title} = router.query;
    const [ticketTasks, setTicketTasks] = useState<TicketTask>();
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        if (router.isReady) {
            getTicketTasks(setTicketTasks, ticket_id);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (ticketTasks) {
            getInfoTasks(setTasks, ticketTasks?.task_ids);
            console.log("TAREAS ", tasks);
        }
    }, [ticketTasks]);

    // esta funcion deberia llevar a la vista alternativa de la creacion de una task
    // se le tiene que mandar el ticket id para que cuando se cree la tarea se asocie
    const handleCreateTask = () => {
        router.push(`/soporte/ticket/view/createTask?ticket_id=${ticket_id}&ticket_title=${ticket_title}`);
    }

    return (
        <div className="container max-w-7xl mx-auto mt-8">
            <div className="mb-4">
                <GoBack/>
                <div className="flex justify-between">
                    <h1 className="text-black text-3xl font-bold decoration-gray-400">Tareas</h1>
                    <Button 
                        style={{backgroundColor: COLORS.button, height: '50px'}}
                        variant="contained"
                        sx={{ mr: 8, width: '10%' }} 
                        onClick={handleCreateTask}>
                        Crear
                    </Button>
                </div>
                <div className="justify-between flex pr-20">
                    <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500">Ticket: {ticket_title}</div>
                    <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500"> ID: {ticket_id}</div>
                </div>

            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-full">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg text-black">
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <HeaderItem title="ID" />
                                <HeaderItem title="Nombre" />
                                <HeaderItem title="Estado" />
                                <HeaderItem title="Prioridad" />
                                <HeaderItem title="Horas" />
                            </tr>
                            </thead>

                            <tbody>
                                {tasks && tasks.map((task) => (
                                    <TasksGridRow 
                                                    key={task.id}
                                                    task={task}/>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
