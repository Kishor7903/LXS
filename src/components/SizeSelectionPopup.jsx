import DialogBox from './DialogBox'
import lxsLogo from "../assets/commonIcons/LXS Certified Logo.png"
import { addCartItem } from '@/firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/features/cartSlice';
import { toast } from 'react-toastify';

let sizes = ["S", "M", "L", "XL"];

function SizeSelectionPopup({ isOpen, setIsOpen, item, selectedSize, setSelectedSize }) {
    let { user } = useSelector(state => state.auth);
    let dispatch = useDispatch();

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
        toast.success("Product added to cart..")
    }

    return (
        <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[30vw] bg-white rounded-xl flex flex-col overflow-hidden" parentDivClassName="flex justify-center items-center ">
            <h2 className="text-center text-xl font-bold border-b border-[rgb(8,43,61,0.4)] p-4 flex gap-1 justify-center items-center bg-slate-100 ">
                Size Selection
            </h2>
            <div className="flex gap-2 items-center p-[6px] border border-slate-300 rounded-xl w-[90%] mx-auto py-2 my-3 shadow-md ">
                <div className="h-full rounded-[6px] overflow-hidden flex-shrink-0 mr-1" >
                    <img
                        src={item.images[0]}
                        className="h-24 w-full object-fill rounded border"
                    />
                </div>
                <div className="w-[70%] leading-4 ">
                    <div className="flex gap-2 items-center">
                        <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[100px] px-2 py-[1px]"><img src={lxsLogo} alt="" className="h-[12px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span>
                        </div>
                        <span className="opacity-50 mr-3 font-semibold tracking-tight text-xs">APPAREL & FASHION</span>
                    </div>
                    <h2 className="text-lg font-semibold line-clamp-1">{item.name}</h2>
                    <p className='text-[12px] font-medium'>Brand: {item.brand}</p>
                    <p className="text-sm lg:text-lg font-semibold">₹{item.salePrice}<s className="font-medium text-sm opacity-60 ml-2">₹{item.price}</s> <span className="font-semibold text-xs text-red-500">({`${Math.floor(((item.price - (item.salePrice)) * 100) / item.price)}`}% OFF)</span></p>
                </div>
            </div>
            <div className="w-[90%] mx-auto mb-5">
                <span className='text-xs font-medium'>Select Size:</span>
                <div className="flex justify-between items-end">
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
                    <button
                        className="rounded-full bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-sm 2xl:text-base font-semibold text-white px-5 py-3 lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)] lg:hover:scale-[1.03] lg:active:scale-[0.97] duration-150"
                        onClick={handleAddToCart}
                    >
                        <i className="fi fi-sr-cart-shopping-fast relative top-1 text-lg mr-2"></i>
                        Add to Basket
                        <i className="fi fi-br-angle-double-small-right relative top-[3px] ml-2"></i>
                    </button>
                </div>
            </div>
        </DialogBox>
    )
}

export default SizeSelectionPopup
