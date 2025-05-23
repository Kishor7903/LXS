import { useState } from "react"
import AddNewAddressButton from "@/components/AddNewAddressButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, setAsDefaultNewAddress } from "@/firebase/auth";
import { updateAddress } from "@/store/features/cartSlice";
import { toast } from "react-toastify";
import HoverButton from "@/components/HoverButton";
import editIcon from "../../assets/commonIcons/Edit (Fill).png"
import editIconActive from "../../assets/commonIcons/Edit White (Fill).png"

let addressDetails = {
	name: "",
	phone: "",
	houseNo: "",
	area: "",
	landmark: "",
	city: "",
	state: "",
	pincode: "",
	isDefault: false
}

function ShopSettingSavedAddresses() {
	let [isOpen, setIsOpen] = useState(false);
	let [formData, setFormData] = useState(addressDetails);
	let { address } = useSelector(state => state.cart);
	let [currentEditId, setCurrentEditId] = useState(null);
	let { user } = useSelector(state => state.auth)
	let dispatch = useDispatch();

	const handleAddressEditButton = (e, address) => {
		e.preventDefault();

		setFormData({
			name: address.name,
			phone: address.phone,
			area: address.area,
			houseNo: address.houseNo,
			landmark: address.landmark,
			pincode: address.pincode,
			city: address.city,
			state: address.state,
			id: address.id,
			isDefault: address.isDefault
		})

		setCurrentEditId(address.id);
		setIsOpen(true);
	}

	const handleDeleteAddress = (e, item_id) => {
		e.preventDefault();

		deleteAddress(user?.uid, item_id).then((res) => {
			dispatch(updateAddress(res));
			toast.success("Address Deleted Successfully...");
		})
	}

	const handleSetDefault = (e, item_id) => {
		e.preventDefault();

		setAsDefaultNewAddress(user.uid, item_id).then((res) => {
			dispatch(updateAddress(res));
		})
	}

	return (
		<div className="w-full h-full px-5 flex gap-5 ">
			<div className="w-1/2 flex flex-col justify-between">
				<div className="leading-[1] font-semibold flex justify-between border-b-2 border-[rgb(8,43,61)] h-10">
					<span>Headquarters Coordinates 🚁<br />
						<p className="text-xs font-normal">Your Secret Location where your supplies get deliver!</p>
					</span>
					<AddNewAddressButton isOpen={isOpen} setIsOpen={setIsOpen} currentEditId={currentEditId} setCurrentEditId={setCurrentEditId} formData={formData} setFormData={setFormData} addressDetails={addressDetails} />
				</div>
				<div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
					{
						address?.map((item, index) => (
							<div key={index} className={`flex flex-col gap-2 border border-[rgb(8,43,61)] rounded-xl relative py-3 px-5 overflow-hidden ${item.isDefault ? "bg-slate-200 shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border-2 scale-100" : "scale-95"}`}>
								<div className="font-semibold flex gap-1 items-center">
									<label htmlFor={`address${index}`} className={`rounded-full px-4 ${item.isDefault ? "bg-[rgb(8,43,61)] text-white" : "border border-[rgb(8,43,61)]"}`}>ADDRESS {index + 1} </label>
									<span onClick={(e) => item.isDefault ? null : handleSetDefault(e, item.id)} className={`ml-2 ${item.isDefault ? "text-[rgb(240,85,120)]" : "text-blue-500 lg:hover:underline cursor-pointer"} text-xs `}>{`${item.isDefault ? "(Default)" : "Set as Default"}`}</span>
								</div>
								<div className="grid grid-rows-3 grid-cols-2 gap-y-2 gap-x-5 w-[90%]" >
									<p className="text-[11px] leading-[1]">Name <br /> <span className="text-[14px] font-semibold">{item.name}</span></p>
									<p className="text-[11px] leading-[1]">Phone No. <br /> <span className="text-[14px] font-semibold">{item.phone}</span></p>
									<p className="text-[11px] leading-[1]">House No., Building No. <br /> <span className="text-[14px] font-semibold">{item.houseNo}</span></p>
									<p className="text-[11px] leading-[1]">Village/Area Name <br /> <span className="text-[14px] font-semibold line-clamp-1">{item.area}</span></p>
									<p className="text-[11px] leading-[1]">Landmark <br /> <span className="text-[14px] font-semibold">{item.landmark ? item.landmark : "_"}</span></p>
									<p className="text-[11px] leading-[1]">Pincode <br /> <span className="text-[14px] font-semibold">{item.pincode}</span></p>
									<p className="text-[11px] leading-[1]">City <br /> <span className="text-[14px] font-semibold">{item.city}</span></p>
									<p className="text-[11px] leading-[1]">State <br /> <span className="text-[14px] font-semibold">{item.state}</span></p>
									<div className="absolute bottom-3 right-2 flex flex-col gap-1 justify-center items-center">
										<HoverButton className="px-3 text-sm font-medium" onClick={(e) => handleAddressEditButton(e, item)} icon={editIcon} iconActive={editIconActive} iconClassName="h-4">Edit</HoverButton>
										<span className="cursor-pointer lg:hover:underline text-xs text-blue-500 font-semibold right-[22px]" onClick={(e) => handleDeleteAddress(e, item.id)}>Delete</span>
									</div>
								</div>
								{
									item.isDefault && (
										<div className="h-10 w-24 bg-[rgb(8,43,61)] absolute -top-3 -right-10 rotate-45 flex justify-center items-end">
											<i className="fi fi-br-check text-white relative left-[2px] top-[2px] -rotate-45"></i>
										</div>
									)
								}
							</div>
						))
					}
				</div>
				<hr className="border-[rgb(8,43,61)] border" />
			</div>
			<div className="border w-1/2 h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
		</div>
	)
}

export default ShopSettingSavedAddresses
