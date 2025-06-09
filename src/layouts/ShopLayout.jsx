import Header from "../components/Header"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"


function ShopLayout() {
  return (
    <>
      <Header className="h-16" />  
      <main>
        {/* <ShiftingNavbar /> */}
        {/* <AnimatingMan className="h-20 md:h-36 lg:h-56" /> */}
        <Outlet />
      </main>
      <footer className="bg-[rgb(8,43,61)]">
        <Footer />
      </footer>
    </>
  )
}

export default ShopLayout
