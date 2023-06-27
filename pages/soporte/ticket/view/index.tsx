import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import COLORS from '@/constants/colors';
import { InputLabel, MenuItem } from '@mui/material';
import {Ticket} from "@/pages/types";
import { useRouter } from 'next/router';
import GoBack from '@/components/backButton';
import { getTicket } from "@/requests/ticket";

export default function ModifyTicket() {
    const [ticketData, setTicket] = useState<Ticket>();

    const handleViewTasks = () => {
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
                                   <form >
                                    
                                     <Grid container spacing={3}>

                                       <Grid item xs={12}>
                                           <TextField
                                              fullWidth
                                              id="title"
                                              value={ticketData?.title}
                                              autoFocus
                                              />
                                       </Grid>
                                       <Grid item xs={12}>
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
                                           <TextField
                                              inputProps={{
                                                readOnly: true,
                                              }}
                                              fullWidth
                                              id="client_id"
                                              autoFocus
                                              value={ticketData?.client_id}
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
                                            value={ticketData?.priority}
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

                                       <Grid item xs={6}>
                                         <InputLabel id="select-state">Estado</InputLabel>
                                         <TextField 
                                            inputProps={{
                                              readOnly: true,
                                            }}
                                            id="select-state" 
                                            fullWidth
                                            value={ticketData?.state}
                                            autoFocus
                                          />
                                       </Grid>

                                     </Grid>
                                     <Button 
                                       type="submit"
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