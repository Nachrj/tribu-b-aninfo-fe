import { Client } from "@/utils/types";
import HeaderItem from "./headerItem";

export default function ClientGrid({clients}: {clients: Client[]}) {

    return (
        <div className="container max-w-7xl m-full mt-8">
            <div className="mb-4">
                <h1 className="text-3xl font-bold decoration-gray-400">Clientes</h1>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <HeaderItem title="ID" />
                                <HeaderItem title="Razón social" />
                                <HeaderItem title="CUIT" />
                            </tr>
                            </thead>

                            <tbody>
                                {clients.map((client) => (
                                    <tr key={`${client.id}`}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{client.id}</div>
                                        </td>
                        
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{client.social_reason}</div>
                                        </td>
                        
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{client.cuit}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
