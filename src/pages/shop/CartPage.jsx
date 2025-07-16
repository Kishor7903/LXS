import CheckoutNavigator from "@/components/CheckoutNavigator";
import HoverButton from "@/components/HoverButton";
import KnowMorePopup from "@/components/KnowMorePopup";
import {
    addWishlistItem,
    deleteCartItem,
    handleToggleAll,
    handletoggleSelect,
    productQuantityChange,
    productSizeChange,
} from "@/firebase/auth";
import {
    addToWishlist,
    cartToggleSelect,
    deleteFromCart,
    toggleAllItems,
    updateCartProductQuantity,
    updateCartProductSize,
} from "@/store/features/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import secureIcon from "../../assets/commonIcons/Secure.png";

let options = ["1", "2", "3", "4", "5"];
let sizes = ["S", "M", "L", "XL"];

function CartPage() {
    let [isOpen, setIsOpen] = useState(false);
    let [selectedItems, setSelectedItems] = useState([]);
    let [cartItems, setCartItems] = useState([]);
    let [isSelectedAll, setIsSelectedAll] = useState(false);
    let { cart, wishlist } = useSelector((state) => state.cart);
    let { products } = useSelector((state) => state.admin);
    let { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    let dispatch = useDispatch();

    let totalPrice;
    let discountOnMRP;
    let deliveryPrice;
    let deliveryDiscount;
    let platformFee;

    if (selectedItems) {
        totalPrice = selectedItems?.reduce(
            (sum, cart) => sum + Number(cart.price * cart.quantity),
            0
        );
        discountOnMRP =
            totalPrice -
            selectedItems.reduce(
                (sum, cart) => sum + Number(cart.salePrice * cart.quantity),
                0
            );
        deliveryPrice = 49;
        deliveryDiscount = 49;
        platformFee = 9;
    }

    const handleQuantityChange = (e, item) => {
        e.preventDefault();
        let i = {
            id: item.id,
            quantity: parseInt(e.target.value),
        };

        let updatesSize = [...item.size]
        if (updatesSize.length > parseInt(e.target.value)) {
            updatesSize = updatesSize.slice(0, parseInt(e.target.value));
        }
        let length = updatesSize.length;
        while (length < parseInt(e.target.value)) {
            updatesSize.push("S");
            length += 1;
        }

        productSizeChange(user.id, { id: item.id, size: updatesSize }).then(() => {
            dispatch(updateCartProductSize({ id: item.id, size: updatesSize }));
        });

        productQuantityChange(user.id, i).then(() => {
            dispatch(updateCartProductQuantity(i));
        });
    };

    const handleSizeChange = (e, item, idx) => {
        e.preventDefault();
        let size = [...item.size];
        size[idx] = e.target.value;
        let i = {
            id: item.id,
            size: size,
        };

        productSizeChange(user.id, i).then(() => {
            dispatch(updateCartProductSize(i));
        });
    };

    const deleteItemFromCart = (e, item_id) => {
        e.preventDefault();

        deleteCartItem(user.id, item_id).then(() => {
            dispatch(deleteFromCart(item_id));
        });
    };

    const moveToWishlist = (e, item_id) => {
        e.preventDefault();

        if (user) {
            addWishlistItem(user?.id, item_id).then((res) => {
                dispatch(addToWishlist(res));
            });
        } else {
            toast.error("Please Login First ...");
        }
    };

    const handleSelectAll = (e) => {
        // setIsSelectedAll(e.target.checked)

        handleToggleAll(user.id, e.target.checked).then(() => {
            dispatch(toggleAllItems(e.target.checked));
        });
        if (e.target.checked) {
            setSelectedItems(cartItems);
        } else {
            setSelectedItems([]);
        }
    };

    const handletoggleCartSelect = (e, item_id, value) => {
        e.preventDefault();

        handletoggleSelect(user.id, item_id, value).then(() => {
            dispatch(cartToggleSelect({ item_id, value }));
        });
    };

    const handleProceedToAddress = () => {
        sessionStorage.setItem("cart", JSON.stringify(selectedItems));
        navigate("/checkout/address");
    };

    useEffect(() => {
        let items = cart
            ?.map((item) => {
                let product = products.find((p) => p.id === item.item_id);
                return product
                    ? {
                        ...product,
                        quantity: item.quantity,
                        size: item.size,
                        id: item.id,
                        item_id: item.item_id,
                        productId: item.item_id,
                        isSelected: item.isSelected,
                    }
                    : null;
            })
            .filter((item) => item !== null);

        setCartItems(items);
    }, [cart]);

    useEffect(() => {
        let items = cartItems.filter((item) => item.isSelected === true);
        setSelectedItems(items);
    }, [cartItems]);

    useEffect(() => {
        if (selectedItems.length === cartItems.length) {
            setIsSelectedAll(true);
        } else {
            setIsSelectedAll(false);
        }
    }, [selectedItems]);

    return (
        <div className="w-full h-full py-3 lg:py-8 px-3 lg:px-16 flex gap-10">
            <div className="w-full lg:w-[65%] space-y-3 relative">
                <div className="leading-[1] font-semibold flex justify-between items-center">
                    <span>
                        Cosmic Hub 🚀 <br />
                        <p className="text-xs font-normal">
                            Where all your Goodies floats before you checkout!
                        </p>
                    </span>
                    <span className="text-sm font-semibold flex items-center gap-1">
                        <img src={secureIcon} alt="" className="h-7" /> 100%
                        Secure
                    </span>
                </div>
                <div className="flex lg:min-h-[80vh] flex-col gap-5 rounded-3xl relative py-5 px-4 lg:p-8 shadow-[0px_0px_10px_-2px_rgb(8,43,61)]">
                    <CheckoutNavigator />
                    {cart && cart.length > 0 ? (
                        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-8 ">
                            <div className="w-full lg:w-[60%] space-y-4 relative pb-[34px]">
                                <div className="flex justify-between px-5 text-sm font-medium">
                                    Items Selected ({selectedItems.length}/
                                    {cartItems.length}){" "}
                                    <span className="flex items-center">
                                        <label
                                            htmlFor="check"
                                            className="lg:hover:underline cursor-pointer"
                                        >
                                            {isSelectedAll
                                                ? "Deselect All"
                                                : "Select All"}
                                        </label>{" "}
                                        <input
                                            checked={isSelectedAll}
                                            onChange={handleSelectAll}
                                            id="check"
                                            type="checkbox"
                                            className="ml-2 relative bottom-[1px] cursor-pointer"
                                        />
                                    </span>
                                </div>
                                {cartItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={` border-[rgb(8,43,61)] rounded-xl p-[6px] lg:p-2 flex gap-2 lg:gap-4 relative overflow-hidden cursor-pointer ${item.isSelected
                                            ? "shadow-[0px_0px_10px_-1px_rgb(8,43,61)] scale-100 border-2 bg-slate-200"
                                            : "border-slate-300 border shadow-md lg:hover:scale-[0.97] duration-150 scale-95"
                                            }`}
                                        onClick={(e) =>
                                            handletoggleCartSelect(
                                                e,
                                                item.id,
                                                !item.isSelected
                                            )
                                        }
                                    >
                                        <img
                                            onClick={(e) => {
                                                e.stopPropagation(),
                                                    navigate(
                                                        `/product-details/${item.id}`
                                                    );
                                            }}
                                            src={item.images[0]}
                                            alt=""
                                            className="w-20 rounded border lg:border-2"
                                        />
                                        <div className="leading-[0.7] lg:leading-3 w-[83%]">
                                            <h4 className="text-sm lg:text-base font-bold w-full line-clamp-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-[9px] font-bold mt-1 hidden lg:inline-block lg:text-[11px] relative bottom-1">
                                                Sold By :{" "}
                                                <span className="text-[rgb(240,85,120)]">
                                                    LXS Store
                                                </span>
                                            </p>
                                            <div className="flex gap-3 lg:gap-2 w-full text-[9px] font-medium lg:text-[11px] lg:mt-[1px] ">
                                                <div className="bg-[rgb(8,43,61)] text-white rounded-full pl-1 cursor-pointer mr-3" onClick={(e) =>
                                                    e.stopPropagation()
                                                }>
                                                    <label className="cursor-pointer">
                                                        Qty :
                                                    </label>
                                                    <select
                                                        value={item.quantity}

                                                        onChange={(e) =>
                                                            handleQuantityChange(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                        className="focus:outline-none font-bold rounded-full bg-transparent cursor-pointer"
                                                    >
                                                        {
                                                            options.map((val, i) => (
                                                                <option key={i} value={val} className="text-[rgb(8,43,61)] font-bold">
                                                                    {val}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                {
                                                    Array.from({ length: item.quantity }).map((_, idx) => (
                                                        <div key={idx} className="border border-[rgb(8,43,61)] rounded-full pl-1" onClick={(e) =>
                                                            e.stopPropagation()
                                                        }>
                                                            <label className="cursor-pointer">
                                                                Size{idx + 1}:
                                                            </label>
                                                            <select
                                                                value={item.size[idx]}
                                                                onChange={(e) =>
                                                                    handleSizeChange(
                                                                        e,
                                                                        item,
                                                                        idx
                                                                    )
                                                                }
                                                                className="focus:outline-none font-bold rounded-full bg-transparent cursor-pointer text-[rgb(240,85,120)]"
                                                            >
                                                                {
                                                            sizes.map((val, i) => (
                                                                <option key={i} value={val} className="font-bold">
                                                                    {val}
                                                                </option>
                                                            ))
                                                        }
                                                            </select>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="flex gap-1 lg:gap-2 items-center text-[10px] lg:text-base mt-[2px]">
                                                <p className="text-sm lg:text-lg font-semibold">
                                                    ₹
                                                    {item.salePrice *
                                                        item.quantity}
                                                    <s className="font-medium text-sm opacity-60 ml-2">
                                                        ₹
                                                        {item.price *
                                                            item.quantity}
                                                    </s>
                                                </p>
                                                <p className="font-bold text-sm text-[rgb(240,85,120)]">
                                                    (
                                                    {`${Math.floor(
                                                        ((item.price -
                                                            item.salePrice) *
                                                            100) /
                                                        item.price
                                                    )}`}
                                                    % OFF)
                                                </p>
                                            </div>
                                            <p className="text-[9px] lg:text-[11px] font-semibold">
                                                Delivered by 25 May, 2025
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 lg:bottom-1 right-3 flex gap-3 items-center">
                                            {wishlist.some(
                                                (p) => p.item_id === item.item_id
                                            ) ? (
                                                <span className="text-[9px] lg:text-[11px] font-semibold text-center leading-[1] text-green-600 flex gap-1">
                                                    Added to Favourites{" "}
                                                    <i className="fi fi-rs-check-circle relative top-[1px] text-[9px]"></i>
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation(),
                                                            wishlist.includes(
                                                                item.item_id
                                                            )
                                                                ? null
                                                                : moveToWishlist(
                                                                    e,
                                                                    item.item_id
                                                                );
                                                    }}
                                                    className="text-[9px] lg:text-[11px] font-semibold text-center leading-[1] lg:hover:underline cursor-pointer text-blue-500"
                                                >
                                                    Add to Favourites
                                                </span>
                                            )}
                                            <HoverButton
                                                onClick={(e) => {
                                                    e.stopPropagation(),
                                                        deleteItemFromCart(
                                                            e,
                                                            item.id
                                                        );
                                                }}
                                                className="px-2 py-1 text-[10px] font-semibold"
                                            >
                                                Remove
                                            </HoverButton>
                                        </div>
                                        {item.isSelected && (
                                            <div className="h-10 w-24 bg-[rgb(8,43,61)] absolute -top-3 -right-10 rotate-45 flex justify-center items-end">
                                                <i className="fi fi-br-check text-white relative left-[2px] top-[2px] -rotate-45"></i>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <button
                                    onClick={() =>
                                        navigate("/setting/wishlist")
                                    }
                                    className="w-[95%] relative left-3.5 lg:hover:scale-[1.05] duration-200 h-10 shadow-md border border-slate-300 rounded-xl font-semibold"
                                >
                                    + Add from Favourites
                                </button>
                            </div>
                            <div className="w-full lg:w-[40%]">
                                <div className="leading-3 font-semibold">
                                    <span className="font-bold">
                                        Price Details ({selectedItems.length > 0 ? selectedItems.reduce((sum, i) => { return sum + i.quantity }, 0) : 0}{" "}
                                        Items)
                                    </span>
                                    <span className="flex justify-between mt-2 text-xs">
                                        Total MRP{" "}
                                        <p className="">
                                            ₹
                                            {selectedItems.length > 0
                                                ? totalPrice
                                                : 0}
                                        </p>
                                    </span>
                                    <span className="flex justify-between text-xs">
                                        Delivery{" "}
                                        <p className="">
                                            ₹
                                            {selectedItems.length > 0
                                                ? deliveryPrice
                                                : 0}
                                        </p>
                                    </span>
                                    <span className="flex justify-between text-xs text-[rgb(240,85,120)]">
                                        Discount on MRP{" "}
                                        <p className="">- ₹{discountOnMRP}</p>
                                    </span>
                                    <span className="flex justify-between text-xs text-[rgb(240,85,120)]">
                                        Discount on Delivery{" "}
                                        <p className="">
                                            - ₹
                                            {selectedItems.length > 0
                                                ? deliveryDiscount
                                                : 0}
                                        </p>
                                    </span>
                                    <span className="flex justify-between text-xs">
                                        <p>
                                            Platform Fee{" "}
                                            <Link
                                                onClick={(e) => {
                                                    e.preventDefault(),
                                                        setIsOpen(true);
                                                }}
                                                className="text-[10px] text-blue-500 lg:hover:underline"
                                            >
                                                (Know More)
                                            </Link>
                                        </p>{" "}
                                        <p className="">
                                            ₹
                                            {selectedItems.length > 0
                                                ? platformFee
                                                : 0}
                                        </p>
                                    </span>
                                    <hr className="pb-1 mt-1" />
                                    <span className="flex justify-between mt-1 font-bold text-green-500">
                                        Grand Total{" "}
                                        <p>
                                            ₹
                                            {selectedItems.length > 0
                                                ? totalPrice -
                                                discountOnMRP +
                                                deliveryPrice -
                                                deliveryDiscount +
                                                platformFee
                                                : 0}
                                        </p>
                                    </span>
                                </div>
                                {selectedItems.length > 0 && (
                                    <button
                                        className="w-full h-10 rounded-full bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-lg font-semibold text-white my-2 lg:mt-6 lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)] lg:hover:scale-[1.03] lg:active:scale-[0.97] duration-150"
                                        onClick={handleProceedToAddress}
                                    >
                                        Proceed To Checkout
                                        <i className="fi fi-br-angle-double-small-right relative top-[3px] ml-2"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-xl flex justify-center items-center h-[40vh] flex-col font-semibold">
                            <i className="fi fi-sr-shopping-cart-add text-[50px]  opacity-70"></i>
                            <span className="mt-2  opacity-70">Cart is Empty...</span>
                            <span className="text-xs  opacity-70">
                                Oops! No items have landed in your cart yet.
                            </span>
                            <span className="text-sm mt-5">
                                No Worries:{" "}
                                <Link
                                    to="/products"
                                    className="text-blue-500 lg:hover:underline active:underline"
                                >
                                    Browse Products
                                </Link>
                            </span>
                        </div>
                    )}
                </div>
                <span className="text-[11px] font-medium lg:text-xs absolute bottom-1 lg:bottom-3 right-4 lg:right-5">
                    Need Help?{" "}
                    <Link
                        to="/setting/contact-us"
                        className="text-blue-500 lg:hover:underline font-bold"
                    >
                        Contact Us
                    </Link>
                </span>
            </div>
            <div className="border hidden lg:inline-block w-[35%] h-[85vh] sticky top-20 rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)]"></div>
            <KnowMorePopup setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
    );
}

export default CartPage;
