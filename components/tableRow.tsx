    import { useRouter } from 'next/router'
    import DeleteIcon from '@mui/icons-material/Delete';
    import EditIcon from '@mui/icons-material/Edit';
    import { Button } from "@mui/material";

    type TableRowProps<T> = {
        item: T,
        items: string[],
        linkTo?: string,
        onEdit?: (itemId: number) => void,
        onDelete?: (itemId: number) => void,
    }

    export default function TableRow<T>({ item, items, linkTo, onEdit, onDelete }: TableRowProps<T>) {
        const router = useRouter()

        // item is the current row you're mapping, items is the list of columns so it can be generic.
        return (
            <tr key={`${item["id"]}`} >
                {items.map((column, index) => 
                    column === 'nombre' ? (
                        <td key={index} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                                <Button onClick={() => router.push(`${linkTo}/${item["id"]}`)} color='secondary' style={{textTransform: 'none'}}>
                                    {item[column]}
                                </Button>
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
