import ClientGrid from "@/components/clientGrid";
import {useEffect, useState} from "react";
import { Client } from "./types";
import { BASE_URL } from "./types";

export default function Clients() {
    const [clients, setClients] = useState<Client[]>([])

    useEffect(() => {
        fetch(`${BASE_URL}/v1/clients`)
        .then(response =>
        {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) =>
        {
            try {
                console.log(data)
                const transformedData = data.map(item => (
                    {
                        id: item.id,
                        cuit: item.CUIT,
                        social_reason: item["razon social"]
                    }
                ));
                setClients(transformedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });
    }, []);

    return (
        <div className="Clients">
            <ClientGrid clients={clients}/>
        </div>
    );
}