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
import ProductCard from '@/components/ProductCard';

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
                        products.slice(0,5).map((item) => {
                            return (
                                <ProductCard item={item} />
                            )
                        })
                    }
                </div>

            <ViewAllIcon navigate="/products" className="flex md:hidden" />

        </div>
    )
}

export default FeaturedProducts
