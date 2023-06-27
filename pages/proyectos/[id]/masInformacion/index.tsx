import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Container, Divider } from "@mui/material";
import Typography from '@mui/material/Typography';
import { PROJECT } from '@/utils/dump';
import { Resource, statusMap } from '@/utils/types';
import { PROJECT_URL } from '@/pages/_app';
import { get } from 'http';

export default function MoreProjectInfo() {
    const [project, setProject] = useState(PROJECT)
    const [resource, setResource] = useState<Resource>()
    const router = useRouter()
    const id = router.query.id

    const getProject = () => {
        console.log('getting project with id: ', id)
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

    const getResource = () => {
        fetch(`https://recursos-squad12.onrender.com/recursos/${project.leaderId}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log("res", res)
                return res.json()
            })
            .then((resources) => {
                console.log("Got data from resources: ", resources)
                const data = resources.filter((resource: Resource) => Number(resource.legajo) === project.leaderId)[0]
                setResource(data)
        })
    };

    useEffect(() => {
        getProject()
        getResource()
      }, [])
  

    return (
        <Container component="main">
            <Box sx={{ mt: 4 }}>
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
            <Box>
                
            </Box>
        </Container>
    )
}