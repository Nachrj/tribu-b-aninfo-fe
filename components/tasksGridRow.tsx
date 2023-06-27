import { getTask } from '@/requests/task';
import React, { useEffect, useState } from 'react';

export default function TasksGridRow({ task_id }) {
  const [task, setTask] = useState();

  useEffect(() => {
    getTask(setTask, task_id);
  }, []);

  return (
    <tr key={`${task['id']}`} className='cursor-pointer'>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{task['nombre']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{task['estado']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{task['prioridad']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{task['fecha_limite']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{task['horas_insumidas']}</div>
      </td>
    </tr>
  );
}
