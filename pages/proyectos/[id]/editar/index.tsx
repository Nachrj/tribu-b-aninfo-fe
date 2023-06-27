import * as React from 'react';
import { Container, Typography, Box, Button, TextField, Grid } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { useRouter } from 'next/router'
import { PROJECT } from '@/utils/dump';
import { Project } from '@/utils/types';
import { PROJECT_URL } from '@/pages/_app';

export default function CreateTask() {
    const {register, handleSubmit} = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [hoursError, setHoursError] = useState(" ");
    const [currentProject, setCurrentProject] = useState<Project>(PROJECT);
    const router = useRouter()
    const id = router.query.id

    const getProject = () => {
        fetch(`${PROJECT_URL}/projects/${id}`, {
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
                  console.log("Got data from projects id: ", data)
                  setCurrentProject(data)
              })
    }

    useEffect(() => {
        if(id) {
            getProject()
        }
      }, [id])

    const validateForm = (formData: FieldValues) => {
      console.log('formData: ', formData)
      setNameError(!formData.projectName ? FORMERRORS.noName : ' ');
      setDescError(!formData.projectDesc ? FORMERRORS.noDescription : ' ');
      setHoursError(!formData.projectHours ? FORMERRORS.noHours : ' ');

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
        hoursError == ' ' &&
        formData.projectName &&
        formData.projectDescription &&
        formData.projectHours
        );
    };
    
    const handleFormSubmit = (formData: FieldValues) => {
        if (validateForm(formData)) { 
          const { name, description, consumedHours, ...rest} = currentProject
          console.log('current Project name', name)
          console.log('current Project description', description)
          console.log('current consumedHours', consumedHours)
          console.log('res: ', rest)
          fetch(`${PROJECT_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.projectName,
              description: formData.projectDescription,
              consumedHours: formData.projectHours,
              ...rest,
            })
          })
          .then((res) => {
            console.log("res", res)
            return res.json()
          })
          .then((data) => {
            console.log("Project edited: ", data)
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
                        multiline
                        rows={4}
                        helperText={descError}
                        {...register('projectDescription')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={hoursError && hoursError != " " ? true : false}
                        fullWidth
                        id="projectHours"
                        label="Horas insumidas"
                        autoFocus
                        type="number"
                        helperText={hoursError}
                        {...register('projectHours')}
                    />
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
