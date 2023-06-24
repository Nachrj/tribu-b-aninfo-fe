import {Ticket} from "@/pages/types";
import {useEffect, useState} from "react";
import TicketGridRow from "@/components/ticketGridRow";
import React from 'react';
import { useRouter } from 'next/router';
import { BASE_URL } from "@/pages/constants";
import HeaderItem from "@/components/HeaderItem";
import GoBack from '@/components/goBackIcon';

export default function Tickets() {
    const [tickets, setTickets] = useState<Ticket[]>([])

    const router = useRouter();
    const { product_name, product_version, product_version_name } = router.query;
    const dic_product_version = {
        product_version_ids: [product_version]
    }

    useEffect(() => {
        if (router.isReady) {
            fetch(`${BASE_URL}/v1/tickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(dic_product_version),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                try {
                    console.log(data.result)
                    setTickets(data.result);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            });
        }
    }, [router.isReady]);

    const handleClick = () => {
    
        router.push(`/newTicket?product_version=${product_version}&product_version_name=${product_version_name}&product_name=${product_name}`);
      };

    return (
        <div className="container max-w-7xl m-full mt-8">
            <div className="mb-4">
                <GoBack/>
                <div className="flex justify-between">
                    <h1 className="text-black text-3xl font-bold decoration-gray-400">Tickets</h1>
                    <button className="w-min font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black  bg-blue-500 hover:bg-blue-700 mx-40" onClick={handleClick}>Crear</button>
                </div>
                <div className="justify-between flex">
                    <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500">Producto: {product_name}</div>
                    <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-gray-500"> Version: {product_version_name}</div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-full">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg text-black">
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <HeaderItem title="ID" />
                                <HeaderItem title="Titulo" />
                                <HeaderItem title="Estado" />
                                <HeaderItem title="SLA" />
                                <HeaderItem title="Severidad" />
                                <HeaderItem title="" />
                            </tr>
                            </thead>

                            <tbody>
                            {tickets.map((ticket) => (
                                <TicketGridRow 
                                                key={ticket.product_version_id}
                                                ticket={ticket}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
