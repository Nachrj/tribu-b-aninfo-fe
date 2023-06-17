import {Product} from "@/pages/types";
import {useEffect, useState} from "react";
import TicketGridRow from "@/components/ticketGridRow";
import React from 'react';

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Tickets() {
    // const [list, setList] = useState([])

    const list = [
        {
            id:1,
            titulo: "TITU_1",
            estado: "OPEN",
            sla: "31/6/23",
            severidad: 1,
        },
        {
            id:2,
            titulo: "TITU_2",
            estado: "OPEN",
            sla: "25/6/23",
            severidad: 1,
        },
        {
            id:3,
            titulo: "TITU_3",
            estado: "CLOSE",
            sla: "20/6/23",
            severidad: 1,
        },
        {
            id:4,
            titulo: "TITU_4",
            estado: "IN_PROGRESS",
            sla: "28/6/23",
            severidad: 1,
        }
    ];

    const handleClickRow = (Ticket) => {
        console.log('Fila clickeada:', Ticket);
      };

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-black text-3xl font-bold decoration-gray-400">Tickets de la version: 2.0  Producto: XXX</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg text-black">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Titulo" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title="SLA" />
                                    <HeaderItem title="Severidad" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((ticket) => (
                                    <TicketGridRow ticket={ticket} onClick={handleClickRow}/>
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
