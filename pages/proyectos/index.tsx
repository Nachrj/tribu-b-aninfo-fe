import {Cliente} from "@/pages/types";
import {useEffect, useState} from "react";
import HeaderItem from "@/components/headerItem";
import Table from "@/components/table";
import { Box, Button, Container } from "@mui/material";
import COLORS from "@/constants/colors";
import Typography from '@mui/material/Typography';

export default function Projects() {
    // examples for the table
    const [projects, setProjects] = useState([{id: 1, nombre: "Sistema de Home Banking", estado: "Iniciado", cliente: "HSBC"},{id: 2, nombre: "Gestión aranceles", estado: "Finalizado", cliente: "IPDP"}])

    useEffect(() => {
        // fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes")
        //     .then((res) => {
        //         console.log("res", res)
        //         return res.json()
        //     })
        //     .then((data) => {
        //         console.log("data", data)
        //         setList(data)
        //         console.log("List 1")
        //         console.log(list)
        //         console.log("List 2")
        //     })
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
            headerItems={["id", "nombre", "estado", "cliente"]}
            rowItems={projects}
            linkTo="/proyectos"
          />
        </Box>
      </Container>
  )
}
