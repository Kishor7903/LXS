import { useLocation, useNavigate } from "react-router-dom"


function CheckoutNavigator() {
    let location = useLocation().pathname;
    let navigate = useNavigate();

    return (
        <div className="flex justify-center items-center gap-2 lg:gap-5 mb-3 lg:mb-5 font-semibold">
            <button onClick={() => navigate("/checkout/cart")} className={`h-7 w-28 text-xs lg:text-sm font-bold flex justify-center items-center rounded-xl border cursor-pointer ${location.includes("/checkout/cart") ? "border-2 bg-slate-100 border-[rgb(8,43,61)]" : ""} ${!location.includes("/checkout/cart") ? "bg-[rgb(8,43,61)] text-white border-none" : ""}`}>Basket<i className="fi fi-sr-cart-shopping-fast text-[13px] ml-1 relative top-[2px]"></i></button>

            <p className="text-3xl relative bottom-2 left-1 font-normal tracking-tighter lg:tracking-[10px]">.......</p>

            <button disabled={location === "/checkout/cart"} onClick={() => navigate("/checkout/address")} className={`h-7 w-36 text-xs lg:text-sm font-bold flex justify-center items-center rounded-xl border border-[rgb(8,43,61)] ${location.includes("/checkout/address") === true ? "border-2 bg-slate-100 cursor-pointer" : ""} ${location.includes("/checkout/cart") ? "opacity-70 border-none" : ""} ${location.includes("/checkout/payment") ? "bg-[rgb(8,43,61)] text-white border-none" : ""}`}>Drop Location<i className="fi fi-sr-land-layer-location text-[13px] ml-1 relative top-[2px]"></i></button>

            <p className="text-3xl relative bottom-2 left-1 font-normal tracking-tighter lg:tracking-[10px]">.......</p>

            <button disabled={location !== "/checkout/payment"} className={`h-7 w-28 text-xs lg:text-sm font-bold flex justify-center items-center rounded-xl border border-[rgb(8,43,61)] ${location.includes("/checkout/payment") ? "border-2 bg-slate-100 border-[rgb(8,43,61)]" : "opacity-70 border-none"}`}>Billing<i className="fi fi-sr-credit-card text-[13px] ml-1 relative top-[2px]"></i></button>
        </div>
    )
}

export default CheckoutNavigator
