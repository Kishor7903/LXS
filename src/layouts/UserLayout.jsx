import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

function UserLayout() {
    return (
        <div className='bg-[rgb(8,43,61)]'>
            <Header className="h-16" />
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default UserLayout
