import * as React from 'react';
import { Container, Typography, Box, Button, TextField, Grid, Select, MenuItem } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import COLORS from '@/constants/colors';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { useRouter } from 'next/router'

const PRIORITIES = ["Iniciado", "En progreso", "Finalizado"]

export default function CreateTask() {
    const {register, handleSubmit} = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [clientError, setClientError] = useState(" ");
    const [costError, setCostError] = useState(" ");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [priority, setPriority] = useState<string | undefined>(" ");

    const router = useRouter()
    const id = router.query.id

    const validateForm = (formData: FieldValues) => {
      setNameError(!formData.projectName ? FORMERRORS.noName : ' ');
      setDescError(!formData.projectDescription ? FORMERRORS.noDescription : ' ');
      setClientError(!formData.projectClient ? FORMERRORS.noClient : ' ');
      setCostError(!formData.projectCost ? FORMERRORS.noCost : ' ');

      if (formData.projectName?.length > MAXLENGTHS.name) {
        setNameError(FORMERRORS.maxNameLength);
      }

      if (formData.projectDescription?.length > MAXLENGTHS.description) {
        setDescError(FORMERRORS.maxDescriptionLength);
      }

      return (
        nameError == ' ' &&
        descError == ' ' &&
        clientError == ' ' &&
        costError == ' ' &&
        formData.projectName &&
        formData.projectDescription &&
        formData.projectCost &&
        formData.projectClient
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
            }}
          >
            <Typography variant="h3" component="h1">
              Crear Tarea
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 4, width: '50%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        error={nameError && nameError != " " ? true : false}
                        helperText={nameError}
                        fullWidth
                        id="taskName"
                        label="Nombre"
                        autoFocus
                        {...register('taskName')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={descError && descError != " " ? true : false}
                        fullWidth
                        id="taskDescription"
                        label="Descripción"
                        autoFocus
                        multiline
                        rows={4}
                        helperText={descError}
                        {...register('taskDescription')}
                    />
                </Grid>
                <Grid item xs={6}>
                <TextField 
                    fullWidth
                    id="priority"
                    label="Prioridad"
                    autoFocus
                    select
                    value={priority}
                    onChange={(event: any) => {
                      setPriority(event.target.value);
                    }}
                  >
                    {PRIORITIES.map((priority, index) => (
                      <MenuItem key={index} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider 
                    dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Finalización"
                      sx={{ width: '100%'}}
                      value={selectedDate}
                      onChange={(newValue: any) => {
                        setSelectedDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
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
                onClick={() => router.push(`../${id}`)}
                >
                  Cancelar
              </Button>
            </Box>
          </Box>
        </Container>
    )
}
