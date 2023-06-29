import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Divider } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Project, Resource, statusMap } from '@/utils/types';
import GoBackIcon from '@/components/backButton';

export default function MoreProjectInfo() {
    const [info, setInfo] = useState<Map<string, string>>(new Map<string, string>())
    const [consumedHours, setConsumedHours] = useState<number>(0)
    const router = useRouter()
    const projectParam = router.query.project;
    const project = typeof projectParam === 'string' ? JSON.parse(projectParam) as Project : null;

    useEffect(() => {
      if(project) {
        fetch(`https://cargahoras-squad12.onrender.com/horas/proyecto/${project.id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              }, 
            })
            .then((res) => res.json())
            .then((hours) => {
                console.log("Got hours from project: ", hours);
                setConsumedHours(hours);
            });
      }
    }, [])

    useEffect(() => {
      if (project) {
        fetch("https://recursos-squad12.onrender.com/recursos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Got data from resources: ", data);
            let leader = data.find((resource: Resource) => Number(resource.legajo) === project.leaderId);
            if (leader) {
              leader = `${leader.Nombre} ${leader.Apellido}`;
            } else {
              leader = "No hay líder asignado";
            }
            setInfo(
              new Map([
                ['Líder de proyecto', leader],
                ['Horas insumidas', consumedHours.toString()],
                ['Fecha de inicio', `${new Date(project.startDate).toLocaleDateString()}`],
                ['Fecha de finalización', `${new Date(project.endDate).toLocaleDateString()}`],
              ])
            );
          });
      }
    }, [consumedHours]);
    

    if(!project) {
        return <div>Loading...</div>
    }

    return (
        <Container component="main" sx={{flex: 1, height: '100%'}}>
            <Box sx={{ mt: 4, flex: 0.3 }}>
                <GoBackIcon/>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <Typography variant="h3" component="h1">
                    {project!.name}
                    </Typography>
                </Box>
                <Typography className='ml-2' variant="h6" component="h6" >
                    {statusMap.get(project!.state)}
                </Typography>
                <Divider className='my-3' />
                <Typography className='ml-2' color={'gray'}>
                    {project!.description}
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