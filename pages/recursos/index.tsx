import {useEffect, useState} from "react";
import TableResources from "@/components/tableResources";
import ModalResources from "@/components/modalResources";
export default function Resources() {
    
    const [projects, setProjects] = useState([
      { "id": 1, "name": "Sistema de Home Banking", "tareas": [{"id": 1, "name": "Hacer MDD"}, {"id": 2, "name": "Iniciar frontend"}]},
      { "id": 2, "name": "Gestión aranceles", "tareas": [{"id": 3, "name": "Iniciar backend"}, {"id": 4, "name": "Hacer wireframe"}]}
    ]);

    const [horas, setHoras] = useState([
      {Id: 1, tareaId: "1", nombreTarea: "Hacer MDD", fecha: "2023-06-19", horas: "4", proyectoId: 1, recursoId: "4"},
      {Id: 3, tareaId: "2", nombreTarea: "Iniciar frontend", fecha: "2023-06-20", horas: "6", proyectoId: 1, recursoId: "4"},
      {Id: 2, tareaId: "3", nombreTarea: "Iniciar backend", fecha: "2023-06-20", horas: "5", proyectoId: 2, recursoId: "4"},
      {Id: 5, tareaId: "4", nombreTarea: "Hacer wireframe", fecha: "2023-06-20", horas: "2", proyectoId: 2, recursoId: "4"}
    ]);

    // const tareas = [
    //   [{"id": 1, "name": "Hacer MDD"}, {"id": 2, "name": "Iniciar frontend"}],
    //   [{"id": 3, "name": "Iniciar backend"}, {"id": 4, "name": "Hacer wireframe"}]
    // ];

    const [projectIdx, setProjectIdx] = useState(0);

    const handlerLoadTasks = (event: any) => {
      setProjectIdx(event.target.value);
    };

    const [modalOpen, setModalOpen] = useState(false);

    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = (targetIndex: any) => {
      setHoras(horas.filter((_, idx) => idx !== targetIndex))

    }

    const handleEditRow = (idx: any) => {
      setRowToEdit(idx);
      setModalOpen(true);
    }

    const handleSubmit = (formState: any) => {
      if (rowToEdit === null) {
        setHoras([...horas, formState]);
      } else {
        setHoras(
          horas.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return formState;
          })
        )
      }
    }

    useEffect(() => {
        // fetch("http://localhost:8080/proyectos/recurso/4")
        //     .then((res) => {
        //         // console.log("res", res)
        //         return res.json()
        //     })
        //     .then((data) => {
        //         console.log(data);
        //         setProjects(data);
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
                    <option key={"project"+i} value={i}>{item.name}</option>
                  ))
                }
              </select>

            </div>
            <br />
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => setModalOpen(true)}>Agregar registro</button>

            <TableResources
              //rows={horas.filter(h => h.proyectoId === projects[projectIdx].id)}
              rows={horas}
              editRow={handleEditRow}
              deleteRow={handleDeleteRow}
            />

            {modalOpen && <ModalResources
                            proyecto={projects[projectIdx]}
                            closeModal={() => {setModalOpen(false); setRowToEdit(null)}}
                            onSubmit={handleSubmit}
                            defaultValue={rowToEdit !== null && horas[rowToEdit]}
                          />
            }
            <div>{rowToEdit}</div>
        </>
    )
}
