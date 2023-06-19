import {Product} from "@/pages/types";
import {useEffect, useState} from "react";
import React from 'react';
import { useRouter } from 'next/router';
import Input from "@/components/input";
import DescriptionInput from "@/components/descriptionInput";
import Select from "@/components/select";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}
const DESCRIP_EJEMPLO =" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatum expedita numquam ut aliquam nobis at facilis itaque obcaecati, et eius cupiditate aperiam cum inventore. Et quae dolor magnam obca"


export default function Tickets() {
    
    const clickHandler = () => {
        // le vamos a pasar solo el id del task y en task view lo vamos a buscar al back        
        router.push(`/tasks?ticket_id=${ticket_id}&ticket_title=${ticket_title}`);
    };

    const router = useRouter();
    const { ticket_id, ticket_title, ticket_state, ticket_sla, ticket_severity } = router.query;
    const states = ["OPEN", "NEW", "CLOSE", "IN PROGRESS"];
    const severities_options = [1,2,3,4];

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                 <div className="mb-4">
                    <div className="justify-between flex">
                        <div className="text-2xl font-bold decoration-gray-400 w-fit text-black">Ticket: {ticket_title}</div>
                        <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-black"> ID: {ticket_id}</div>
                    </div>
                </div>
                <div className="flex flex-col pr-40">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 ">
                            <div className="flex flex-row justify-around min-w-full  px-2 mt-5 ">
                                <Select label="Estado" value={ticket_state} options={states}/>
                                <Input label="SLA" value={ticket_sla}/>
                                <Select label="Severidad" value={ticket_severity} options={severities_options}/>
                                <Select label="Prioridad" value={ticket_severity} options={severities_options}/>
                                <Select label="Resource" value={ticket_severity} options={severities_options}/>
                            </div>
                            <div className="mx-12">
                                <DescriptionInput label="Descripcion" value={DESCRIP_EJEMPLO}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between pt-5">
                        <button className="flex font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black  bg-blue-600 hover:bg-blue-700" onClick={clickHandler}>Ticket Tasks</button>
                        <div className="flex justify-end">
                            <button className="w-min font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-black-800 text-black bg- mr-5 bg-red-500 hover:bg-red-700">Cancel</button>
                            <button className="w-min font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black  bg-green-500 hover:bg-green-700">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


/* 
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "state" INTEGER NOT NULL,
    "SLA" TIMESTAMP NOT NULL,
    "priority" INTEGER NOT NULL,
    "severity" INTEGER NOT NULL,
    "resource_id" INTEGER NOT NULL,      ver si cambiamos por el nombre del recurso
    "client_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP NOT NULL,
    "updated_date" TIMESTAMP NOT NULL,
    PRIMARY KEY ("id")
);
*/