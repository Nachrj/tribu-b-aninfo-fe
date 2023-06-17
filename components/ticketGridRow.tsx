import React from 'react';

export default function TicketGridRow({ ticket}) {
  const handleClick = () => {
    // Esto no esta del todo bien, habria que usar react
    window.location.href = 'tickets';//de aca se deberia irse al detalle del ticket
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
