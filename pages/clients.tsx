import {Client} from "@/pages/types";
import {useEffect, useState} from "react";
import ClientGridRow from "@/components/clientGridRow";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Clientes() {
    const [clients, setList] = useState([])

    useEffect(() => {
        fetch("http://localhost:5001/v1/clients", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(response => {
            return response.json()
          })
          .then(data => {
            const clients_data = clients as Client[];
            console.log("clients", clients_data);
            setList(data)
          })
    }, [])

    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}

            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Clientes</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Razón social" />
                                    <HeaderItem title="CUIT" />
                                </tr>
                                </thead>

                                <tbody>
                                    {clients.map((cliente) => (
                                        <ClientGridRow cliente={cliente} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
