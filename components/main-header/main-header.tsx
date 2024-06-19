import Link from "next/link";

import classes from './main-header.module.css'

const MainHeader: React.FC = () => {
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
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MainHeader