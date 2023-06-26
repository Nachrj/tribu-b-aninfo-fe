import {Cliente} from "@/pages/types";
import {useEffect, useState} from "react";
import HeaderItem from "@/components/headerItem";
import Table from "@/components/table";
import { Box, Button, Container } from "@mui/material";
import COLORS from "@/constants/colors";
import Typography from '@mui/material/Typography';
import { PROJECT_URL } from '@/pages/_app';

export default function Projects() {
    // examples for the table
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch(`${PROJECT_URL}/projects`)
            .then((res) => {
                console.log("res", res)
                return res.json()
            })
            .then((data) => {
                console.log("Got projects: ", data)
                setProjects(data.map((project: any) => {
                    return {
                        id: project.id,
                        nombre: project.name,
                        estado: project.state,
                    }
                }))
            })
    }, [])

    return (
      <Container component="main">
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <Typography variant="h3" component="h1">
              Proyectos
            </Typography>
            <Button 
                type="submit"
                fullWidth
                style={{backgroundColor: COLORS.button, height: '50px'}}
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '10%' }} 
                href="./proyectos/crear">
                  Crear
            </Button>
          </Box>
          
          <Table 
            headerItems={["id", "nombre", "estado", "", ""]}
            rowItems={projects}
            linkTo="/proyectos"
            onDelete={(itemId: number) => console.log('Borrando proyecto id: ', itemId)}
          />
        </Box>
      </Container>
  )
}
