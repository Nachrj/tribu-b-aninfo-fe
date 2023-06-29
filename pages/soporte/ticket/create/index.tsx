import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { InputLabel, MenuItem } from '@mui/material';
import { createTicket } from '@/requests/ticket';
import { useResourceData } from '@/services/resources';
import { useClientData } from '@/services/clients';
import { useRouter } from 'next/router';
import GoBack from '@/components/backButton';
import { PRIORITY_OPTIONS, SEVERITY_OPTIONS } from "@/constants/support";

export default function CreateTicket() {
    const { register, handleSubmit } = useForm();
    const [nameError, setNameError] = useState("");
    const [descError, setDescError] = useState("");
    const [clientError, setClientError] = useState("");
    const [resource, setResource] = useState("");
    const [client, setClient] = useState("");
    const [priorityError, setPriorityError] = useState('');
    const [severityError, setSeverityError] = useState('');
    const [severity, setSeverity] = useState(0);
    const [priority, setPriority] = useState(0);

    const resources = useResourceData();
    const clients = useClientData();

    const router = useRouter();
    const { product_version, product_version_name, product_name } = router.query;
    
    const handleChangePriority = (option : any) => {
        setPriority(option);
        setPriorityError("");
    };

    const handleChangeResource = (event : any) => {
        setResource(event.target.value);
    };
    
    const handleChangeClient = (event : any) => {
        setClient(event.target.value);
    };
    
    const handleChangeSeverity = (option : any) => {
        setSeverity(option);
        setSeverityError("");
    };
    
    const validateForm = (formData: FieldValues) => {
        setNameError(!formData.title ? FORMERRORS.noName : '');
        setDescError(!formData.description ? FORMERRORS.noDescription : '');
        setClientError(!formData.client_id ? FORMERRORS.noClient : '');
        setPriorityError(!formData.priority ? FORMERRORS.noPriority : '');
        setSeverityError(!formData.severity ? FORMERRORS.noSeverity : '');
        
        if (formData.title?.length > MAXLENGTHS.name) {
            setNameError(FORMERRORS.maxNameLength);
        }
        
        if (formData.description?.length > MAXLENGTHS.description) {
            setDescError(FORMERRORS.maxDescriptionLength);
        }

        formData.product_version_id = Number(product_version);

        return (
            nameError == '' &&
            descError == '' &&
            clientError == '' &&
            priorityError == '' &&
            severityError == '' &&
            formData.title &&
            formData.description &&
            formData.client_id &&
            formData.priority &&
            formData.severity 
            );
        };
        
        const modifybody = (body : any) => {
            body["product_version_id"] = product_version;
        }
        
        const handleFormSubmit = (formData: FieldValues) => {
            modifybody(formData);
            if (validateForm(formData)) {
                console.log(formData);
                createTicket(formData);
                router.back();
            }
        }
        
        const handleCancel = () => {
            console.log("entro al cancel")
            router.back();
        };
    
    return (
        <>
            <div className="container max-w-7xl mx-auto mt-4">
                <div className="mb-4">
                    <GoBack/>   
                    <div className="text-4xl font-bold decoration-gray-400 w-fit text-black">Crear Nuevo Ticket</div>
                    <div className="justify-between flex">
                        <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500">Producto: {product_name}</div>
                        <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-gray-500">Version: {product_version_name}</div>
                    </div>
                </div>
                <div className="flex flex-col pr-40">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 "></div>
                            <Container component="main">
                                <Box
                                    sx={{
                                        marginTop: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box sx={{ mt: 0, width: '50%' }}>
                                        <form onSubmit={handleSubmit(handleFormSubmit)}>

                                            <Grid container spacing={1}>

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
                                                        error={clientError != "" ? true : false}
                                                    >
                                                        {clients.map((client) => (
                                                            <MenuItem key={client.id} value={client.id}>
                                                                {client.social_reason}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
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
                                                        {PRIORITY_OPTIONS.map((option) => (
                                                            <MenuItem key={option.key} value={option.key} onClick={() => handleChangePriority(option.key)}>
                                                                {option.label}
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
                                                        {SEVERITY_OPTIONS.map((option) => (
                                                        <MenuItem key={option.key} value={option.key} onClick={() => handleChangeSeverity(option.key)}>
                                                            {option.label}
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
                                                onClick={handleCancel}>
                                                Cancelar
                                            </Button>
                                        </form>
                                    </Box>
                                </Box>
                            </Container>
                    </div>
                </div>
            </div>
        </>
    )
}

