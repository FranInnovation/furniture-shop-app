import { getUsers } from '../../lib/users'

const UserPage: React.FC = () => {

    const users = getUsers();

    console.log(users)

    return (
        <>
        <h1>User Page</h1>
        </>
    )
}

export default UserPage