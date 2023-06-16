import TableRow from "./tableRow"
import HeaderItem from "./headerItem"

type TableProps<T> = {
    title: string,
    headerItems: string[],
    rowItems: T[],
}

export default function Table<T>({ title, headerItems, rowItems }: TableProps<T>) {
    return (
    <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
            <h1 className="text-3xl font-bold decoration-gray-400">{title}</h1>
        </div>
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
                            <TableRow key={index} item={item} items={headerItems} />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )    
    }