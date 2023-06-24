import {useEffect, useState} from "react";
import TasksGridRow from "@/components/tasksGridRow";
import React from 'react';
import { useRouter } from 'next/router';
import HeaderItem from "@/components/HeaderItem";
import GoBack from '@/components/goBackIcon';

export default function Tasks() {
    
    const list = [
        {
            nombre:"BOCA LA CONCHA DE TU MADRE",
            descripcion:"dsadasdsad dss dasd a fafaef sfwaefwa dfwq feew afjwa fwnj ",
            estado:"OPEN",
            prioridad:1,
            fecha_limite:"31/6/23",
            horas_insumidas: "4 hs",
        },
        {
            nombre:"BOCA LA CONCHA DE TU MADRE",
            descripcion:"dsadasdsad dss dasd a fafaef sfwaefwa dfwq feew afjwa fwnj ",
            estado:"OPEN",
            prioridad:1,
            fecha_limite:"31/6/23",
            horas_insumidas: "4 hs",
        },
        {
            nombre:"BOCA LA CONCHA DE TU MADRE",
            descripcion:"dsadasdsad dss dasd a fafaef sfwaefwa dfwq feew afjwa fwnj ",
            estado:"OPEN",
            prioridad:1,
            fecha_limite:"31/6/23",
            horas_insumidas: "4 hs",
        },
        {
            nombre:"BOCA LA CONCHA DE TU MADRE",
            descripcion:"dsadasdsad dss dasd a fafaef sfwaefwa dfwq feew afjwa fwnj ",
            estado:"OPEN",
            prioridad:1,
            fecha_limite:"31/6/23",
            horas_insumidas: "4 hs",
        },
    ];

    const router = useRouter();
    const {ticket_id, ticket_title} = router.query;

    return (
        <div className="container max-w-7xl mx-auto mt-8">
            <div className="mb-4">
                <h1 className="text-black text-3xl font-bold decoration-gray-400">Tasks</h1>
                <div className="justify-between flex">
                    <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500">Ticket: {ticket_title}</div>
                    <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-gray-500"> ID: {ticket_id}</div>
                </div>
            </div>
            <div className="flex flex-col">
                <GoBack/>
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-full">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg text-black">
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <HeaderItem title="Name" />
                                <HeaderItem title="Estado" />
                                <HeaderItem title="Priority" />
                                <HeaderItem title="End Date" />
                                <HeaderItem title="Hs" />
                            </tr>
                            </thead>

                            <tbody>
                            {list.map((task) => (
                                <TasksGridRow 
                                                key={task.id}
                                                task={task}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
