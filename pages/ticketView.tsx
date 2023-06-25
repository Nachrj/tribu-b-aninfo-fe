import {Ticket} from "@/pages/types";
import {useEffect, useState} from "react";
import React from 'react';
import { useRouter } from 'next/router';
import Input from "@/components/input";
import DescriptionInput from "@/components/descriptionInput";
import GoBack from '@/components/backButton';
import { getTicket } from "@/requests/ticket";

export default function TicketView() {
    const [ticketData, setTicket] = useState<Ticket>();
    const router = useRouter();

    const clickHandler = () => {
        // le vamos a pasar solo el id del task y en task view lo vamos a buscar al back        
        router.push(`/tasks?ticket_id=${ticketData?.id}&ticket_title=${ticketData?.title}`);
    };
    
    useEffect(() => {
        if (router.isReady) {
            const {ticket_id} = router.query;
            getTicket(setTicket, ticket_id);
        }
    }, [router.isReady]);

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                 <div className="mb-4">
                    <GoBack/>   
                    <div className="justify-between flex">
                        <div className="text-2xl font-bold decoration-gray-400 w-fit text-black">Ticket: {title}</div>
                        <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-black"> ID: {ticketData?.id}</div>
                    </div>
                </div>
                <div className="flex flex-col pr-40">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 ">
                            <div className="flex flex-row justify-around min-w-full  px-2 mt-5 ">
                                <Input label="Título" value={title} modify={false}/>
                                <Input label="Estado" value={state} modify={false}/>
                                <Input label="Resource" value={resource} modify={false}/>
                            </div>
                            <div className="flex flex-row justify-around min-w-full px-2 mt-5 ">
                                <Input label="SLA" value={ticketData?.SLA} modify={false} />
                                <Input label="Severidad" value={severity} modify={false}/>
                                <Input label="Prioridad" value={priority} modify={false}/>
                            </div>
                            <div className="mx-12">
                                <DescriptionInput label="Descripción" value={description} modify={false}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between pt-5">
                        <button className="flex font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black  bg-blue-600 hover:bg-blue-700" onClick={clickHandler}>Ticket Tasks</button>
                    </div>
                </div>
            </div>
        </>
    );
}
