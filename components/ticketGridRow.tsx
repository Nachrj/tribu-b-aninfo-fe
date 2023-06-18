import React from 'react';
import { useRouter } from 'next/router';


export default function TicketGridRow({ ticket}) {

  const router = useRouter();

  const handleClick = () => { //ver que le vamos a pasar (si le pasamos algo)
    const ticket_id = ticket.id;
    const ticket_titulo = ticket.titulo;
    const ticket_state = ticket.estado;//deberia ser state
    const ticket_sla = ticket.sla;
    const ticket_severity = ticket.severity;
  
    // le vamos a pasar solo el id del ticket y en ticket view lo vamos a buscar al back        

    router.push(`/ticketView?ticket_id=${ticket_id}&ticket_title=${ticket_titulo}&ticket_state=${ticket_state}&ticket_sla=${ticket_sla}&ticket_severity=${ticket_severity}`);
  };


  return (
    <tr key={`${ticket['id']}`} onClick={handleClick}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket['id']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket['titulo']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket['estado']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket['sla']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket['severidad']}</div>
      </td>
    </tr>
  );
}
