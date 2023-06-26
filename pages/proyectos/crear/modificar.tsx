import * as React from 'react';
import {Ticket} from "@/pages/types";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { FieldValues, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORM_ERRORS } from '@/constants/form';
import { InputLabel, MenuItem } from '@mui/material';
import { editTicket, getTicket } from "@/requests/ticket";


export default function ModifyTicket() {
    const titulo = "asd";
    const descripcion = "sadasdasdasdasda";
    const recurso = "asdas";
    const cliente = 2;
    const estado = 1;
    const prioridad = 2;
    const severidad = 2;

    const [ticketData, setTicket] = useState<Ticket>();
    const {register, handleSubmit} = useForm();
    const [nameError, setNameError] = useState("");
    const [descError, setDescError] = useState("");
    const [clientError, setClientError] = useState("");
    const [resourceError, setResourceError] = useState("");
    const [priorityError, setPriorityError] = useState('');
    const [severityError, setSeverityError] = useState('');
    const [stateError, setStateError] = useState('');
    
    const options = [1,2,3];
    const [severity, setSeverity] = useState(severidad);
    const [priority, setPriority] = useState(prioridad);
    const [state, setState] = useState(estado);
    
    const [title, setTitle] = useState(titulo);
    const [desc, setDesc] = useState(descripcion);
    const [resource, setResourse] = useState(recurso);
    const [client, setClient] = useState(cliente);
    
    
    // const handleChangeClient = (event) => {
    //   setClient(event.target.value);
    //   setClientError("");
    // };
    
    const handleChangePriority = (event) => {
      setPriority(event.target.value);
      setPriorityError("");
    };

    const handleChangeSeverity = (event) => {
      setSeverity(event.target.value);
      setSeverityError("");
    };
    
    const handleChangeState = (event) => {
      setState(event.target.value);
      setStateError("");
    };



    const validateForm = (formData: FieldValues) => {
      setNameError(!formData.title ? FORM_ERRORS.noName : '');
      setDescError(!formData.description ? FORM_ERRORS.noDescription : '');
      setClientError(!formData.client_id ? FORM_ERRORS.noClient : '');
      setPriorityError(!formData.priority ? FORM_ERRORS.noPriority : '');
      setSeverityError(!formData.severity ? FORM_ERRORS.noSeverity : '');
      setResourceError(!formData.resource_name ? FORM_ERRORS.noResource : '');
      
      if (formData.state == 1) {
        setStateError(FORM_ERRORS.InvalidState);
        // setNameError(FORM_ERRORS.maxNameLength);
      }

      if (formData.description?.length > MAXLENGTHS.description) {
        setDescError(FORM_ERRORS.maxDescriptionLength);
      }
      
      if (formData.description?.length > MAXLENGTHS.description) {
        setDescError(FORM_ERRORS.maxDescriptionLength);
      }

      return (
        nameError == '' &&
        descError == '' &&
        clientError == '' &&
        priorityError == '' &&
        severityError == '' &&
        stateError == '' &&
        resourceError == '' &&
        formData.title &&
        formData.description &&
        formData.client_id &&
        formData.priority &&
        formData.severity &&
        formData.state &&
        formData.resource_name
      );
    };

    const modifybody = (body) =>{
      body["ticket_id"] = 8;
      body["product_version_id"] = 1;
    }
    
    const handleFormSubmit = (formData: FieldValues) => {
      console.log("ASDASDASDASDASDDASDAS");
      if (validateForm(formData)) { 
        modifybody(formData);
        console.log(formData);
        // fetch

        editTicket(setTicket,formData)
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
              Modificar Ticket
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
                          defaultValue={title}
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
                          defaultValue={desc}
                          autoFocus
                          multiline
                          rows={4}
                          helperText={descError}
                          {...register('description')}
                          />
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          error={descError && descError != " " ? true : false}
                          fullWidth
                          id="resource_name"
                          label="Recurso"
                          defaultValue={resource}
                          autoFocus
                          helperText={resourceError}
                          {...register('resource_name')}
                          />
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          error={descError && descError != " " ? true : false}
                          fullWidth
                          type='number'
                          id="client_id"
                          label="Cliente"
                          defaultValue={client}
                          autoFocus
                          helperText={clientError}
                          {...register('client_id')}
                          // onChange={handleChangeClient}
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

                  <Grid item xs={6}>
                    <InputLabel id="select-state">Estado</InputLabel>
                    <Select 
                      labelId="state" 
                      id="select-state" 
                      value={state}
                      fullWidth
                      autoFocus
                      error={stateError != "" ? true : false}
                      {...register('state')}
                      >
                      {options.map((option) => (
                        <MenuItem key={option} value={option} onClick={() => handleChangeState(option)}>
                          {option}
                        </MenuItem>
                      ))}  
                    </Select>
                  </Grid>

                </Grid>
                <Button 
                  type="submit"
                  fullWidth
                  style={{backgroundColor: COLORS.button, height: '50px'}}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} >
                    Guardar
                </Button>
                <Button 
                  type="submit"
                  fullWidth
                  style={{ height: '50px'}}
                  variant="outlined"
                  sx={{ mb: 2 }} 
                  href="../">
                    Cancelar
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
    )
}
