import * as React from 'react';
import { Container, Typography, Box, Button, TextField, Grid, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { useRouter } from 'next/router'
import { PROJECT } from '@/utils/dump';
import { Project, Resource, statusMap } from '@/utils/types';
import { PROJECT_URL } from '@/pages/_app';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function CreateTask() {
    const {register, handleSubmit, reset} = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [currentProject, setCurrentProject] = useState<Project>(PROJECT);
    const [resources, setResources] = useState<Resource[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedResourceId, setSelectedResourceId] = useState<string | undefined>(" ");
    const [state, setState] = useState<string | undefined>(" ");
    const router = useRouter()
    const id = router.query.id

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
      fetch(`${PROJECT_URL}/projects/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
          console.log("res", res)
          return res.json()
      })
      .then((project) => {
          console.log("Got project: ", project)
          if (project) {
            setCurrentProject(project)
            reset({
              projectName: project.name,
              projectDescription: project.description,
              projectLeader: project.leaderId,
              projectState: project.state,
              projectEndDate: project.endDate,

            })
            setSelectedDate(project.endDate)
            setState(project.state)
            setSelectedResourceId(project.leaderId);
          }
      })
    }, [resources])

    const validateForm = (formData: FieldValues) => {
      console.log('formData: ', formData)
      setNameError(!formData.projectName ? FORMERRORS.noName : ' ');
      setDescError(!formData.projectDesc ? FORMERRORS.noDescription : ' ');

      console.log('nameError: ', nameError)
      console.log('descError: ', descError)
      if (formData.projectName?.length > MAXLENGTHS.name) {
        setNameError(FORMERRORS.maxNameLength);
      }

      if (formData.projectDescription?.length > MAXLENGTHS.description) {
        setDescError(FORMERRORS.maxDescriptionLength);
      }

      return (
        nameError == ' ' &&
        descError == ' ' &&
        formData.projectName &&
        formData.projectDescription
        );
    };
    
    const handleFormSubmit = (formData: FieldValues) => {
        if (validateForm(formData)) { 
          console.log('Project updated: ', formData)
          fetch(`${PROJECT_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.projectName,
              description: formData.projectDescription,
              endDate: selectedDate,
              startDate: currentProject.startDate,
              leaderId: selectedResourceId,
              state: state,
            })
          })
          .then((res) => {
            console.log("res", res)
          })
          .then(() => {
            console.log("Project edited!")
            router.push(`../${id}`)
          })
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
              Editar Proyecto
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 4, width: '50%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        error={nameError && nameError != " " ? true : false}
                        helperText={nameError}
                        fullWidth
                        id="projectName"
                        label="Nombre"
                        autoFocus
                        InputLabelProps={{
                          shrink: true,
                        }}
                        defaultValue={currentProject.name}
                        {...register('projectName')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={descError && descError != " " ? true : false}
                        fullWidth
                        id="projectDescription"
                        label="Descripción"
                        autoFocus
                        InputLabelProps={{
                          shrink: true,
                        }}
                        multiline
                        rows={4}
                        helperText={descError}
                        {...register('projectDescription')}
                    />
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
                <Grid item xs={6}>
                  <LocalizationProvider 
                    dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Finalización"
                      sx={{ width: '100%'}}
                      value={selectedDate}
                      onChange={(newValue: any) => {
                        setSelectedDate(newValue);
                        console.log('selected end date: ', newValue)
                      }}
                    />
                  </LocalizationProvider>
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
                onClick={() => router.push(`../${id}`)}
                >
                  Cancelar
              </Button>
            </Box>
          </Box>
        </Container>
    )
}

