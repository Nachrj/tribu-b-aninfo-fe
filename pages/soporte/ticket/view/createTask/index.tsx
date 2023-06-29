import * as React from 'react';
import { Container, Box, Button, TextField, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
import { useRouter } from 'next/router'
import { PROJECT_URL } from '@/pages/_app';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { prioritiesMap, statusMap } from '@/utils/types';
import GoBack from '@/components/backButton';
import { useProjectsData } from '@/services/projects';
import { addTaskToTicket } from '@/requests/task';


export default function CreateTask() {
    const {register, handleSubmit} = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [priority, setPriority] = useState<string | undefined>(" ");
    const [state, setState] = useState<string | undefined>(" ");
    const [projectError, setProjectError] = useState(" ");
    const [project, setProject] = useState(0);

    const router = useRouter();
    const {ticket_id, ticket_title} = router.query;

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
        projectError == ' ' &&
        formData.taskName &&
        formData.taskDescription &&
        formData.project_id
        );
    };
    
    const handleFormSubmit = (formData: FieldValues) => {
      if (validateForm(formData)) { 
        fetch(`${PROJECT_URL}/projects/${project}/tasks`, {
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
            addTaskToTicket(ticket_id, data.id);
            router.back();
        })
      }
    }

    const projects = useProjectsData();
    console.log(projects);

    const handleChangeClient = (event : any) => {
      setProject(event.target.value);
      setProjectError(" ");
    }

    return (
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <GoBack />
          <div className="text-4xl font-bold decoration-gray-400 w-fit text-black">Crear Tarea</div>
          <div className="justify-between flex">
            <div className="text-2xl font-bold decoration-gray-400 w-fit text-gray-500">Ticket: {ticket_title}</div>
            <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-gray-500"> ID: {ticket_id}</div>
          </div>
        </div>
        <div className="flex flex-col pr-40">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 ">
              <Container component="main">
                <Box
                  sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
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
                    <Grid item xs={12}>
                      <InputLabel id="select-project-label">Proyecto</InputLabel>
                      <Select
                          labelId="select-project-label"
                          id="select-project-label"
                          value={project}
                          fullWidth
                          autoFocus
                          {...register('project_id')}
                          onChange={handleChangeClient}
                          error={projectError != " " ? true : false}
                      >
                          {projects.map((project) => (
                              <MenuItem key={project.id} value={project.id}>
                                  {project.nombre}
                              </MenuItem>
                          ))}
                      </Select>
                    </Grid>
                    <Grid item xs={20}>
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
                    fullWidth
                    style={{ height: '50px'}}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onClick={() => router.back()}
                    >
                      Cancelar
                  </Button>
                </Box>
              </Box>
            </Container>
          </div>
        </div>
      </div>
    </div>
    )
}
