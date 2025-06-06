import CheckoutNavigator from "@/components/CheckoutNavigator";
import HoverButton from "@/components/HoverButton";
import KnowMorePopup from "@/components/KnowMorePopup";
import { addWishlistItem, deleteCartItem, productQuantityChange, productSizeChange } from "@/firebase/auth";
import { addToWishlist, deleteFromCart, updateCartProductQuantity, updateCartProductSize } from "@/store/features/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import secureIcon from "../../assets/commonIcons/Secure.png"


function CartPage() {
    let [isOpen, setIsOpen] = useState(false);
    let [selectedItems, setSelectedItems] = useState([]);
    let [cartItems, setCartItems] = useState([]);
    let [isSelectedAll, setIsSelectedAll] = useState(false);
    let { cart, wishlist } = useSelector(state => state.cart);
    let { products } = useSelector(state => state.admin);
    let { user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    let dispatch = useDispatch();

    let totalPrice;
    let discountOnMRP;
    let deliveryPrice;
    let deliveryDiscount;
    let platformFee;

    if (selectedItems) {
        totalPrice = selectedItems?.reduce((sum, cart) => sum + Number(cart.price * cart.quantity), 0);
        discountOnMRP = totalPrice - selectedItems.reduce((sum, cart) => sum + Number(cart.salePrice * cart.quantity), 0);
        deliveryPrice = 79;
        deliveryDiscount = 79;
        platformFee = 9;
    }

    const handleQuantityChange = (e, item_id) => {
        e.preventDefault();
        let item = {
            id: item_id,
            quantity: parseInt(e.target.value)
        }

        productQuantityChange(user.id, item).then(() => {
            dispatch(updateCartProductQuantity(item));
        })
    }

    const handleSizeChange = (e, item_id) => {
        e.preventDefault();
        let item = {
            id: item_id,
            size: e.target.value
        }

        productSizeChange(user.id, item).then(() => {
            dispatch(updateCartProductSize(item));
        })
    }

    const deleteItemFromCart = (e, item_id) => {
        e.preventDefault();

        deleteCartItem(user.id, item_id).then(() => {
            dispatch(deleteFromCart(item_id));
        })
    }

    const moveToWishlist = (e, item_id) => {
        e.preventDefault();

        if (user) {
            addWishlistItem(user?.id, item_id).then(() => {
                dispatch(addToWishlist(item_id));
            })
        } else {
            toast.error("Please Login First ...")
        }
    }

    const handleSelectAll = (e) => {
        setIsSelectedAll(e.target.checked)

        if(e.target.checked){
            setSelectedItems(cartItems)
        } else{
            setSelectedItems([])
        }
    }

    useEffect(() => {
        let items = cart?.map(item => {
            let product = products.find(p => p.id === item.item_id);
            return product ? { ...product, quantity: item.quantity, size: item.size, id: item.id, productId: item.item_id } : null;
        }).filter(item => item !== null);

        setCartItems(items);
    }, [cart])

    useEffect(() => {
        let items = cartItems.map(item => {
            let product = selectedItems.find(p => p.id === item.id); 
            return product ? {...product, size: item.size, quantity: item.quantity, productId: item.productId} : null;
        }).filter(item => item !== null);
        setSelectedItems(items)
    }, [cartItems])

    useEffect(() => {
        let items = JSON.parse(localStorage.getItem("cart"))
        if (items == []){
            setSelectedItems(cartItems);
        }
        else{
            setSelectedItems(items)
        }
    }, [])

    useEffect(() => {
        if(selectedItems.length === cartItems.length){
            setIsSelectedAll(true)
        } else{
            setIsSelectedAll(false)
        }
    }, [handleSelectAll])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(selectedItems))
    }, [setSelectedItems, selectedItems])

    return (
        <div className="w-full h-full py-3 lg:py-8 px-3 lg:px-16 flex gap-10">
            <div className="w-full lg:w-[65%] space-y-3 relative">
                <div className="leading-[1] font-semibold flex justify-between items-center">
                    <span>Cosmic Hub 🚀 <br />
                        <p className="text-xs font-normal">Where all your Goodies floats before you checkout!</p></span>
                    <span className="text-sm font-semibold flex items-center gap-1 opacity-50"><img src={secureIcon} alt="" className="h-7" /> 100% Secure</span>
                </div>
                <div className="flex lg:min-h-[80vh] flex-col gap-5 rounded-3xl relative py-5 px-4 lg:p-8 shadow-[0px_0px_10px_-2px_rgb(8,43,61)]">
                    <CheckoutNavigator />
                    {
                        cart && cart.length > 0 ? (
                            <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-8 ">
                                <div className="w-full lg:w-[60%] space-y-4 relative pb-[34px]">
                                    <div className="flex justify-between px-5 text-sm font-medium">Items Selected ({selectedItems.length}/{cartItems.length}) <span className="flex items-center"><label htmlFor="check" className="lg:hover:underline cursor-pointer">{isSelectedAll ? "Deselect All" : "Select All"}</label> <input checked={isSelectedAll} onChange={handleSelectAll} id="check" type="checkbox" className="ml-2 relative bottom-[1px]" /></span></div>
                                    {
                                        cartItems.map((item, index) => (
                                            <div key={index} className={` border-[rgb(8,43,61)] rounded-xl p-[6px] lg:p-2 flex gap-2 lg:gap-4 relative overflow-hidden cursor-pointer ${selectedItems.some(p => p.id === item.id) ? "shadow-[0px_0px_10px_-1px_rgb(8,43,61)] scale-100 border-2 bg-slate-200" : "border scale-95"}`} onClick={() => selectedItems.find(p => p.id === item.id) ? setSelectedItems(selectedItems.filter(i => i.id !== item.id)) : setSelectedItems([...selectedItems, item])}>
                                                <img onClick={(e) => { e.stopPropagation(), navigate(`/product-details/${item.id}`) }} src={item.images[0]} alt="" className="w-24 rounded border lg:border-2" />
                                                <div className="leading-[0.7] lg:leading-3">
                                                    <h4 className="text-sm lg:text-base font-bold w-full line-clamp-1">{item.name}</h4>
                                                    <span className="text-[9px] hidden lg:inline-block lg:text-[11px] relative bottom-1">Sold By : LXS Store</span>
                                                    <div className="flex gap-3 lg:gap-4 text-[9px] font-medium lg:text-[12px] lg:mt-[1px]">
                                                        <div className="border border-[rgb(8,43,61)] rounded-full pl-1">
                                                            <label className="cursor-pointer">Size:</label>
                                                            <select value={item.size} onClick={(e) => e.stopPropagation()} onChange={(e) => handleSizeChange(e, item.id)} className="focus:outline-none font-bold rounded-full bg-transparent cursor-pointer">
                                                                <option value="S">S</option>
                                                                <option value="M">M</option>
                                                                <option value="L">L</option>
                                                                <option value="XL">XL</option>
                                                            </select>
                                                        </div>
                                                        <div className="border border-[rgb(8,43,61)] rounded-full pl-1 cursor-pointer">
                                                            <label className="cursor-pointer">Qty :</label>
                                                            <select value={item.quantity} onClick={(e) => e.stopPropagation()} onChange={(e) => handleQuantityChange(e, item.id)} className="focus:outline-none font-bold rounded-full bg-transparent cursor-pointer">
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1 lg:gap-2 items-center text-[10px] lg:text-base mt-[2px]"><p className="text-sm lg:text-lg font-semibold">₹{item.salePrice * item.quantity}<s className="font-medium text-sm opacity-60 ml-2">₹{item.price * item.quantity}</s></p><p className="font-semibold text-sm text-red-500">({`${Math.floor(((item.price - (item.salePrice)) * 100) / item.price)}`}% OFF)</p></div>
                                                    <p className="text-[9px] lg:text-[11px] font-medium">Delivered by 25 May, 2025</p>
                                                </div>
                                                <div className="absolute bottom-2 lg:bottom-5 right-5 flex flex-col gap-1 items-center lg:items-end w-12 lg:w-28">
                                                    <HoverButton onClick={(e) => {e.stopPropagation(), deleteItemFromCart(e, item.id)}} className="px-2 py-1 text-[10px] font-semibold">Remove</HoverButton>
                                                    {
                                                        wishlist.some((p) => p === item.id) ? (
                                                            <span className='text-[9px] mt-1 lg:text-[11px] font-medium text-center leading-[1] text-gray-500'>Added to Wishlist <i className="fi fi-rs-check-circle relative top-[1px] text-[9px]"></i></span>
                                                        ) : (
                                                            <span onClick={(e) => {e.stopPropagation(), wishlist.includes(item.id) ? null : moveToWishlist(e, item.id)}} className='text-[9px] mt-1 lg:text-[11px] font-medium text-center leading-[1] lg:hover:underline cursor-pointer text-blue-500'>Add to Wishlist</span>
                                                        )
                                                    }
                                                </div>
                                                {
                                                    selectedItems.some(p => p.id === item.id) && (
                                                        <div className="h-10 w-24 bg-[rgb(8,43,61)] absolute -top-3 -right-10 rotate-45 flex justify-center items-end">
                                                            <i className="fi fi-br-check text-white relative left-[2px] top-[2px] -rotate-45"></i>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                    <HoverButton onClick={() => navigate("/products")} className="absolute -bottom-2 px-3 py-[2px] right-0 text-sm">+ Add More...</HoverButton>
                                </div>
                                <div className="w-full lg:w-[40%]">
                                    {/* <div className="w-full flex gap-2 text-sm">
                                        <input type="text" className="h-7 text-xs text:base focus:outline-none w-[80%] rounded-full border border-[rgb(8,43,61,0.8)] px-3 font-semibold" placeholder="Apply Coupons" />
                                        <button className="font-semibold w-[20%] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white rounded-full ">Apply</button>
                                    </div> */}
                                    <div className="leading-3 font-semibold">
                                        <span className="font-bold">Price Details ({cart.length} Items)</span>
                                        <span className="flex justify-between mt-2 text-xs">Total MRP <p className="">₹{ selectedItems.length > 0 ? totalPrice : 0}</p></span>
                                        <span className="flex justify-between text-xs">Delivery <p className="">₹{selectedItems.length > 0 ? deliveryPrice : 0}</p></span>
                                        <span className="flex justify-between text-xs">Discount on MRP <p className=" text-red-500">- ₹{discountOnMRP}</p></span>
                                        <span className="flex justify-between text-xs">Discount on Delivery <p className=" text-red-500">- ₹{selectedItems.length > 0 ? deliveryDiscount : 0}</p></span>
                                        <span className="flex justify-between text-xs"><p>Platform Fee <Link onClick={(e) => { e.preventDefault(), setIsOpen(true) }} className="text-[10px] text-blue-500 lg:hover:underline">(Know More)</Link></p> <p className="">₹{selectedItems.length > 0 ? platformFee : 0}</p></span>
                                        <hr className="pb-1 mt-1" />
                                        <span className="flex justify-between mt-1 font-bold text-green-500">Grand Total <p>₹{ selectedItems.length > 0 ? (totalPrice - discountOnMRP + deliveryPrice - deliveryDiscount + platformFee) : 0}</p></span>
                                    </div>
                                    {
                                        selectedItems.length > 0 && (
                                            <button className="w-full h-10 rounded-full bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-lg font-semibold text-white my-2 lg:mt-6 lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]" onClick={() => navigate("/checkout/address")}>Proceed To Address</button>
                                        )
                                    }
                                    
                                </div>
                            </div>

                        )

                            :

                            (
                                <div className="text-xl opacity-70 flex justify-center items-center h-[40vh] flex-col font-semibold"><i className="fi fi-sr-shopping-cart-add text-[50px]"></i><span className="mt-2">Cart is Empty...</span><span className="text-xs">Oops! No items have landed in your cart yet.</span>
                                <span className="text-sm mt-5">No Worries: <Link to="/products" className="text-blue-500 lg:hover:underline active:underline">Browse Products</Link></span>
                                </div>
                            )
                    }
                </div>
                <span className="text-[11px] font-medium lg:text-xs absolute bottom-1 lg:bottom-3 right-4 lg:right-5">Need Help? <Link to="/setting/contact-us" className="text-blue-500 lg:hover:underline font-bold">Contact Us</Link></span>
            </div>
            <div className="border hidden lg:inline-block w-[35%] h-[85vh] sticky top-20 rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)]"></div>
            <KnowMorePopup setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
    )
}

export default CartPage
