import ClientGrid from "@/components/clientGrid";
import { useClientData } from "@/services/clients";

export default function Clients() {
    const clients = useClientData();

    return (
        <div className="Clients">
            <ClientGrid clients={clients}/>
        </div>
    );
}