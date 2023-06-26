import * as React from 'react';
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
import {Ticket} from "@/pages/types";
import { useRouter } from 'next/router';
import Input from "@/components/input";
import DescriptionInput from "@/components/descriptionInput";
import GoBack from '@/components/backButton';
import { getTicket } from "@/requests/ticket";
import { TICKET_STATE } from '@/pages/soporte/constants';

export default function ModifyTicket() {
    const [ticketData, setTicket] = useState<Ticket>();
    const {register, handleSubmit} = useForm();
    const options = [1,2,3];
    const [priorityError, setPriorityError] = useState('');
    const [severityError, setSeverityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [severity, setSeverity] = useState(0);
    const [priority, setPriority] = useState(0);
    const [state, setState] = useState(0);


    const clickHandler = () => {
      // le vamos a pasar solo el id del task y en task view lo vamos a buscar al back        
      router.push(`/soporte/ticket/view/tasks?ticket_id=${ticketData?.id}&ticket_title=${ticketData?.title}`);
  };

    const router = useRouter();

    useEffect(() => {
      if (router.isReady) {
          const {ticket_id} = router.query;
          getTicket(setTicket, ticket_id);
      }
  }, [router.isReady]);


    return (
      <>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <GoBack/>   
                    <div className="justify-between flex">
                        <div className="text-2xl font-bold decoration-gray-400 w-fit text-black">Ticket: {ticketData?.title}</div>
                        <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-black"> ID: {ticketData?.id}</div>
                    </div>
                </div>
                <div className="flex flex-col pr-40">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 ">
                             <Container component="main">
                               <Box
                                 sx={{
                                   marginTop: 2,
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'center',
                                 }}
                               >
                                 <Box sx={{ mt: 4, width: '50%' }}>
                                   <form onSubmit={handleSubmit(clickHandler)}>
                                    
                                     <Grid container spacing={3}>

                                       <Grid item xs={12}>
                                           <TextField
                                               fullWidth
                                               id="title"
                                               label="Título"
                                               value={ticketData?.title}
                                               disabled
                                               autoFocus
                                               {...register('title')}
                                               />
                                       </Grid>
                                      
                                       <Grid item xs={12}>
                                           <TextField
                                               fullWidth
                                               id="description"
                                               label="Descripción"
                                               autoFocus
                                               multiline
                                               value={ticketData?.description}
                                               disabled
                                               rows={4}
                                               {...register('description')}
                                               />
                                       </Grid>

                                       <Grid item xs={12}>
                                           <TextField
                                               fullWidth
                                               id="resource_name"
                                               label="Recurso"
                                               autoFocus
                                               value={ticketData?.resource_name}
                                               disabled
                                               {...register('resource_name')}
                                               />
                                       </Grid>

                                       <Grid item xs={12}>
                                           <TextField
                                               fullWidth
                                               id="client_id"
                                               label="Cliente"
                                               autoFocus
                                               value={ticketData?.client_id}
                                               disabled
                                               {...register('client_id')}
                                               />
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
                                           value={ticketData?.priority}
                                           disabled
                                           {...register('priority')}
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
                                           labelId="severity" 
                                           id="select-severity" 
                                           value={severity}
                                           fullWidth
                                           autoFocus
                                           value={ticketData?.severity}
                                           disabled
                                           error={severityError != "" ? true : false}
                                           {...register('severity')}
                                           >
                                           {options.map((option) => (
                                             <MenuItem key={option} value={option}>
                                               {option}
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
                                          //  value={ticketData?.state}
                                           value={TICKET_STATE[ticketData?.state]}
                                           disabled
                                           autoFocus
                                           error={stateError != "" ? true : false}
                                           {...register('state')}
                                           >
                                           {TICKET_STATE.map((option) => (
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
                                         Ver Tareas
                                     </Button>
                                   </form>
                                 </Box>
                               </Box>
                             </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // 
    )
}
