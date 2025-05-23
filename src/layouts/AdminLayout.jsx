import AdminHeader from "@/components/AdminHeader"
import AdminSideBar from "@/components/AdminSideBar"
import { Outlet } from "react-router-dom"


function AdminLayout() {
  return (
    <>

      <AdminHeader />
      <main>
        <AdminSideBar />
        <div className="relative top-[70px] left-[17%] w-[83%] bg-[rgb(245,245,245)] h-screen px-10 overflow-y-scroll pb-20"><Outlet /></div>
      </main>
      
    </>
  )
}

export default AdminLayout
