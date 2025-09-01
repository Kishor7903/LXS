import { getAllOrders, getAllProducts, getAllUsers, getBlogs } from "@/firebase/admin";
import { getAllBlogs, getAllOrdersAdmin, getProducts, getUsers } from "@/store/features/adminSlice";
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import adminPanelLogo from "../assets/Admin Panel/Website Admin Pannel Logo.png"
import logoutPinkIcon from "../assets/commonIcons/Log Out (Fill) Pink.png";
import logoutWhiteIcon from "../assets/commonIcons/Log Out (Fill) White.png";
import notificationsIconFill from "../assets/Admin Panel/Notifications (Fill) 2.png"
import messagesIconFill from "../assets/Admin Panel/Messages (Fill).png"
import { logoutUser } from "@/firebase/auth";
import { logout } from "@/store/features/authSlice";
import { useNavigate } from "react-router-dom";


function AdminHeader() {
	let popupRef = useRef(null);
	let [isHovered, setIsHovered] = useState(false);
	let [isHoveredLogout, setIsHoveredLogout] = useState(false);
	let dispatch = useDispatch();
	let navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();

		logoutUser().then(() => {
			dispatch(logout());
			navigate("/shop")
		})
	}

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

		getBlogs().then((res) => {
			let sortedBlogs = res.sort((a, b) => {
				return new Date(b.timestamp) - new Date(a.timestamp);
			})
			dispatch(getAllBlogs(sortedBlogs))
		})

		getAllUsers().then(res => {
			let user = res.filter((u) => u.role === "user")
			dispatch(getUsers(user));
		})
	}, []);

	return (
		<header className="h-16 w-full px-16 shadow-md flex justify-between items-center sticky top-0 z-20 bg-white">

			<img src={adminPanelLogo} alt="" className="h-[54px]" />

			{/* <div className="flex justify-end items-center w-[83%] px-12">
				<div className="flex items-center gap-8">
					<i className="fi fi-rs-bell relative top-1 text-xl"></i>

				</div>
			</div> */}
			<div className="flex items-center gap-5">
				<div className="relative">
					<img src={notificationsIconFill} alt="" className="h-6 " />
					<p className="h-[14px] w-[14px] rounded-full bg-[rgb(253,84,120)] absolute -top-1 -right-2 text-white text-[10px] font-semibold flex justify-center items-center">0</p>
				</div>
				<div className="relative">
					<img src={messagesIconFill} alt="" className="h-6 " />
					<p className="h-[14px] w-[14px] rounded-full bg-[rgb(253,84,120)] absolute -top-1 -right-2 text-white text-[10px] font-semibold flex justify-center items-center">0</p>
				</div>
				
				
				<button onClick={handleLogout} onMouseEnter={() => setIsHoveredLogout(true)} onMouseLeave={() => setIsHoveredLogout(false)} className="h-10 px-3 ml-2 text-lg flex justify-center items-center border-2 border-[rgb(253,84,120)] lg:hover:bg-[rgb(253,84,120)] shadow-md rounded-xl text-[rgb(253,84,120)] lg:active:scale-[0.93] lg:hover:text-white font-semibold duration-200"><img src={isHoveredLogout ? logoutWhiteIcon : logoutPinkIcon} alt="" className="h-5 mr-2" />Logout</button>
			</div>

		</header>
	)
}

export default AdminHeader
