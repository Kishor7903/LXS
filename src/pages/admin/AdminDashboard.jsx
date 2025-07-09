import AdminHeadings from "@/components/AdminHeadings"
import { getAllOrders, getAllProducts } from "@/firebase/admin";
import { getAllOrdersAdmin, getProducts } from "@/store/features/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


function AdminDashboard() {
	let { products } = useSelector(state => state.admin);
	let { orders } = useSelector(state => state.admin);
	let dispatch = useDispatch();

	useEffect(() => {
		getAllProducts().then((res) => {
            let sortedProducts = res.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            })
			dispatch(getProducts(sortedProducts));
		});

		getAllOrders().then((res) => {
			let sortedOrders = res.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            })
			dispatch(getAllOrdersAdmin(sortedOrders))
		})
    }, []);

	return (
		<div className="z-20">
			<AdminHeadings title="Dashboard" />
			<div className="flex justify-between gap-10">
				<div className="h-32 w-[30%] rounded-xl border p-5 flex items-center gap-4 bg-white shadow-sm">
					<div className="h-20 w-20 rounded-full bg-lime-100 border flex justify-center items-center text-3xl">
						<i className="fi fi-ss-sack-dollar"></i>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-[rgb(8,43,61,0.6)] font-medium">Total Sales</p>
						<p className="text-2xl">₹ {orders.reduce((sum, item) => {return sum + item.amount}, 0)}</p>
					</div>
				</div>
				<div className="h-32 w-[30%] rounded-xl border p-5 flex items-center gap-4 bg-white shadow-sm">
					<div className="h-20 w-20 rounded-full bg-lime-100 border flex justify-center items-center text-3xl">
					<i className="fi fi-ss-shopping-cart"></i>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-[rgb(8,43,61,0.6)] font-medium">Total orders</p>
						<p className="text-2xl">{orders.length}</p>
					</div>
				</div>
				<div className="h-32 w-[30%] rounded-xl border p-5 flex items-center gap-4 bg-white shadow-sm">
					<div className="h-20 w-20 rounded-full bg-lime-100 border flex justify-center items-center text-3xl">
					<i className="fi fi-bs-boxes"></i>	
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-[rgb(8,43,61,0.6)] font-medium">Total Products</p>
						<p className="text-2xl">{products.length}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
