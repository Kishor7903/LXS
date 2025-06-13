import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

function UserLayout() {
    return (
        <>
            <Header className="h-16" />
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default UserLayout
