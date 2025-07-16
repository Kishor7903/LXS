import { addWishlistItem, deleteWishlistItem } from '@/firebase/auth';
import { addToWishlist, deleteFromWishlist } from '@/store/features/cartSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import heartIcon from "../assets/commonIcons/Wishlist (Stroke).png"
import heartIcon2 from "../assets/commonIcons/Wishlist (Fill).png"
import lxsLogo from "../assets/commonIcons/LXS Certified Logo.png"
import SizeSelectionPopup from './SizeSelectionPopup';

function ProductCard({ item }) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { user } = useSelector(state => state.auth);
    let { cart, wishlist } = useSelector(state => state.cart);
    let [selectedSize, setSelectedSize] = useState([]);
    let [isOpen, setIsOpen] = useState(false);

    const addWishlist = (e, item_id) => {
        e.preventDefault();

        if (user) {
            addWishlistItem(user?.id, item_id).then((res) => {
                dispatch(addToWishlist(res));
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

    return (
        <div className="w-[100%] rounded-xl md:rounded-[10px] overflow-hidden p-[6px] md:p-2 xl:p-3 cursor-pointer duration-200 border-slate-300 border-[1px] bg-white relative shadow-md">
            <div onClick={() => navigate(`/product-details/${item.id}`)} className='w-full rounded-[6px] md:rounded overflow-hidden border relative'>
                <img src={item.images[0]} alt="" className='h-full w-full object-fill' />
                {/* <div className="h-5 lg:h-7 px-1 lg:px-2 bg-[rgb(255,162,0)] absolute top-1 md:top-2 right-1 md:right-2 flex justify-center items-center rounded-full text-[8px] lg:text-xs font-medium text-white">Save {`${Math.floor(((item.price - item.salePrice) * 100)/item.price)}`}%</div> */}
            </div>
            <div className="relative h-[100px]">
                <div className="flex gap-2 items-center justify-between mt-1">
                    <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] px-3 2xl:pl-2 2xl:pr-3 "><img src={lxsLogo} alt="" className="h-[14px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span></div>
                    <p className='text-[6px] md:text-[8px] lg:text-[9px] xl:text-[12px] font-semibold'>Brand: <span className='text-[rgb(240,85,120)]'>{item.brand}</span></p>
                </div>
                <p className='text-[15px] font-medium text-[rgb(8,43,61)] line-clamp-1 opacity-70'>{item.name}</p>
                <div className="flex justify-between items-center w-full bg-transparent relative bottom-1">
                    <p className='text-[18px] font-bold'>₹{item.salePrice} <s className='text-slate-400 mr-1 text-[10px] md:text-xs lg:text-[12px] xl:text-[13px] font-semibold'>₹{item.price}</s><span className='text-[rgb(240,85,120)] text-[10px] md:text-xs lg-text-[14px] xl:text-[12px] hidden lg:inline-block'>(-{`${Math.floor(((item.price - item.salePrice) * 100) / item.price)}`}%)</span></p>
                </div>
                <div className="flex justify-between items-center w-full">

                    <button onClick={() => user ? cart?.some((p) => p.item_id === item.id) ? navigate("/checkout/cart") : setIsOpen(true) : toast.error("Login Required.")} className={`flex items-center justify-center text-base font-semibold py-1 rounded-full w-[82%] h-9 lg:hover:scale-[1.03] duration-150 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] tracking-tight ${user ? cart?.some((p) => p.item_id === item.id) ? "bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-white" : "bg-white border-2 border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white" : "bg-white border-2 border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white"}`}><i className="fi fi-sr-cart-shopping-fast relative top-0.5 text-lg mr-2"></i>{user ? cart?.some((p) => p.item_id === item.id) ? "Go to": "Add to" : "Add to"} Basket</button>

                    {/* <button onClick={(e) => cart?.some((p) => p.item_id === id) ? navigate("/checkout/cart") : addCart(e, item.id)} className={`flex items-center justify-center 2xl:text-xl font-semibold xl:py-2 rounded-full w-3/4 lg:hover:scale-[1.03] duration-150 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] text-white ${cart?.some((p) => p.item_id === item.id) ? "bg-gradient-to-r from-[rgb(240,85,120)] to-[rgb(248,181,44)]" : "bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)]"}`}><i className="fi fi-sr-cart-shopping-fast h-6 text-2xl mr-4"></i>{cart?.some((p) => p.item_id === item.id) ? "Go to" : "Add to"} Basket</button> */}

                    <div className="lg:hover:scale-[1.1] duration-150 lg:active:scale-[0.9]" onClick={(e) => { e.stopPropagation(), wishlist.some(p => p.item_id === item.id) ? deleteItemFromWishlist(e, item.id) : addWishlist(e, item.id) }}>
                        <img
                            src={user ? wishlist.some(p => p.item_id === item.id) ? heartIcon2 : heartIcon : heartIcon}
                            alt=""
                            className="h-5 xl:h-9" 
                        />
                    </div>

                </div>
            </div>
            <SizeSelectionPopup isOpen={isOpen} setIsOpen={setIsOpen} item={item} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        </div>
    )
}

export default ProductCard
