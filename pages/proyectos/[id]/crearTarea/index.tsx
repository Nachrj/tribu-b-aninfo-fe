import * as React from 'react';
import { Container, Typography, Box, Button, TextField, Grid, Select, MenuItem } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { useRouter } from 'next/router'
import { PROJECT_URL } from '@/pages/_app';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Resource, prioritiesMap, statusMap } from '@/utils/types';

export default function CreateTask() {
    const {register, handleSubmit} = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [clientError, setClientError] = useState(" ");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [priority, setPriority] = useState<string | undefined>(" ");
    const [selectedResourceId, setSelectedResourceId] = useState<string | undefined>(" ");
    const [resources, setResources] = useState<Resource[]>([]);
    const [state, setState] = useState<string | undefined>(" ");

    const router = useRouter()
    const id = router.query.id

    const validateForm = (formData: FieldValues) => {
      setNameError(!formData.taskName ? FORMERRORS.noName : ' ');
      setDescError(!formData.taskDescription ? FORMERRORS.noDescription : ' ');
      if (formData.taskName?.length > MAXLENGTHS.name) {
        setNameError(FORMERRORS.maxNameLength);
      }

      if (formData.taskDescription?.length > MAXLENGTHS.description) {
        setDescError(FORMERRORS.maxDescriptionLength);
      }

      return (
        nameError == ' ' &&
        descError == ' ' &&
        clientError == ' ' &&
        formData.taskName &&
        formData.taskDescription
        );
    };
    
    const handleFormSubmit = (formData: FieldValues) => {
      if (validateForm(formData)) { 
        fetch(`${PROJECT_URL}/projects/${id}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.taskName,
          description: formData.taskDescription,
          priority: priority,
          state: state,
          dueDate: selectedDate,
        })
      })
      .then((res) => {
          console.log("res", res)
          return res.json()
      })
      .then((data) => {
          console.log("Project created: ", data)
          router.push(`../${id}`)
      })
      }
    }

    useEffect(() => {
      fetch("https://recursos-squad12.onrender.com/recursos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
          .then((res) => {
              console.log("res", res)
              return res.json()
          })
          .then((data) => {
              console.log("Got data from resources: ", data)
              setResources(data)
          })
    }, [])

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
                    {Array.from(prioritiesMap.entries()).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                      fullWidth
                      id="state"
                      label="Estado"
                      autoFocus
                      select
                      value={state}
                      onChange={(event: any) => {
                        setState(event.target.value);
                      }}
                    >
                    {Array.from(statusMap.entries()).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                    ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                <LocalizationProvider 
                  dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha límite"
                    sx={{ width: '100%'}}
                    value={selectedDate}
                    onChange={(newValue: any) => {
                      setSelectedDate(newValue);
                    }}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                      fullWidth
                      id="recurso"
                      label="Recurso"
                      autoFocus
                      InputLabelProps={{
                        shrink: true,
                      }}
                      select
                      value={selectedResourceId}
                      onChange={(event: any) => {
                        setSelectedResourceId(event.target.value);
                      }}
                    >
                      {resources.map((resource) => (
                      <MenuItem key={resource.legajo} value={resource.legajo}>
                        {resource.Nombre} {resource.Apellido}
                      </MenuItem>
                    ))}
                    </TextField>
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
