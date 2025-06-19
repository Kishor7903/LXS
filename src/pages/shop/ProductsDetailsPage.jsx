import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSingleProductData } from "@/firebase/admin";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem, addNewRecentProduct, addWishlistItem, deleteCartItem, deleteWishlistItem } from "@/firebase/auth";
import { addToCart, addToWishlist, deleteFromCart, deleteFromWishlist } from "@/store/features/cartSlice";
import shareIcon from "../../assets/commonIcons/Share (Stroke).png"
import shareIconActive from "../../assets/commonIcons/Share (Fill).png"
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
// import reviewLogo from "../../assets/commonIcons/Rewards 2 (Stroke).png"
import reviewLogoActive from "../../assets/commonIcons/Rewards 2 (Fill).png"
import ViewAllIcon from "@/components/ViewAllIcon";
import Breadcrum from "@/components/Breadcrum";

function ProductDetailsPage({ id, data }) {
	let [hovered, setHovered] = useState(false);
	const [selectedSize, setSelectedSize] = useState("");
	let [productData, setProductData] = useState(null);
	let [mainPic, setMainPic] = useState(null);
	const sizes = ["S", "M", "L", "XL"];
	let { cart, wishlist } = useSelector(state => state.cart);
	let dispatch = useDispatch();
	let navigate = useNavigate();
	let { user } = useSelector(state => state.auth);

	const addCart = (e, item_id) => {
		e.preventDefault();

		let quantity = 1;
		let size = selectedSize === "" ? "S" : selectedSize;
		let itemDetails = {
			item_id,
			quantity,
			size
		}

		let user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			addCartItem(user?.id, itemDetails).then(() => {
				dispatch(addToCart(itemDetails));
				toast.success("Product Added To Cart ...");
			})
		} else {
			toast.error("Please Login First ...")
		}
	}

	const addWishlist = (e, item_id) => {
		e.preventDefault();

		if (user) {
			addWishlistItem(user?.id, item_id).then((res) => {
				dispatch(addToWishlist(res));
				toast.success("Product Added To Wishlist ...");
			})
		} else {
			toast.error("Please Login First ...")
		}
	}

	const deleteItemFromWishlist = (e, item_id) => {
		e.preventDefault();

		deleteWishlistItem(user.id, item_id).then(() => {
			dispatch(deleteFromWishlist(item_id));
			toast.success("Product Removed From Wishlist ...")
		})
	}

	useEffect(() => {
		setProductData(data);
		setMainPic(data?.images[0])
	}, [data]);

	useEffect(() => {
		if (user) {
			addNewRecentProduct(user.id, id);
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	let items = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Clothing",
            path: "/products"
        },
        {
            label: "Tshirt",
            path: "#"
        },
        {
            label: "LXS-M-TS-0001"
        }
    ]


	return (
		<div className="px-20 pt-5 w-full flex flex-col gap-5">
			<div className="leading-[1] font-semibold flex flex-col gap-3">
				<span>Gear Blueprint📘<br />
					<p className="text-xs font-normal">Explore every detail, dimension, and feature — decoded for you</p>
				</span>
				<Breadcrum items={items} />
            </div>
			<div className="w-full flex gap-14 h-full">
				<div className="flex gap-8 relative w-[60%]">
					<div className="flex flex-col xl:w-[18%] 2xl:w-[19%] gap-3 ">
						{
							productData?.images.slice(0, 6).map((item, index) => (
								<div key={index} onClick={() => setMainPic(item)} className={`rounded-[10px] object-fill overflow-hidden shadow-[0px_0px_8px_-3px_rgb(8,43,61)] cursor-pointer ${mainPic === item ? "ring-[3px] ring-blue-500" : ""}`}>
									<img src={item} alt="" className="h-full w-full" />
								</div>
							))
						}
					</div>
					<div className="w-full border rounded-[18px] object-fill overflow-hidden shadow-[0px_0px_12px_-5px_rgb(8,43,61)] cursor-pointer">
						<img src={mainPic} alt="" className="w-full" />
					</div>
				</div>

				<div className="w-[40%] flex flex-col justify-between">
					<div className="flex flex-col justify-between">
						<div className="flex gap-3 items-center justify-between mb-1">
							<div className="flex gap-3 items-center">
								<div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[145px] 2xl:w-[130px] px-3 2xl:px-3 py-[3px] 2xl:py-[4px]"><img src={lxsLogo} alt="" className="h-5" /> <span className="text-xs text-white font-medium">LXS Certified</span></div>
								<span className="opacity-50 mr-7 font-semibold tracking-tight text-sm">APPAREL & FASHION</span>
							</div>
							<img className="h-7 cursor-pointer" src={hovered ? shareIconActive : shareIcon} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} alt="" />
						</div>
						<div className="flex justify-between items-center"><h2 className="xl:text-2xl 2xl:text-4xl font-semibold text-gray-800 leading-3">{productData?.name}</h2></div>
						<p className="text-sm text-gray-500 flex self-end 2xl:text-sm relative bottom-1">

							{
								[1, 2, 3, 4, 5].map((_, index) => (
									<i key={index} className="fi fi-ss-star text-[rgb(8,43,61)] relative top-[1px] "></i>
								))
							}
							<span className="ml-1 font-medium ">74 Reviews</span>
						</p>
						<div className="flex gap-2 items-center xl:pt-3 2xl:pt-5 border-t-2 border-[rgb(8,43,61)]">
							<p className="xl:text-3xl 2xl:text-4xl font-semibold">₹{productData?.salePrice}.00</p>
							<p className="text-xl text-gray-600 font-semibold opacity-60">MRP  ₹<span className="line-through ">{productData?.price}.00</span></p>
							<p className="text-red-500 font-semibold">({`${Math.floor(((productData?.price - productData?.salePrice) * 100) / productData?.price)}`}% OFF)</p>
						</div>
						<p className="text-sm 2xl:text-base text-green-600">Inclusive of all taxes, 100% Original Product</p>

						{/* Size Selection */}
						<div className="xl:mt-3 2xl:mt-5 flex flex-col xl:gap-3 2xl:gap-5">
							<div className="flex flex-col justify-between h-full">
								<div className="flex justify-between items-center w-[230px]"><p className="font-semibold 2xl:text-lg">Select Size:</p><Link className="lg:hover:underline text-blue-500 cursor-pointer font-medium text-sm">Size Chart</Link></div>
								<div className="flex space-x-3 mt-1">
									{sizes.map((size) => (
										<button
											key={size}
											className={`xl:h-12 2xl:h-12 xl:w-12 2xl:w-12 border rounded-xl text-lg font-semibold transition ${selectedSize === size ? "bg-[rgb(8,43,61)] text-white scale-[1.2]" : "border-[rgb(8,43,61)] lg:hover:bg-gray-200"
												}`}
											onClick={() => setSelectedSize(size)}
										>
											{size}
										</button>
									))}
								</div>
							</div>
						</div>

						<div className="xl:mt-3 2xl:mt-10">
							<h6 className="font-semibold text-lg 2xl:text-xl mb-1">Additional Information:</h6>
							<p className="text-sm 2xl:text-base leading-4 2xl:leading-6 font-medium">
								Product Code: LXS-M-TS-0001 <br />
								Brand: <Link className="text-[rgb(240,85,120)] lg:hover:underline">{productData?.brand}</Link> <br />
								Seller: <Link className="text-[rgb(240,85,120)] lg:hover:underline">LXS Lifestyle Store</Link> <br />
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-5 ">
						<button onClick={(e) => wishlist.some(p => p.item_id === id) ? deleteItemFromWishlist(e, id) : addWishlist(e, id)} className={`flex items-center justify-center xl:text-xl 2xl:text-2xl font-semibold xl:py-[10px] 2xl:py-4 rounded-full w-full lg:hover:scale-[1.03] duration-150 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] ${wishlist.some(p => p.item_id === id) ? "bg-[rgb(8,43,61)] text-white" : "bg-slate-200"}`}><i className="fi fi-ss-heart scale-x-[-1] h-6 text-2xl mr-4"></i>{wishlist.some(p => p.item_id === id) ? "Remove from": "Save to"} Favourites</button>

						<button onClick={(e) => cart?.some((p) => p.item_id === id) ? navigate("/checkout/cart") : addCart(e, id)} className={`flex items-center justify-center xl:text-xl 2xl:text-2xl font-semibold xl:py-[10px] 2xl:py-4 rounded-full w-full lg:hover:scale-[1.03] duration-150 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] text-white ${cart?.some((p) => p.item_id === id) ? "bg-gradient-to-r from-[rgb(240,85,120)] to-[rgb(248,181,44)]" : "bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)]"}`}><i className="fi fi-sr-cart-shopping-fast h-6 text-2xl mr-4"></i>{cart?.some((p) => p.item_id === id) ? "Go to" : "Add to"} Basket</button>
					</div>


				</div>
			</div>
			<div className="w-full flex gap-14 mb-10 mt-5">
				<div className="flex flex-col gap-5 w-[60%] p-10 shadow-[0px_0px_10px_-2px_rgb(8,43,61)] rounded-xl">
					<h4 className="text-xl font-semibold">PRODUCT DESCRIPTION</h4>
					<p className="text-sm tracking-tight leading-[1.2] ml-2">{productData?.description}</p>
				</div>

				<div className="p-10 w-[40%] rounded-xl">
					<h4 className="text-xl font-semibold"> RATING & REVIEWS</h4>
					<div className="flex gap-5 h-10"><span className="text-[45px] relative bottom-3 font-semibold ">4.4</span><img src={reviewLogoActive} alt="" className="h-9" /></div>
					<p className="text-sm">711 Verified Buyers</p>
					<br />
					<p>Customer Reviews (75) </p>
					{
						[1, 2, 3].map((_, index) => (
							<div key={index} className="p-3 tracking-tight leading-[1.2] text-sm border-b relative">
								<div className="flex gap-3 items-center mb-2">
									<div className="flex gap-[1px]">{
										[1, 2, 3, 4, 5].map((_, index) => (
											<img key={index} src={reviewLogoActive} alt="" className="h-4" />
										))
									}</div>
									<span className="font-semibold text-base">Amazing Quality! </span>
								</div>
								{'"'}This Fabric is super Soft and Comfortable. The print is high quality and hasn't faded after multiple washes. Definitely worth it! {'"'} - <span className="font-semibold">Rahul Kumar</span>
								<p className="text-xs absolute bottom-0 right-1">24 Jan, 2025</p>
							</div>
						))
					}
					<ViewAllIcon className="float-right" />
				</div>
			</div>
		</div>
	)
}

export default ProductDetailsPage
