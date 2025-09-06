import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import totalSalesIcon from "../../assets/Admin Dashboard/Total Sales.png"
import avgSalesIcon from "../../assets/Admin Dashboard/Average.png"
import avgQuantityIcon from "../../assets/Admin Dashboard/Average.png"
import totalOrdersIcon from "../../assets/Admin Dashboard/Total Orders.png"
import totalQuantityIcon from "../../assets/Admin Dashboard/Total Quantity.png"
import totalCancelledIcon from "../../assets/Admin Dashboard/Cancelled.png"
import totalPendingIcon from "../../assets/Admin Dashboard/Total Pending.png"
import totalDeliveredIcon from "../../assets/Admin Dashboard/Total Pending.png"
import totalReturnIcon from "../../assets/Admin Dashboard/Return.png"
import totalUserIcon from "../../assets/Admin Dashboard/Users.png"
import sellerVerifiedIcon from "../../assets/Admin Dashboard/Verified Seller.png"
import sellerNewAppliedIcon from "../../assets/Admin Dashboard/New Seller.png"
import sellerKycPendingIcon from "../../assets/Admin Dashboard/Pending Seller.png"
import sellerRejectedIcon from "../../assets/Admin Dashboard/Rejected Seller.png"
import totalProductsIcon from "../../assets/Admin Dashboard/New Product added.png"


function AdminDashboard() {
	let { products } = useSelector(state => state.admin);
	let { orders, users } = useSelector(state => state.admin);

	let dashboard = [
		{
			title: "SALES",
			tiles: [
				{
					value: `₹ ${orders.reduce((sum, item) => { return sum + item.amount }, 0)}`,
					content: "Total Sale",
					icon: totalSalesIcon
				},
				{
					value: `₹ ${orders.reduce((sum, item) => { return sum + item.amount }, 0) / orders.length}`,
					content: "Average Order",
					icon: avgSalesIcon
				},
				{
					value: `${parseInt(orders.reduce((sum, item) =>  sum + item.products.reduce((s, i) => s + i.quantity, 0), 0) / orders.length)}`,
					content: "Average Quantity",
					icon: avgQuantityIcon
				},
			]
		},
		{
			title: "ORDERS",
			tiles: [
				{
					value: `${orders.length}`,
					content: "Orders",
					icon: totalOrdersIcon
				},
				{
					value: `${orders.reduce((sum, item) => sum + item.products.reduce((s, i) => s + i.quantity, 0), 0)}`,
					content: "Quantity",
					icon: totalQuantityIcon
				},
				{
					value: `${orders.filter((item) => item.orderStatus === "Cancelled").length}`,
					content: "Cancelled",
					icon: totalCancelledIcon
				},
				{
					value: `${orders.filter((item) => item.orderStatus === "Order Pending").length}`,
					content: "Pending",
					icon: totalPendingIcon
				},
				{
					value: `${orders.filter((item) => item.orderStatus === "Delivered").length}`,
					content: "Delivered",
					icon: totalDeliveredIcon
				},
				{
					value: `${orders.filter((item) => item.orderStatus === "Return").length}`,
					content: "Return",
					icon: totalReturnIcon
				},
			]
		},
		{
			title: "USERS",
			tiles: [
				{
					value: `${users.length}`,
					content: "Total Users",
					icon: totalUserIcon
				},
			]
		},
		{
			title: "SELLERS",
			tiles: [
				{
					value: `02`,
					content: "Verified",
					icon: sellerVerifiedIcon
				},
				{
					value: `06`,
					content: "New Applied",
					icon: sellerNewAppliedIcon
				},
				{
					value: `03`,
					content: "KYC Pending",
					icon: sellerKycPendingIcon
				},
				{
					value: `01`,
					content: "Rejected",
					icon: sellerRejectedIcon
				},
			]
		},
		{
			title: "PRODUCTS",
			tiles: [
				{
					value: `${products.length}`,
					content: "New Added",
					icon: totalProductsIcon
				},
			]
		},
	]

	return (
		<div className="flex flex-col justify-between gap-10 overflow-hidden h-full overflow-y-scroll no-scrollbar">
			{
				dashboard.map((section, index) => (
					<div key={index}>
						<h5 className="text-2xl font-semibold">{section.title}</h5>
						<div className="flex gap-5 mt-2">
							{
								section.tiles.map((tile, idx) => (
									<div key={idx} className={`h-14 w-48 rounded-xl relative overflow-hidden flex flex-col justify-end px-3 py-1.5 text-[18px] shadow-md cursor-pointer hover:scale-[1.08] active:scale-[0.95] lg:hover:shadow-[0px_0px_10px_-2px_rgb(8,43,61)] duration-200 z-0 bg-slate-100 border border-slate-300 `}>
										<img src={tile.icon} alt="" className='w-8 2xl:w-10 absolute top-3 2xl:top-2 right-2 -z-10' />
										<div className="text-[15px] text-left w-[80%] overflow-hidden h-full">
											<span className="text-base font-semibold leading-4 text-[rgb(253,84,120)]">{tile.value}</span>
											<p className='tracking-tight font-medium leading-4'>{tile.content}</p>
										</div>
									</div>
								))
							}
						</div>
					</div>
				))
			}
			{/* <div className="flex flex-col gap-5">
				<h5 className="text-2xl font-semibold">SALES</h5>
				<div className="flex gap-10">
					<div className={`w-[22%] 0 2xl:w-[18%] h-14 rounded-xl relative overflow-hidden flex flex-col justify-end px-3 py-2 text-[18px] shadow-md cursor-pointer hover:scale-[1.08] active:scale-[0.95] lg:hover:shadow-[0px_0px_10px_-2px_rgb(8,43,61)] duration-200 z-0 bg-slate-100 border border-slate-300 `}>
						<img src={item.icon} alt="" className='w-8 2xl:w-10 absolute top-3 2xl:top-2 right-2 -z-10' />
						<div className="text-[15px] leading-[1.3] text-left">
							<p className=''>{item.title1}</p>
							<p className='font-bold '>{item.title2}</p>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	)
}

export default AdminDashboard
