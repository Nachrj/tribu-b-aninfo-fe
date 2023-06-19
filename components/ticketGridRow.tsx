import React from 'react';
import { useRouter } from 'next/router';
import { Ticket } from '@/pages/types';


export default function TicketGridRow({ticket}: {ticket: Ticket}) {

  const router = useRouter();

  const handleClick = (ticket: Ticket) => { //ver que le vamos a pasar (si le pasamos algo)
    const ticket_id = 0;
    const ticket_titulo = ticket.title;
    const ticket_estado = ticket.state;
    const ticket_sla = ticket.sla;
    const ticket_severidad = ticket.severity;
  
    // le vamos a pasar solo el id del ticket y en ticket view lo vamos a buscar al back        

    router.push(`/ticketView?ticket_id=${ticket_id}&ticket_titulo=${ticket_titulo}&ticket_estado=${ticket_estado}&ticket_sla=${ticket_sla}&ticket_severidad=${ticket_severidad}`);
  };


  return (
    <tr key={ticket.product_id} onClick={handleClick(ticket)}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.product_id}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket.title}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket.state}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket.sla.toISOString()}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket.severity}</div>
      </td>
    </tr>
  );
}
