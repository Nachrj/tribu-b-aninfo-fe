import {useEffect, useState} from "react";
import TableResources from "@/components/tableResources";
import styles from "@/components/tableResources.module.css"
import ModalResources from "@/components/modalResources";
export default function Resources() {
    
    const projects = [
      { "name": "Sistema de Home Banking", "tasks": [{id: 1, tarea: "Hacer MDD", fecha: "19/06/2023", horas: "4"}, {id: 3, tarea: "Iniciar frontend", fecha: "20/06/2023", horas: "6"}]},
      { "name": "Gestión aranceles", "tasks": [{id: 2, tarea: "Iniciar backend", fecha: "20/06/2023", horas: "5"}, {id: 5, tarea: "Hacer wireframe", fecha: "20/06/2023", horas: "2"}]}
    ];

    const [tasks, setTasks] = useState(0);

    const handlerLoadTasks = (event: any) => {
      setTasks(event.target.value);
    };

    const [modalOpen, setModalOpen] = useState(false);

    

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
            <div>

              <select name="projects" id="selProject" onClick={handlerLoadTasks}>
                
                {
                  projects.map((item, i) => (
                    <option key={"project"+i} value={i}>{item.name}</option>
                  ))
                }
              </select>

            </div>

            {/* <TableResources rows={projects[tasks].tasks} editRow={() => {handleEditRow}}/> */}

            <div className={styles.tablewrapper}>
              <table className={styles.table}>
                  <thead>
                      <tr>
                          <th>id</th>
                          <th>Tarea</th>
                          <th>Fecha</th>
                          <th>Horas</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        projects[tasks].tasks.map((row: any, idx: any) => {
                          return <tr key={idx}>
                              <td>{row.id}</td>
                              <td>{row.tarea}</td>
                              <td>{row.fecha}</td>
                              <td>{row.horas}</td>
                              <td>
                                  <button onClick={() => setModalOpen(true)}>editar</button>
                              </td>
                          </tr>
                        })
                      }
                  </tbody>
              </table>
            </div>

            {/* <button onClick={() => setModalOpen(true)}>Open</button> */}
            {modalOpen && <ModalResources closeModal={() => {setModalOpen(false)}}/>}
        </>
    )
}
