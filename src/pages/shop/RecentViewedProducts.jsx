import { addToWishlist, deleteFromWishlist, deleteRecentViewed, getRecentViewed } from "@/store/features/cartSlice";
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
import { addWishlistItem, deleteAllRecents, deleteRecentProduct, deleteWishlistItem, getAllRecentPoducts } from "@/firebase/auth"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import SizeSelectionPopup from "@/components/SizeSelectionPopup";
import { useToast } from "@/components/ToastProvider";
import heartIcon from "../../assets/commonIcons/Wishlist (Stroke).png"
import heartIcon2 from "../../assets/commonIcons/Wishlist (Fill).png"
import Breadcrum from "@/components/Breadcrum";
import HoverButton from "@/components/HoverButton";


function RecentViewedProducts() {
    let [product, setProduct] = useState([]);
    let { user } = useSelector(state => state.auth);
    let { products } = useSelector(state => state.admin);
    let { recentViewed } = useSelector(state => state.cart);
    let [item1, setItem1] =  useState(null);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { cart, wishlist } = useSelector(state => state.cart);
    let [selectedSize, setSelectedSize] = useState([]);
    let [isOpen, setIsOpen] = useState(false);
    const toast = useToast();

    let breadcrum = ["My Account", "Dashboard", "Recently Viewed"];

    const addWishlist = (e, item_id) => {
        e.preventDefault();

        if (user) {
            addWishlistItem(user?.id, item_id).then((res) => {
                dispatch(addToWishlist(res));
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

    const handleAddToCartButton = (e, item) => {
        e.preventDefault();

        setItem1(item);
        setIsOpen(true);
    }

    const handelClearAllRecent = (e) => {
        e.preventDefault();

        deleteAllRecents(user.id).then(() => {
            dispatch(getRecentViewed([]));
            toast("All Products Deleted.")
        })
    }

    const removeRecentProduct = (e, itemId) => {
        console.log(itemId);
        e.preventDefault();

        deleteRecentProduct(user.id, itemId).then(() => {
            dispatch(deleteRecentViewed(itemId))
            toast("Product Removed from Recent.")
        })
    }

    useEffect(() => {
        let items = recentViewed.map(item => {
            let prods = products.find(p => p.id === item.item_id)
            return prods ? {...prods, item_id: item.id, timestamp: item.timestamp} : null
        }).filter(item => item !== null);

        setProduct(() => items.sort((a,b) => {return new Date(b.timestamp) - new Date(a.timestamp)}))
    }, [recentViewed])
    return (
        <div className="h-[calc(100vh-64px)] w-full p-5 bg-white">
            <div className="flex gap-10 h-[calc(100vh-104px)] rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border px-5 py-5 overflow-hidden">
                <div className="pl-5 w-[65%] relative">
                    <HoverButton onClick={handelClearAllRecent} className="text-xs font-semibold absolute top-0 right-0 border border-slate-300 shadow-md rounded-xl px-3 h-8 lg:hover:scale-[1.06] duration-200 lg:active:scale-[0.98]"><i className="fi fi-sr-trash relative top-[1px] mr-1"></i>Clear Recents</HoverButton>
                    <Breadcrum items={breadcrum} />
                    <div className="w-full flex flex-col mt-4 pl-4 h-[calc(100vh-180px)] overflow-y-scroll no-scrollbar">
                        <div className="w-full flex justify-between items-end pb-1 sticky top-0 z-10 bg-white">
                            <div className="leading-[1] font-semibold">Cosmic Footprints 👣<br />
                                <p className="text-xs font-normal"> The marks left behind through your interstellar shopping galaxy</p>
                            </div>
                            <div className="flex gap-5">
                                <p className='text-[14px] font-semibold self-end mb-1'>Total Products: <span className="text-[rgb(253,84,120)]">{product.length > 9 ? product.length : `0${product.length}`}</span></p>
                            </div>
                        </div>
                        {
                            product.length > 0 ? 
                            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-4 xl:gap-y-4 p-1">
                            {
                                product.map((item, idx) => {
                                    return (
                                        <div key={idx} onClick={() => navigate(`/product-details/${item.id}`)} className="w-[100%] rounded-2xl overflow-hidden p-[6px] md:p-2 2xl:p-3 cursor-pointer duration-200 border-slate-300 border-[1px] bg-white relative shadow-md">
                                            <div onClick={(e) => {e.stopPropagation(), removeRecentProduct(e, item.item_id)}} className="absolute top-1.5 z-10 right-1.5 rounded-xl h-8 w-8 flex justify-center items-center bg-white border border-slate-300 shadow-md lg:hover:scale-[1.08] duration-200 lg:active:scale-[0.92] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white"><i className="fi fi-sr-trash relative top-[2px] text-xs"></i></div>
                                            <div className='w-full rounded-xl overflow-hidden border relative'>
                                                <img src={item.images[0]} alt="" className='h-full w-full object-fill' />
                                                {/* <div className="h-5 lg:h-7 px-1 lg:px-2 bg-[rgb(255,162,0)] absolute top-1 md:top-2 right-1 md:right-2 flex justify-center items-center rounded-full text-[8px] lg:text-xs font-medium text-white">Save {`${Math.floor(((item.price - item.salePrice) * 100)/item.price)}`}%</div> */}
                                            </div>
                                            <div className="relative">
                                                <div className="flex gap-2 items-center justify-between mt-1">
                                                    {
                                                        item.isLxsCertified === "Yes" &&
                                                        <div className="flex items-center gap-x-0.5 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] px-3 2xl:pl-1 2xl:pr-1.5 "><img src={lxsLogo} alt="" className="h-[12px]" /> <span className="text-[8px] text-white font-medium">LXS Certified</span></div>
                                                    }
                                                    <p className='text-[6px] md:text-[8px] lg:text-[9px] xl:text-[9px] font-semibold'>Brand: <span className='text-[rgb(253,84,120)]'>{item.brand}</span></p>
                                                </div>
                                                <p className='text-[13px] font-semibold text-[rgb(8,43,61)] line-clamp-1 opacity-70'>{item.name}</p>
                                                <div className="flex justify-between items-center w-full bg-transparent relative bottom-1">
                                                    <p className='text-[12px] font-bold'>₹{item.salePrice} <s className='text-slate-400 mr-1 text-[10px] md:text-xs lg:text-[12px] xl:text-[10px] font-semibold'>₹{item.price}</s><span className='text-[rgb(253,84,120)] text-[19px] md:text-xs lg:text-[14px] xl:text-[9px] hidden lg:inline-block'>(-{`${Math.floor(((item.price - item.salePrice) * 100) / item.price)}`}%)</span></p>
                                                </div>
                                                <div className="flex justify-between items-center w-full relative bottom-0">

                                                    <button onClick={(e) => user ? cart?.some((p) => p.item_id === item.id) ? navigate("/checkout/cart") : handleAddToCartButton(e, item) : toast("Login Required.")} className={`flex items-center justify-center text-[12px] 2xl:text-[14px] font-semibold h-8 w-[78%] rounded-xl  tracking-tight ${user ? cart?.some((p) => p.item_id === item.id) ? "bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-white lg:hover:scale-[1.04] duration-200 lg:active:scale-[0.97]" : "bg-white border-2 border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white" : "bg-white border-2 border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white"}`}><i className="fi fi-sr-cart-shopping-fast relative top-0.5 text-sm 2xl:text-base mr-1"></i>{user ? cart?.some((p) => p.item_id === item.id) ? "Go to" : "Add to" : "Add to"} Basket</button>

                                                    {/* <button onClick={(e) => cart?.some((p) => p.item_id === id) ? navigate("/checkout/cart") : addCart(e, item.id)} className={`flex items-center justify-center 2xl:text-xl font-semibold xl:py-2 rounded-full w-3/4 lg:hover:scale-[1.03] duration-150 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] text-white ${cart?.some((p) => p.item_id === item.id) ? "bg-gradient-to-r from-[rgb(253,84,120)] to-[rgb(248,181,44)]" : "bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)]"}`}><i className="fi fi-sr-cart-shopping-fast h-6 text-2xl mr-4"></i>{cart?.some((p) => p.item_id === item.id) ? "Go to" : "Add to"} Basket</button> */}

                                                    <div className="lg:hover:scale-[1.1] duration-200 lg:active:scale-[0.9]" onClick={(e) => { e.stopPropagation(), wishlist.some(p => p.item_id === item.id) ? deleteItemFromWishlist(e, item.id) : addWishlist(e, item.id) }}>
                                                        <img
                                                            src={user ? wishlist.some(p => p.item_id === item.id) ? heartIcon2 : heartIcon : heartIcon}
                                                            alt=""
                                                            className="h-5 xl:h-[31px]"
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            {
                                                item1 &&
                                                <SizeSelectionPopup isOpen={isOpen} setIsOpen={setIsOpen} item={item1} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : 
                        <div className="text-xl font-semibold flex items-center opacity-70 justify-center min-h-80">No Recently Viewed Products !</div>
                        }
                    </div>
                </div>
                <div className="w-[32.3%] h-[100%] rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </div>
    )
}

export default RecentViewedProducts
