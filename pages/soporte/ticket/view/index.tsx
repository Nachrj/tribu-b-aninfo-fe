import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import COLORS from '@/constants/colors';
import { InputLabel, MenuItem } from '@mui/material';
import {Ticket} from "@/utils/types";
import { useRouter } from 'next/router';
import GoBack from '@/components/backButton';
import { getTicket } from "@/requests/ticket";
import { PRIORITY_OPTIONS, TICKET_STATE} from "@/constants/support";
import { useClientData } from '@/services/clients';

export default function ViewTicket() {
    const [ticketData, setTicket] = useState<Ticket>();

    const client = useClientData();

    const handleViewTasks = () => {
      router.push(`/soporte/ticket/view/tasks?ticket_id=${ticketData?.id}&ticket_title=${ticketData?.title}`);
    };

    const router = useRouter();

    useEffect(() => {
      if (router.isReady) {
          const {ticket_id} = router.query;
          getTicket(setTicket, ticket_id);
      }
    }, [router.isReady]);

    const selectedPriority = PRIORITY_OPTIONS.find(option => option.key === ticketData?.priority); 
    const selectedState = TICKET_STATE[ticketData?.state!];
    const clientName = client.find((client) => client.id === ticketData?.client_id); 

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
                                   marginTop: 1,
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'center',
                                 }}
                               >
                                 <Box sx={{ mt: 0, width: '50%' }}>
                                  <form >
                                    
                                     <Grid container spacing={1}>

                                       <Grid item xs={12}>
                                          <InputLabel id="title">Título</InputLabel>
                                          <TextField
                                              fullWidth
                                              id="title"
                                              value={ticketData?.title}
                                              autoFocus
                                              />
                                       </Grid>
                                       <Grid item xs={12}>
                                          <InputLabel id="description">Descripción</InputLabel>
                                           <TextField
                                              fullWidth
                                              id="description"
                                              autoFocus
                                              multiline
                                              value={ticketData?.description}
                                              rows={4}
                                            />
                                       </Grid>
                                       <Grid item xs={12}>
                                          <InputLabel id="resource_name">Recurso</InputLabel>
                                          <TextField
                                              inputProps={{
                                                readOnly: true,
                                              }}
                                              fullWidth
                                              id="resource_name"
                                              autoFocus
                                              value={ticketData?.resource_name}
                                          />
                                       </Grid>
                                       <Grid item xs={12}>
                                          <InputLabel id="client_id">Cliente</InputLabel>
                                           <TextField
                                              inputProps={{
                                                readOnly: true,
                                              }}
                                              fullWidth
                                              id="client_id"
                                              autoFocus
                                              // value={ticketData?.client_id}
                                              value={clientName  ? clientName.social_reason : ''}
                                            />
                                       </Grid>
                                       
                                       <Grid item xs={12}>
                                         <InputLabel id="select-state">Estado</InputLabel>
                                         <TextField 
                                            inputProps={{
                                              readOnly: true,
                                            }}
                                            id="select-state" 
                                            fullWidth
                                            // value={ticketData?.state}
                                            value={selectedState}
                                            autoFocus
                                          />
                                       </Grid>
                                       
                                       <Grid item xs={6}>
                                         <InputLabel id="select-priority">Prioridad</InputLabel>
                                         <TextField
                                            inputProps={{
                                              readOnly: true,
                                            }}
                                            id="select-priority" 
                                            fullWidth
                                            autoFocus
                                            // value={ticketData?.priority}
                                            value={selectedPriority  ? selectedPriority.label : ''}
                                         />
                                       </Grid>

                                       <Grid item xs={6}>
                                         <InputLabel id="select-severity">Severidad</InputLabel>
                                         <TextField
                                            inputProps={{
                                              readOnly: true,
                                            }}
                                            id="select-severity" 
                                            fullWidth
                                            autoFocus
                                            value={ticketData?.severity}
                                          />

                                       </Grid>


                                     </Grid>
                                     <Button 
                                      //  type="submit"
                                       fullWidth
                                       style={{backgroundColor: COLORS.button, height: '50px'}}
                                       variant="contained"
                                       sx={{ mt: 3, mb: 2 }}
                                       onClick={handleViewTasks} >
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
    )
}