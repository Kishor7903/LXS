import DialogBox from './DialogBox'
import lxsLogo from "../assets/commonIcons/LXS Certified Logo.png"
import starIconFill from "../assets/commonIcons/Rewards 2 (Fill).png"
import { addCartItem } from '@/firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/features/cartSlice';
import { useToast } from './ToastProvider';
import { useNavigate } from "react-router-dom";

let sizes = ["S", "M", "L", "XL"];

function SizeSelectionPopup({ isOpen, setIsOpen, item, selectedSize, setSelectedSize }) {
    let { user } = useSelector(state => state.auth);
    let { cart } = useSelector(state => state.cart);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const toast = useToast();

    const handleAddToCart = (e) => {
        e.preventDefault();

        let quantity = 1;
        let itemDetails = {
            item_id: item.id,
            quantity,
            size: selectedSize
        }

        addCartItem(user?.id, itemDetails).then(() => {
            dispatch(addToCart(itemDetails));
        })

        setIsOpen(false);
        setSelectedSize([]);
        toast("Product added to cart..")
    }

    return (
        <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[40vw] bg-white rounded-3xl flex flex-col p-8 items-center relative overflow-hidden" parentDivClassName="flex justify-center items-center cursor-default">
            <h2 className="text-center text-2xl rounded-2xl font-bold border-b border-slate-300 shadow-md uppercase p-4 flex gap-1 justify-center items-center bg-[rgb(8,43,61)] text-white w-80">
                Select Size !
            </h2>
            <div className="flex w-full gap-2 p-3 border border-slate-300 cursor-pointer bg-slate-100 rounded-xl mx-auto mb-4 mt-8 shadow-md " onClick={() => navigate(`/product-details/${item.id}`)}>
                <div className="h-full rounded-[6px] overflow-hidden flex-shrink-0 mr-1 shadow-md" >
                    <img
                        src={item.images[0]}
                        className="h-40 w-full object-fill rounded border"
                    />
                </div>
                <div className="w-full leading-4 " >
                    <div className="flex gap-2 items-center justify-between">
                        <div className="flex gap-2">
                        {
                            item.isLxsCertified === "Yes" &&
                            <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[100px] px-2 py-[1px]"><img src={lxsLogo} alt="" className="h-[12px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span>
                            </div>
                        }
                        <span className="opacity-50 mr-3 font-semibold tracking-tight text-xs">APPAREL & FASHION</span>
                        </div>
                        <div className="text-sm flex h-3 items-center 2xl:text-sm space-x-0.5">
                            <img src={starIconFill} alt="" className="h-3 relative bottom-[1px]" />
                            <span className="ml-2 font-medium ">{item?.avgRating.toFixed(1)} Rating </span>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold line-clamp-1 text-[rgb(8,43,61,0.7)]">{item.name}</h2>
                    <p className='text-[13px] font-medium'>Brand: <span className='text-[rgb(253,84,120)]'>{item.brand}</span></p>
                    <p className="text-sm lg:text-xl font-semibold">₹{item.salePrice}<s className="font-medium text-base opacity-60 ml-2">₹{item.price}</s> <span className="font-semibold text-sm text-[rgb(253,84,120)]">({`${Math.floor(((item.price - (item.salePrice)) * 100) / item.price)}`}% OFF)</span></p>
                </div>
            </div>
            <div className="w-full mx-auto">
                <div className={`flex items-end ${cart.some((i) => i.item_id === item.id) ? "justify-center" : "justify-between"}`}>
                    {
                        !cart.some((i) => i.item_id === item.id) &&
                        <div className='flex flex-col'>
                        <span className='text-xs font-medium'>Select Size:</span>
                        <div className="flex space-x-3 mt-1">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`xl:h-12 2xl:h-12 xl:w-12 2xl:w-12 rounded-xl text-lg font-semibold transition ${selectedSize.some((i) => i === size) ? "bg-[rgb(8,43,61)] text-white scale-[1.15]" : " lg:hover:scale-[1.07] shadow border border-slate-300"
                                        }`}
                                    onClick={() => setSelectedSize([size])}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        </div>
                    }
                    <div className="flex flex-col gap-0.5">
                        {
                            cart.some((i) => i.item_id === item.id) && 
                            <p className='text-xs text-center font-medium'>Item already in Basket</p>
                        }
                        <button
                            className={`rounded-xl bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-[15px] 2xl:text-[16px] font-semibold text-white h-12 lg:hover:scale-[1.03] lg:active:scale-[0.97] duration-200 ${cart.some((i) => i.item_id === item.id) ? "px-28" : "px-10"}`}
                            onClick={(e) => cart.some((i) => i.item_id === item.id) ? navigate("/checkout/cart") : handleAddToCart(e)}
                        >
                            <i className="fi fi-sr-cart-shopping-fast relative top-[3px] text-lg mr-3"></i>
                            {cart.some((i) => i.item_id === item.id) ? "Go to" : "Add to"} Basket<i className="fi fi-br-angle-double-small-right relative top-[3px] ml-3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </DialogBox>
    )
}

export default SizeSelectionPopup
