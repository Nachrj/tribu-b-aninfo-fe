import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Table from '@/components/table';
import { Box, Button, Container, Divider } from "@mui/material";
import COLORS from '@/constants/colors';
import Typography from '@mui/material/Typography';
import { prioritiesMap, statusMap } from '@/utils/types';
import { PROJECT } from '@/utils/dump';
import { PROJECT_URL } from '@/pages/_app';
import PopUpConfirmAction from '@/components/popUpConfirmAction';
import GoBackIcon from '@/components/backButton';

export default function ProjectsTasks() {
    const [project, setProject] = useState(PROJECT)
    const [tasks, setTasks] = useState([])
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState<number | undefined>(undefined);
    const [localStorageId, setId] = useState<string | undefined>(undefined);
    const router = useRouter()
    const id = router.query.id

    const getProject = (id: string) => {
        fetch(`${PROJECT_URL}/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            console.log("res", res)
            return res.json()
        })
        .then((data) => {
            console.log("Got data from projects id: ", data)
            setProject(data)
        })
    }

    const getTasks = (id: string | undefined) => {
        fetch(`${PROJECT_URL}/projects/${id}/tasks`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
              .then((res) => {
                  console.log("res", res)
                  return res.json()
              })
              .then((data) => {
                  console.log("Got data from tasks: ", data)
                  setTasks(data.map((task : any) => { 
                    return { 
                        id: task.id, 
                        nombre: task.name, 
                        estado: statusMap.get(task.state), 
                        prioridad: prioritiesMap.get(task.priority) 
                    }
                }))
              })
    }

    const handleDeleteConfirm = () => {
        fetch(`${PROJECT_URL}/tasks/${taskIdToDelete}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
        })
        .then((res) => {
            console.log("res", res)
        })
        .then(() => {
            getTasks(localStorageId)
        })
        setShowConfirmDelete(false);
        setTaskIdToDelete(undefined);
    };

    useEffect(() => {
        const storedId = localStorage.getItem('projectId');
        if (storedId) {
            setId(storedId);
            getProject(storedId);
            getTasks(storedId);
        }
    }, []);
  

    return (
        <Container component="main">
            <Box sx={{ mt: 4 }}>
                <GoBackIcon/>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <Typography variant="h3" component="h1">
                    {project.name}
                    </Typography>
                    <Button 
                        type="submit"
                        fullWidth
                        style={{backgroundColor: COLORS.button, height: '50px'}}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, width: '12%' }} 
                        href={`./${id}/editar`}>
                        Editar
                    </Button>
                </Box>
                <Typography className='ml-2' variant="h6" component="h6" >
                    {statusMap.get(project.state)}
                </Typography>
                <Divider className='my-3' />
                <Typography className='ml-2' color={'gray'}>
                    {project.description}
                </Typography>
                <Button 
                    color='secondary' 
                    style={{textTransform: 'none'}}
                    onClick={() => {
                        console.log('Redireccionando a mas informacion')
                        console.log('Project id: ', id)
                        router.push({
                            pathname: `./${id}/masInformacion`,
                            query: { project: JSON.stringify(project) }
                        });
                    }}
                >
                    Ver más información
                </Button>
                <Table 
                    rowItems={tasks}
                    headerItems={["id", "nombre", "estado", "prioridad", "", ""]}
                    onDelete={(taskId: number) => {
                        console.log('Borrando task con id: ', taskId)
                        setTaskIdToDelete(taskId);
                        setShowConfirmDelete(true);
                    }}
                    onEdit={(taskId: number) => {
                        console.log('Editando task con id: ', taskId)
                        router.push(`./tareas/${taskId}/editarTarea?projectId=${id}`)
                    }
                    }
                />
                <PopUpConfirmAction
                    show={showConfirmDelete}
                    title="Confirmar eliminación"
                    message="¿Estás seguro de que deseas eliminar esta tarea?"
                    onClickAcept={handleDeleteConfirm}
                    onClickClose={() => setShowConfirmDelete(false)}
                />
                <Button 
                    type="submit"
                    fullWidth
                    style={{backgroundColor: COLORS.button, height: '50px'}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '15%' }} 
                    href={`./${id}/crearTarea`}>
                    Crear tarea
                </Button>
            </Box>
        </Container>
    )
}