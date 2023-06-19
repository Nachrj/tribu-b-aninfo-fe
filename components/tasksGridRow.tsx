import React from 'react';
import { useRouter } from 'next/router';


export default function TasksGridRow({ task}) {

  const router = useRouter();

  // const handleClick = () => { //ver que le vamos a pasar (si le pasamos algo)
  //   const task_id = task.id;
  //   const task_titulo = task.titulo;
  //   const task_estado = task.estado;
  //   const task_sla = task.sla;
  //   const task_severidad = task.severidad;
  
  //   // le vamos a pasar solo el id del task y en task view lo vamos a buscar al back        

  //   router.push(`/taskView?task_id=${task_id}&task_titulo=${task_titulo}&task_estado=${task_estado}&task_sla=${task_sla}&task_severidad=${task_severidad}`);
  // };


  return (
    // <tr key={`${task['id']}`} onClick={handleClick}>
    <tr key={`${task['id']}`}>
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
