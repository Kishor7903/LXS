import Header from "@/components/Header"
import { Outlet } from "react-router-dom"


function OrdersPageLayout() {
  return (
    <>
        <Header className="h-16" />
        <div className="w-full h-[90%] px-16 py-6 relative"><Outlet /></div>
    </>
  )
}

export default OrdersPageLayout
