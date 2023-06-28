import * as React from 'react';
import { Container, Typography, Box, Button, TextField, Grid, MenuItem } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { useRouter } from 'next/router'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Resource, prioritiesMap, statusMap } from '@/utils/types';
import { PROJECT_URL } from '@/pages/_app';
import { TASK } from '@/utils/dump';

export default function UpdateTask() {
    const router = useRouter()
    const id = router.query.id
    const projectId = router.query.projectId
    const [task, setTask] = useState(TASK)
    const {register, handleSubmit, reset } = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [dueDateError, setDueDateError] = useState(" ");
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [priority, setPriority] = useState<string | undefined>(" ");
    const [state, setState] = useState<string | undefined>(" ");
    const [selectedResourceId, setSelectedResourceId] = useState<string | undefined>(" ");
    const [resources, setResources] = useState<Resource[]>([]);

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

    useEffect(() => {
      fetch(`${PROJECT_URL}/tasks/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
          console.log("res", res)
          return res.json()
      })
      .then((task) => {
          console.log("Got task: ", task)
          if (task) {
            setTask(task)
            reset({
              taskName: task.name,
              taskDescription: task.description,
              taskPriority: task.priority,
              taskState: task.state,
              taskDueDate: task.dueDate,
              taskResource: task.resourceId,
            })
            setDueDate(task.dueDate)
            setPriority(task.priority)
            setState(task.state)
            setSelectedResourceId(task.resourceId);
          }
      })
    }, [resources])

    const validateForm = (formData: FieldValues) => {
      setNameError(!formData.taskName ? FORMERRORS.noName : ' ');
      setDescError(!formData.taskDescription ? FORMERRORS.noDescription : ' ');
      setDueDateError(!dueDate ? FORMERRORS.noDueDate : ' ');
      if (formData.taskName?.length > MAXLENGTHS.name) {
        setNameError(FORMERRORS.maxNameLength);
      }

      if (formData.taskDescription?.length > MAXLENGTHS.description) {
        setDescError(FORMERRORS.maxDescriptionLength);
      }

      return (
        nameError == ' ' &&
        descError == ' ' &&
        formData.taskName &&
        formData.taskDescription
        );
    };
    
    const handleFormSubmit = (formData: FieldValues) => {
      if (validateForm(formData)) { 
        fetch(`${PROJECT_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.taskName,
          description: formData.taskDescription,
          priority: priority,
          state: state,
          dueDate: dueDate,
          resourceId: selectedResourceId,
          projectId: task.projectId,
        })
      })
      .then((res) => {
          console.log("res", res)
      })
      .then(() => {
          console.log("Task updated")
          router.push(`../../${projectId}`)
      })
      }
    }

    const handleChangeResource = (newResourceValue: string) => {
      console.log('New Resource Value: ', newResourceValue)
      const selectedResource = resources.find((resource: Resource) => resource.legajo === newResourceValue);
    };

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
              Editar Tarea
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
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      select
                      value={state}
                      onChange={(event: any) => {
                        setState(event.target.value);
                        console.log('state: ', event.target.value)
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
                      value={dueDate}
                      onChange={(newValue: any) => {
                        setDueDate(newValue);
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
                  Actualizar
              </Button>
              <Button 
                type="submit"
                fullWidth
                style={{ height: '50px'}}
                variant="outlined"
                sx={{ mb: 2 }}
                onClick={() => router.push(`../../${projectId}`)}
                >
                  Cancelar
              </Button>
            </Box>
          </Box>
        </Container>
    )
}