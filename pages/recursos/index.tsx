import {Cliente} from "@/pages/types";
import {useEffect, useState} from "react";
import HeaderItem from "@/components/headerItem";
import Table from "@/components/table";
export default function Resources() {
    
    const projects = [
      { "name": "Sistema de Home Banking", "tasks": [{id: 1, tarea: "Hacer MDD", fecha: "19/06/2023", horas: "4"}, {id: 3, tarea: "Iniciar frontend", fecha: "20/06/2023", horas: "6"}]},
      { "name": "Gestión aranceles", "tasks": [{id: 2, tarea: "Iniciar backend", fecha: "20/06/2023", horas: "5"}, {id: 5, tarea: "Hacer wireframe", fecha: "20/06/2023", horas: "2"}]}
    ];

    const [tasks, setTasks] = useState(0);

    const handlerLoadTasks = (event: any) => {
      setTasks(event.target.value);
    };

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

            <Table 
                title="Marcos Rivero" 
                headerItems={["id", "tarea", "fecha", "horas"]}
                rowItems={projects[tasks].tasks}
            />
        </>
    )
}
