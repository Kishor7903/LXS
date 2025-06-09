import Footer from "@/components/Footer"
import Header from "@/components/Header"
import InfoIconsContainer from "@/pages/shop/InfoIconsContainer"
import { Outlet } from "react-router-dom"


function CheckoutLayout() {
    return (
        <>
            <Header className="h-16" />
            <main>
                <Outlet />
                <InfoIconsContainer />
            </main>
            <footer className="bg-[rgb(8,43,61)]">
                <Footer />
            </footer>
        </>
    )
}

export default CheckoutLayout
