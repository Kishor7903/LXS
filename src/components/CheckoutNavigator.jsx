import { useLocation, useNavigate } from "react-router-dom"


function CheckoutNavigator() {
    let location = useLocation().pathname;
    let navigate = useNavigate();

    return (
        <div className="flex justify-center items-center gap-2 lg:gap-5 mb-3 lg:mb-5 font-semibold">
            <button onClick={() => navigate("/checkout/cart")} className={`h-7 w-28 text-xs lg:text-sm font-bold flex justify-center items-center rounded-full border border-[rgb(8,43,61)] cursor-pointer ${location.includes("/checkout/cart") ? "bg-[rgb(8,43,61)] text-white " : ""} ${!location.includes("/checkout/cart") ? "bg-slate-200" : ""}`}>Basket<i className="fi fi-sr-cart-shopping-fast text-[13px] ml-1 relative top-[2px]"></i></button>

            <p className="text-3xl relative bottom-2 left-1 font-normal tracking-tighter lg:tracking-[10px]">.......</p>

            <button disabled={location === "/checkout/cart"} onClick={() => navigate("/checkout/address")} className={`h-7 w-28 text-xs lg:text-sm font-bold flex justify-center items-center rounded-full border border-[rgb(8,43,61)] ${location.includes("/checkout/address") === true ? "bg-[rgb(8,43,61)] text-white cursor-pointer" : ""} ${location.includes("/checkout/cart") ? "opacity-70" : ""} ${location.includes("/checkout/payment") ? "bg-slate-200" : ""}`}>Address<i className="fi fi-sr-land-layer-location text-[13px] ml-1 relative top-[2px]"></i></button>

            <p className="text-3xl relative bottom-2 left-1 font-normal tracking-tighter lg:tracking-[10px]">.......</p>

            <button disabled={location !== "/checkout/payment"} className={`h-7 w-28 text-xs lg:text-sm font-bold flex justify-center items-center rounded-full border border-[rgb(8,43,61)] ${location.includes("/checkout/payment") ? "bg-[rgb(8,43,61)] text-white cursor-pointer" : "opacity-70"}`}>Payment<i className="fi fi-sr-credit-card text-[13px] ml-1 relative top-[2px]"></i></button>
        </div>
    )
}

export default CheckoutNavigator
