import { useRouter } from 'next/router'
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@/components/table';
import { Box, Button, Typography } from "@mui/material";
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
    const router = useRouter()
    const id = router.query.id

    return (
        <div style={{ padding: "4em" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1 className="text-3xl font-bold decoration-gray-400">{PROJECT.nombre}</h1>
                <IconButton style={{ marginLeft: "1em", backgroundColor: "purple" }} onClick={() => router.push(`/proyectos/${id}/editar`)}>
                    <EditIcon />
                </IconButton>
            </div>
            <h3 className="text-2xl decoration-gray-400" style={{ marginTop: "1vw", marginBottom: ".5vw" }}>Cliente: {PROJECT.cliente}</h3>
            <h3 className="text-2xl decoration-gray-400" style={{ marginBottom: "1vw" }}>{PROJECT.estado}</h3>
            <span className="decoration-gray-400">{PROJECT.description}</span>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Button 
                    type="submit"
                    fullWidth
                    style={{backgroundColor: COLORS.button, height: '50px'}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '10%' }} 
                    href="./proyectos/crear">
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