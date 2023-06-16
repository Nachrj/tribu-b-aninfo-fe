import {Product} from "@/pages/types";
import {useEffect, useState} from "react";
import ProductGridRow from "@/components/productGridRow";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Products() {
    // const [list, setList] = useState([])

    const list = [
        {
            id:1,
            name: "Software de gestión empresarial",
            version: "4.0"
        },
        {
            id:2,
            name: "Plataforma de comercio electrónico",
            version: "2.5"
        },
      {
        id:3,
        name: "Aplicación móvil de productividad",
        version: "1.2"
      },
      {
        id:4,
        name: "Sistema de gestión de proyectos",
        version: "3.8"
      }
    ];


    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Productos</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Name" />
                                    <HeaderItem title="Version" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((product) => (
                                    <ProductGridRow product={product} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
