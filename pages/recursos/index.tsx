import {useEffect, useState} from "react";
import TableResources from "@/components/tableResources";
import ModalResources from "@/components/modalResources";
import ModalResourcesEdit from "@/components/modalResourcesEdit";
import PopUpConfirmAction from "@/components/popUpConfirmAction";
import { Button, Typography } from "@mui/material";
import COLORS from "@/constants/colors";
export default function Resources() {

    const recursoId = 3;

    const recursoName = "Patricia Gaona";
    
    // const [projects, setProjects] = useState([
    //   { "id": 1, "name": "Sistema de Home Banking", "tareas": [{"id": 1, "name": "Hacer MDD"}, {"id": 2, "name": "Iniciar frontend"}]},
    //   { "id": 2, "name": "Gestión aranceles", "tareas": [{"id": 3, "name": "Iniciar backend"}, {"id": 4, "name": "Hacer wireframe"}]}
    // ]);

    const [projects, setProjects] = useState([
      { "id": 0, "nombre": "", "tareas": [{"id": 0, "nombre": ""}]}
    ]);

    // const [horas, setHoras] = useState([
    //   {Id: 1, tareaId: "1", fecha: "2023-06-19", horas: "4", proyectoId: 1, recursoId: 4},
    //   {Id: 3, tareaId: "2", fecha: "2023-06-20", horas: "6", proyectoId: 1, recursoId: 4},
    //   {Id: 2, tareaId: "3", fecha: "2023-06-20", horas: "5", proyectoId: 2, recursoId: 4},
    //   {Id: 5, tareaId: "4", fecha: "2023-06-20", horas: "2", proyectoId: 2, recursoId: 4}
    // ]);

    const [horas, setHoras] = useState([
      {id: "", tarea: "", fecha: "", horas: "", proyecto: "", recurso: ""}
    ]);

    const [modalOpen, setModalOpen] = useState(false);

    const [modalEditOpen, setModalEditOpen] = useState(false);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const [rowToDelete, setRowToDelete] = useState(null);

    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = (targetIndex: any) => {
      let id = horas[targetIndex].id;
      setHoras(horas.filter((_, idx) => idx !== targetIndex))
      deleteRegister(id);
      setShowConfirmDelete(false);
      setRowToDelete(null);
    }

    const handleRowToDelete = (idx: any) => {
      setRowToDelete(idx);
      setShowConfirmDelete(true);
    }

    const handleEditRow = (idx: any) => {
      setRowToEdit(idx);
      setModalEditOpen(true);
    }

    function createRegister(formState: any) {
    
      // Send data to the backend via POST
      fetch('https://cargahoras-squad12.onrender.com/horas', {  // Enter your IP address here
  
        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(formState), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
        
      })
      .then((res) => {
        // console.log("res", res)
        return res.json()
      })
      .then((data) => {
        //console.log(data);
        formState.id = data.id;
      })
    }

    function editRegister(formState: any) {
    
      fetch('https://cargahoras-squad12.onrender.com/horas/' + formState.id, {
  
        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json",
        },
  
      })
    }

    function deleteRegister(id: any) {
    
      fetch('https://cargahoras-squad12.onrender.com/horas/' + id, {
  
        method: 'DELETE', 
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
  
      })
    }

    const handleSubmit = (formState: any) => {
      if (rowToEdit === null) {
        setHoras([...horas, formState]);
        createRegister(formState);
      } else {
        setHoras(
          horas.map((currRow, idx) => {
            editRegister(formState);
            if (idx !== rowToEdit) return currRow;
            
            return formState;
          })
        )
      }
    }

    useEffect(() => {
        fetch("https://cargahoras-squad12.onrender.com/horas/recurso/" + recursoId)
            .then((res) => {
                // console.log("res", res)
                return res.json()
            })
            .then((data) => {
                //console.log(data);
                setHoras(data);
            })
    }, [])

    useEffect(() => {
      fetch("https://cargahoras-squad12.onrender.com/proyectos/recurso/" + recursoId)
          .then((res) => {
              // console.log("res", res)
              return res.json()
          })
          .then((data) => {
              //console.log(data);
              setProjects(data);
          })
    }, [])

    return (
        <>  
            <br />
            <h2 className="text-3xl font-bold decoration-gray-400">{recursoName}</h2>
            <br />
            <br />
            <div className="flex justify-between">
              <Typography variant="h4" component="h4">
                Registros de horas
              </Typography>
              <Button 
                type="submit"
                fullWidth
                style={{backgroundColor: COLORS.button, height: '50px', marginRight: "2%"}}
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '10%' }} 
                onClick={() => setModalOpen(true)}>
                Crear
              </Button>
            </div>

            <TableResources
              rows={horas}
              projects={projects}
              editRow={handleEditRow}
              deleteRow={handleRowToDelete}
            />

            {modalOpen && <ModalResources
                            proyectos={projects}
                            closeModal={() => {setModalOpen(false); setRowToEdit(null)}}
                            onSubmit={handleSubmit}
                            defaultValue={rowToEdit !== null && horas[rowToEdit]}
                            recursoId={recursoId}
                          />
            }
            {modalEditOpen && <ModalResourcesEdit
                            proyectos={projects}
                            closeModal={() => {setModalEditOpen(false); setRowToEdit(null)}}
                            onSubmit={handleSubmit}
                            defaultValue={rowToEdit !== null && horas[rowToEdit]}
                          />
            }
            <PopUpConfirmAction
                    show={showConfirmDelete}
                    title="Confirmar eliminación"
                    message="¿Está seguro de que deseas eliminar este registro?"
                    onClickAcept={() => handleDeleteRow(rowToDelete !== null && rowToDelete)}
                    onClickClose={() => setShowConfirmDelete(false)}
            />
        </>
    )
}
