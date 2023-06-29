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
                                            <button onClick={() => editRow(idx)}>
                                                <EditIcon></EditIcon>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => deleteRow(idx)}>
                                                <DeleteIcon></DeleteIcon>
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
}
