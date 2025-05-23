import HeadingText from '@/components/HeadingText';
import TabSwitcher from '@/components/TabSwitcher'
import ViewAllIcon from '@/components/ViewAllIcon';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import heartIcon from "../../assets/commonIcons/Wishlist (Stroke).png"
import heartIcon2 from "../../assets/commonIcons/Wishlist (Fill).png"
import { addCartItem, addWishlistItem, deleteWishlistItem } from '@/firebase/auth';
import { addToCart, addToWishlist, deleteFromWishlist } from '@/store/features/cartSlice';

function FeaturedProducts() {
    const tabs = ["New Arrival", "Best Selling"];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    let dispatch = useDispatch();
    let { products } = useSelector(state => state.admin)
    const navigate = useNavigate();
    let { user } = useSelector(state => state.auth);
    let { cart, wishlist } = useSelector(state => state.cart);

    const addCart = (e, item_id) => {
        e.preventDefault();

        let quantity = 1;
        let size = "S"
        let itemDetails = {
            item_id,
            quantity,
            size
        }

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
            toast.success("Product Removed From Cart ...")
        })
    }

    return (
        <div className='space-y-2 lg:space-y-1 px-5 md:px-8 lg:px-12 xl:px-16 border-y py-5 flex flex-col gap-0 lg:gap-2'>

            <HeadingText name="Featured Products" />

            <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

            <ViewAllIcon navigate="/products" className="hidden md:flex" />

            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8 py-2 lg:py-1">
                    {
                        products.slice(0,5).map((item, index) => {
                            return (
                                <div key={index} className="h-[230px] md:h-[270px] lg:h-[300px] xl:h-[330px] w-[100%] rounded-xl md:rounded-[10px] overflow-hidden p-[6px] md:p-2 xl:p-3 cursor-pointer duration-500 border-gray-300 border-[1px] bg-white lg:hover:shadow-[0px_0px_15px_-3px_rgb(8,43,61)] relative shadow-md">
                                    <div onClick={() => navigate(`/product-details/${item.id}`)} className='w-full h-[70%] md:h-[72%] rounded-[6px] md:rounded overflow-hidden border relative'>
                                        <img src={item.images[0]} alt="" className='h-full w-full object-fill' />
                                        <div className="absolute top-1 right-1 xl:top-2 xl:right-2 z-40" onClick={(e) => { e.stopPropagation(), wishlist.some(p => p.item_id === item.id) ? deleteItemFromWishlist(e, item.id) : addWishlist(e, item.id) }}>
                                            <img
                                                src={wishlist.some(p => p.item_id === item.id) ? heartIcon2 : heartIcon }
                                                alt=""
                                                className="h-5 xl:h-7" />
                                        </div>
                                        {/* <div className="h-5 lg:h-7 px-1 lg:px-2 bg-[rgb(255,162,0)] absolute top-1 md:top-2 right-1 md:right-2 flex justify-center items-center rounded-full text-[8px] lg:text-xs font-medium text-white">Save {`${Math.floor(((item.price - item.salePrice) * 100)/item.price)}`}%</div> */}
                                    </div>
                                    <div className="relative h-[25%]">
                                        <p className='text-[6px] md:text-[8px] lg:text-[9px] xl:text-[10px] text-blue-500 font-semibold'>Brand: LXS</p>
                                        <p className='text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] h-auto font-semibold text-[rgb(8,43,61)] mt-[2px] leading-[1] lg:leading-[1.1]'>{item.name}</p>
                                        <div className="flex justify-between items-center w-full absolute -bottom-2 bg-transparent">
                                            <p className='text-[14px] md:text-[15px] lg:text-[16px] xl:text-[16px] font-semibold'><s className='text-slate-400 mr-1 text-[10px] md:text-xs lg:text-[12px] xl:text-[12px]'>₹{item.price}</s>₹{item.salePrice} <span className='text-orange-500 text-[10px] md:text-xs lg-text-[14px] xl:text-[11px] hidden lg:inline-block'>(-{`${Math.floor(((item.price - item.salePrice) * 100) / item.price)}`}%)</span></p>
                                            <div className="flex justify-between items-center gap-2">
                                                {
                                                    cart?.some((p) => p.item_id === item.id) ? (
                                                        <button onClick={() => navigate("/checkout/cart")} className='bg-white rounded-3xl text-center px-2 py-[5px] md:px-[8px] md:py-[7px] text-[9px] md:text-xs lg:text-[13px] xl:text-xs text-[rgb(8,43,61)] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white font-semibold active:bg-[rgb(227,226,226)] tracking-tighter'>Go to Cart</button>
                                                    )

                                                        :

                                                        (

                                                            <button onClick={(e) => addCart(e, item.id)} className='bg-white rounded-3xl text-center px-2 py-[5px] md:px-[8px] md:py-[7px] text-[9px] md:text-xs lg:text-[13px] xl:text-xs text-[rgb(8,43,61)] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white font-semibold active:bg-[rgb(227,226,226)] tracking-tighter'>Add to Cart</button>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            <ViewAllIcon navigate="/products" className="flex md:hidden" />

        </div>
    )
}

export default FeaturedProducts
