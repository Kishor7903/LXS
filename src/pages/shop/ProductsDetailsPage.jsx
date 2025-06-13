import { useEffect, useState } from "react";
import heartIcon from "../../assets/commonIcons/Wishlist (Stroke).png";
import heartIcon2 from "../../assets/commonIcons/Wishlist (Fill).png";
import { Link, useParams } from "react-router-dom";
import { getSingleProductData } from "@/firebase/admin";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem, addNewRecentProduct, addWishlistItem, deleteWishlistItem } from "@/firebase/auth";
import { addToCart, addToWishlist, deleteFromWishlist } from "@/store/features/cartSlice";
import shareIcon from "../../assets/commonIcons/Share (Stroke).png"
import shareIconActive from "../../assets/commonIcons/Share (Fill).png"
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
// import reviewLogo from "../../assets/commonIcons/Rewards 2 (Stroke).png"
import reviewLogoActive from "../../assets/commonIcons/Rewards 2 (Fill).png"
import TabSwitcher from "@/components/TabSwitcher";

function ProductDetailsPage() {
	const tabs = ["Product Details", "Reviews"];
	const [activeTab, setActiveTab] = useState(tabs[0]);
	let [hovered, setHovered] = useState(false);
	const [selectedSize, setSelectedSize] = useState("");
	let [productData, setProductData] = useState(null);
	let [mainPic, setMainPic] = useState(null);
	const sizes = ["S", "M", "L", "XL"];
	const { id } = useParams();
	let { cart, wishlist } = useSelector(state => state.cart);
	let dispatch = useDispatch();
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

		deleteWishlistItem(user.uid, item_id).then(() => {
			dispatch(deleteFromWishlist(item_id));
			toast.success("Product Removed From Wishlist ...")
		})
	}

	useEffect(() => {
		getSingleProductData(id).then((res) => {
			if (res) {
				setProductData(res);
				setMainPic(res.images[0]);
			}
		})
		if (user) {
			addNewRecentProduct(user.id, id);
		}
	}, [id]);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);


	return (
		<div className="px-20 pt-10 w-full flex flex-col gap-10">
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
					<img onClick={(e) => wishlist.some(p => p.item_id === id) ? deleteItemFromWishlist(e, id) : addWishlist(e, id)} src={wishlist.some(p => p.item_id === id) ? heartIcon2 : heartIcon} alt="" className="h-8 absolute top-4 right-4 cursor-pointer z-40" />
				</div>

				<div className="w-[40%] flex flex-col justify-between">
					<div className="flex flex-col justify-between">
						<div className="flex gap-3 items-center justify-between mb-1">
							<div className="flex gap-3 items-center">
							<div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[145px] 2xl:w-[130px] px-3 2xl:px-3 py-[3px] 2xl:py-[4px]"><img src={lxsLogo} alt="" className="h-5" /> <span className="text-xs text-white font-medium">LXS Certified</span></div>
							<span className="opacity-50 mr-7 font-semibold tracking-tight text-sm">APPAREL & FASHION</span>
							</div>
							<img className="h-7" src={hovered ? shareIconActive : shareIcon} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} alt="" />
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
							<p className="text-red-500 font-medium">({`${Math.floor(((productData?.price - productData?.salePrice) * 100) / productData?.price)}`}% OFF)</p>
						</div>
						<p className="text-sm 2xl:text-base text-green-600">Inclusive of all taxes, 100% Original Product</p>

						{/* Size Selection */}
						<div className="xl:mt-3 2xl:mt-5 flex flex-col xl:gap-3 2xl:gap-5">
							<div className="flex flex-col justify-between h-full">
								<p className="font-semibold 2xl:text-lg">Select Size:</p>
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
								Brand: <Link className="text-[rgb(240,85,120)] lg:hover:underline">LXS</Link> <br />
								Seller: <Link className="text-[rgb(240,85,120)] lg:hover:underline">LXS (OPC) PRIVATE LIMITED</Link> <br />
							</p>
						</div>
					</div>

					{/* Add to Cart */}
					{
						cart?.some((p) => p.item_id === id) ? (
							<button className="xl:mt-3 2xl:mt-5 flex items-center justify-center bg-gradient-to-r from-orange-400 to-pink-500 text-white xl:text-xl 2xl:text-2xl font-semibold xl:py-[10px] 2xl:py-4 rounded-full w-full shadow-md">
								<i className="fi fi-rs-shopping-cart-add scale-x-[-1] h-6 text-2xl mr-4"></i> ADDED TO CART
							</button>
						)

							:

							(

								<button onClick={(e) => addCart(e, id)} className="xl:mt-3 2xl:mt-5 flex items-center justify-center bg-gradient-to-r from-orange-400 to-pink-500 text-white xl:text-xl 2xl:text-2xl font-semibold xl:py-[10px] 2xl:py-4 rounded-full w-full shadow-md">
									<i className="fi fi-rs-shopping-cart-add scale-x-[-1] h-6 text-2xl mr-4"></i> ADD TO CART
								</button>
							)
					}


				</div>
			</div>
			<div className="w-full">
				<div className="flex justify-center items-center">
					<TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} className="h-12 p-1 w-full" />
					{/* <div className={`w-1/2 flex justify-center items-center h-10 border-[rgb(8,43,61)] relative cursor-pointer ${productDetailsContext ? "" : "after:h-[5px] after:w-full after:bg-[rgb(8,43,61)] after:absolute after:bottom-0 font-semibold"}`} onClick={() => setProductDetailsContext(false)}>Product Details</div>
						<div className={`w-1/2 flex justify-center items-center h-10 border-[rgb(8,43,61)] relative cursor-pointer ${productDetailsContext ? "after:h-[5px] after:w-full after:bg-[rgb(8,43,61)] after:absolute after:bottom-0 font-semibold" : ""}`} onClick={() => setProductDetailsContext(true)}>Reviews</div> */}
				</div>
				{
					activeTab === tabs[0] ?
						(
							<div className="text-sm tracking-tight p-10 leading-[1.2]">{productData?.description}</div>
						)
						:
						(
							<div className="p-10">
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
							</div>
						)
				}
			</div>
		</div>
	)
}

export default ProductDetailsPage
