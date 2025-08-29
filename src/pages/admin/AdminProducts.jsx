import AddProductButtonAndPopup from "@/components/AddProductButtonAndPopup"
import AdminHeadings from "@/components/AdminHeadings"
import { useToast } from "@/components/ToastProvider";
import { deleteProduct } from "@/firebase/admin";
import { useState } from "react";
import { useSelector } from "react-redux"


let productData = {
    name: "",
    category: "Select",
    subCategory: "Select",
    brand: "Select",
    isLxsCertified: "Select",
    price: "",
    salePrice: "",
    codAvailability: "Select",
    returnAvailability: "Select",
    images: [],
    imagesId: [],
    description: {
        text: "",
        sizeFit: "Select",
        color: "Select",
        material: "Select",
        washCare: "Select",
        sleeveLength: "Select",
        neck: "Select",
        occasion: "Select",
        modalHeight: "",
        modalWearingSize: "Select",
    },
}


function AdminProducts() {
    let [isOpen, setIsOpen] = useState(false);
    let [formData, setFormData] = useState(productData);
    const { products } = useSelector(state => state.admin)
    let [currentEditId, setCurrentEditId] = useState(null);
    const toast = useToast();

    const handleDeleteProduct = (e, id) => {
        e.preventDefault();

        deleteProduct(id).then((res) => {
            if (res) {
                toast("Product Deleted Successfully ...")
            }
            else {
                console.log("Product Delete Error ...");
            }
        })
    }

    const handleEditProduct = (e, product) => {
        e.preventDefault();

        setCurrentEditId(product.id)

        setFormData({
            name: product.name,
            category: product.category,
            subCategory: product.subCategory,
            brand: product.brand,
            isLxsCertified: product.isLxsCertified,
            price: product.price,
            salePrice: product.salePrice,
            codAvailability: product.codAvailability,
            returnAvailability: product.returnAvailability,
            images: product.images,
            imagesId: product.imagesId,
            description: product.description,
        })

        setIsOpen(true);
    }

    return (
        <div>

            <AdminHeadings title="Products" >
                <AddProductButtonAndPopup isOpen={isOpen} setIsOpen={setIsOpen} productData={productData} formData={formData} setFormData={setFormData} currentEditId={currentEditId} setCurrentEditId={setCurrentEditId} />
            </AdminHeadings>

            <div className="bg-white py-5">
                <div className="flex justify-between items-center px-5">
                    <input type="text" className="h-10 w-96 rounded-full border border-[rgb(8,43,61,0.5)] px-4" placeholder="Search Product" />
                    <div className="space-x-5 flex">
                        <div className="border border-[rgb(8,43,61,0.5)] text-sm rounded-full p-2 bg-white">
                            <label htmlFor="sort">Brand: </label>
                            <select className="outline-none font-semibold">
                                <option>LXS</option>
                                <option>Puma</option>
                            </select>
                        </div>
                        <div className="border border-[rgb(8,43,61,0.5)] text-sm rounded-full p-2 bg-white">
                            <label htmlFor="sort">Category: </label>
                            <select className="outline-none font-semibold">
                                <option>Men's</option>
                                <option>Women's</option>
                            </select>
                        </div>
                        <div className="border border-[rgb(8,43,61,0.5)] text-sm rounded-full p-2 bg-white">
                            <label htmlFor="sort">Sort By: </label>
                            <select className="outline-none font-semibold">
                                <option>Newest First</option>
                                <option>Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 mt-10">
                    {
                        products && products.length > 0 ? (
                            products?.map((product, index) => (
                                <div key={index} className="h-28 w-[96%] mx-auto border rounded shadow grid grid-cols-10 justify-center gap-5 px-5 py-3 text-slate-700 font-semibold bg-gray-50">
                                    <div className="h-24 w-full col-span-1 rounded overflow-hidden mr-2 relative bottom-1">
                                        <img src={product.images[0]} alt="" className="h-full w-full object-fill" />
                                    </div>
                                    <div className="py-2 col-span-3 flex flex-col justify-between relative bottom-1">
                                        <p className="font-bold text-[rgb(8,43,61)] text-lg leading-5">{product.name}</p>
                                        <p className="tracking-tighter">Price: <s className="text-slate-500 mx-1 text-sm">₹{product.price}</s> ₹{product.salePrice}</p>
                                    </div>
                                    <div className="py-2 col-span-2 flex flex-col justify-between relative bottom-1">
                                        <p className="">Brand: {product.brand}</p>
                                        <p className="">Category: {product.category}</p>
                                    </div>
                                    <div className="py-2 col-span-2 flex flex-col justify-between relative bottom-1">
                                        
                                    </div>
                                    <div className="space-x-5 col-span-2 flex items-center justify-center relative bottom-1">
                                        <button onClick={(e) => handleEditProduct(e, product)} className="bg-blue-500 rounded px-4 py-2 text-white hover:bg-blue-600 active:scale-95" >Edit</button>
                                        <button onClick={(e) => handleDeleteProduct(e, product.id)} className="bg-red-500 rounded px-4 py-2 text-white hover:bg-red-600 active:scale-95" >Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-2xl font-semibold opacity-80">No Products Available ...</div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default AdminProducts
