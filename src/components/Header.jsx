import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import heartIcon from "../assets/commonIcons/Wishlist (Fill).png";
import cartIcon from "../assets/commonIcons/Cart.png";
import menuIcon from "../assets/commonIcons/Menu 2.png";
import AnimatedInput from "./AnimatedInput";
import accountIcon from "../assets/commonIcons/Account.png";
import popupMenuIcon from "../assets/commonIcons/Popup Menu (Fill).png";
import LoginButtonAndDialogBox from "./LoginButtonAndDialogBox";
import customOrderIcon from "../assets/More (Title Bar)/Custom (Fill).png";
import bulkOrderIcon from "../assets/More (Title Bar)/Bulk Order (Stroke).png";
import sellOnLxsIcon from "../assets/commonIcons/Sell (Stroke).png"
import settingIcon from "../assets/commonIcons/Setting (Stroke).png"
import notificationIcon from "../assets/commonIcons/Notification (Stroke).png"
import helpIcon from "../assets/commonIcons/Help (Stroke).png"
import sellOnLxsIconActive from "../assets/commonIcons/Sell (Fill).png"
import jobsIcon from "../assets/commonIcons/Job (Stroke).png"
import jobsIconActive from "../assets/commonIcons/Job (Fill).png"
import giftCardIcon from "../assets/More (Title Bar)/Gift Cards (Stroke).png";
import vouchersAndCouponsIcon from "../assets/More (Title Bar)/Coupons (Stroke).png";
import homeIcon from "../assets/commonIcons/Home (Stroke).png";
import homeIconActive from "../assets/commonIcons/Home (Fill).png";
import myAccountIcon from "../assets/commonIcons/Account Management (Stroke).png";
import myAccountIconActive from "../assets/commonIcons/Account Management (Fill).png";
import blogsIcon from "../assets/commonIcons/Blog (Stroke).png";
import blogsIconActive from "../assets/commonIcons/Blog (Fill).png";
import aboutUsIcon from "../assets/commonIcons/About Us (Stroke).png";
import aboutUsIconActive from "../assets/commonIcons/About Us (Fill).png";
import moreIcon from "../assets/commonIcons/More (Stroke).png";
import moreIconFill from "../assets/commonIcons/More (Fill).png";
import logoutRedIcon from "../assets/commonIcons/Log Out (Fill).png";
import productsIcon from "../assets/commonIcons/Products (Stroke).png";
import productsIconActive from "../assets/commonIcons/Products (Fill).png";
import { useState } from "react";
import { motion } from "framer-motion";
import LxsLogo from "./LxsLogo";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAddress, getUserCart, getUserWishlist, logoutUser } from "@/firebase/auth";
import { logout } from "@/store/features/authSlice";
import { updateAddress, updateCart, updateWishlist } from "@/store/features/cartSlice";
import { getAllProducts } from "@/firebase/admin";


function Header({ className }) {
	const [userState, setUserState] = useState("login");
	const [isHovered, setIsHovered] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [openIndex, setOpenIndex] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const dialogRef = useRef(null);
	let { isAuthenticated, user } = useSelector(state => state.auth);
	let { cart } = useSelector(state => state.cart);
	let location = useLocation().pathname;

	const handleClickOutside = (event) => {
		if (dialogRef.current && !dialogRef.current.contains(event.target)) {
			setIsSheetOpen(false);
		}
	};

	const handleLogout = (e) => {
		e.preventDefault();

		logoutUser().then(() => {
			dispatch(logout());
			setIsSheetOpen(false);
			navigate("/shop")
		})
	}

	useEffect(() => {
		setOpenIndex(false);
		if (isSheetOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "auto";
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "auto";
		};
	}, [isSheetOpen]);

	useEffect(() => {
		getAllProducts(dispatch);
		if (user) {
			getUserCart(user?.id).then((res) => {
				dispatch(updateCart(res));
			})

			getUserWishlist(user?.id).then((res) => {
				dispatch(updateWishlist(res));
			})

			getAllAddress(user?.uid).then((res) => {
				dispatch(updateAddress(res.items ? res.items : []));
			})
		}
	}, [user])


	const navItems = [
		{
			name: "Home",
			slug: "/shop",
			icon: homeIcon,
			activeIcon: homeIconActive,
			active: true,
			width: "w-[50px]"
		},
		{
			name: "My Account",
			slug: "/setting/dashboard",
			icon: myAccountIcon,
			activeIcon: myAccountIconActive,
			active: isAuthenticated,
			width: "w-[98px]"
		},
		{
			name: "Products",
			slug: "/products",
			icon: productsIcon,
			activeIcon: productsIconActive,
			active: true,
			width: "w-[71px]"
		},
		// {
		// 	name: "Sell on LXS",
		// 	slug: "/sell-on-lxs",
		// 	icon: sellOnLxsIcon,
		// 	activeIcon: sellOnLxsIconActive,
		// 	active: true,
		// 	width: "w-[87px]"
		// },
		// {
		// 	name: "Jobs",
		// 	slug: "/jobs",
		// 	icon: jobsIcon,
		// 	activeIcon: jobsIconActive,
		// 	active: true,
		// 	width: "w-[39px]"
		// },
		{
			name: "Blogs",
			slug: "/blog",
			icon: blogsIcon,
			activeIcon: blogsIconActive,
			active: true,
			width: "w-[45px]"
		},
		{
			name: "About Us",
			slug: "/about-us",
			icon: aboutUsIcon,
			activeIcon: aboutUsIconActive,
			active: true,
			width: "w-[76px]"
		},
	];

	const menuItems = [
		{
			name: "Personalized Order",
			icon: customOrderIcon,
			slug: ""
		},
		{
			name: "Bulk Order",
			icon: bulkOrderIcon,
			slug: "/bulk-order"
		},
		// {
		// 	name: "Gift Card",
		// 	icon: giftCardIcon,
		// 	slug: ""
		// },
		{
			name: "Voucher & Coupons",
			icon: vouchersAndCouponsIcon,
			slug: ""
		},
		// {
		// 	name: "About Us",
		// 	icon: aboutUsIcon,
		// 	slug: "/about-us"
		// }
	]

	return (
		<header className={`flex items-center justify-between px-3 md:px-5 xl:px-10 py-2 shadow-md sticky top-0 bg-white z-50 ${className}`}>

			<div className="flex gap-2 md:gap-3 items-center">

				<div className="" onClick={() => setIsSheetOpen(true)}><img src={menuIcon} alt="" className="h-4 md:h-5 cursor-pointer mt-1" /></div>

				<div className="flex flex-col items-center justify-center">
					{isSheetOpen && (
						<div className={`fixed inset-0 bg-black bg-opacity-50 z-40 flex py-2 lg:py-0 2xl:py-5 pl-3 lg:pl-4`}>
							<motion.div
								ref={dialogRef}
								initial={{ translateX: "-405px" }}
								animate={{ translateX: "0px" }}
								exit={{ scale: 0.8, opacity: 0 }}
								transition={{ duration: 0.2, ease: "easeOut", type: "spring", stiffness: 300, damping: 25 }}
								className={`min-h-80 min-w-60 shadow-md z-50 h-[600px] xl:h-[700px] w-[300px] xl:w-[350px] overflow-hidden bg-white rounded-[30px] gap-3 xl:gap-5 flex flex-col relative`}
							>
								<div className="h-[12%] bg-[rgb(210,224,232)] w-full border flex items-center px-3 gap-1">
									<div className="w-1/6"><img src={user?.profilePic ? user.profilePic.img_url : accountIcon} alt="" className="w-full rounded-full" /></div>
									<div className="font-medium w-4/6">
										<h4 className="text-base xl:text-xl font-bold relative top-[2px]">{!user ? "Sign Up/Log In" : user?.name}</h4>
										{
											user && (
												<>
													<p className="text-[10px] xl:text-xs relative bottom-[3px]">{user?.email}</p>
													<p className="text-[9px] xl:text-[10px] relative bottom-[5px]">+91 {user?.phone}</p>
												</>
											)
										}
									</div>
									<div className="w-1/6"><img src={popupMenuIcon} alt="" className="h-7 ml-3 xl:ml-5 cursor-pointer" onClick={() => setIsSheetOpen(false)} /></div>
								</div>
								<div className="px-5 xl:px-10">
									<ul className="w-full text-sm xl:text-base">
										{
											navItems.map((item, index) => (
												item.active === true ? (
													<li key={index} className="text-left px-2 active:bg-slate-100 hover:bg-[rgb(210,224,232)] rounded-xl cursor-pointer">
														<NavLink
															to={item.slug}
															onClick={() => setIsSheetOpen(false)}
															className={({ isActive }) => `text-[rgb(8,43,61)] py-2 relative flex items-center gap-2 ${isActive ? "font-extrabold" : "font-medium"}`}
														><img src={location.includes(item.slug) ? item.activeIcon : item.icon} alt="" className="h-4 xl:h-5" /> {item.name}
														</NavLink>
													</li>
												) : null
											))
										}
										<div className="border-b last:border-none">
											<button
												className={`w-full h- flex justify-between items-center px-2 text-left lg:hover:bg-[rgb(210,224,232)] py-2 cursor-pointer transition font-medium ${openIndex ? "rounded-t-xl bg-[rgb(210,224,232)]" : " rounded-xl bg-white"}`}
												onClick={() => setOpenIndex(!openIndex)}
											>
												<span className={`flex items-center gap-2 text-sm xl:text-base`}><img src={openIndex ? moreIconFill : moreIcon} alt="" className="h-4 xl:h-5" />More</span>
												<motion.div
													animate={{ rotate: openIndex === true ? -180 : 0 }}
													transition={{ duration: 0.2 }}
												>
													<i className="fi fi-br-angle-small-down relative top-1"></i>
												</motion.div>
											</button>
											{openIndex === true ? (
												<ul
													className="pb-2 px-4 bg-[rgb(210,224,232)] rounded-b-xl text-center text-[11px] xl:text-xs font-medium"
												>
													{
														menuItems.map((item, index) => (
															<li className="lg:hover:bg-white rounded-xl pt-1 xl:py-1"><Link onClick={() => setIsSheetOpen(false)} key={index} to={item.slug} >{item.name}</Link></li>
														))
													}
												</ul>
											)
												:
												null
											}
										</div>
									</ul>
								</div>
								<div className={`p-5 flex items-end xl:gap-1 font-semibold text-[rgb(8,43,61)] absolute bottom-0 text-sm xl:text-base w-full justify-between`}>
									<div className="space-y-1">
										{/* <Link to="" className="flex gap-2 items-center lg:hover:bg-[rgb(210,224,232)] w-48 xl:px-3 pt-1 xl:py-1 rounded-[6px]">
											<img src={settingIcon} alt="" className="h-4 xl:h-5" /> Settings
										</Link> */}
										<Link to="/orders/notifications" className="flex gap-2 items-center lg:hover:bg-[rgb(210,224,232)] w-48 xl:px-3 pt-1 xl:py-1 rounded-[6px]">
											<img src={notificationIcon} alt="" className="h-4 xl:h-5" /> Notification
										</Link>
										{/* <Link to="/setting/contact-us" className="flex gap-2 items-center lg:hover:bg-[rgb(210,224,232)] w-48 xl:px-3 pt-1 xl:py-1 rounded-[6px]">
											<img src={helpIcon} alt="" className="h-4 xl:h-5" /> Help & Support
										</Link> */}
									</div>
									<div className="">
										{
											isAuthenticated ? (
												<button onClick={handleLogout} className="flex gap-1 items-center text-[rgb(240,85,120)] hover:underline">
													<img src={logoutRedIcon} alt="" className="h-5" /> Logout
												</button>
											) :
												(
													<button onClick={() => { setIsSheetOpen(false), setIsOpen(true) }} className="text-sm xl:text-lg font-semibold h-8 xl:h-9 px-4 text-white bg-[rgb(8,43,61)] rounded-full lg:active:bg-blue-600">Login</button>
												)
										}
									</div>
								</div>
							</motion.div>
						</div>
					)}
				</div>

				<LxsLogo className="h-9 md:h-10 lg:h-11 xl:h-12" />

				<nav className={`lg:flex hidden ml-10 ${!isAuthenticated ? "gap-10" : "gap-7"}`}>

					{
						navItems.map((item, index) => (
							item.active === true ? (
								<NavLink
									key={index}
									to={item.slug}
									className={({ isActive }) => `hover:text-[rgb(8,43,61)] relative lg:hover:-translate-y-[1px] lg:hover:font-bold ${item.width} flex justify-center items-center ${isActive ? "font-bold opacity-100" : "font-medium opacity-90"}`}
								>
									{item.name}
								</NavLink>
							) : null
						))
					}
					<div
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						className="font-medium hover:text-[rgb(8,43,61)] lg:hover:-translate-y-[1px] lg:hover:font-bold relative  text-[rgb(8,43,61,0.9)] cursor-pointer z-10 w-[63px]">More <i className={`relative top-[2px] ${isHovered ? "fi fi-br-angle-small-down" : "fi fi-br-angle-small-right"}`}></i>
						{isHovered && (
							<div
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								className="bg-white w-44 rounded-xl shadow-lg border border-[rgb(8,43,61,0.4)] px-3 py-3 absolute -left-[60px] mt-1 top-5 z-50">
								<ul className="text-xs font-medium flex-flex-col gap-2">
									{
										menuItems.map((items, index) => (
											<Link to={items.slug} key={index} onClick={() => setIsHovered(false)} className="text-left flex gap-1 items-center hover:bg-slate-200 p-1 cursor-pointer hover:text-[rgb(8,43,61)]">
												<img src={items.icon} alt="" className="h-3" /> {items.name}
											</Link>
										))
									}
								</ul>
							</div>
						)}
					</div>

				</nav>

			</div>

			<div className="w-3/6 lg:w-5/12 flex justify-end lg:justify-between gap-5 items-center">

				<AnimatedInput />

				<div className="flex justify-between items-center text-xl lg:text-3xl ">

					<div className="flex gap-2 lg:gap-4 mr-3 lg:mr-8">
						<img src={heartIcon} alt="" className="h-6 lg:h-7 cursor-pointer " onClick={() => navigate("/setting/wishlist")} />
						<div className="relative">
							{
								user && cart?.length > 0 && (
									<div className="h-[12px] lg:h-[15px] w-[12px] lg:w-[15px] rounded-full bg-red-500 absolute -top-1 lg:-top-[6px] -right-[6px] lg:-right-2 flex justify-center items-center text-white text-[10px] lg:text-xs cursor-pointer" >{cart.length}</div>
								)
							}
							<img src={cartIcon} alt="" className="h-6 lg:h-7 cursor-pointer" onClick={() => navigate("/checkout/cart")} />
						</div>
					</div>
					{
						!isAuthenticated ? (
							<LoginButtonAndDialogBox userState={userState} setUserState={setUserState} isOpen={isOpen} setIsOpen={setIsOpen} />
						)
							:
							(
								window.innerWidth >= 1280 ?
									(
										<div className="rounded-full shadow-[0px_0px_10px_-2px_rgb(8,43,61)] flex gap-2 items-center p-[5px] select-none">
											<img src={user.profilePic ? user.profilePic.img_url : accountIcon} alt="" className="h-8 rounded-full" />
											<span className="text-base text-[rgb(240,85,120)] font-semibold flex items-center text-center max-w-16 leading-4 mr-2 px-2">{`${user.name.split(" ")[0].slice(0,6)}${user.name.split(" ")[0].length > 5 ? "..." : ""}`} </span>
										</div>
									)
									:
									(
										<div className=""><img src={accountIcon} alt="" className="h-7" /></div>
									)
							)
					}
				</div>

			</div>


		</header>
	)
}

export default Header
