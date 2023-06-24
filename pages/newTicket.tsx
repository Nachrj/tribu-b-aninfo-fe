import {Ticket} from "@/pages/types";
import {useEffect, useState} from "react";
import React from 'react';
import { useRouter } from 'next/router';
import Input from "@/components/input";
import DescriptionInput from "@/components/descriptionInput";
import Select from "@/components/select";
import { BASE_URL, TICKET_PRIORITY, TICKET_SEVERITY } from "@/pages/constants";
import PopUpERROR from "@/components/popUpERROR";
import { useClientData } from "@/services/clients";

export default function CreateTicket() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState(0);
    const [priority, setPriority] = useState(0);
    const [client, setClient] = useState(0);
    const [resource, setResource] = useState("");
    const [errors, setErrors] = useState([]);

    const clients = useClientData();

    const selectClientOptions = clients.map((client) => ({
        label: client.social_reason,
        value: client.id,
      }));

    const router = useRouter();
    const {product_version, product_version_name, product_name} = router.query;
    const onBack = () => {
        router.back();
    };

    const assert_values = (client, description, priority, resource, severity, title) =>{
        let errors = [];
        let passed = true;
        if (!client) {
            errors.push("Te falta el cliente forro");
            passed = false;
        }
            
        if (!description){
            errors.push("Te falta la description pedazo de pelado mogolico");
            passed = false;
        }
            
        if (!priority) {
            errors.push("Te falta la priority forro");
            passed = false;
        }
        
        if (!resource){
            passed = false;
            errors.push("Te falta el resource forro");
        }
            
        if (!severity){
            errors.push("Te falta la severidad forro");
            passed = false;   
        }

        if (!title){
            errors.push("Te falta el titulo forro");
            passed = false;
        }
        return errors;
    }

    const onSave = () => {

        const errors = assert_values(client, description, priority, resource, severity, title); 
        if (errors.length !== 0) {
            setErrors(errors);
            console.log("ERRORES LA PUTA MADRE", errors);
            return;
        }

        const body_ticket = {
            client_id: client,
            description: description ,
            priority: priority,
            product_version_id: product_version,
            resource_name: resource,
            severity: severity,
            title: title
        };

        fetch(`${BASE_URL}/v1/ticket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body_ticket),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            try {
                console.log(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });
        router.back();
    };

    // const severities_options = [1,2,3,4];


    // useEffect(() => {

    //     if (router.isReady) {
    //         const {ticket_id} = router.query;
    //         fetch(`${BASE_URL}/v1/ticket?ticket_id=${ticket_id}`, {
    //             method: "GET",
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not OK');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             try {
    //                 setTicket(data.result);
    //             } catch (error) {
    //                 console.error('Error parsing JSON:', error);
    //             }
    //         });
    //     }
    // }, [router.isReady]);

    const handleClosePopUp = () => {
        setErrors([]);
    };

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                 <div className="mb-4">
                        <div className="text-2xl font-bold decoration-gray-400 w-fit text-black">Create New Ticket</div>
                        <div className="justify-between flex">
                        <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500"> Producto: {product_name}</div>
                        <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-gray-500"> Version: {product_version_name}</div>
                    </div>
                </div>
                <div className="flex flex-col pr-40">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 ">
                            <div className="flex flex-row justify-around min-w-full  px-2 mt-5 ">
                                <Input label="Title" value={title} onChange={setTitle}/>
                                <Input label="Resource" value={resource} onChange={setResource} />
                                <Select label="Clientes" options={selectClientOptions} value={client} onChange={setClient}/>
                            </div>
                            <div className="flex flex-row justify-around min-w-full  px-2 mt-5 ">
                                <Select label="Severidad"  options={TICKET_SEVERITY} value={severity} onChange={setSeverity}/>
                                <Select label="Prioridad"  options={TICKET_PRIORITY} value={priority} onChange={setPriority}/>
                            </div>
                            <div className="mx-12">
                                <DescriptionInput label="Descripcion" value={description} onChange={setDescription}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between pt-5">
                        <div className="flex justify-end">
                            <button className="w-min font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-black-800 text-black bg- mr-5 bg-red-500 hover:bg-red-700" onClick={onBack}>Cancel</button>
                            <button className="w-min font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black  bg-green-500 hover:bg-green-700" onClick={onSave}>Save</button>
                        </div>
                    </div>
                </div>
                <PopUpERROR show={errors.length !== 0} title={"UN TITULO RE COPADO"} items={errors} onClick={handleClosePopUp}/>
            </div>
        </>
    );
}
