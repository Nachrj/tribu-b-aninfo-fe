import {Ticket} from "@/utils/types";
import {useEffect, useState} from "react";
import TicketGridRow from "@/components/ticketGridRow";
import React from 'react';
import { useRouter } from 'next/router';
import HeaderItem from "@/components/headerItem";
import GoBack from '@/components/backButton';
import PopUpConfirmAction from "@/components/popUpConfirmAction";
import { getTickets } from "@/requests/tickets";
import { deleteTicket } from "@/requests/ticket";
import { Button } from "@mui/material";
import COLORS from "@/constants/colors";

export default function Tickets() {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [refresh, setRefresh] = useState(false);
    const [deleteRow, setDeleteRow] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState(0);

    const router = useRouter();
    const { product_name, product_version, product_version_name } = router.query;
    
    useEffect(() => {
        const body = {
            product_version_ids: [product_version]
        }
        if (router.isReady) {
            getTickets(setTickets, body);
        }
    }, [router.isReady, refresh]);

    const handleClick = () => {
        router.push(`/soporte/ticket/create?product_version=${product_version}&product_version_name=${product_version_name}&product_name=${product_name}`);
    };

    const handleDelete = (ticketId : number) => {
        setDeleteRow(true);
        setTicketToDelete(ticketId);
    };

    const handleClose = () => {
        setDeleteRow(false);
    }

    const handleAccept = (ticketId : number) => {
        deleteTicket(ticketId);
        setDeleteRow(false);
        setRefresh(!refresh);
    };


    return (
        <div className="container max-w-7xl m-full mt-8">
            <div className="mb-4">
                <GoBack/>
                <div className="flex justify-between">
                    <h1 className="text-black text-3xl font-bold decoration-gray-400 text-right">Tickets</h1>
                    <Button 
                        style={{backgroundColor: COLORS.button, height: '50px'}}
                        variant="contained"
                        sx={{ mr: 8, width: '10%' }} 
                        onClick={handleClick}
                    >
                    Crear
                    </Button>
                </div>
                <div className="justify-between flex">
                    <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500">Producto: {product_name}</div>
                    <div className="text-2xl font-bold decoration-gray-400 w-fit pr-20 text-gray-500"> Versión: {product_version_name}</div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-full">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg text-black">
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <HeaderItem title="ID" />
                                <HeaderItem title="Título" />
                                <HeaderItem title="Estado" />
                                <HeaderItem title="SLA" />
                                <HeaderItem title="Severidad" />
                                <HeaderItem title="Cliente" />
                                <HeaderItem title="" />
                                <HeaderItem title="" />
                            </tr>
                            </thead>

                            <tbody>
                            {tickets.map((ticket) => (
                                <TicketGridRow 
                                                key={ticket.product_version_id}
                                                ticket={ticket}
                                                onDelete={handleDelete}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PopUpConfirmAction title={"¿Desea eliminar el ticket?"} message={"Aprete confirmar para eliminar el ticket"} show={deleteRow} onClickAcept={() => handleAccept(ticketToDelete)} onClickClose={handleClose}/>
        </div>
    );
}
