import { getTask } from '@/requests/task';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function TasksGridRow({ task_id }) {
  const [task, setTask] = useState({});

  const router = useRouter();
  useEffect(() => {
    console.log("TASK ID CON EL QUE SE HACE LA REQUEST", task_id);
    getTask(setTask, task_id);
  }, []);

  if (!task) return null;
  return (
    <tr key={`${task['id']}`} className='cursor-pointer'>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{task['name']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{task['state']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{task['priority']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{task['dueDate']}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{task['consumedHours']}</div>
      </td>
    </tr>
  );
}
