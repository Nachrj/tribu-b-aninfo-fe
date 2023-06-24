import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@/components/table';
import { Box, Button } from "@mui/material";
import COLORS from '@/constants/colors';

const PROJECT = {
    id: 1,
    nombre: "Sistema de HomeBanking",
    cliente: "HSBC",
    estado: "Iniciado",
    description: "Proyecto para un banco para sistema online",
    tasks: [
        { id: 1, nombre: "Relevamiento", estado: "Iniciado", prioridad: "Alta", fecha: "2021-10-10" },
        { id: 2, nombre: "Diseño", estado: "Iniciado", prioridad: "Alta", fecha: "2021-10-10" },
    ]
}

export default function ProjectsTasks() {
    const [project, setProject] = useState(PROJECT)
    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        fetch(`https://aninfo-backend-proyectos.onrender.com/projects/${id}`, {
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
      }, [])
  

    return (
        <div style={{ padding: "4em" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1 className="text-3xl font-bold decoration-gray-400 pr-10">{project.name}</h1>
                <Button 
                    type="submit"
                    fullWidth
                    style={{backgroundColor: COLORS.button, height: '50px'}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '12%' }} 
                    href={`./proyectos/${id}/crear`}>
                    Editar proyecto
                </Button>
            </div>
            <h3 className="text-2xl decoration-gray-400" style={{ marginBottom: "1vw" }}>{project.state}</h3>
            <span className="decoration-gray-400">{project.description}</span>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Button 
                    type="submit"
                    fullWidth
                    style={{backgroundColor: COLORS.button, height: '50px'}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '10%' }} 
                    href={`./${id}/crear`}>
                    Crear tarea
                </Button>
            </Box>
            <Table 
                rowItems={PROJECT.tasks}
                headerItems={["id", "nombre", "estado", "prioridad", "fecha"]}
            />
        </div>
    )
}