import {Cliente} from "@/pages/types";
import {useEffect, useState} from "react";
import HeaderItem from "@/components/headerItem";
import Table from "@/components/table";
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
        <>
            <Table 
                title="Proyectos" 
                headerItems={["id", "nombre", "estado", "cliente"]}
                rowItems={projects}
                linkTo="/proyectos"
                />
        </>
    )
}
