import {useEffect, useState} from "react";
import TableResources from "@/components/tableResources";
import ModalResources from "@/components/modalResources";
export default function Resources() {
    
    const [projects, setProjects] = useState([
      { "id": 1, "nombre": "Sistema de Home Banking", "horas": [{Id: 1, tareaId: "Hacer MDD", fecha: "2023-06-19", horas: "4", proyectoId: "1", recursoId: "4"}, {Id: 3, tareaId: "Iniciar frontend", fecha: "2023-06-20", horas: "6", proyectoId: "1", recursoId: "4"}]},
      { "id": 2, "nombre": "Gestión aranceles", "horas": [{Id: 2, tareaId: "Iniciar backend", fecha: "2023-06-20", horas: "5", proyectoId: "2", recursoId: "4"}, {Id: 5, tareaId: "Hacer wireframe", fecha: "2023-06-20", horas: "2", proyectoId: "2", recursoId: "4"}]}
    ]);

    const tareas = [
      [{id: 1, tarea: "Hacer MDD"}, {id: 3, tarea: "Iniciar frontend"}],
      [{id: 2, tarea: "Iniciar backend"}, {id: 5, tarea: "Hacer wireframe"}]
    ];

    const [projectIdx, setProjectIdx] = useState(0);

    const handlerLoadTasks = (event: any) => {
      setProjectIdx(event.target.value);
    };

    const [modalOpen, setModalOpen] = useState(false);

    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = (targetIndex: any) => {
      projects[projectIdx].horas.splice(targetIndex, 1);
      setProjects([...projects]);

    }

    const handleEditRow = (idx: any) => {
      setRowToEdit(idx);
      setModalOpen(true);
    }

    const handleSubmit = (formState: any) => {
      if (rowToEdit === null) {
        projects[projectIdx].horas.push(formState);
      } else {
        projects[projectIdx].horas[rowToEdit].tareaId = formState.tareaId;
        projects[projectIdx].horas[rowToEdit].fecha = formState.fecha;
        projects[projectIdx].horas[rowToEdit].horas = formState.horas;
      }
    }

    useEffect(() => {
        // fetch("")
        //     .then((res) => {
        //         console.log("res", res)
        //         return res.json()
        //     })
        //     .then((data) => {
        //         console.log(data)
        //     })
    }, [])

    return (
        <>  
            <br />
            <h2 className="text-3xl font-bold decoration-gray-400">Marcos Rivero</h2>
            <br />
            <div>
              <label htmlFor="selProject">Proyecto: </label>
              
              <select name="projects" id="selProject" onClick={handlerLoadTasks}>
                
                {
                  projects.map((item, i) => (
                    <option key={"project"+i} value={i}>{item.nombre}</option>
                  ))
                }
              </select>

            </div>
            <br />
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => setModalOpen(true)}>Agregar registro</button>

            <TableResources rows={projects[projectIdx].horas} editRow={handleEditRow} deleteRow={handleDeleteRow}/>

            {modalOpen && <ModalResources
                            tareas={tareas[projectIdx]}
                            closeModal={() => {setModalOpen(false); setRowToEdit(null)}}
                            onSubmit={handleSubmit}
                            defaultValue={rowToEdit !== null && projects[projectIdx].horas[rowToEdit]}
                          />
            }
        </>
    )
}
