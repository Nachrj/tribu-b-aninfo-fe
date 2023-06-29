import React, { FC } from 'react';
import { Task } from '@/utils/types';

interface Props {
  task: Task
}
const TasksGridRow: FC<Props> = ({ task }) => {
  console.log(task);
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
        <div className="text-sm leading-5 text-gray-900">{task['consumedHours']}</div>
      </td>
    </tr>
  );
}

export default TasksGridRow;