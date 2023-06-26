import * as React from 'react';
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


export default function ModifyTicket() {
    const titulo = "csaca";
    const descripcion = "dsadasdasdasdasd";
    const recurso = "juan";
    const cliente = "1";
    const estado = "1";
    const prioridad = "1";
    const severidad = "1";


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
    


    const handleChangeTitle = (option) => {
      setTitle(option);
      setNameError("");
    };
    const handleChangeDescription = (option) => {
      setDescription(option);
      setDescError("");
    };
    const handleChangeResource = (option) => {
      setResource(option);
      setResourceError("");
    };
    
    const handleChangeClient = (event) => {
      setClient(event.target.value);
      setClientError("");
    };
    
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


    useEffect(() => {
      setClient(client);
    }, [client]);

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
    
    const handleFormSubmit = (formData: FieldValues) => {
      console.log("ASDASDASDASDASDDASDAS");
      if (validateForm(formData)) { 
        console.log(formData);
        // fetch

        fetch(`http://localhost:5001/v1/ticket`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
                          value={title}
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
                          value={desc}
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
                          value={resource}
                          autoFocus
                          helperText={resourceError}
                          {...register('resource_name')}
                          />
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          error={descError && descError != " " ? true : false}
                          fullWidth
                          id="client_id"
                          label="Cliente"
                          value={client}
                          autoFocus
                          helperText={clientError}
                          onChange={handleChangeClient}
                          {...register('client_id')}
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
                  href="../proyectos">
                    Cancelar
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
    )
}
