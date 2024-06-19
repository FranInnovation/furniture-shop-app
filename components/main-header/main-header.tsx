'use client'

import Link from "next/link";

import classes from './main-header.module.css'
import { redirect } from "next/navigation";

const MainHeader: React.FC = () => {

    const handleLogOut = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <>
            <header className={classes.header}>
                <Link href='/'>LOGO</Link>

                <nav>
                    <ul>
                        <Link href='/client'>Clients</Link>
                        <Link href='/product'>Products</Link>
                        <Link href='/estimation'>Estimations</Link>
                        <Link href='/user'>User</Link>
                        <button onClick={handleLogOut}>Log out</button>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MainHeader