// import {Ticket} from "@/pages/types";
// import {useEffect, useState} from "react";
// import React from 'react';
// import { useRouter } from 'next/router';
// import Input from "@/components/input";
// import DescriptionInput from "@/components/descriptionInput";
// import GoBack from '@/components/backButton';
// import { getTicket } from "@/requests/ticket";
// import { TICKET_STATE } from "../../constants";

// export default function TicketView() {
//     const [ticketData, setTicket] = useState<Ticket>();
//     const router = useRouter();

//     const clickHandler = () => {
//         // le vamos a pasar solo el id del task y en task view lo vamos a buscar al back        
//         router.push(`/soporte/ticket/view/tasks?ticket_id=${ticketData?.id}&ticket_title=${ticketData?.title}`);
//     };
    
//     useEffect(() => {
//         if (router.isReady) {
//             const {ticket_id} = router.query;
//             getTicket(setTicket, ticket_id);
//         }
//     }, [router.isReady]);

//     return (
//         <>
//             <div className="container max-w-7xl mx-auto mt-8">
//                 <div className="mb-4">
//                     <GoBack/>   
//                     <div className="justify-between flex">
//                         <div className="text-2xl font-bold decoration-gray-400 w-fit text-black">Ticket: {ticketData?.title}</div>
//                         <div className="text-2xl font-bold decoration-gray-400 w-fit pr-40 text-black"> ID: {ticketData?.id}</div>
//                     </div>
//                 </div>
//                 <div className="flex flex-col pr-40">
//                     <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
//                         <div className=" min-w-full overflow-hidden align-middle border-b shadow sm:rounded-lg text-black border border px-2 ">
//                             <div className="flex flex-row justify-around min-w-full  px-2 mt-5 ">
//                                 <Input label="Título" value={ticketData?.title} modify={false}/>
//                                 <Input label="Estado" value={TICKET_STATE[ticketData?.state]} modify={false}/>
//                                 <Input label="Resource" value={ticketData?.resource_name} modify={false}/>
//                             </div>
//                             <div className="flex flex-row justify-around min-w-full px-2 mt-5 ">
//                                 <Input label="SLA" value={ticketData?.SLA} modify={false} />
//                                 <Input label="Severidad" value={ticketData?.severity} modify={false}/>
//                                 <Input label="Prioridad" value={ticketData?.priority} modify={false}/>
//                             </div>
//                             <div className="mx-12">
//                                 <DescriptionInput label="Descripción" value={ticketData?.description} modify={false}/>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex justify-between pt-5">
//                         <button className="flex font-bold px-6 py-3 border-2 border-black rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black  bg-blue-600 hover:bg-blue-700" onClick={clickHandler}>Ticket Tasks</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
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
import { TICKET_STATE, STATES_OPTIONS, PRIORITY_OPTIONS, SEVERITY_OPTIONS} from "../../constants";


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

    const handleChangePriority = (event) => {
        setPriority(event.target.value);
        setPriorityError("");
      };
  
      const handleChangeSeverity = (event) => {
        setSeverity(event.target.value);
        setSeverityError("");
      };
      
      const handleChangeState = (key) => {
        setState(key);
        setStateError("");
      };

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
                                           disabled
                                           {...register('priority')}
                                         >
                                           {/* {options.map((option) => (
                                             <MenuItem key={option} value={option}>
                                               {option}
                                             </MenuItem>
                                           ))} */}
                                           <MenuItem selected key={ticketData?.priority} value={ticketData?.priority}>
                                               {ticketData?.priority}
                                             </MenuItem>
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
                                           disabled
                                           defaultValue={ticketData?.severity}
                                           error={severityError != "" ? true : false}
                                           {...register('severity')}
                                           >
                                           {SEVERITY_OPTIONS.map((option) => (
                                             <MenuItem key={option.key} value={option.key}>
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
                                            defaultValue={ticketData?.state}
                                           disabled
                                           autoFocus
                                           error={stateError != "" ? true : false}
                                           {...register('state')}
                                           >
                                           {STATES_OPTIONS.map((option) => (
                                             <MenuItem key={option.key} value={option.key} >
                                               {option.label}
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