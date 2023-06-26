// import { useState } from "react";
// import React from 'react';
// import { useRouter } from 'next/router';
// import Input from "@/components/input";
// import DescriptionInput from "@/components/descriptionInput";
// import Select from "@/components/select";
// import { TICKET_PRIORITY, TICKET_SEVERITY } from "@/pages/soporte/constants";
// import PopUpERROR from "@/components/popUpError";
// import GoBack from '@/components/backButton';
// import { useClientData } from "@/services/clients";
// import { createTicket } from "@/requests/ticket";
// import { useResourceData } from "@/services/resources";

// export default function CreateTicket() {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [severity, setSeverity] = useState(0);
//     const [priority, setPriority] = useState(0);
//     const [client, setClient] = useState("");
//     const [resource, setResource] = useState("");
//     const [errors, setErrors] = useState([]);

//     const clients = useClientData();
//     const resources = useResourceData();

//     const selectClientOptions = clients.map((client) => ({
//         label: client.social_reason,
//         value: client.id,
//     }));

//     selectClientOptions.unshift({ label: "Seleccione un cliente", value: "" });

//     const selectResourceOptions = resources.map((resource) => ({
//         label: `${resource.Nombre} ${resource.Apellido}`,
//         value: resource.legajo,
//     }));

//     selectResourceOptions.unshift({ label: "Seleccione un recurso", value: 0 });

//     const router = useRouter();
//     const { product_version, product_version_name, product_name } = router.query;
//     const onBack = () => {
//         router.back();
//     };

//     const assertValues = (client: string, description: string, priority: number, resource: string, severity: number, title: string) => {
//         let errors = [];
//         if (!client) {
//             errors.push("Falta ingresar el cliente.");
//         }
//         if (!description) {
//             errors.push("Falta ingresar la descripción.");
//         }
//         if (!priority) {
//             errors.push("Falta ingresar la prioridad.");
//         }
//         if (!resource) {
//             errors.push("Falta ingresar el recurso.");
//         }
//         if (!severity) {
//             errors.push("Falta ingresar la severidad.");
//         }
//         if (!title) {
//             errors.push("Falta ingresar el título.");
//         }
//         return errors;
//     }

//     const onSave = () => {

//         const errors = assertValues(client, description, priority, resource, severity, title);
//         if (errors.length !== 0) {
//             setErrors(errors);
//             return;
//         }
//         const foundClient = clients.find((c) => c.social_reason === client)
//         const mappedClient = foundClient ? foundClient.id : 0;

//         const body_ticket = {
//             client_id: mappedClient,
//             description: description,
//             priority: priority,
//             product_version_id: product_version,
//             resource_name: resource,
//             severity: severity,
//             title: title
//         };
//         createTicket(body_ticket);

//         router.back();
//     };

//     const handleClosePopUp = () => {
//         setErrors([]);
//     };

//     return (
//         <>
//             <div className="container max-w-7xl mx-auto mt-8">
//                 <GoBack />
//                 <div className="mb-4">
//                     <div className="text-2xl font-bold decoration-gray-400 w-fit text-black">Crear Nuevo Ticket</div>
//                     <div className="justify-between flex">
//                         <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500"> Producto: {product_name}</div>
//                         <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-gray-500"> Versión: {product_version_name}</div>
//                     </div>
//                 </div>
//                 <div className="flex flex-col pr-40">
//                     <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
//                         <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 ">
//                             <div className="flex flex-row justify-around min-w-full  px-2 mt-5 ">
//                                 <Input label="Título" value={title} onChange={setTitle} />
//                                 <Select label="Recurso" options={selectResourceOptions} value={resource} onChange={setResource} />
//                                 <Select label="Clientes" options={selectClientOptions} value={client} onChange={setClient} />
//                             </div>
//                             <div className="flex flex-row justify-around min-w-full  px-2 mt-5 ">
//                                 <Select label="Severidad" options={TICKET_SEVERITY} value={severity} onChange={setSeverity} />
//                                 <Select label="Prioridad" options={TICKET_PRIORITY} value={priority} onChange={setPriority} />
//                             </div>
//                             <div className="mx-12">
//                                 <DescriptionInput label="Descripción" value={description} onChange={setDescription} />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex justify-end mt-5">
//                         <button className="w-min font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-black-800 text-black mr-10 bg-red-500 hover:bg-red-700" onClick={onBack}>Cancel</button>
//                         <button className="w-min font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black bg-green-500 hover:bg-green-700" onClick={onSave}>Save</button>
//                     </div>
//                 </div>
//                 <PopUpERROR show={errors.length !== 0} title={"Se encontraron errores en los datos."} items={errors} onClick={handleClosePopUp} />
//             </div>
//         </>
//     );
// }

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORM_ERRORS } from '@/constants/form';
import { InputLabel, MenuItem } from '@mui/material';
import { createTicket } from '@/requests/ticket';
import { useResourceData } from '@/services/resources';
import { useClientData } from '@/services/clients';


export default function CreateTicket() {
    const { register, handleSubmit } = useForm();
    const [nameError, setNameError] = useState("");
    const [descError, setDescError] = useState("");
    const [clientError, setClientError] = useState("");
    const [productVersionError, setProductVersionError] = useState("");
    const [resource, setResource] = useState("");
    const [client, setClient] = useState("");
    const [resourceError, setResourceError] = useState("");
    const options = [1, 2, 3];
    const [priorityError, setPriorityError] = useState('');
    const [severityError, setSeverityError] = useState('');
    const [severity, setSeverity] = useState(0);
    const [priority, setPriority] = useState(0);

    const resources = useResourceData();
    const clients = useClientData();

    const handleChangePriority = (option) => {
        setPriority(option);
        setPriorityError("");
    };

    const handleChangeResource = (event) => {
        setResource(event.target.value);
        setResourceError("");
    };

    const handleChangeClient = (event) => {
        setClient(event.target.value);
    };

    const handleChangeSeverity = (option) => {
        setSeverity(option);
        setSeverityError("");
    };

    const validateForm = (formData: FieldValues) => {
        setNameError(!formData.title ? FORM_ERRORS.noName : '');
        setDescError(!formData.description ? FORM_ERRORS.noDescription : '');
        setClientError(!formData.client_id ? FORM_ERRORS.noClient : '');
        setProductVersionError(!formData.product_version_id ? FORM_ERRORS.noProductVersion : '');
        setPriorityError(!formData.priority ? FORM_ERRORS.noPriority : '');
        setSeverityError(!formData.severity ? FORM_ERRORS.noSeverity : '');
        setResourceError(!formData.resource_name ? FORM_ERRORS.noResource : '');

        if (formData.title?.length > MAXLENGTHS.name) {
            setNameError(FORM_ERRORS.maxNameLength);
        }

        if (formData.description?.length > MAXLENGTHS.description) {
            setDescError(FORM_ERRORS.maxDescriptionLength);
        }

        return (
            nameError == '' &&
            descError == '' &&
            clientError == '' &&
            productVersionError == '' &&
            priorityError == '' &&
            severityError == '' &&
            resourceError == '' &&
            formData.title &&
            formData.description &&
            formData.client_id &&
            formData.product_version_id &&
            formData.priority &&
            formData.severity &&
            formData.resource_name
        );
    };

    const handleFormSubmit = (formData: FieldValues) => {
        if (validateForm(formData)) {
            console.log(formData);
            createTicket(formData);
        }
    }

    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                }}
            >
                <Typography variant="h3" component="h1" className='text-black'>
                    Crear Ticket
                </Typography>
                <Box sx={{ mt: 4, width: '50%' }}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>

                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <TextField
                                    error={nameError && nameError != " " ? true : false}
                                    helperText={nameError}
                                    fullWidth
                                    id="title"
                                    label="Título"
                                    autoFocus
                                    {...register('title')}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={descError && descError != " " ? true : false}
                                    fullWidth
                                    id="description"
                                    label="Descripción"
                                    autoFocus
                                    multiline
                                    rows={4}
                                    helperText={descError}
                                    {...register('description')}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel id="select-resource-label">Recurso</InputLabel>
                                <Select
                                    labelId="select-resource-label"
                                    id="select-resource-label"
                                    value={resource}
                                    fullWidth
                                    autoFocus
                                    {...register('resource_name')}
                                    onChange={handleChangeResource}
                                >
                                    {resources.map((resource) => (
                                        <MenuItem key={resource.legajo} value={`${resource.Nombre} ${resource.Apellido}`}>
                                            {`${resource.Nombre} ${resource.Apellido}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel id="select-client-label">Client</InputLabel>
                                <Select
                                    labelId="select-client-label"
                                    id="select-client-label"
                                    value={client}
                                    fullWidth
                                    autoFocus
                                    {...register('client_id')}
                                    onChange={handleChangeClient}
                                >
                                    {clients.map((client) => (
                                        <MenuItem key={client.id} value={client.social_reason}>
                                            {client.social_reason}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    error={descError && descError != " " ? true : false}
                                    fullWidth
                                    id="product_version_id"
                                    label="product_version_id"
                                    type="number"
                                    autoFocus
                                    helperText={productVersionError}
                                    {...register('product_version_id')}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="select-priority">Prioridad</InputLabel>
                                <Select
                                    labelId="priority"
                                    id="select-priority"
                                    value={priority}
                                    error={priorityError != "" ? true : false}
                                    fullWidth
                                    autoFocus
                                    {...register('priority')}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option} onClick={() => handleChangePriority(option)}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel id="select-severity">Severidad</InputLabel>
                                <Select
                                    labelId="severity"
                                    id="select-severity"
                                    value={severity}
                                    fullWidth
                                    autoFocus
                                    error={severityError != "" ? true : false}
                                    {...register('severity')}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option} onClick={() => handleChangeSeverity(option)}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            style={{ backgroundColor: COLORS.button, height: '50px' }}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} >
                            Crear
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            style={{ height: '50px' }}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            href="../proyectos">
                            Cancelar
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    )
}
