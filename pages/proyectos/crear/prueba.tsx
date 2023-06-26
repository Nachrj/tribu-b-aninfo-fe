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
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { setPriority } from 'os';
import { FormControl, InputLabel, MenuItem } from '@mui/material';


export default function CreateTicket() {
    const {register, handleSubmit} = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [clientError, setClientError] = useState(" ");
    const [costError, setCostError] = useState(" ");
    const [severityError, setSeverityError] = useState(" ");
    const options = ['Opción 1', 'Opción 2', 'Opción 3'];
    const [priorityError, setPriorityError] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    // const [priority, setPriority] = useState(0);

    const handleChange = (event) => {
      console.log("BOCA BOCA BOCA");
      setSelectedOption(event.target.value);
      setPriorityError(false);
    };

    const handleBlur = () => {
    if (selectedOption === '') {
      setPriorityError(true); // Marca el estado de error si no se selecciona ninguna opción al salir del componente
    }
  };


    const validateForm = (formData: FieldValues) => {
      setNameError(!formData.TicketName ? FORMERRORS.noName : ' ');
      setDescError(!formData.TicketDescription ? FORMERRORS.noDescription : ' ');
      setClientError(!formData.TicketClient ? FORMERRORS.noClient : ' ');
      setPriorityError(!formData.TicketResource ? FORMERRORS.noClient : ' ');
      setSeverityError(!formData.TicketPriority ? FORMERRORS.noClient : ' ');
      setSelectedOption(!formData.TicketSeverity ? FORMERRORS.noCost : ' ');

      if (formData.TicketName?.length > MAXLENGTHS.name) {
        setNameError(FORMERRORS.maxNameLength);
      }

      if (formData.TicketDescription?.length > MAXLENGTHS.description) {
        setDescError(FORMERRORS.maxDescriptionLength);
      }

      return (
        nameError == ' ' &&
        descError == ' ' &&
        clientError == ' ' &&
        priorityError == ' ' &&
        severityError == ' ' &&
        costError == ' ' &&
        formData.TicketName &&
        formData.TicketDescription &&
        formData.TicketCost &&
        formData.TicketClient
      );
    };
    
    const handleFormSubmit = (formData: FieldValues) => {
      if (validateForm(formData)) { 
        console.log(formData);
        // fetch
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
              // background: 'pink'
            }}
          >
            <Typography variant="h3" component="h1" className='text-black'>
              Crear Ticket
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 4, width: '50%' }}>
              <Grid container spacing={3}>

                <Grid item xs={12}>
                    <TextField
                        error={nameError && nameError != " " ? true : false}
                        helperText={nameError}
                        fullWidth
                        id="TicketName"
                        label="Titulo"
                        autoFocus
                        {...register('TicketName')}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        error={descError && descError != " " ? true : false}
                        fullWidth
                        id="TicketDescription"
                        label="Descripción"
                        autoFocus
                        multiline
                        rows={4}
                        helperText={descError}
                        {...register('TicketDescription')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        error={descError && descError != " " ? true : false}
                        fullWidth
                        id="TicketResource"
                        label="Recurso"
                        autoFocus
                        helperText={clientError}
                        {...register('TicketResource')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        error={descError && descError != " " ? true : false}
                        fullWidth
                        id="TicketClient"
                        label="Cliente"
                        autoFocus
                        helperText={clientError}
                        {...register('TicketClient')}
                    />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel id="select-priority">Prioridad</InputLabel>
                  <Select 
                    labelId="TicketPriority" 
                    id="select-priority" 
                    value={selectedOption}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={descError != " " ? true : false}
                    fullWidth
                    autoFocus
                    helperText={priorityError}
                    {...register('TicketPriority')}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel id="select-severity">Severidad</InputLabel>
                  <Select 
                    labelId="TicketSeverity" 
                    id="select-severity" 
                    value={severityError}
                    error={descError && descError != " " ? true : false}
                    fullWidth
                    autoFocus
                    helperText={severityError}
                    onChange={handleChange}
                    {...register('TicketSeverity')}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
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
                  Crear
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
            </Box>
          </Box>
        </Container>
    )
}
