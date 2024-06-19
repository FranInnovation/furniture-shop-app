import { getClients } from '../../lib/clients'
import Link from "next/link";

interface Client {
    id: number;
    name: string,
    lastname: string
}

const ClientPage: React.FC = () => {

    const clients: Client[] = getClients();

    return (
        <>
            <h1>Client Page</h1>
            <ul>
                {clients && clients.map(client => (<Link href={`/client/${client.id}`} key={client.id}>{client.name}</Link>))}
            </ul>
        </>
    )
}

export default ClientPage