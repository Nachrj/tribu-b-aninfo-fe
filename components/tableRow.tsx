import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import { ProjectTable, TaskTable } from '@/utils/types';

type TableRowProps = {
    item: ProjectTable | TaskTable,
    items: string[],
    linkTo?: string,
    onEdit?: (itemId: number) => void,
    onDelete?: (itemId: number) => void,
}


export default function TableRow({ item, items, linkTo, onEdit, onDelete }: TableRowProps) {
    const router = useRouter()

    const handleClick = () => {
        localStorage.setItem('projectId', item.id.toString());
        router.push(`${linkTo}/${item["id"]}`)
    }

    // item is the current row you're mapping, items is the list of columns so it can be generic.
    return (
        <tr key={`${item["id"]}`} >
            {items.map((column:string, index) => 
                column === 'nombre' ? (
                    <td key={index} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                            { linkTo ? (
                            <Button onClick={() => handleClick()} color='secondary' style={{textTransform: 'none'}}>
                                {item[column]}
                            </Button>
                            ) : (item[column])}
                        </div>
                    </td>
                ) : (
                    column !== '' && (
                        <td key={index} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">{item[column]}</div>
                        </td>
                    )
                )
            )}
            
            <td key={items.length - 1} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                { onEdit && (
                    <div className="flex items-center">
                        <Button onClick={() => onEdit(item['id'])}>
                            <EditIcon style={{color: 'black'}} />
                        </Button>
                    </div>
                )}
            </td>

            <td key={items.length - 1} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                { onDelete && (
                    <div className="flex items-center">
                        <Button onClick={() => onDelete(item['id'])}>
                            <DeleteIcon style={{color: 'black'}} />
                        </Button>
                    </div>
                )}
            </td>
        </tr>
    )
}
