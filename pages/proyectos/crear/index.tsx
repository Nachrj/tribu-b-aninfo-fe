import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import COLORS from '@/constants/colors';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { ProjectState, Resource } from '@/utils/types';
import { PROJECT_URL } from '@/pages/_app';
import { useRouter } from 'next/router';

export default function CreateProject() {
    const router = useRouter()
    const {register, handleSubmit} = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [leaderError, setLeaderError] = useState(" ");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedLeader, setSelectedLeader] = useState<Resource | undefined>(undefined);
    const [resources, setResources] = useState<Resource[]>([]);
    
    const validateForm = (formData: FieldValues) => {
      setNameError(!formData.projectName ? FORMERRORS.noName : ' ');
      setDescError(!formData.projectDescription ? FORMERRORS.noDescription : ' ');

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
        formData.projectDescription);
    };
    
    const handleFormSubmit = (formData: FieldValues) => {
      if (validateForm(formData)) { 
        fetch(`${PROJECT_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.projectName,
          description: formData.projectDescription,
          state: 'NotStarted',
          startDate: new Date(),
          endDate: selectedDate,
          leaderId: selectedLeader?.legajo,
        })
      })
      .then((res) => {
          console.log("res", res)
          return res.json()
      })
      .then((data) => {
          console.log("Project created: ", data)
          router.push('../proyectos')
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

    const handleChangeLeader = (newLeaderValue: string) => {
      const selectedResource = resources.find((resource) => resource.legajo === newLeaderValue);
      setSelectedLeader(selectedResource);
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
              Crear Proyecto
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
                  <InputLabel id='project-leader-select-label'>Lider</InputLabel>
                  <Select
                    labelId='project-leader-select-label'
                    id='project-leader-select'
                    fullWidth
                    value={selectedLeader?.Nombre}
                    label='lider'
                    onChange={(event) => handleChangeLeader(event.target.value)}
                  >
                    {resources.map((resource) => (
                      <MenuItem key={resource.legajo} value={resource.legajo}>{resource.Nombre} {resource.Apellido}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{leaderError}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
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
