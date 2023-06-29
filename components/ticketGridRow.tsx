import React from 'react';
import { useRouter } from 'next/router';
import { Ticket } from '@/utils/types';
import { TICKET_STATE } from '@/constants/support';
import DeleteButton from './deleteButton';
import EditButton from './editButton';
import { useClientData } from '@/services/clients';

export default function TicketGridRow({ticket, onDelete}: {ticket: Ticket, onDelete(a: number): void}) {

  const router = useRouter();

  const clients = useClientData();
  const ticket_id = ticket.id;
  const ticket_titulo = ticket.title;
  const ticket_estado = ticket.state;
  const ticket_sla = ticket.SLA;
  const ticket_severidad = ticket.severity;
  const handleEdit = (e: any) => { 
    e.stopPropagation();
    router.push(`/soporte/ticket/edit?ticket_id=${ticket_id}&ticket_title=${ticket_titulo}&ticket_state=${ticket_estado}&ticket_sla=${ticket_sla}&ticket_severity=${ticket_severidad}`);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    onDelete(ticket.id);
  }

  const clientSocialReason = (clientId: number): string => {
    const client = clients.find((client) => Number(client.id) === clientId);
    return client ? client.social_reason : "N/A";
  };

  const handleClickRow = () => {
    router.push(`/soporte/ticket/view?ticket_id=${ticket_id}`);
  }
  return (
    <tr key={ticket.id} onClick={handleClickRow} className='cursor-pointer'>
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
        <EditButton onClick={handleEdit}/>
      </td>

      <td className="py-4 whitespace-no-wrap border-b border-gray-200">
        <DeleteButton onClick={handleDelete}/>
      </td>
    </tr>
  );
}
