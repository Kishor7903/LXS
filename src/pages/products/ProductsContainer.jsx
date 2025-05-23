import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '@/firebase/admin';
import { useNavigate } from 'react-router-dom';
import heartIcon from "../../assets/commonIcons/Wishlist (Stroke).png"
import heartIcon2 from "../../assets/commonIcons/Wishlist (Fill).png"
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
import { addCartItem, addWishlistItem, deleteWishlistItem, filteredProductItem, sortedProductItems } from '@/firebase/auth';
import { toast } from 'react-toastify';
import { addToCart, addToWishlist, deleteFromWishlist } from '@/store/features/cartSlice';

function ProductsContainer() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [rangeValue, setRangeValue] = useState("")
    let [sortByValue, setSortByValue] = useState("");
    let [filterByGender, setFilterByGender] = useState("");
    let [filterByBrand, setFilterByBrand] = useState("");
    let { products } = useSelector(state => state.admin)
    let { cart, wishlist } = useSelector(state => state.cart);
    let { user } = useSelector(state => state.auth);
    const [product, setProduct] = useState(products);

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

    const handleSortOnChange = (e) => {
        e.preventDefault();

        setSortByValue(e.target.value);

        sortedProductItems(e.target.value).then((res) => {
            setProduct(res)
        })
    }

    const handleRangeApply = (e) => {
        e.preventDefault();

        filteredProductItem(`salePrice_400_${rangeValue}`).then((res) => {
            setProduct(res);
        })
    }

    const handleGenderApply = (e) => {
        e.preventDefault();

        setFilterByGender(e.target.value);


        filteredProductItem(e.target.value).then((res) => {
            setProduct(res);
        })
    }

    const handleBrandApply = (e) => {
        e.preventDefault();

        setFilterByBrand(e.target.value);

        filteredProductItem(e.target.value).then((res) => {
            setProduct(res);
        })
    }

    useEffect(() => {
        setRangeValue("500");
        getAllProducts(dispatch)
    }, []);

    useEffect(() => {
        setProduct(products);
    }, [products])

    return (
        <div className='w-full min-h-96 flex flex-col pt-5 pb-1'>
            <div className="h-14 flex justify-end gap-5 items-center px-5 md:px-8 lg:px-12 xl:px-16">

                <div className="border px-1 lg:px-2 text-xs lg:text-base py-1 border-[rgb(8,43,61)] rounded-full tracking-tight">
                    <label htmlFor="sort-by">Brand :</label>
                    <select name='sort-by' value={filterByBrand} onChange={handleBrandApply} className='rounded-full focus:outline-none font-semibold bg-white'>
                        <option value="brand_Lxs">LXS</option>
                        <option value="brand_Nike">Nike</option>
                        <option value="brand_Puma">Puma</option>
                        <option value="brand_Hrx">HRX</option>
                    </select>
                </div>
                <div className="border px-1 lg:px-2 text-xs lg:text-base py-1 border-[rgb(8,43,61)] rounded-full tracking-tight">
                    <label htmlFor="sort-by">Size :</label>
                    <select name='sort-by' value={sortByValue} onChange={handleSortOnChange} className='rounded-full focus:outline-none font-semibold bg-white'>
                        <option value="">S</option>
                        <option value="">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>
                    </select>
                </div>
                <div className="border px-1 lg:px-2 text-xs lg:text-base py-1 border-[rgb(8,43,61)] rounded-full tracking-tight">
                    <label htmlFor="sort-by">Category :</label>
                    <select name='sort-by' value={filterByGender} onChange={handleGenderApply} className='rounded-full focus:outline-none font-semibold bg-white'>
                        <option value="" disabled>Default</option>
                        <option value="category_Mens">Male</option>
                        <option value="category_Womens">Female</option>
                        <option value="category_Womens">Unisex</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 border px-1 lg:px-2 text-xs lg:text-base py-1 border-[rgb(8,43,61)] rounded-full tracking-tight">
                    <label htmlFor="sort-by">Price :</label>
                    <input type="range" className='text-[rgb(8,43,61)] h-[2px] custom-slider-range z-10' min="500" max="3000" value={rangeValue} onChange={(e) => { e.preventDefault(), setRangeValue(e.target.value) }} />
                    {
                        <p className='font-medium w-[120px]'>(₹400 - ₹{rangeValue})</p>
                    }
                    <button className='h-7 px-3 text-sm bg-[rgb(8,43,61)] text-white font-medium rounded-full' onClick={handleRangeApply}>Apply</button>
                </div>
                <div className="border px-1 lg:px-2 text-xs lg:text-base py-1 border-[rgb(8,43,61)] rounded-full tracking-tight">
                    <label htmlFor="sort-by">Sort By :</label>
                    <select name='sort-by' value={sortByValue} onChange={handleSortOnChange} className='rounded-full focus:outline-none font-semibold bg-white'>
                        <option value="timestamp_asc">Popularity</option>
                        <option value="timestamp_desc">New Arrival</option>
                        <option value="salePrice_asc">Low-to-High</option>
                        <option value="salePrice_desc">High-To-Low</option>
                    </select>
                </div>
            </div>
            <div className="h-full flex my-1 lg:my-3 px-5 md:px-8 lg:px-12 xl:px-16">
                <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8 py-2 lg:py-1">
                    {
                        product.map((item, index) => {
                            return (
                                <div key={index} className="h-[230px] md:h-[270px] lg:h-[300px] xl:h-[330px] w-[100%] rounded-xl md:rounded-[10px] overflow-hidden p-[6px] md:p-2 xl:p-3 cursor-pointer duration-500 border-gray-300 border-[1px] bg-white lg:hover:shadow-[0px_0px_15px_-3px_rgb(8,43,61)] relative shadow-md">
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
                                            <p className='text-[6px] md:text-[8px] lg:text-[9px] xl:text-[10px] text-blue-500 font-semibold'>Brand: LXS</p>
                                            <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] px-3 2xl:pl-2 2xl:pr-3 "><img src={lxsLogo} alt="" className="h-[14px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span></div>
                                        </div>
                                        <p className='text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] h-auto font-semibold text-[rgb(8,43,61)] mt-[2px] leading-[1] lg:leading-[1.1]'>{item.name}</p>
                                        <div className="flex justify-between items-center w-full absolute -bottom-2 bg-transparent">
                                            <p className='text-[14px] md:text-[15px] lg:text-[16px] xl:text-[16px] font-bold'>₹{item.salePrice} <s className='text-slate-400 mr-1 text-[10px] md:text-xs lg:text-[12px] xl:text-[12px]'>₹{item.price}</s><span className='text-red-500 text-[10px] md:text-xs lg-text-[14px] xl:text-[11px] hidden lg:inline-block'>(-{`${Math.floor(((item.price - item.salePrice) * 100) / item.price)}`}%)</span></p>
                                            <div className="flex justify-between items-center gap-2">
                                                {
                                                    cart?.some((p) => p.item_id === item.id) ? (
                                                        <button onClick={() => navigate("/checkout/cart")} className='rounded-3xl text-center px-2 lg:px-3 py-[5px] md:px-[8px] md:py-[7px] text-[9px] md:text-xs lg:text-[13px] xl:text-xs bg-[rgb(8,43,61)] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] text-white font-semibold active:bg-[rgb(227,226,226)] tracking-tighter'>Go to Cart</button>
                                                    )

                                                        :

                                                        (

                                                            <button onClick={(e) => addCart(e, item.id)} className='bg-white rounded-3xl text-center px-2 lg:px-3 py-[5px] md:px-[8px] md:py-[7px] text-[9px] md:text-xs lg:text-[13px] xl:text-xs text-[rgb(8,43,61)] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white font-semibold active:bg-[rgb(227,226,226)] tracking-tighter'>Add to Cart</button>
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
                {/* <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-8 xl:gap-y-8 px-3 lg:px-10 ">
                    {
                        product.map((item, index) => {
                            return (
                                <div key={index} className="h-[230px] md:h-[270px] lg:h-[300px] xl:h-[300px] w-[100%] rounded md:rounded-[10px] overflow-hidden p-[6px] md:p-2 xl:p-3 cursor-pointer duration-500 border-gray-300 border-[1px] bg-white lg:hover:shadow-[0px_0px_15px_-3px_rgb(8,43,61)] relative" >
                                    <div className='w-full h-[70%] md:h-[72%] rounded-sm md:rounded overflow-hidden border relative' onClick={() => navigate(`/product-details/${item.id}`)}>
                                        <img src={item.images[0]} alt="" className='h-full w-full object-fill' />
                                        <div className="h-5 lg:h-6 px-1 lg:px-[5px] bg-[rgb(255,162,0)] absolute top-1 md:top-2 right-1 md:right-2 flex justify-center items-center rounded-full text-[8px] lg:text-xs font-medium text-white">Save {`${Math.floor(((item.price - item.salePrice) * 100) / item.price)}`}%</div>
                                    </div>
                                    <div className="relative h-[25%]">
                                        <p className='text-[6px] md:text-[8px] lg:text-[9px] xl:text-[9px] text-[rgb(44,115,182)] font-semibold'>LIMITED EDITION</p>
                                        <p className='text-[11px] md:text-[13px] lg:text-[14px] xl:text-[14px] h-auto font-bold text-[rgb(8,43,61)] mt-[2px] leading-[1.1]'>{item.name}</p>
                                        <div className="flex justify-between items-center w-full absolute -bottom-2 bg-transparent">
                                            <p className='text-[13px] md:text-[15px] lg:text-[17px] xl:text-[16px] font-semibold'><s className='text-slate-400 mr-1 text-[10px] md:text-xs lg-text-[14px] xl:text-[14px]'>₹{item.price}</s>₹{item.salePrice}</p>
                                            <div className="flex justify-between items-center gap-2">
                                                <div className="" onClick={(e) => addWishlist(e, item.id)}>
                                                    <img
                                                        src={wishlist.includes(item.id) ? heartIcon2 : heartIcon}
                                                        alt=""
                                                        className="h-5"
                                                    />
                                                </div>
                                                {
                                                    cart.some((p) => p.item_id === item.id) ? (
                                                        <button onClick={() => navigate("/checkout/cart")} className='bg-white rounded-3xl text-center px-[9px] py-[5px] md:px-[12px] md:py-[7px] text-[9px] md:text-xs lg:text-[13px] xl:text-sm text-[rgb(8,43,61)] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white font-semibold active:bg-blue-600'>Go to Cart</button>
                                                    )

                                                    :

                                                    (

                                                        <button onClick={(e) => addCart(e, item.id)} className='bg-white rounded-3xl text-center px-[9px] py-[5px] md:px-[12px] md:py-[7px] text-[9px] md:text-xs lg:text-[13px] xl:text-sm text-[rgb(8,43,61)] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white font-semibold active:bg-blue-600'>Add to Cart</button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> */}
            </div>
            <p className='text-gray-400 text-center mt-3 font-medium text-sm mb-2'>End of Products...</p>
        </div>
    )
}

export default ProductsContainer
