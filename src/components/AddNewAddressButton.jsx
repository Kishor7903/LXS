import DialogBox from './DialogBox';
import { addNewAddress, editAnAddress } from '@/firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, editAddress } from '@/store/features/cartSlice';
import addAddressIcon from "../assets/commonIcons/Address House (Fill).png"
import flagIcon from "../assets/commonIcons/Indian Flag (Fill).png"
import axios from 'axios';
import { useToast } from './ToastProvider';

const indianStates = [
    "Select", "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function AddNewAddressButton({ isOpen, setIsOpen, currentEditId = null, formData, setFormData, addressDetails }) {
    let { user } = useSelector(state => state.auth);
    let { address } = useSelector(state => state.cart);
    let dispatch = useDispatch();
    const toast = useToast();

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneNoChange = (e) => {
        if (e.target.value.length <= 10) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.houseNo || !formData.area || !formData.city || !formData.state || !formData.pincode || !formData.address_type) {
            toast("Required All Fields !!")
            return
        }

        if (formData.phone.length !== 10) {
            toast("Enter a Valid Phone No !!");
            return
        }

        if (formData.pincode < 100000 && formData.pincode > 1000000) {
            toast("Enter a Valid Pincode");
            return
        }

        if (address.length === 0) {
            formData.isDefault = true;
        }

        addNewAddress(user.id, formData).then((res) => {
            dispatch(addAddress(res));
            toast("New Address Added Successfully ...");
        })
        setIsOpen(false);
        setFormData(addressDetails);
    }

    const handleEditProductSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.houseNo || !formData.area || !formData.city || !formData.state || !formData.pincode) {
            toast("Required All Fields with * !!")
            return
        }

        if (formData.phone.length !== 10) {
            toast("Enter a Valid Phone No !!");
            return
        }

        if (formData.pincode < 100000 && formData.pincode > 1000000) {
            toast("Enter a Valid Pincode");
            return
        }

        editAnAddress(user.id, formData, currentEditId).then(() => {
            dispatch(editAddress(formData));
            toast("Address Edited Successfully...")
        })

        setFormData(addressDetails);
        setIsOpen(false);
    }

    const handleCancelButton = (e) => {
        e.preventDefault();

        setIsOpen(false);
        setFormData(addressDetails);
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
                    setFormData({ ...formData, city: data.PostOffice[0].District, pincode: data.PostOffice[0].Pincode, state: data.PostOffice[0].State })
                }
            } catch (e) {
                console.log("Fetching Pincode Area Error: ", e.message);
            }
        }
    };


    return (
        <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[550px] p-6 bg-white rounded-xl flex flex-col" parentDivClassName="flex justify-center items-center">
            <h2 className='text-center text-xl font-semibold flex gap-1 justify-center items-center'>{currentEditId === null ? "Add New Address" : "Edit Address"} <img src={addAddressIcon} alt="" className='h-6' /></h2>
            <form autoComplete='off'>
                <div className="">
                    <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Name<span className="text-red-600">*</span></label>
                    <br />
                    <input type="text" name='name' value={formData.name} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                </div>
                <div className="">
                    <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> House No., Building Name<span className="text-red-600">*</span></label>
                    <br />
                    <input type="text" name='houseNo' value={formData.houseNo} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                </div>
                <div className="">
                    <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Road Name, Area, Colony<span className="text-red-600">*</span></label>
                    <br />
                    <input type="text" name='area' value={formData.area} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                </div>
                <div className="">
                    <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Landmark </label>
                    <br />
                    <input type="text" name='landmark' value={formData.landmark} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                </div>
                <div className="flex space-x-5">
                    <div className="w-1/2 relative">
                        <label className="relative top-2 left-3 pl-1 pr-5 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Phone<span className="text-red-600">*</span> <img src={flagIcon} alt="" className="h-2 absolute top-1 right-0 pr-1" /></label>
                        <br />
                        <input type="number" name='phone' value={formData.phone} onChange={handlePhoneNoChange} className="border-[rgb(196,185,185)] border pr-3 pl-12 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                        <p className="font-semibold absolute top-[30px] left-[8px]">+91</p>
                        <hr className="border w-7 absolute left-[28px] opacity-30 top-[38px] rotate-90 border-[rgb(8,43,61)]" />
                    </div>
                    <div className="w-1/2">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Pincode<span className="text-red-600">*</span></label>
                        <br />
                        <input type="number" name='pincode' value={formData.pincode} onChange={handlePincodeChange} onWheel={(e) => e.target.blur()} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                    </div>
                </div>
                <div className="flex space-x-5">
                    <div className="w-1/2">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> City<span className="text-red-600">*</span></label>
                        <br />
                        <input type="text" name='city' value={formData.city} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                    </div>
                    <div className="w-1/2">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> State<span className="text-red-600">*</span></label>
                        <br />
                        <select name='state' className='border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none' value={formData.state} onChange={handleChange}>
                            {
                                indianStates.map((state, index) => (
                                    <option key={index} selected={index === 0} disabled={index === 0} value={index === 0 ? "" : state}>{state}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 pt-4">
                    <button onClick={handleChange} name='address_type' value="Home" className={`px-3 py-2 border-[rgb(196,185,185)] border rounded-xl ${formData.address_type === "Home" ? "bg-[rgb(8,43,61)] text-white" : "bg-white"}`}>Home</button>
                    <button onClick={handleChange} name='address_type' value="Office" className={`px-3 py-2 border-[rgb(196,185,185)] border rounded-xl ${formData.address_type === "Office" ? "bg-[rgb(8,43,61)] text-white" : "bg-white"}`}>Office</button>
                    <button onClick={handleChange} name='address_type' value="Others" className={`px-3 py-2 border-[rgb(196,185,185)] border rounded-xl ${formData.address_type === "Others" ? "bg-[rgb(8,43,61)] text-white" : "bg-white"}`}>Others</button>
                </div>
            </form>
            <div className='flex justify-center gap-6 mt-5'>
                <button className='border-2 font-semibold border-[rgb(8,43,61)] h-10 w-28 rounded-full lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white' onClick={handleCancelButton} >Cancel</button>
                <button className='h-10 w-28 rounded-full font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-white lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]' onClick={currentEditId === null ? handleSubmit : handleEditProductSubmit} >{currentEditId === null ? "Add" : "Apply"}</button>
            </div>
        </DialogBox>
    )
}

export default AddNewAddressButton
