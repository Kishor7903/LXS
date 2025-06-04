import Footer from "@/components/Footer"
import Header from "@/components/Header"
import YourMayAlsoLikeThesePage from "@/components/YourMayAlsoLikeThesePage"
import InfoIconsContainer from "@/pages/shop/InfoIconsContainer"
import WorkWithUsAndNewsletter from "@/pages/shop/WorkWithUsAndNewsletter"
import { Outlet } from "react-router-dom"


function CheckoutLayout() {
    return (
        <>
            <Header className="h-16" />
            <main>
                <Outlet />
                <YourMayAlsoLikeThesePage />
                <InfoIconsContainer />
                <WorkWithUsAndNewsletter />
            </main>
            <footer className="bg-[rgb(8,43,61)]">
                <Footer />
            </footer>
        </>
    )
}

export default CheckoutLayout
