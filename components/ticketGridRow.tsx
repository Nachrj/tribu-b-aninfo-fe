import React from 'react';
import { useRouter } from 'next/router';
import { Ticket } from '@/pages/types';
import { TICKET_STATE } from '@/pages/constants';
import DeleteButton from './DeleteIcon';
import EditButton from './PencilIcon';
import { useClientData } from '@/services/clients';

export default function TicketGridRow({ticket}: {ticket: Ticket}) {

  const router = useRouter();

  const clients = useClientData();
  const handleEdit = (ticket: Ticket) => { //ver que le vamos a pasar (si le pasamos algo)

    const ticket_id = ticket.id;
    const ticket_titulo = ticket.title;
    const ticket_estado = ticket.state;
    const ticket_sla = ticket.SLA;
    const ticket_severidad = ticket.severity;

    router.push(`/ticketModify?ticket_id=${ticket_id}&ticket_title=${ticket_titulo}&ticket_state=${ticket_estado}&ticket_sla=${ticket_sla}&ticket_severity=${ticket_severidad}`);
  };

  const handleDelete = () => {
    router.back();
  };

  const clientSocialReason = (clientId: number): string => {
    const client = clients.find((client) => Number(client.id) === clientId);
    return client ? client.social_reason : "N/A";
  };


  return (
    <tr key={ticket.id} onClick={()=>handleEdit(ticket as Ticket)} className='cursor-pointer'>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket.title}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{TICKET_STATE[ticket.state]}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket.SLA}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{ticket.severity}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{clientSocialReason(ticket.client_id)}</div>
      </td>
      <td className="py-4 whitespace-no-wrap border-b border-gray-200 ">
        <EditButton onClick={() => handleEdit(ticket)}/>
      </td>

      <td className="py-4 whitespace-no-wrap border-b border-gray-200">
        <DeleteButton onClick={handleDelete}/>
      </td>
    </tr>
  );
}
