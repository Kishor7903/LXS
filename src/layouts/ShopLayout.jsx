// import ShiftingNavbar from "@/pages/shop/ShiftingNavbar"
import Header from "../components/Header"
// import AnimatingMan from "@/pages/shop/AnimatingMan"
import WhatWeDo from "@/pages/shop/WhatWeDo"
import WorkWithUsAndNewsletter from "@/pages/shop/WorkWithUsAndNewsletter"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"
import ShiftingNavbar from "@/pages/shop/ShiftingNavbar"
import AnimatingMan from "@/pages/shop/AnimatingMan"


function ShopLayout() {
  return (
    <>
      <Header className="h-16" />  
      <main>
        {/* <ShiftingNavbar /> */}
        {/* <AnimatingMan className="h-20 md:h-36 lg:h-56" /> */}
        <Outlet />
        <WhatWeDo />
        <WorkWithUsAndNewsletter />
      </main>
      <footer className="bg-[rgb(8,43,61)]">
        <Footer />
      </footer>
    </>
  )
}

export default ShopLayout
