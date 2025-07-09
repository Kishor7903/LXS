import Header from "@/components/Header"
import { Outlet } from "react-router-dom"


function OrdersPageLayout() {
  return (
    <>
        <Header className="h-16" />
        <div className="w-full relative"><Outlet /></div>
    </>
  )
}

export default OrdersPageLayout
