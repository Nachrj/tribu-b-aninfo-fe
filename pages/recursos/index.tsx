import {useEffect, useState} from "react";
import TableResources from "@/components/tableResources";
import ModalResources from "@/components/modalResources";
export default function Resources() {
    
    const [projects, setProjects] = useState([
      { "name": "Sistema de Home Banking", "tasks": [{id: 1, tarea: "Hacer MDD", fecha: "2023-06-19", horas: "4"}, {id: 3, tarea: "Iniciar frontend", fecha: "2023-06-20", horas: "6"}]},
      { "name": "Gestión aranceles", "tasks": [{id: 2, tarea: "Iniciar backend", fecha: "2023-06-20", horas: "5"}, {id: 5, tarea: "Hacer wireframe", fecha: "2023-06-20", horas: "2"}]}
    ]);

    const [tasks, setTasks] = useState(0);

    const handlerLoadTasks = (event: any) => {
      setTasks(event.target.value);
    };

    const [modalOpen, setModalOpen] = useState(false);

    const [rowToEdit, setRowToEdit] = useState(0);

    const handleEditRow = (idx: any) => {
      setRowToEdit(idx);
      setModalOpen(true);
    }

    const handleSubmit = (formState: any) => {
      projects[tasks].tasks[rowToEdit].horas = formState.hours;
      projects[tasks].tasks[rowToEdit].fecha = formState.date;
    }

    useEffect(() => {
        // fetch("")
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

            <TableResources rows={projects[tasks].tasks} editRow={handleEditRow}/>

            {modalOpen && <ModalResources
                            closeModal={() => {setModalOpen(false)}}
                            onSubmit={handleSubmit}
                            defaultValue={projects[tasks].tasks[rowToEdit]}
                          />
            }
        </>
    )
}
