import TableRow from "./tableRow"
import HeaderItem from "./headerItem"
import { ProjectTable, TaskTable } from "@/utils/types"

type TableProps = {
    headerItems: string[],
    rowItems: ProjectTable[] | TaskTable[],
    linkTo?: string,
    onEdit?: (itemId: number) => void,
    onDelete?: (itemId: number) => void,
}

export default function Table({ headerItems, rowItems, linkTo, onEdit, onDelete }: TableProps) {
    return (
    <div className="container max-w-7xl mx-auto mt-8">
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            {headerItems.map((item, index) => {
                                return <HeaderItem key={index} title={item} />
                            })}
                        </tr>
                        </thead>

                        <tbody>
                        {rowItems.map((item, index) => (
                            <TableRow linkTo={linkTo} key={index} item={item} items={headerItems} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )    
    }