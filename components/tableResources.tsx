import styles from "./tableResources.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TableResources({rows, projects, editRow, deleteRow}:any) {
    
    function getTaskName(tarea: any){
        for (let p of projects) {
            for (let t of p.tareas) {
                if (t.id == tarea) {
                    return t.nombre;
                }
            }
        }
        return tarea;
    }

    function getProjectName(proyecto: any) {
        for (let p of projects) {
          if (p.id == proyecto) {
            return p.nombre;
          }
        }
        return proyecto;
    }

    return (
        <div className="container max-w-7xl mx-auto mt-8">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">Tarea</th>
                                <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">Proyecto</th>
                                <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">Fecha</th>
                                <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">Horas</th>
                                <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"></th>
                                <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"></th>
                            </tr>
                            </thead>
    
                            <tbody>
                            {
                                rows.map((row: any, idx: any) => {
                                    return <tr key={idx} className={styles.tr}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{getTaskName(row.tarea)}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{getProjectName(row.proyecto)}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{row.fecha}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{row.horas}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => deleteRow(idx)}>
                                                <DeleteIcon></DeleteIcon>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => editRow(idx)}>
                                                <EditIcon></EditIcon>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        ) 
    
    // return <div className={styles.tablewrapper}>
    //     <h2 className="text-2xl font-bold decoration-gray-100">Registro de Horas</h2>
    //     <table className={styles.table}>
    //         <thead>
    //             <tr>
    //                 <th>Tarea</th>
    //                 <th>Proyecto</th>
    //                 <th>Fecha</th>
    //                 <th>Horas</th>
    //                 <th>Modificar</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {
    //                rows.map((row: any, idx: any) => {
    //                 return <tr key={idx}>
    //                     <td>{getTaskName(row.tarea)}</td>
    //                     <td>{getProjectName(row.proyecto)}</td>
    //                     <td>{row.fecha}</td>
    //                     <td>{row.horas}</td>
    //                     <td>
    //                         <button className={styles.delete} onClick={() => deleteRow(idx)}>
    //                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    //                                 <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    //                             </svg>
    //                         </button>
    //                         <button onClick={() => editRow(idx)}>
    //                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    //                                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    //                             </svg>
    //                         </button>
    //                     </td>
    //                 </tr>
    //                })
    //             }
    //         </tbody>
    //     </table>
    // </div>;
}
