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


export default function ModifyTicket() {
    const {register, handleSubmit} = useForm();
    const options = [1,2,3];
    const [priorityError, setPriorityError] = useState('');
    const [severityError, setSeverityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [severity, setSeverity] = useState(0);
    const [priority, setPriority] = useState(0);
    const [state, setState] = useState(0);


    const titulo = "csaca";
    const descripcion = "dsadasdasdasdasd";
    const recurso = "juan";
    const cliente = "1";
    const estado = "1";
    const prioridad = "1";
    const severidad = "1";




    const handleChangePriority = (option) => {
      setPriority(option);
      setPriorityError("");
    };

    const handleChangeSeverity = (option) => {
      setSeverity(option);
      setSeverityError("");
    };
    
    const handleChangeState = (option) => {
      setState(option);
      setStateError("");
    };

    const handleFormVerTareas = (formData: FieldValues) => {
      console.log("holanda");
      //se debe dirigir a las tareas del ticket_id

        // fetch(`http://localhost:5001/v1/ticket`, {
        //   method: "POST",
        //   headers: {
        //       "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not OK');
        //     }
        //     return response.json();
        // })
        // .then((data) => {
        //     try {
        //         console.log(data);
        //     } catch (error) {
        //         console.error('Error parsing JSON:', error);
        //     }
        // });
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
              Ver Ticket
            </Typography>
            <Box sx={{ mt: 4, width: '50%' }}>
              <form onSubmit={handleSubmit(handleFormVerTareas)}>
                
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                      <TextField
                          fullWidth
                          id="title"
                          label="Título"
                          value={titulo}
                          disabled
                          autoFocus
                          {...register('title')}
                          />
                  </Grid>
                  
                  <Grid item xs={12}>
                      <TextField
                          fullWidth
                          id="description"
                          label="Descripción"
                          autoFocus
                          multiline
                          value={descripcion}
                          disabled
                          rows={4}
                          {...register('description')}
                          />
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          fullWidth
                          id="resource_name"
                          label="Recurso"
                          autoFocus
                          value={recurso}
                          disabled
                          {...register('resource_name')}
                          />
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          fullWidth
                          id="client_id"
                          label="Cliente"
                          autoFocus
                          value={cliente}
                          disabled
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
                      value={prioridad}
                      disabled
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
                      value={severidad}
                      disabled
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
                      value={estado}
                      disabled
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
                    Ver Tareas
                </Button>
                {/* <Button 
                  type="submit"
                  fullWidth
                  style={{ height: '50px'}}
                  variant="outlined"
                  sx={{ mb: 2 }} 
                  href="../proyectos">
                    Cancelar
                </Button> */}
              </form>
            </Box>
          </Box>
        </Container>
    )
}
