import { toast } from 'react-toastify';
import DialogBox from './DialogBox';
import axios from "axios";
import flagIcon from "../assets/commonIcons/Indian Flag (Fill).png"
import { addWarehouse } from '@/firebase/fship';
import { addSellerWarehouse } from '@/firebase/admin';
import { useDispatch } from 'react-redux';
import { addNewWarehouse } from '@/store/features/adminSlice';

function AddWarehouseButton({ isOpen, setIsOpen, formData, setFormData, warehouseData }) {
    let dispatch = useDispatch();

    const handleAddWarehouseButton = (e) => {
        e.preventDefault();

        setIsOpen(true);
    }

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handlePhoneNoChange = (e) => {
        if (e.target.value.length <= 10) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handlePincodeChange = async (e) => {
        if (e.target.value.length <= 6) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        if (e.target.value.length === 6) {
            try {
                const res = await axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`);
                const data = res.data[0];

                if (data.Status === "Success") {
                    setFormData({ ...formData, city: data.PostOffice[0].District, pincode: data.PostOffice[0].Pincode })
                }
            } catch (e) {
                console.log("Fetching Pincode Area Error: ", e.message);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.warehouseName === "" || formData.contactName === "" || formData.addressLine1 === "" || formData.addressLine2 === "" || formData.pincode === "" || formData.city === "" || formData.phoneNumber === "" || formData.email === "") {
            toast.error("All Fields Required!!");
            return;
        }

        addWarehouse(formData).then((res) => {
            if(res.fshipResponse.status){
                let warehouseId = res.fshipResponse.warehouseId;
                addSellerWarehouse({...formData, warehouseId}).then(() => {
                    toast.success(res.fshipResponse.response)
                    setFormData(warehouseData);
                    setIsOpen(false);
                    dispatch(addNewWarehouse({warehouseId, ...formData}))
                })
            } else{
                toast.success(res.fshipResponse.response)
            }
        }).catch((err) => {
            console.log("Error at Adding Warehouse:", err.message);
        })
    }

    return (
        <div className='h-12'>
            <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-[6px] border items-end" onClick={handleAddWarehouseButton}>+ Add New</button>

            <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[40vw] p-6 bg-white rounded-[30px] flex flex-col" parentDivClassName="flex justify-center items-center">
                <h2 className='text-center text-2xl font-semibold'>Add Warehouse</h2>
                <hr className='border-[rgb(8,43,61)]' />
                <form className='flex gap-10 py-2'>
                    <div className="w-full">
                        <div className="w-full">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Warehouse Name<span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" name='warehouseName' value={formData.warehouseName} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                        </div>
                        <div className="w-full">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Contact Name<span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" name='contactName' value={formData.contactName} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                        </div>
                        <div className="w-full">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Address Line 1<span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" name='addressLine1' value={formData.addressLine1} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                        </div>
                        <div className="w-full">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Address Line 2<span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" name='addressLine2' value={formData.addressLine2} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                        </div>

                        <div className="flex space-x-5">
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Pincode<span className="text-red-600">*</span></label>
                                <br />
                                <input type="text" name='pincode' value={formData.pincode} onChange={handlePincodeChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> City<span className="text-red-600">*</span></label>
                                <br />
                                <input type="text" name='city' value={formData.city} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                            </div>
                        </div>
                        <div className="flex space-x-5">
                            <div className="w-1/2 relative">
                                <label className="relative top-2 left-3 pl-1 pr-5 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Phone<span className="text-red-600">*</span> <img src={flagIcon} alt="" className="h-2 absolute top-1 right-0 pr-1" /></label>
                                <br />
                                <input type="number" name='phoneNumber' value={formData.phoneNumber} onChange={handlePhoneNoChange} className="border-[rgb(196,185,185)] border pr-3 pl-12 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                                <p className="font-medium absolute top-[32px] left-2 opacity-50">+91</p>
                                <hr className="border w-7 absolute left-7 opacity-30 top-[44px] rotate-90 border-[rgb(8,43,61)]" />
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Email<span className="text-red-600">*</span></label>
                                <br />
                                <input type="text" name='email' value={formData.email} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                            </div>
                        </div>
                    </div>
                </form>
                <div className='flex justify-center gap-10 mt-7'>
                    <button onClick={() => { setIsOpen(false), setFormData(warehouseData) }} className='bg-slate-800 text-white rounded h-12 px-10' >Cancel</button>
                    <button onClick={handleSubmit} className='bg-blue-600 text-white rounded h-12 px-10' >Add</button>
                </div>
            </DialogBox>

        </div>
    )
}

export default AddWarehouseButton
