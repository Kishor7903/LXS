import AddWarehouseButton from '@/components/AddWarehouseButton'
import AdminHeadings from '@/components/AdminHeadings'
import { getAllWarehouses } from '@/firebase/admin';
import { getWarehouses } from '@/store/features/adminSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

let warehouseData = {
    warehouseId: 0,
    warehouseName: "",
    contactName: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    city: "",
    stateId: 0,
    countryId: 0,
    phoneNumber: "",
    email: ""
}

function AdminPickupWarehouse() {
    let [isOpen, setIsOpen] = useState(false);
    let [formData, setFormData] = useState(warehouseData);
    let { warehouses } = useSelector(state => state.admin);
    let dispatch = useDispatch();

    useEffect(() => {
        getAllWarehouses().then((res) => {
            dispatch(getWarehouses(res))
        })
    }, [])

    return (
        <div>
            <AdminHeadings title="Pickup Warehouse" >
                <AddWarehouseButton isOpen={isOpen} setIsOpen={setIsOpen} formData={formData} setFormData={setFormData} warehouseData={warehouseData} />
            </AdminHeadings>

            <div className="bg-white py-5 flex flex-col gap-8 mt-10">
                {
                    warehouses && warehouses.length > 0 ? (
                        warehouses?.map((warehouse, index) => (
                            <div key={index} className="w-[96%] flex justify-between items-center gap-20 mx-auto border rounded px-5 py-3 text-slate-700 bg-gray-50">
                                <div className="grid grid-cols-2 w-[82%]">
                                    <div className="py-2">
                                        <p className="text-[rgb(8,43,61)] leading-5">Warehouse Name : <span className="font-semibold">{warehouse.warehouseName}</span></p>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-[rgb(8,43,61)] leading-5">Warehouse ID : <span className="font-semibold">{warehouse.warehouseId}</span></p>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-[rgb(8,43,61)] leading-5">Seller Name : <span className="font-semibold">{warehouse.contactName}</span></p>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-[rgb(8,43,61)] leading-5">Seller Address 1 : <span className="font-semibold">{warehouse.addressLine1}</span></p>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-[rgb(8,43,61)] leading-5">Seller Phone No. : <span className="font-semibold">{warehouse.phoneNumber}</span></p>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-[rgb(8,43,61)] leading-5">Seller Email : <span className="font-semibold">{warehouse.email}</span></p>
                                    </div>
                                </div>

                                <div className="space-x-5 w-[18%]">
                                    <button onClick={(e) => handleEditProduct(e, product)} className="bg-blue-500 rounded px-4 py-2 text-white hover:bg-blue-600 active:scale-95" >Edit</button>
                                    <button onClick={(e) => handleDeleteProduct(e, product.id)} className="bg-red-500 rounded px-4 py-2 text-white hover:bg-red-600 active:scale-95" >Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-2xl font-semibold opacity-80">No Pickup Warehouses Available ...</div>
                    )
                }
            </div>
        </div>
    )
}

export default AdminPickupWarehouse
