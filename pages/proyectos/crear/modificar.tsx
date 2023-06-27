import * as React from 'react';
import { Ticket } from "@/pages/types";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { FieldValues, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import COLORS from '@/constants/colors';
import { MAXLENGTHS, FORM_ERRORS } from '@/constants/form';
import { InputLabel, MenuItem } from '@mui/material';
import { editTicket, getTicket } from "@/requests/ticket";
import { useRouter } from 'next/router';
import { PRIORITY_OPTIONS, SEVERITY_OPTIONS, STATES_OPTIONS } from '@/pages/soporte/constants';
import { useResourceData } from '@/services/resources';
import { useClientData } from '@/services/clients';

export default function ModifyTicket() {

  const [ticketData, setTicket] = useState<Ticket>();
  const router = useRouter();

  console.log("TICKET DATA: ", ticketData)

  const resources = useResourceData();
  const clients = useClientData();

  useEffect(() => {
    if (router.isReady) {
      const { ticket_id } = router.query;
      getTicket(setTicket, ticket_id);
    }
  }, [router.isReady]);

  const { register, handleSubmit } = useForm();
  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [clientError, setClientError] = useState("");
  const [resourceError, setResourceError] = useState("");
  const [priorityError, setPriorityError] = useState('');
  const [severityError, setSeverityError] = useState('');
  const [stateError, setStateError] = useState('');

  const [severity, setSeverity] = useState(0);
  const [priority, setPriority] = useState(0);
  const [state, setState] = useState("");
  const [client, setClient] = useState(0);
  const [resource, setResource] = useState("");

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
    setPriorityError("");
  };

  const handleChangeSeverity = (event) => {
    setSeverity(event.target.value);
    setSeverityError("");
  };

  const handleChangeState = (event) => {
    setState(event.target.value);
    setStateError("");
  };

  const validateForm = (formData: FieldValues) => {
    setNameError(!formData.title ? FORM_ERRORS.noName : '');
    setDescError(!formData.description ? FORM_ERRORS.noDescription : '');
    setClientError(!formData.client_id ? FORM_ERRORS.noClient : '');
    setPriorityError(!formData.priority ? FORM_ERRORS.noPriority : '');
    setSeverityError(!formData.severity ? FORM_ERRORS.noSeverity : '');
    setResourceError(!formData.resource_name ? FORM_ERRORS.noResource : '');

    if (formData.state == 1) {
      setStateError(FORM_ERRORS.InvalidState);
      // setNameError(FORM_ERRORS.maxNameLength);
    }

    if (formData.description?.length > MAXLENGTHS.description) {
      setDescError(FORM_ERRORS.maxDescriptionLength);
    }

    if (formData.description?.length > MAXLENGTHS.description) {
      setDescError(FORM_ERRORS.maxDescriptionLength);
    }

    return (
      nameError == '' &&
      descError == '' &&
      clientError == '' &&
      priorityError == '' &&
      severityError == '' &&
      stateError == '' &&
      resourceError == '' &&
      formData.title &&
      formData.description &&
      formData.client_id &&
      formData.priority &&
      formData.severity &&
      formData.state &&
      formData.resource_name
    );
  };

  const modifybody = (body) => {
    body["ticket_id"] = 8;
    body["product_version_id"] = 1;
  }

  const handleChangeResource = (event) => {
    setResource(event.target.value);
    setResourceError("");
  };

  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };


  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  const handleFormSubmit = (formData: FieldValues) => {
    if (validateForm(formData)) {
      modifybody(formData);
      console.log(formData);
      // fetch

      editTicket(setTicket, formData)
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
        <Typography variant="h3" component="h1" className='text-black'>
          Modificar Ticket
        </Typography>
        <Box sx={{ mt: 4, width: '50%' }}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>

            <Grid container spacing={3}>

              <Grid item xs={12}>
                <TextField
                  error={nameError && nameError != " " ? true : false}
                  helperText={nameError}
                  fullWidth
                  id="title"
                  label="Título"
                  defaultValue={ticketData?.title}
                  autoFocus
                  {...register('title')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={descError && descError != " " ? true : false}
                  fullWidth
                  id="description"
                  label="Descripción"
                  defaultValue={ticketData?.description}
                  autoFocus
                  multiline
                  rows={4}
                  helperText={descError}
                  {...register('description')}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="select-resource-label">Recurso</InputLabel>
                <Select
                  labelId="select-resource-label"
                  id="select-resource-label"
                  value={resource}
                  fullWidth
                  autoFocus
                  {...register('resource_name')}
                  onChange={handleChangeResource}
                >
                  {resources.map((resource) => (
                    <MenuItem key={resource.legajo} value={`${resource.Nombre} ${resource.Apellido}`}>
                      {`${resource.Nombre} ${resource.Apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="select-client-label">Cliente</InputLabel>
                <Select
                  labelId="select-client-label"
                  id="select-client-label"
                  value={clients.find((client) => client.id == ticketData?.client_id)}
                  fullWidth
                  autoFocus
                  {...register('client_id')}
                  onChange={handleChangeClient}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.social_reason}
                    </MenuItem>
                  ))}
                </Select>
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
                  {...register('priority')}
                >
                  {PRIORITY_OPTIONS.map((option) => (
                    <MenuItem key={option.key} value={option.key} onClick={() => handleChangePriority(option)}>
                      {option.label}
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
                  error={severityError != "" ? true : false}
                  {...register('severity')}
                >
                  {SEVERITY_OPTIONS.map((option) => (
                    <MenuItem key={option.key} value={option.key} onClick={() => handleChangeSeverity(option)}>
                      {option.label}
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
                  autoFocus
                  error={stateError != "" ? true : false}
                  {...register('state')}
                >
                  {STATES_OPTIONS.map((option) => (
                    <MenuItem key={option.key} value={option.key} onClick={() => handleChangeState(option)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              style={{ backgroundColor: COLORS.button, height: '50px' }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }} >
              Guardar
            </Button>
            <Button
              type="submit"
              fullWidth
              style={{ height: '50px' }}
              variant="outlined"
              sx={{ mb: 2 }}
              href="../">
              Cancelar
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  )
}
