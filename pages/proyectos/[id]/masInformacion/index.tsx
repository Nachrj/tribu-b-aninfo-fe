import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Container, Divider } from "@mui/material";
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { PROJECT } from '@/utils/dump';
import { Resource, statusMap } from '@/utils/types';
import { PROJECT_URL } from '@/pages/_app';

export default function MoreProjectInfo() {
    const [project, setProject] = useState(PROJECT)
    const [resource, setResource] = useState<Resource | undefined>(undefined)
    const [info, setInfo] = useState<Map<string, string>>(new Map<string, string>())
    const [consumedHours, setConsumedHours] = useState<number>(0)
    const router = useRouter()
    const id = router.query.id

    const getProject = () => {
        fetch(`${PROJECT_URL}/projects/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("Got data from project id: ", data);
            setProject(data);
        })
        .then(() => {
            getResource();
            getConsumedHours();
            console.log('startDate: ', project.startDate)
            console.log('endDate: ', project.endDate)
            setInfo(
                new Map<string, string>([
                    ['Líder de proyecto', `${resource?.Nombre} ${resource?.Apellido}`],
                    ['Horas insumidas', `${consumedHours}`],
                    ['Fecha de inicio', `${project.startDate.toISOString()}`],
                    ['Fecha de finalización', `${project.endDate.toISOString()}`],
                ])
            )
            console.log('info: ', info)
        })
    }

    const getResource = () => {
        fetch('https://recursos-squad12.onrender.com/recursos', {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((resources) => {
            console.log("Got resources: ", resources)
            const data = resources.find((resource: Resource) => Number(resource?.legajo) === project.leaderId)
            setResource(data)
            console.log('Setting resource: ', resource)
        })
    };

    const getConsumedHours = () => {
        fetch(`${PROJECT_URL}/projects/${id}/tasks`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then((res) => {
            return res.json()
        })
        .then((tasks) => {
            console.log("Got tasks: ", tasks)
            tasks.map((task: any) => { 
                setConsumedHours(consumedHours + task.consumedHours)
                console.log('consumedHours: ', consumedHours)
            })
        })
    }

    useEffect(() => {
        getProject()
      }, [id])
  

    return (
        <Container component="main" sx={{flex: 1, height: '100%'}}>
            <Box sx={{ mt: 4, flex: 0.3 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <Typography variant="h3" component="h1">
                    {project.name}
                    </Typography>
                </Box>
                <Typography className='ml-2' variant="h6" component="h6" >
                    {statusMap.get(project.state)}
                </Typography>
                <Divider className='my-3' />
                <Typography className='ml-2' color={'gray'}>
                    {project.description}
                </Typography>
            </Box>
            
            <Box sx={{flex: 0.7, height: '80%', flexDirection: 'column', display: 'flex', alignItems: 'center', width: '70%', marginTop: '50px'}}>
                {Array.from(info.entries()).map(([key, value]) => {
                    return (
                        <>
                            <Box key={key} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                <Typography variant="h5" component="h1" sx={{marginTop: '30px', color: 'purple'}}>
                                    {key}
                                </Typography>
                                <Typography variant="h5" component="h1" sx={{marginTop: '30px'}}>
                                    {value}
                                </Typography>
                            </Box>
                            <Divider className='my-3' />
                        </>
                    )
                }
                )}
            </Box>
        </Container>
    )
}