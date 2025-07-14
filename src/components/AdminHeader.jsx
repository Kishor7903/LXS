import { getAllOrders, getAllProducts } from "@/firebase/admin";
import { getAllOrdersAdmin, getProducts } from "@/store/features/adminSlice";
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";


function AdminHeader() {
	let popupRef = useRef(null);
	let [isHovered, setIsHovered] = useState(false);
	let dispatch = useDispatch();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				setIsHovered(false);
			}
		};

		if (isHovered) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isHovered]);

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
		<header className="h-[70px] w-full shadow-sm border-b flex fixed justify-between items-center z-30 bg-white">

			{/* <div className="flex justify-start items-center w-[17%] border-r h-full shadow-sm pl-5">
                <img src={lxsLogo} alt="" className="h-12" />
                <div className="mt-2">
                <p className="text-2xl font-bold">LXS Store</p><p className="text-sm relative bottom-2 font-medium">Admin Panel</p>
                </div>
            </div> */}

			<div className="flex justify-end items-center w-[83%] px-12">
				<div className="flex items-center gap-8">
					<i className="fi fi-rs-bell relative top-1 text-xl"></i>

				</div>
			</div>

		</header>
	)
}

export default AdminHeader
