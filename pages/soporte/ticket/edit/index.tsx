import { Ticket } from "@/utils/types";
import { useEffect, useState } from "react";
import React from 'react';
import { useRouter } from 'next/router';
import Select from '@mui/material/Select';
import { STATES_OPTIONS, PRIORITY_OPTIONS, SEVERITY_OPTIONS } from "@/constants/support";
import GoBack from '@/components/backButton';
import PopUpError from "@/components/popUpError";
import { editTicket, getTicket } from "@/requests/ticket";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FieldValues, useForm } from 'react-hook-form';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { InputLabel, MenuItem } from '@mui/material';
import { useResourceData } from '@/services/resources';
import { useClientData } from '@/services/clients';

export default function TicketModify() {
  const [ticketData, setTicket] = useState<Ticket>();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [severity, setSeverity] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [client, setClient] = useState<number>(0);
  const [resource, setResource] = useState<string>('');
  const [state, setState] = useState<number>(0);

  const { register, handleSubmit } = useForm();

  const [errors, setErrors] = useState([]);
  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [clientError, setClientError] = useState("");
  const [resourceError, setResourceError] = useState("");
  const [priorityError, setPriorityError] = useState('');
  const [severityError, setSeverityError] = useState('');
  const [stateError, setStateError] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const { ticket_id } = router.query;
      getTicket((data: Ticket) => {
        setTicket(data);
      }, ticket_id);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (ticketData) {

      updateStateFromTicketData(ticketData);
    }
  }, [ticketData]);

  const updateStateFromTicketData = (data: Ticket) => {
    setTitle(data.title || '');
    setDescription(data.description || '');
    setSeverity(data.severity || 0);
    setPriority(data.priority || 0);
    setClient(data.client_id || 0);
    setResource(data.resource_name || '');
    setState(data.state);
  };

  const handleChangePriority = (option : any) => {
    setPriority(option);
    setPriorityError("");
  };

  const handleChangeSeverity = (option : any) => {
    setSeverity(option);
    setSeverityError("");
  };

  const handleChangeState = (option : any) => {
    setState(option);
    setStateError("");
  };

  const onBack = () => {
    router.back();
  };

  const handleClosePopUp = () => {
    setErrors([]);
  };


  const resources = useResourceData();
  const clients = useClientData();

  useEffect(() => {
    if (router.isReady) {
      const { ticket_id } = router.query;
      getTicket(setTicket, ticket_id);
    }
  }, [router.isReady]);


  // devuelve true si ambos datos son nulos
  function allDataIsNull(data1 : any, data2 : any) {
    if((!data1  && !data2)){
      return true;
    }
    return false;
  }


  const validateForm = (formData: FieldValues) => {
    let noerror = true;
    
    if(allDataIsNull(formData.title, ticketData?.title)){
      setNameError(!formData.title ? FORMERRORS.noName : '');
      noerror = false;
    }
    if(allDataIsNull(formData.description, ticketData?.description)){
      setDescError(!formData.description ? FORMERRORS.noDescription : '');
      noerror = false;
    }
    if(allDataIsNull(formData.client_id, ticketData?.client_id)){
      setClientError(!formData.client_id ? FORMERRORS.noClient : '');
      noerror = false;
    }
    if(allDataIsNull(formData.resource_name, ticketData?.resource_name)){
      if((!formData.state && ticketData?.state !=1) || (formData.state && formData.state !=1)){	
          setResourceError(!formData.resource_name ? FORMERRORS.noResource : '');
          noerror = false;
      }
    }

    if (formData.title?.length > MAXLENGTHS.name) {
      noerror = false;
      setNameError(FORMERRORS.maxNameLength);
    }
      
    if (formData.description?.length > MAXLENGTHS.description) {
      noerror = false;
      setDescError(FORMERRORS.maxDescriptionLength);
    }

    return noerror;
  };

  const modifybody = (body : any) => {
    body["ticket_id"] = ticketData?.id;
    body["product_version_id"] = ticketData?.product_version_id;
    
    if(!body['client_id']){
      body['client_id'] = ticketData?.client_id;
    }
    if(!body['title']){
      body['title'] = ticketData?.title;
    }
    if(!body['description']){
      body['description'] = ticketData?.description;
    }
    if(!body['state']){
      body['state'] = ticketData?.state;
    }
    if(!body['severity']){
      body['severity'] = ticketData?.severity
    }
    if(!body['priority']){
      body['priority'] = ticketData?.priority;
    }
    if(!body['resource_name']){
      body['resource_name'] = ticketData?.resource_name;
    }
  }

  const handleChangeResource = (option : any) => {
    setResource(option);
    setResourceError("");
  };


  const handleChangeClient = (option : any) => {
    setClient(option);
    setClientError("");
  };

  const handleFormSubmit = (formData: FieldValues) => {
    if (validateForm(formData)) {
      modifybody(formData);
      editTicket(setTicket, formData)
      router.back();
    }
  }

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <GoBack />
          <div className="text-4xl font-bold decoration-gray-400 w-fit text-black">Modificar Ticket</div>
          <div className="justify-between flex">
            <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500">Ticket: {title}</div>
            <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-gray-500"> ID: {ticketData?.id}</div>
          </div>
        </div>
        <div className="flex flex-col pr-40">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 ">
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
                          <InputLabel htmlFor="title">Título</InputLabel>
                          <TextField
                            error={nameError && nameError != " " ? true : false}
                            fullWidth
                            id="title"
                            defaultValue={title}
                            // value={title}
                            autoFocus
                            multiline
                            rows={1}
                            helperText={nameError}
                            {...register('title')}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <InputLabel htmlFor="description">Descripción</InputLabel>
                          <TextField
                            error={descError && descError != " " ? true : false}
                            fullWidth
                            id="description"
                            defaultValue={description}
                            // value={description}
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
                            defaultValue={resource}
                            value={resource}
                            fullWidth
                            autoFocus
                            error={resourceError != "" ? true : false}
                            {...register('resource_name')}
                          >
                            {resources.map((resource) => (
                              <MenuItem key={`${resource.Nombre} ${resource.Apellido}`} value={`${resource.Nombre} ${resource.Apellido}`} onClick={() => handleChangeResource(`${resource.Nombre} ${resource.Apellido}`)}>
                                {`${resource.Nombre} ${resource.Apellido}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>

                        <Grid item xs={12}>
                          <InputLabel id="select-client-label">Cliente</InputLabel>
                          <Select
                            labelId="select-client-label"
                            id="select-client-label"
                            defaultValue={client}
                            value={client}
                            fullWidth
                            autoFocus
                            error={clientError != "" ? true : false}
                            {...register('client_id')}
                          >
                            {clients.map((client) => (
                              <MenuItem key={client.id} value={client.id} onClick={() => handleChangeClient(client.id)}>
                                {client.social_reason}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel id="select-state">Estado</InputLabel>
                          <Select
                            labelId="state"
                            id="select-state"
                            defaultValue={state}
                            value={state}
                            fullWidth
                            autoFocus
                            error={stateError != "" ? true : false}
                            {...register('state')}
                          >
                            {STATES_OPTIONS.map((option) => (
                              <MenuItem key={option.key} value={option.key} onClick={() => handleChangeState(option.key)}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>

                        <Grid item xs={6}>
                          <InputLabel id="select-priority">Prioridad</InputLabel>
                          <Select
                            labelId="priority"
                            id="select-priority"
                            defaultValue={priority}
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
                            defaultValue={severity}
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
                        Guardar
                      </Button>

                      <Button
                        fullWidth
                        style={{ height: '50px' }}
                        variant="outlined"
                        sx={{ mb: 2 }}
                        onClick={onBack}>
                        Cancelar
                      </Button>
                    </form>
                  </Box>
                </Box>
              </Container>
            </div>
          </div>
        </div>
        <PopUpError show={errors.length !== 0} title={"Se encontraron errores en los datos."} items={errors} onClick={handleClosePopUp} />
      </div>
    </>
  );
}
