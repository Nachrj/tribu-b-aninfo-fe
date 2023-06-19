import {Product, Ticket} from "@/pages/types";
import {useEffect, useState} from "react";
import TicketGridRow from "@/components/ticketGridRow";
import React from 'react';
import { useRouter } from 'next/router';

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Tickets() {
    const [tickets, setTickets] = useState<Ticket[]>([])

    
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
            estado: "IN PROGRESS",
            sla: "28/6/23",
            severidad: 1,
        }
    ];

    const router = useRouter();
    const { product_name, product_version } = router.query;
    const dic_product_version = {
        product_version_ids: [product_version]
    }

    useEffect(() => {
        fetch(`http://localhost:5001/v1/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(dic_product_version),
        })
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
                        setTickets(data);
                      } catch (error) {
                        console.error('Error parsing JSON:', error);
                      }
                }
          )
    }, []);

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-black text-3xl font-bold decoration-gray-400">Tickets</h1>
                    <div className="justify-between flex">
                        <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500">Producto: {product_name}</div>
                        <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-gray-500"> Version: {product_version}</div>
                    </div>
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
                                {tickets.map((ticket) => (
                                    <TicketGridRow 
                                                    key={ticket.product_version_id}
                                                    tickets={tickets}/>
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
