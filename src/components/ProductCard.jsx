import { addCartItem, addWishlistItem, deleteWishlistItem } from '@/firebase/auth';
import { addToCart, addToWishlist, deleteFromWishlist } from '@/store/features/cartSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import heartIcon from "../assets/commonIcons/Wishlist (Stroke).png"
import heartIcon2 from "../assets/commonIcons/Wishlist (Fill).png"
import lxsLogo from "../assets/commonIcons/LXS Certified Logo.png"

function ProductCard({item}) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { user } = useSelector(state => state.auth);
    let { cart, wishlist } = useSelector(state => state.cart);

    const addCart = (e, item_id) => {
        e.preventDefault();

        let quantity = 1;
        let size = "S";
        let itemDetails = {
            item_id,
            quantity,
            size
        }

        if (user) {
            addCartItem(user?.id, itemDetails).then(() => {
                dispatch(addToCart(itemDetails));
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
        <div className="w-[100%] rounded-xl md:rounded-[10px] overflow-hidden p-[6px] md:p-2 xl:p-3 cursor-pointer duration-200 border-gray-300 border-[1px] bg-white lg:hover:shadow-[0px_0px_15px_-3px_rgb(8,43,61)] hover:scale-[1.03] relative shadow-md">
            <div onClick={() => navigate(`/product-details/${item.id}`)} className='w-full h-[70%] md:h-[72%] rounded-[6px] md:rounded overflow-hidden border relative'>
                <img src={item.images[0]} alt="" className='h-full w-full object-fill' />
                <div className="absolute top-1 right-1 xl:top-2 xl:right-2 z-40" onClick={(e) => { e.stopPropagation(), wishlist.some(p => p.item_id === item.id) ? deleteItemFromWishlist(e, item.id) : addWishlist(e, item.id) }}>
                    <img
                        src={wishlist.some(p => p.item_id === item.id) ? heartIcon2 : heartIcon}
                        alt=""
                        className="h-5 xl:h-7" />
                </div>
                {/* <div className="h-5 lg:h-7 px-1 lg:px-2 bg-[rgb(255,162,0)] absolute top-1 md:top-2 right-1 md:right-2 flex justify-center items-center rounded-full text-[8px] lg:text-xs font-medium text-white">Save {`${Math.floor(((item.price - item.salePrice) * 100)/item.price)}`}%</div> */}
            </div>
            <div className="relative h-[25%]">
                <div className="flex gap-2 items-center justify-between mt-1">
                    <p className='text-[6px] md:text-[8px] lg:text-[9px] xl:text-[10px] text-blue-500 font-semibold'>Brand: {item.brand}</p>
                    <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] px-3 2xl:pl-2 2xl:pr-3 "><img src={lxsLogo} alt="" className="h-[14px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span></div>
                </div>
                <p className='text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] h-auto font-semibold text-[rgb(8,43,61)] mt-[2px] leading-[1] lg:leading-[1.1]'>{item.name}</p>
                <div className="flex justify-between items-center w-full absolute -bottom-2 bg-transparent">
                    <p className='text-[14px] md:text-[15px] lg:text-[16px] xl:text-[16px] font-bold'>₹{item.salePrice} <s className='text-slate-400 mr-1 text-[10px] md:text-xs lg:text-[12px] xl:text-[12px]'>₹{item.price}</s><span className='text-red-500 text-[10px] md:text-xs lg-text-[14px] xl:text-[11px] hidden lg:inline-block'>(-{`${Math.floor(((item.price - item.salePrice) * 100) / item.price)}`}%)</span></p>
                    <div className="flex justify-between items-center gap-2">
                        {
                            cart?.some((p) => p.item_id === item.id) ? (
                                <button onClick={() => navigate("/checkout/cart")} className='rounded-3xl text-center px-2 lg:px-2 py-[5px] md:py-[7px] text-[9px] md:text-xs lg:text-[13px] xl:text-xs bg-[rgb(8,43,61)] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] text-white font-semibold active:bg-[rgb(227,226,226)] tracking-tighter'>Go to Cart</button>
                            )

                                :

                                (

                                    <button onClick={(e) => addCart(e, item.id)} className='bg-white rounded-3xl text-center px-2 lg:px-2 py-[5px] md:py-[7px] text-[9px] md:text-xs lg:text-[13px] xl:text-xs text-[rgb(8,43,61)] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white font-semibold active:bg-[rgb(227,226,226)] tracking-tighter'>Add to Cart</button>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
