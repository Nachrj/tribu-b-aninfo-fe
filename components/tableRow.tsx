    import { useRouter } from 'next/router'

    type TableRowProps<T> = {
        item: any,
        items: string[],
        linkTo?: string,
    }

    export default function TableRow<T>({ item, items, linkTo }: TableRowProps<T>) {
        const router = useRouter()

        // item is the current row you're mapping, items is the list of columns so it can be generic.
        return (
            <tr key={`${item["id"]}`} style={linkTo ? { cursor: 'pointer' } : {}} onClick={() => router.push(`${linkTo}/${item["id"]}`)}>
                {items.map((column, index) => (
                    <td key={index} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">{item[column]}</div>
                    </td>
                ))}
            </tr>
        )
    }
