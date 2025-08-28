import Breadcrum from "@/components/Breadcrum";
import starIconStroke from "../../assets/commonIcons/Rewards 2 (Stroke).png"
import starIconFill from "../../assets/commonIcons/Rewards 2 (Fill).png"
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import HoverButton from "@/components/HoverButton";
import { useToast } from "@/components/ToastProvider";
import { addNewReview, getReviewById, updateOrderInfo } from "@/firebase/auth";
import { editProduct, uploadImage } from "@/firebase/admin";
import SizeSelectionPopup from "@/components/SizeSelectionPopup";
import { Link } from "react-router-dom"
import { updateOrder } from "@/store/features/cartSlice";


function ProductReviewPage() {
    const [previews, setPreviews] = useState([null, null, null, null]);
    const [files, setFiles] = useState([null, null, null, null]);
    const [uploadedUrls, setUploadedUrls] = useState([null, null, null, null]);
    let [productRating, setProductRating] = useState(0);
    let [deliveryRating, setDeliveryRating] = useState(0);
    let [sellerRating, setSellerRating] = useState(0);
    let [order, setOrder] = useState(null);
    let [product, setProduct] = useState(null);
    let [open, setOpen] = useState(false);
    let [item, setItem] = useState(null);
    let [reviewData, setReviewData] = useState({ title: "", description: "" });
    let [selectedSize, setSelectedSize] = useState([]);
    let { orders } = useSelector(state => state.cart);
    let { user } = useSelector(state => state.auth);
    let { products } = useSelector(state => state.admin);
    const fileInputs = useRef([]);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let toast = useToast();
    let { orderId, productId } = useParams();


    let items = [
        {
            label: "Your Orders",
            path: "/setting/my-orders"
        },
        {
            label: "Orders Details",
            path: `/orders/order-details/${orderId}`
        },
        {
            label: "Product Reviews",
        },
    ]

    const handleChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value
        })
    }

    const handleReorderButton = (e, item_id) => {
        e.preventDefault();

        let i = products.find((item) => item.id === item_id);
        setItem(i);
        setOpen(true);
    }

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const newPreviews = [...previews];
            const newFiles = [...files];
            newPreviews[index] = URL.createObjectURL(file);
            newFiles[index] = file;
            setPreviews(newPreviews);
            setFiles(newFiles);
        }
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const newPreviews = [...previews];
            const newFiles = [...files];
            newPreviews[index] = URL.createObjectURL(file);
            newFiles[index] = file;
            setPreviews(newPreviews);
            setFiles(newFiles);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const removeImage = (index) => {
        const newPreviews = [...previews];
        const newFiles = [...files];
        const newUrls = [...uploadedUrls];
        newPreviews[index] = null;
        newFiles[index] = null;
        newUrls[index] = null;
        setPreviews(newPreviews);
        setFiles(newFiles);
        setUploadedUrls(newUrls);
        if (fileInputs.current[index]) {
            fileInputs.current[index].value = null;
        }
    };

    const handleBoxClick = (index) => {
        fileInputs.current[index]?.click();
    };

    const handleReviewSubmit = async () => {

        if (reviewData.title === "" || reviewData.description === "" || productRating === 0) {
            toast("Required all fields.");
            return
        }

        let images = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                let response = await uploadImage(files[i], `Reviews`)
                images.push(response ? response : null);
            }
        }

        addNewReview(user.id, product.id, { images, ...reviewData, productRating, user: user.name }).then((id) => {
            let item = products.find((i) => i.id === product.id);
            editProduct(product.id, { avgRating: Number((((item.avgRating * item.totalRating) + productRating) / (item.totalRating + 1)).toFixed(1)), totalRating: item.totalRating + 1 }).then(() => {
                dispatch(updateProduct({ ...item, avgRating: Number((((item.avgRating * item.totalRating) + productRating) / (item.totalRating + 1)).toFixed(1)), totalRating: item.totalRating + 1 }))
            })
            let newInfo = orders.find((i) => i.id === orderId).products.find((i) => i.id === productId)
            let orderProducts = orders.find((i) => i.id === orderId).products.filter((i) => i.id !== productId);
            let updatedOrder = orders.find((i) => i.id === orderId);
            updateOrderInfo(user.id, orderId, { products: [...orderProducts, { ...newInfo, reviewId: id, isReviewed: true }] }).then(() => {
                dispatch(updateOrder({...updatedOrder, products: [...orderProducts, {...newInfo, reviewId: id, isReviewed: true}]}))
            })
            toast("Submited Successfully.")
            navigate(-1)
        })
    }

    useEffect(() => {
        let item = orders.find((i) => i.id === orderId)

        setProduct(() => {
            return item?.products?.find((p) => p.id === productId)
        })
        setOrder(item)
    }, [orderId, orders, productId])

    useEffect(() => {
        let isEditedOrder = orders.find((item) => item.id === orderId)?.products.find((i) => i.id === productId);
        if (isEditedOrder?.isReviewed) {
            getReviewById(isEditedOrder?.reviewId).then((res) => {
                setProductRating(res.productRating);
                setReviewData({title: res.title, description: res.description});
                let images = []
                for(let i=0; i<4; i++){
                    if(res.images[i]){
                        images.push(res.images[i]);
                    }else{
                        images.push(null);
                    }
                }
                setPreviews(images)
            })
        }
    }, [orders])

    return (
        <div className="flex gap-10 h-[calc(100vh-104px)] rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border m-5 px-5 py-5 overflow-hidden">
            <div className="pl-5 w-[65%] relative">
                <Breadcrum items={items} />
                <div className="w-full h-full flex flex-col gap-2 pl-4">
                    <div className="flex justify-between">
                        <div className="leading-[1] font-semibold py-3">Feedback Hub ⭐<br />
                            <p className="text-xs font-normal">Where your insights light the way for fellow travelers.</p>
                        </div>
                        <div className="leading-3 text-right">
                            <p className="font-semibold text-[rgb(253,84,120)]">SELLER</p>
                            <p className="text-xl font-bold">LXS STORE</p>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-y-scroll no-scrollbar w-full h-full">
                        <div className="flex gap-5">
                            <img src={product?.image} alt="" className="w-32 rounded-2xl shadow-md" />
                            <div className="w-[85%] text-xs leading-4 flex flex-col items-start relative">
                                {(() => {
                                    let it = products.find((i) => i.id === productId);
                                    if (it?.isLxsCertified === "Yes") {
                                        return <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] py-0.5 pl-2 pr-4"><img src={lxsLogo} alt="" className="h-4" /> <span className="text-[11px] text-white font-medium">LXS Certified</span></div>
                                    }
                                })()}

                                <h3 className="font-semibold text-xl text-[rgb(8,43,61,0.7)] w-[70%] line-clamp-1">{product?.productName}</h3>
                                <p className="text-sm lg:text-[18px] leading-5 font-semibold">
                                    ₹{product?.unitPrice}
                                    <s className="font-medium text-sm opacity-60 ml-2">
                                        ₹{product?.price}
                                    </s>{" "}
                                    <span className="font-bold text-xs text-[rgb(253,84,120)]">
                                        (
                                        {`${Math.floor(
                                            ((product?.price -
                                                product?.unitPrice) *
                                                100) /
                                            product?.price
                                        )}`}
                                        % OFF)
                                    </span>
                                </p>
                                <h4 className="text-lg font-bold mt-8"><span className="text-[rgb(34,197,94)]">Delivered</span> on {order?.orderUpdates?.find((i) => i.title === "Delivered")?.details[0]?.timestamp}</h4>
                                <div className="flex gap-5 absolute bottom-0 left-0">
                                    <HoverButton className="rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 border border-slate-300 shadow-md px-5 py-2 font-semibold text-[15px] mt-1" onClick={() => navigate(`/product-details/${product?.id}`)}><i className="fi fi-sr-eye relative top-[2px] text-base mr-1"></i>View Product</HoverButton>
                                    <HoverButton className="rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 border border-slate-300 shadow-md px-5 py-2 font-semibold text-[15px] mt-1" onClick={(e) => handleReorderButton(e, productId)}><i className="fi fi-sr-cart-shopping-fast relative top-[2px] text-base mr-1"></i>Buy Again</HoverButton>

                                </div>
                            </div>
                        </div>
                        <div className="w-full h-full flex gap-5 mt-20 relative">
                            <div className="flex flex-wrap gap-x-10 h-[410px] w-[35%]">
                                {previews.map((image, index) => (
                                    <div
                                        key={index}
                                        className="w-28 2xl:w-40 h-28 2xl:h-40  rounded-2xl flex items-center justify-center text-sm text-gray-400 cursor-pointer relative"
                                        onClick={() => handleBoxClick(index)}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragOver={handleDragOver}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={(el) => (fileInputs.current[index] = el)}
                                            onChange={(e) => handleImageChange(e, index)}
                                        />
                                        {image ? (
                                            <>
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-fill rounded-2xl border border-[rgb(196,185,185)]"
                                                />
                                                <button
                                                    className="absolute -top-2 -right-2 bg-[rgb(8,43,61)] text-white text-lg rounded-full w-6 h-6 flex items-center justify-center shadow"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeImage(index);
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </>
                                        ) : (
                                            <div className="h-full w-full rounded-2xl flex flex-col justify-center items-center border-[2px] border-dashed border-[rgb(8,43,61)]">
                                                <i className="fi fi-sr-camera-viewfinder text-[rgb(8,43,61)] text-[60px]"></i>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="w-[65%] flex flex-col gap-3">
                                <div className="flex gap-3 ">
                                    {
                                        [1, 2, 3, 4, 5].map((item, index) => (
                                            <img key={index} src={item <= productRating ? starIconFill : starIconStroke} alt="" className="h-12 cursor-pointer" onClick={() => setProductRating(item)} />
                                        ))
                                    }
                                </div>
                                <input name="title" value={reviewData.title} onChange={handleChange} type="text" className="h-10 w-[95%] rounded-xl border border-slate-300 shadow-md px-3 placeholder:font-medium font-medium text-[15px] outline-none" placeholder="Title" />
                                <textarea name="description" value={reviewData.description} onChange={handleChange} className="h-[40%] w-[95%] rounded-2xl border border-slate-300 shadow-md text-[15px] px-3 py-2 placeholder:font-medium outline-none font-medium" placeholder="Description about the product.."></textarea>
                                <button onClick={handleReviewSubmit} className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] h-12 px-3 rounded-xl text-white text-lg font-semibold w-[95%] mr-10 lg:hover:scale-[1.03] lg:hover:shadow-md duration-200 lg:active:scale-[0.98]">Submit<i className="fi fi-br-angle-double-small-right relative top-[3px] ml-3"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    item &&
                    <SizeSelectionPopup isOpen={open} setIsOpen={setOpen} item={item} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                }
                <span className="text-[11px] font-medium lg:text-xs absolute bottom-0 right-0">
                    Need Help?{" "}
                    <Link
                        to="/setting/contact-us"
                        className="text-blue-500 lg:hover:underline font-bold"
                    >
                        Contact Us
                    </Link>
                </span>
            </div>
            <div className="w-[35%] h-[100%] rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)] border sticky top-[92px]"></div>
        </div>
        // <div className="px-16 py-6 h-[91vh]">
        //     <Breadcrum items={items} />
        //     <div className="w-full h-[95%] pl-4 mt-4 flex gap-10">
        //         <div className="w-7/12">
        //             <h6 className="font-bold tracking-wider">Delivered By LXS Store</h6>
        //             <div className="flex text-xs font-medium relative">
        //                 <p className="mr-7">Ordered On 5 January, 2025</p>
        //             </div>

        //         </div>
        //         <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
        //     </div>
        // </div>
    );
}

export default ProductReviewPage;
