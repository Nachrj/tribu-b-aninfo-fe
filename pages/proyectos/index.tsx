import {useEffect, useState} from "react";
import Table from "@/components/table";
import { Box, Button, Container } from "@mui/material";
import COLORS from "@/constants/colors";
import Typography from '@mui/material/Typography';
import { PROJECT_URL } from '@/pages/_app';
import PopUpConfirmAction from "@/components/popUpConfirmAction";
import { statusMap } from "@/utils/types";
import { get } from "http";
import GoBackIcon from "@/components/backButton";

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [projectIdToDelete, setProjectIdToDelete] = useState<number | undefined>(undefined);

    useEffect(() => {
      getProjects()
    }, [])

    const getProjects = () => {
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
                  estado: statusMap.get(project.state),
              }
          }))
      })
    }

    const handleDeleteConfirm = () => {
      fetch(`${PROJECT_URL}/projects/${projectIdToDelete}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
      })
      .then((res) => {
          console.log("res", res)
          getProjects();
      })
      setShowConfirmDelete(false);
      setProjectIdToDelete(undefined);
  };

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
            onDelete={(id: number) => {
              console.log('Borrando task con id: ', id)
              setProjectIdToDelete(id);
              setShowConfirmDelete(true);
          }}
          />
          <PopUpConfirmAction
            show={showConfirmDelete}
            title="Confirmar eliminación"
            message="¿Estás seguro de que deseas eliminar este proyecto?"
            onClickAcept={handleDeleteConfirm}
            onClickClose={() => setShowConfirmDelete(false)}
          />
        </Box>
      </Container>
  )
}
