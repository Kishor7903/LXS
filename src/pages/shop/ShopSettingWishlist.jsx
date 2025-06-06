import HoverButton from '@/components/HoverButton';
import { addCartItem, deleteWishlistItem } from '@/firebase/auth';
import { addToCart, deleteFromWishlist } from '@/store/features/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ShopSettingWishlist() {
	let [wishlistItems, setWishlistItems] = useState([]);
	let { wishlist, cart } = useSelector(state => state.cart);
	let { products } = useSelector(state => state.admin);
	let { user } = useSelector(state => state.auth);
	let dispatch = useDispatch();
	let navigate = useNavigate();

	const moveToCart = (e, item_id) => {
		e.preventDefault();

		let quantity = 1;
		let size = "S"
		let itemDetails = {
			item_id,
			quantity,
			size
		}

		if (user) {
			addCartItem(user.id, itemDetails).then(() => {
				dispatch(addToCart(itemDetails));
				toast.success("Product Moved To Cart ...");
			})
		} else {
			toast.error("Please Login First ...")
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

	return (
		<div className="w-full h-full px-5 flex gap-8 ">
			<div className="w-1/2 flex flex-col justify-between">
				<div className="leading-[1] font-semibold border-b-2 border-[rgb(8,43,61)] h-10">Future Regrets 💔<br />
					<p className="text-xs font-normal">Because you will probably buy it later anyway!</p>
				</div>
				<div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
					{
						wishlist && wishlist.length > 0 ? (
							wishlistItems?.map((item, index) => (
								<div key={index} className="flex gap-2 items-center p-[6px] border border-[rgb(8,43,61)] rounded-xl shadow-[0px_5px_10px_-6px_rgb(8,43,61)] w-full h-24">
									<div className="h-full rounded-[6px] overflow-hidden flex-shrink-0 mr-1" onClick={() => navigate(`/product-details/${item.id}`)}>
										<img
											src={item.images[0]}
											className="h-full w-full object-fill rounded border"
										/>
									</div>
									<div className="w-[70%]">
										<p className="text-xs uppercase font-bold text-[rgb(8,43,61,0.5)]">Apparel & Fashion</p>
										<h2 className="text-lg font-semibold line-clamp-1">{item.name}</h2>
										<p className='text-[12px] font-medium'>Brand: {item.brand}</p>
										<p className="text-base font-semibold">₹ {item.salePrice}</p>
									</div>
									<div className="flex flex-col items-center w-36">
										{
											cart.some((p) => p.item_id === item.id) ?  (
												<span className='text-[9px] mt-1 lg:text-[13px] mb-2 font-medium text-center leading-[1] text-green-700 flex gap-1'>Added to Cart <i className="fi fi-rs-check-circle relative text-[13px] "></i></span>
											) : (
												<HoverButton onClick={(e) => moveToCart(e, item.id)} className='text-[13px] font-semibold px-2 text-nowrap py-[5px] mb-1'>Add to Cart</HoverButton>
											)
										}
										<p onClick={(e) => deleteItemFromWishlist(e, item.id)} className="text-xs text-blue-400 tracking-tighter font-medium cursor-pointer lg:hover:underline">Remove</p>
									</div>
								</div>
							))
						)
							:
							(
								<div className="text-lg text-center opacity-70">No Items Wishlisted...</div>
							)
					}
				</div>
				<hr className="border-[rgb(8,43,61)] border" />
			</div>
			<div className="border w-1/2 h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
		</div>
	)
}

export default ShopSettingWishlist