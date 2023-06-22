import styles from "./tableResources.module.css"

export default function TableResources({rows, editRow}:any) {
    return <div className={styles.tablewrapper}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Tarea</th>
                    <th>Fecha</th>
                    <th>Horas</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                   rows.map((row: any, idx: any) => {
                    return <tr key={idx}>
                        <td>{row.id}</td>
                        <td>{row.tarea}</td>
                        <td>{row.fecha}</td>
                        <td>{row.horas}</td>
                        <td>
                            <button onClick={() => editRow(idx)}>editar</button>
                        </td>
                    </tr>
                   })
                }
            </tbody>
        </table>
    </div>;
}
