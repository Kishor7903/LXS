import HoverButton from '@/components/HoverButton';
import { addCartItem, deleteWishlistItem } from '@/firebase/auth';
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
import { addToCart, deleteFromWishlist } from '@/store/features/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ToastProvider';

function ShopSettingWishlist() {
	let [wishlistItems, setWishlistItems] = useState([]);
	let [loading, setLoading] = useState(false);
	let { wishlist, cart } = useSelector(state => state.cart);
	let { products } = useSelector(state => state.admin);
	let { user } = useSelector(state => state.auth);
	let dispatch = useDispatch();
	let navigate = useNavigate();
	const toast = useToast();

	const moveToCart = (e, item_id) => {
		e.preventDefault();

		let quantity = 1;
		let size = ["S"]
		let itemDetails = {
			item_id,
			quantity,
			size
		}

		if (user) {
			addCartItem(user.id, itemDetails).then(() => {
				dispatch(addToCart(itemDetails));
				toast("Product Moved To Cart ...");
			})
		} else {
			toast("Please Login First ...")
		}
	}

	const deleteItemFromWishlist = (e, item_id) => {
		e.preventDefault();

		deleteWishlistItem(user.id, item_id).then(() => {
			dispatch(deleteFromWishlist(item_id));
		})
	}

	useEffect(() => {
		let items = wishlist.map(item => {
			let product = products.find(p => p.id === item.item_id);
			return product ? { ...product } : null;
		}).filter(item => item !== null);
		setWishlistItems(items)
	}, [wishlist])

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000)
	}, [])

	return (
		<div className="w-full h-full pl-5 flex gap-5 ">
			<div className="w-[60%] flex flex-col justify-between">
				<div className="leading-[1] font-semibold border-b-2 border-[rgb(8,43,61)] h-10">Future Regrets 💔<br />
					<p className="text-xs font-normal">Because you will probably buy it later anyway!</p>
				</div>
				<div className="space-y-3 h-full py-4 px-2 overflow-y-scroll no-scrollbar">
					{
						!loading ? (
							wishlist && wishlist.length > 0 ? (
								wishlistItems?.map((item, index) => (
									<div key={index} className="bg-slate-100 flex gap-2 justify-between items-center border border-slate-300 shadow-md rounded-xl w-[99%] mx-auto p-2 pr-5 lg:hover:scale-[1.01] lg:hover:shadow-[0px_0px_10px_-1px_rgb(8,43,61)] lg:hover:duration-200 cursor-pointer" onClick={() => navigate(`/product-details/${item.id}`)}>
										<div className="flex gap-2">
											<div className="h-full rounded-[6px] overflow-hidden flex-shrink-0 mr-1" >
												<img
													src={item.images[0]}
													className="h-24 w-full object-fill rounded border"
												/>
											</div>
											<div className="">
												<div className="flex gap-2 items-center">
													<div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[100px] px-2 py-[1px]"><img src={lxsLogo} alt="" className="h-[12px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span>
													</div>
													<span className="opacity-50 mr-3 font-semibold tracking-tight text-xs">APPAREL & FASHION</span>
												</div>
												<h2 className="font-semibold line-clamp-1">{item.name}</h2>
												<p className='text-[12px] font-medium'>Brand: {item.brand}</p>
												<p className="text-sm lg:text-lg font-semibold">₹{item.salePrice}<s className="font-medium text-sm opacity-60 ml-2">₹{item.price}</s> <span className="font-semibold text-xs text-red-500">({`${Math.floor(((item.price - (item.salePrice)) * 100) / item.price)}`}% OFF)</span></p>
											</div>
										</div>
										<div className="flex flex-col items-center">
											{
												cart.some((p) => p.item_id === item.id) ? (
													<span className='text-[9px] mt-1 lg:text-[13px] mb-2 font-medium text-center leading-[1] text-green-700 flex gap-1'>Added to Basket <i className="fi fi-rs-check-circle relative text-[13px] "></i></span>
												) : (
													<HoverButton onClick={(e) => { e.stopPropagation(), moveToCart(e, item.id) }} className='text-[13px] font-semibold px-2 text-nowrap py-[5px] mb-1'>Add to Basket</HoverButton>
												)
											}
											<p onClick={(e) => { e.stopPropagation(), deleteItemFromWishlist(e, item.id) }} className="text-xs text-blue-400 tracking-tighter font-medium cursor-pointer lg:hover:underline">Remove</p>
										</div>
									</div>
								))
							)
								:
								(
									<div className="text-lg text-center opacity-70">No Items in Favourites...</div>
								)
						) :
							(
								[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
									<div key={idx} className="flex gap-4 p-2 border border-slate-300 rounded-2xl shadow-sm animate-pulse bg-white w-full">
										<div className="w-[75px] h-[75px] bg-gray-300 rounded-lg"></div>
										<div className="flex-1 space-y-2">
											<div className="h-2 w-28 bg-gray-300 rounded"></div>
											<div className="h-3 w-3/4 bg-gray-300 rounded"></div>
											<div className="h-2 w-1/3 bg-gray-300 rounded"></div>
											<div className="h-3 w-1/4 bg-gray-300 rounded"></div>
										</div>
										<div className="flex flex-col justify-center gap-2 mr-2 items-center">
											<div className="h-7 w-24 bg-gray-300 rounded-full"></div>
											<div className="h-2 w-14 bg-gray-300 rounded"></div>
										</div>
									</div>
								))
							)
					}
				</div>
				<hr className="border-[rgb(8,43,61)] border" />
			</div>
			<div className="border w-[40%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
		</div>
	)
}

export default ShopSettingWishlist