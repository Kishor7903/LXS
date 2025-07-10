import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem, addNewRecentProduct, addWishlistItem, deleteWishlistItem } from "@/firebase/auth";
import { addToCart, addToWishlist, deleteFromWishlist } from "@/store/features/cartSlice";
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
import facebookLogo from "../../assets/Socials/Facebook.png"
import instagramLogo from "../../assets/Socials/Instagram.png"
import twitterLogo from "../../assets/Socials/Twitter.png"
import youtubeLogo from "../../assets/Socials/Youtube.png"
import linkedinLogo from "../../assets/Socials/Linkedin.png"
import whatsappLogo from "../../assets/Socials/Whatsapp (Fill).png"
// import reviewLogo from "../../assets/commonIcons/Rewards 2 (Stroke).png"
import reviewLogoActive from "../../assets/commonIcons/Rewards 2 (Fill).png"
import ViewAllIcon from "@/components/ViewAllIcon";
import starIcon from "../../assets/commonIcons/Rewards 2 (Fill).png"
import { addShippingLabel, checkPincode, orderCurrentStatus, orderTrackingHistory } from "@/firebase/fship";
import { useToast } from "@/components/ToastProvider";
import DialogBox from "@/components/DialogBox";
import { Helmet } from "react-helmet-async";

const sizes = ["S", "M", "L", "XL"];


function ProductDetailsPage({ id, data }) {
	let [hovered, setHovered] = useState(false);
	let [isOpen, setIsOpen] = useState(false);
	const [selectedSize, setSelectedSize] = useState("");
	let [productData, setProductData] = useState(null);
	let [mainPic, setMainPic] = useState(null);
	let [pincode, setPincode] = useState(null);
	let [pincodeResult, setPincodeResult] = useState({})
	let { cart, wishlist } = useSelector(state => state.cart);
	let dispatch = useDispatch();
	let navigate = useNavigate();
	let toaster = useToast();
	let { user } = useSelector(state => state.auth);
	let { address } = useSelector(state => state.cart);

	const addCart = (e, item_id) => {
		e.preventDefault();

		let quantity = 1;
		if (selectedSize === "") {
			toaster("Please select any size..");
			return;
		}
		let itemDetails = {
			item_id,
			quantity,
			size: selectedSize
		}

		if (user) {
			addCartItem(user?.id, itemDetails).then(() => {
				dispatch(addToCart(itemDetails));
				toast.success("Product Added To Cart ...");
				toaster("Added to cart..")
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
				toaster("Products Wislisted..")
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
			toaster("Products removed Wislisted..hgwegiuegd")
		})
	}

	const handlePincodeChange = (e) => {
		e.preventDefault();

		if (e.target.value.length <= 6) {
			setPincode(e.target.value);
			setPincodeResult("");
		}
	}

	const handlePincodeCheck = (pin) => {
		if (pin) {
			checkPincode(400003, parseInt(pin)).then((res) => {
				if (res.status) {
					console.log(res);
					const today = new Date();
					const sixDaysLater = new Date();
					sixDaysLater.setDate(today.getDate() + 7);
					const options = { weekday: "long", day: '2-digit', month: 'short', year: 'numeric' };
					const formattedDate = sixDaysLater.toLocaleDateString('en-GB', options);
					setPincodeResult({ response: res.destination, date: `${formattedDate.split(" ")[0]}, ${formattedDate.split(" ")[1]} ${formattedDate.split(" ")[2]} ${formattedDate.split(" ")[3]}` });
				} else {
					setPincodeResult({ response: "Pincode is not Serviceable Right Now.", date: "" })
				}
			}).catch((err) => {
				console.log("Error at Pincode Check: ", err.message);
			})
		}
	}

	const copyToClipboard = (e) => {
		e.preventDefault();

		const currentUrl = window.location.href;
		navigator.clipboard.writeText(currentUrl)
			.then(() => {
				toaster("URL Copied to Clipboard.")
			})
			.catch(() => {
				toaster("Failed to Copy.",)
			});
	}

	const handleWhatsAppShare = (product_name, product_description) => {
		const productName = encodeURIComponent(product_name);
		const productDescription = encodeURIComponent(product_description);
		const productUrl = encodeURIComponent(window.location.href);

		const message = `${productName}\n\n${productDescription}\n\nCheck it out here: ${productUrl}`;

		const whatsappUrl = `https://wa.me/?text=${message}`;

		window.open(whatsappUrl, '_blank');
	};

	useEffect(() => {
		setProductData(data);
		setMainPic(data?.images[0])
	}, [data]);

	useEffect(() => {
		if (user) {
			addNewRecentProduct(user.id, id);
		}
		// addShippingLabel("FSPP0004343539").then(res => console.log(res)).catch(err => console.log(err.message));
		// registerOrderPickup(["FSPP0004343539"]).then(res => console.log(res)).catch(err => console.log(err.message));
		// orderTrackingHistory("FSPP0004343537").then(res => console.log(res)).catch(err => console.log(err.message));
		// orderCurrentStatus("FSPP0004343537").then(res => console.log(res)).catch(err => console.log(err.message));
	}, [])

	useEffect(() => {
		let defaultAddress = address.find(item => item.isDefault === true);
		setPincode(defaultAddress?.pincode)
		handlePincodeCheck(defaultAddress?.pincode)
	}, [address]);


	return (
		<div className="px-20 pt-5 w-full flex flex-col gap-5">
			{
				productData && (
					<Helmet>
						<title>{productData?.name} | LXS Lifestyle Store</title>
						<meta property="og:title" content={productData?.name} />
						<meta property="og:description" content={productData?.description?.text} />
						<meta property="og:image" content={productData?.images[0]} />
						<meta property="og:url" content={window.location.href} />
						<meta property="og:type" content="product" />
					</Helmet>
				)
			}

			<div className="leading-[1] font-semibold flex flex-col gap-3">
				<span>Gear Blueprint📘<br />
					<p className="text-xs font-normal">Explore every detail, dimension, and feature — decoded for you</p>
				</span>
				<p className="font-medium text-sm">Home {">"} Clothing {">"} T-Shirt {">"} <span className="text-[rgb(240,85,120)] font-semibold">LXS-M-TS-0001</span></p>
			</div>
			<div className="w-full flex gap-14 pl-5">
				<div className="flex gap-5 h-full border">
					<div className="flex flex-col gap-3 h-[80vh]">
						{
							productData?.images.slice(0, 6).map((item, index) => (
									<img key={index} src={item} alt="" className={`h-[15.3%] rounded-[10px] cursor-pointer border ${mainPic === item ? "border-[rgb(8,43,61)] shadow-[0px_0px_5px_0px_rgb(8,43,61)]" : "shadow-md lg:hover:shadow-[0px_0px_5px_0px_rgb(8,43,61)]"}`} />
							))
						}
					</div>
					<img src={mainPic} alt="" className="h-[80vh] rounded-[18px] border shadow-lg border-slate-300 cursor-pointer" />
				</div>

				<div className="flex flex-col justify-between">
					<div className="flex flex-col justify-between">
						<div className="flex gap-3 items-center justify-between mb-1">
							<div className="flex gap-3 items-center">
								<div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[145px] 2xl:w-[130px] px-3 2xl:px-3 py-[3px] 2xl:py-[4px]"><img src={lxsLogo} alt="" className="h-5" /> <span className="text-xs text-white font-medium">LXS Certified</span></div>
								<span className="opacity-50 mr-7 font-semibold tracking-tight text-sm">APPAREL & FASHION</span>
							</div>
						</div>
						<div className="flex justify-between items-center w-full">
							<h2 className="xl:text-2xl font-semibold text-[rgb(8,43,61,0.7)] leading-3 w-[80%]">{productData?.name}</h2>
							<button className=" text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2">Share <i className="fi fi-sr-share relative top-[2px]"></i></button>
							<DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[480px] p-6 bg-white rounded-xl flex flex-col items-center gap-3" parentDivClassName="flex justify-center items-center">
								<h5 className="text-2xl font-semibold border-b border-[rgb(8,43,61)] w-full text-center">Share This Product</h5>
								<div className="flex gap-5 my-3">
									<button className="text-[11px] font-medium flex flex-col justify-center items-center lg:hover:scale-[1.15] lg:active:scale-[0.98] duration-200"><img src={instagramLogo} alt="" className='h-6 lg:h-12' />Instagram</button>
									<button className="text-[11px] font-medium flex flex-col justify-center items-center lg:hover:scale-[1.15] lg:active:scale-[0.98] duration-200"><img src={linkedinLogo} alt="" className='h-6 lg:h-12' />LinkedIn</button>
									<button className="text-[11px] font-medium flex flex-col justify-center items-center lg:hover:scale-[1.15] lg:active:scale-[0.98] duration-200"><img src={twitterLogo} alt="" className='h-6 lg:h-12' />Twitter</button>
									<button className="text-[11px] font-medium flex flex-col justify-center items-center lg:hover:scale-[1.15] lg:active:scale-[0.98] duration-200"><img src={youtubeLogo} alt="" className='h-6 lg:h-12' />Youtube</button>
									<button onClick={(e) => { e.preventDefault(), handleWhatsAppShare(productData?.name, productData?.description?.text) }} className="text-[11px] font-medium flex flex-col justify-center items-center lg:hover:scale-[1.15] lg:active:scale-[0.98] duration-200"><img src={whatsappLogo} alt="" className='h-6 lg:h-12' />Whatsapp</button>
									<button className="text-[11px] font-medium flex flex-col justify-center items-center lg:hover:scale-[1.15] lg:active:scale-[0.98] duration-200"><img src={facebookLogo} alt="" className='h-6 lg:h-12' />Facebook</button>
								</div>
								<div clas Name="relative flex gap-3">
									<input type="text" className="border border-[rgb(8,43,61)] pl-4 pr-2 py-2 h-10 text-nowrap w-80 overflow-hidden rounded-l-full outline-none" value={window.location.href} readOnly />
									<button onClick={copyToClipboard} className="px-4 h-10 rounded-r-full bg-[rgb(8,43,61)] text-white font-semibold">Copy</button>
								</div>
							</DialogBox>
						</div>
						<div className="flex gap-2 items-center justify-between border-[rgb(8,43,61)]">
							<div className="flex gap-2 items-center pt-1">
								<p className="xl:text-3xl 2xl:text-4xl font-semibold">₹{productData?.salePrice}.00</p>
								<p className="text-xl text-gray-600 font-semibold opacity-60">MRP  ₹<span className="line-through ">{productData?.price}.00</span></p>
								<p className="text-[rgb(240,85,120)] font-semibold">({`${Math.floor(((productData?.price - productData?.salePrice) * 100) / productData?.price)}`}% OFF)</p>
							</div>
							<Link className="text-sm lg:hover:underline flex h-3 items-center 2xl:text-sm relative bottom-2 space-x-0.5">
								<img src={starIcon} alt="" className="h-3 relative bottom-[1px]" />
								<span className="ml-2 font-medium ">4.5 Rating | 95 Reviews</span>
							</Link>
						</div>
						<p className="text-sm 2xl:text-base text-green-600">Inclusive of all taxes, 100% Original Product</p>
					</div>

					{/* Size Selection */}
					<div className="flex flex-col xl:gap-3 2xl:gap-5">
						<div className="flex flex-col justify-between h-full">
							<div className="flex justify-between items-center w-[230px]"><p className="font-semibold 2xl:text-lg">Select Size:</p><Link className="lg:hover:underline text-blue-500 cursor-pointer font-medium text-sm">Size Chart</Link></div>
							<div className="flex space-x-3 mt-1">
								{sizes.map((size) => (
									<button
										key={size}
										className={`xl:h-12 2xl:h-12 xl:w-12 2xl:w-12 rounded-xl text-lg font-semibold transition ${selectedSize === size ? "bg-[rgb(8,43,61)] text-white scale-[1.15]" : " lg:hover:scale-[1.07] shadow border border-slate-300"
											}`}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="">
						<h6 className="font-semibold text-lg 2xl:text-xl mb-1">Additional Information:</h6>
						<p className="text-sm leading-4 font-medium">
							Product Code: <span className="text-[rgb(240,85,120)]">LXS-M-TS-0001</span> <br />
							Brand: <Link className="text-[rgb(240,85,120)] lg:hover:underline">{productData?.brand}</Link> <br />
							Seller: <Link className="text-[rgb(240,85,120)] lg:hover:underline">LXS Lifestyle Store</Link> <br />
						</p>
					</div>

					<div className="flex flex-col w-full relative">
						<p className="text-lg font-semibold mb-1">Check Pincode:</p>
						<input type="number" className="h-9 w-48 shadow-[inset_0px_0px_10px_-3px_rgb(8,43,61)] rounded-full pl-4 bg-gray-200 outline-none font-medium" placeholder="Enter Pincode" value={pincode ? pincode : ""} onChange={handlePincodeChange} />
						<button onClick={() => handlePincodeCheck(pincode)} className="text-white absolute left-44 top-8 h-9 w-10 bg-[rgb(8,43,61)] rounded-r-full outline-none"><i className="fi fi-rs-search relative top-[2px]"></i></button>
						{
							pincode?.length === 6 ? (
								<>
									<p className="text-sm leading-4 mt-1 text-[rgb(240,85,120)] font-medium capitalize">{pincodeResult.response}</p>
									{
										pincodeResult && pincodeResult.response !== "Pincode is not Serviceable Right Now." ? (
											<p className="text-sm leading-4 text-[rgb(240,85,120)] font-medium">Expected Delivery by {
												pincodeResult?.date
											}</p>
										)
											:
											null
									}
								</>
							) :
								null
						}
					</div>
					<div className="">
						<p className="text-sm font-medium leading-4">Return & Exchange Availability: <span className="text-[rgb(240,85,120)]">{productData?.returnAvailability}</span></p>
						<p className="text-sm font-medium leading-4">Pay on Delivery: <span className="text-[rgb(240,85,120)]">{productData?.codAvailability === "Yes" ? "Available" : "Not Available"}</span></p>
					</div>
					<div className="flex gap-5 ">
						<button onClick={(e) => wishlist.some(p => p.item_id === id) ? deleteItemFromWishlist(e, id) : addWishlist(e, id)} className={`flex items-center justify-center xl:text-xl 2xl:text-2xl font-semibold xl:py-[10px] 2xl:py-4 rounded-full w-full lg:hover:scale-[1.03] duration-150 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] ${wishlist.some(p => p.item_id === id) ? "bg-[rgb(8,43,61)] text-white" : "bg-slate-200"}`}><i className="fi fi-ss-heart scale-x-[-1] h-6 text-2xl mr-4"></i>{wishlist.some(p => p.item_id === id) ? "Remove from" : "Save to"} Favourites</button>

						<button onClick={(e) => cart?.some((p) => p.item_id === id) ? navigate("/checkout/cart") : addCart(e, id)} className={`flex items-center justify-center xl:text-xl 2xl:text-2xl font-semibold xl:py-[10px] 2xl:py-4 rounded-full w-full lg:hover:scale-[1.03] duration-150 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] text-white ${cart?.some((p) => p.item_id === id) ? "bg-gradient-to-r from-[rgb(240,85,120)] to-[rgb(248,181,44)]" : "bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)]"}`}><i className="fi fi-sr-cart-shopping-fast h-6 text-2xl mr-4"></i>{cart?.some((p) => p.item_id === id) ? "Go to" : "Add to"} Basket {cart?.some((p) => p.item_id === id) ? <i className="fi fi-br-angle-double-small-right relative top-[3px] ml-2"></i> : ""}</button>
					</div>
				</div>
			</div>
			<div className="w-full flex gap-14 mb-10 mt-5 ">
				<div className="flex flex-col gap-5 w-[60%] p-10 shadow-lg border border-slate-300 rounded-xl">
					<h4 className="text-xl font-semibold">PRODUCT DESCRIPTION</h4>
					{/* <p className="text-sm tracking-tight leading-[1.2] ml-2">{productData?.description}</p> */}
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
