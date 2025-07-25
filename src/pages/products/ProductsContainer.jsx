import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '@/firebase/admin';
import ProductCard from '@/components/ProductCard';
import DualRangeSlider from '@/components/DualRangeSlider';
import { getProducts } from '@/store/features/adminSlice';

let filter = {
    brand: "All Brands",
    category: "All Categories",
    subCategory: "All Sub Categories",
    price: "",
    discount: "All Discounts",
    sortBy: "New Arrival"
}

let category = ['All Categories', 'Mens', 'Womens', 'Kids'];
let subCategory = ['All Sub Categories', 'T-Shirts', 'Shirts', 'Jeans', 'Sweatshirts', 'Hoddies', 'Shoes', 'Watches', 'Shorts', 'Joggers'];
let brand = ['All Brands', 'LXS Originals', 'HRX', 'Nike', 'Roadster', 'Peter England', 'Fastrack', 'Allen Solley', 'Addidas'];
let discount = ['All Discounts', '0-25', '26-50', '51-70', '71-90'];

function ProductsContainer() {
    let dispatch = useDispatch();
    let [filters, setFilters] = useState(filter);
    let { products } = useSelector(state => state.admin)
    const [product, setProduct] = useState(products);
    const [minValue, setMinValue] = useState(400);
    const [maxValue, setMaxValue] = useState(5000);


    const handleFilterChange = (e) => {
        e.preventDefault();

        setFilters(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleRangeChange = (e) => {
        e.preventDefault();

        setFilters(prev => ({...prev, price: `${minValue}-${maxValue}`}));
    }

    useEffect(() => {
        let filteredProducts = products.filter(item => {
            const matchesBrand = filters.brand !== "All Brands" ? item.brand === filters.brand : true;
            const matchesCategory = filters.category !== "All Categories" ? item.category === filters.category : true;
            const matchesSubCategory = filters.subCategory !== "All Sub Categories" ? item.subCategory === filters.subCategory : true;
            const matchesPrice = filters.price ? item.salePrice <= Number(filters.price.split("-")[1]) && item.salePrice >= Number(filters.price.split("-")[0]) : true;
            const matchedDiscount = filters.discount !== "All Discounts" ? ((item.price-item.salePrice)/item.price)*100 >= parseInt(filters.discount.split("-")[0]) && ((item.price-item.salePrice)/item.price)*100 <= parseInt(filters.discount.split("-")[1]) : true;

            return matchesBrand && matchesCategory && matchesSubCategory && matchesPrice && matchedDiscount;
        }).sort((a, b) => {
            if (filters.sortBy === "all") return;
            if (filters.sortBy === 'low-to-high') return a.salePrice - b.salePrice;
            if (filters.sortBy === 'high-to-low') return b.salePrice - a.salePrice;
            if (filters.sortBy === 'newest') return new Date(b.timestamp) - new Date(a.timestamp);
            return;
        });
        setProduct(filteredProducts);
    }, [filters, setFilters])

    useEffect(() => {
        getAllProducts().then((res) => {
			dispatch(getProducts(res));
		});
    }, []);

    useEffect(() => {
        setProduct(products);
    }, [products])

    return (
        <div className='w-full min-h-96 flex flex-col pt-5 pb-1'>
            <div className="flex flex-col justify-between gap-5 px-5 md:px-8 lg:px-12 xl:px-16">
                <div className="flex justify-between items-center">
                <div className="leading-[1] font-semibold h-10">Supply Station🚀<br />
                    <p className="text-xs font-normal">All drops, ready for deployment — choose your fit, ignite your identity</p>
                </div>
                <div className="flex items-center gap-2 text-xs lg:text-base px-2 py-1 rounded-full tracking-tight shadow-md border border-slate-300">
                        <label htmlFor="sort-by">Price :</label>
                        <DualRangeSlider min={300} max={5000} minValue={minValue} setMinValue={setMinValue} maxValue={maxValue} setMaxValue={setMaxValue} />
                        {
                            <p className='font-medium text-sm w-[160px] py-[2px] text-center'>Min: {minValue} - Max: {maxValue}</p>
                        }
                        <button className='h-7 px-3 text-sm bg-[rgb(8,43,61)] text-white font-medium rounded-full' onClick={handleRangeChange}>Apply</button>
                    </div>
                </div>


                <div className="flex justify-end gap-3">
                    <div className="text-xs lg:text-base px-2 py-1 rounded-full tracking-tight shadow-md border border-slate-300">
                        <label htmlFor="brand">Brand :</label>
                        <select name='brand' value={filters.brand} onChange={handleFilterChange} className='rounded-full focus:outline-none font-semibold bg-white cursor-pointer'>
                            {
                                brand.map((item, idx) => (
                                    <option key={idx} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* <div className="border px-1 lg:px-2 text-xs lg:text-base py-1 border-[rgb(8,43,61)] rounded-full tracking-tight shadow-[0px_0px_10px_-2px_rgb(8,43,61)]">
                    <label htmlFor="sort-by">Size :</label>
                    <select name='sort-by' value={sortByValue} onChange={handleSortOnChange} className='rounded-full focus:outline-none font-semibold bg-white'>
                        <option value="">S</option>
                        <option value="">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>
                    </select>
                </div> */}
                    <div className="text-xs lg:text-base px-2 py-1 rounded-full tracking-tight shadow-md border border-slate-300">
                        <label htmlFor="category">Category :</label>
                        <select name='category' value={filters.category} onChange={handleFilterChange} className='rounded-full focus:outline-none font-semibold bg-white cursor-pointer'>
                        {
                                category.map((item, idx) => (
                                    <option key={idx} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="text-xs lg:text-base px-2 py-1 rounded-full tracking-tight shadow-md border border-slate-300">
                        <label htmlFor="subCategory">Sub Category :</label>
                        <select name='subCategory' value={filters.subCategory} onChange={handleFilterChange} className='rounded-full focus:outline-none font-semibold bg-white cursor-pointer'>
                        {
                                subCategory.map((item, idx) => (
                                    <option key={idx} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="text-xs lg:text-base px-2 py-1 rounded-full tracking-tight shadow-md border border-slate-300">
                        <label htmlFor="category">Discount % :</label>
                        <select name='discount' value={filters.discount} onChange={handleFilterChange} className='rounded-full focus:outline-none font-semibold bg-white cursor-pointer'>
                        {
                                discount.map((item, idx) => (
                                    <option key={idx} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="text-xs lg:text-base px-2 py-1 rounded-full tracking-tight shadow-md border border-slate-300">
                        <label htmlFor="sortBy">Sort By :</label>
                        <select name='sortBy' value={filters.sortBy} onChange={handleFilterChange} className='rounded-full focus:outline-none font-semibold bg-white cursor-pointer'>
                            <option value="all">Popularity</option>
                            <option value="newest">New Arrival</option>
                            <option value="low-to-high">Low-to-High</option>
                            <option value="high-to-low">High-To-Low</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="h-full flex my-1 lg:my-3 px-5 md:px-8 lg:px-12 xl:px-16">
                <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8 py-2 lg:py-1">
                    {
                        product.map((item) => {
                            return (
                                <ProductCard key={item.id} item={item} />
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
