import ClientGrid from "@/components/clientGrid";
import {useEffect, useState} from "react";
import { Client } from "./types";

export default function Clients() {
    const [clients, setClients] = useState([])

    useEffect(() => {
        fetch("http://localhost:5001/v1/clients", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
          })
          .then(response =>
            response.json().then(data => {
                setClients(data)
            })
          )
    }, []);

return (
    <div className="Clients">
        <ClientGrid clients={clients as Client[]}/>
    </div>
    )
}