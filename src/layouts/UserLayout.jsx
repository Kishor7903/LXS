import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

function UserLayout() {
    return (
        <div className=''>
            <Header className="h-16" />
            <Outlet />
        </div>
    )
}

export default UserLayout
