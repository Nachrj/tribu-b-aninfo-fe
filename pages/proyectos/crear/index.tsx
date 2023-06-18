import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import COLORS from '@/constants/colors';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MAXLENGTHS, FORMERRORS } from '@/constants/form';
export default function CreateProject() {
    const {register, handleSubmit} = useForm();
    const [nameError, setNameError] = useState(" ");
    const [descError, setDescError] = useState(" ");
    const [clientError, setClientError] = useState(" ");
    const [costError, setCostError] = useState(" ");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const handleFormSubmit = (formData: FieldValues) => {
      setNameError(!formData.projectName ? FORMERRORS.noName : ' ');
      setDescError(!formData.projectDescription ? FORMERRORS.noDescription : ' ');
      setCostError(!formData.projectCost ? FORMERRORS.noCost : ' ');
      setClientError(!formData.projectClient ? FORMERRORS.noClient : ' ');

      if (formData.projectName && formData.projectDescription && formData.projectCost && formData.projectClient) {
        // Perform form submission
        console.log('Form data is', formData);
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
                    <TextField
                        error={descError && descError != " " ? true : false}
                        fullWidth
                        id="projectClient"
                        label="Cliente"
                        autoFocus
                        helperText={clientError}
                        {...register('projectClient')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        error={costError && costError != " " ? true : false}
                        fullWidth
                        id="projectCost"
                        label="Costo"
                        autoFocus
                        type="number"
                        helperText={costError}
                        {...register('projectCost')}
                    />
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
                href="../proyectos">
                  Cancelar
              </Button>
            </Box>
          </Box>
        </Container>
    )
}
