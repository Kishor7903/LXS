

function PaymentHistory() {
    return (
        <div className="flex gap-10 h-[calc(100vh-104px)] rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border m-5 px-5 py-5 overflow-hidden">
            <div className="pl-5 w-[65%]">
            <p className="font-medium text-sm">My Account {">"} Dashboard {">"} <span className="text-[rgb(253,84,120)] font-semibold">Payment History</span></p>
                <div className="w-full flex gap-10 mt-4 ml-4">
                <div className="w-full flex items-center pb-2">
                        <div className="leading-[1] font-semibold">Mission Expenses 📜<br />
                            <p className="text-xs font-normal"> A detailed record of every credit fueling your journey.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[35%] h-[100%] rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)] border sticky top-[92px]"></div>
        </div>
    )
}

export default PaymentHistory
