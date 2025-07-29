import { useEffect, useState } from "react"
import AddNewAddressButton from "@/components/AddNewAddressButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, setAsDefaultNewAddress } from "@/firebase/auth";
import { deleteAnAddress, updateSetDefault } from "@/store/features/cartSlice";
import HoverButton from "@/components/HoverButton";
import editIcon from "../../assets/commonIcons/Edit (Fill).png"
import editIconActive from "../../assets/commonIcons/Edit White (Fill).png"
import ConfirmationPopp from "@/components/ConfirmationPopp";
import { useToast } from "@/components/ToastProvider";

let addressDetails = {
	name: "",
	phone: "",
	houseNo: "",
	area: "",
	landmark: "",
	city: "",
	state: "",
	pincode: "",
	isDefault: false,
	address_type: ""
}

function ShopSettingSavedAddresses() {
	let [isOpen, setIsOpen] = useState(false);
	let [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
	let [deleteItemId, setDeleteItemId] = useState(null);
	let [formData, setFormData] = useState(addressDetails);
	let [loading, setLoading] = useState(false);
	let { address } = useSelector(state => state.cart);
	let [currentEditId, setCurrentEditId] = useState(null);
	let { user } = useSelector(state => state.auth)
	let dispatch = useDispatch();
	const toast = useToast();

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
			address_type: address.address_type,
			id: address.id,
			isDefault: address.isDefault
		})

		setCurrentEditId(address.id);
		setIsOpen(true);
	}

	const handleDeleteAddress = (e, item_id) => {
		e.preventDefault();

		deleteAddress(user.id, item_id).then(() => {
			dispatch(deleteAnAddress(item_id));
			toast("Address Deleted Successfully...");
		})
	}

	const handleSetDefault = (e, item_id) => {
		e.preventDefault();

		setAsDefaultNewAddress(user.id, item_id).then(() => {
			dispatch(updateSetDefault(item_id));
		})
	}

	const handleAddAddressButton = (e) => {
        e.preventDefault();

        setCurrentEditId(null);
        setFormData(addressDetails);
        setIsOpen(true);
    }

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [])

	return (
		<div className="w-full h-full px-5 flex gap-8 ">
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
							!loading ? (
								<div key={index} className={`flex flex-col gap-2 border border-[rgb(8,43,61)] rounded-xl relative py-3 px-3 overflow-hidden ${item.isDefault ? "bg-slate-200 shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border-2 scale-100" : "scale-95 shadow-md border-slate-300 bg-slate-100"}`}>
									<div className="font-semibold flex gap-1 items-center">
										<span className="bg-[rgb(8,43,61)] text-white rounded py-[1px] flex justify-center items-center select-none px-2 ml-2 text-[10px] font-medium ">{item.address_type}</span>
										<label htmlFor={`address${index}`} className={`rounded-full px-2`}>ADDRESS {index + 1} </label>
										<span onClick={(e) => item.isDefault ? null : handleSetDefault(e, item.id)} className={`${item.isDefault ? "text-[rgb(240,85,120)]" : "text-blue-500 lg:hover:underline cursor-pointer"} text-xs `}>{`${item.isDefault ? "(Default)" : "Set as Default"}`}</span>
									</div>
									<div className="grid grid-rows-3 grid-cols-2 gap-y-2 gap-x-5 w-[90%] text-[11px] ml-2" >
										<div className="flex flex-col leading-3">
											<p>Full Name</p>
											<p className="text-[14px] font-semibold">{item.name}</p>
										</div>
										<div className="flex flex-col leading-3">
											<p>Phone No. </p>
											<p className="text-[14px] font-semibold">{item.phone}</p>
										</div>
										<div className="flex flex-col leading-3">
											<p>House No./Appartment No. </p>
											<p className="text-[14px] font-semibold">{item.houseNo}</p>
										</div>
										<div className="flex flex-col leading-3">
											<p>Village/Street/Area/Locality </p>
											<p className="text-[14px] font-semibold">{item.area}</p>
										</div>
										<div className="flex flex-col leading-3">
											<p>Landmark </p>
											<p className="text-[14px] font-semibold">{item.landmark ? item.landmark : "_"}</p>
										</div>
										<div className="flex flex-col leading-3">
											<p>Pincode </p>
											<p className="text-[14px] font-semibold">{item.pincode}</p>
										</div>
										<div className="flex flex-col leading-3">
											<p>City/Town </p>
											<p className="text-[14px] font-semibold">{item.city}</p>
										</div>
										<div className="flex flex-col leading-3">
											<p>State </p>
											<p className="text-[14px] font-semibold">{item.state}</p>
										</div>
										<div className="absolute bottom-3 right-2 flex flex-col gap-1 justify-center items-center">
											<HoverButton className="px-3 text-sm font-medium" onClick={(e) => handleAddressEditButton(e, item)} icon={editIcon} iconActive={editIconActive} iconClassName="h-4">Edit</HoverButton>
											{
												item.isDefault !== true ? (
													<span className="cursor-pointer lg:hover:underline text-xs text-blue-500 font-semibold right-[22px]" onClick={() => { setConfirmPopupOpen(true), setDeleteItemId(item.id) }}>Delete</span>
												)
													:
													null
											}
										</div>
									</div>
									{
										item.isDefault && (
											<div className="h-10 w-24 bg-[rgb(8,43,61)] absolute -top-3 -right-10 rotate-45 flex justify-center items-end">
												<i className="fi fi-br-check text-white relative left-[2px] top-[2px] -rotate-45"></i>
											</div>
										)
									}
								</div>)
								:
								(<div key={index} className="w-full p-4 rounded-xl border border-gray-300 shadow-sm animate-pulse space-y-4 relative">
									<div className="flex justify-start gap-5 items-center">
										<div className="h-6 w-28 bg-gray-300 rounded-full"></div>
										<div className="h-2 w-24 bg-gray-300 rounded"></div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-3">
											<div className="space-y-1">
												<div className="h-[6px] w-16 bg-gray-300 rounded-md"></div>
												<div className="h-[10px] w-32 bg-gray-300 rounded-md"></div>
											</div>

											<div className="space-y-1">
												<div className="h-[6px] w-16 bg-gray-300 rounded-md"></div>
												<div className="h-[10px] w-32 bg-gray-300 rounded-md"></div>
											</div>

											<div className="space-y-1">
												<div className="h-[6px] w-16 bg-gray-300 rounded-md"></div>
												<div className="h-[10px] w-32 bg-gray-300 rounded-md"></div>
											</div>

											<div className="space-y-1">
												<div className="h-[6px] w-16 bg-gray-300 rounded-md"></div>
												<div className="h-[10px] w-32 bg-gray-300 rounded-md"></div>
											</div>
										</div>

										<div className="space-y-2">
											<div className="space-y-1">
												<div className="h-[6px] w-16 bg-gray-300 rounded-md"></div>
												<div className="h-[10px] w-32 bg-gray-300 rounded-md"></div>
											</div>

											<div className="space-y-1">
												<div className="h-[6px] w-16 bg-gray-300 rounded-md"></div>
												<div className="h-[10px] w-32 bg-gray-300 rounded-md"></div>
											</div>

											<div className="space-y-1">
												<div className="h-[6px] w-16 bg-gray-300 rounded-md"></div>
												<div className="h-[10px] w-32 bg-gray-300 rounded-md"></div>
											</div>

											<div className="space-y-1">
												<div className="h-[6px] w-16 bg-gray-300 rounded-md"></div>
												<div className="h-[10px] w-32 bg-gray-300 rounded-md"></div>
											</div>
										</div>
									</div>

									<div className="flex flex-col justify-end items-center gap-2 absolute right-3 bottom-3">
										<div className="h-7 w-16 bg-gray-300 rounded-full"></div>
										<div className="h-2 w-10 bg-gray-300 rounded-md"></div>
									</div>
								</div>
							)		
						))
					}
					<button onClick={(e) => handleAddAddressButton(e)} className="w-[95%] relative left-3.5 lg:hover:scale-[1.05] duration-200 h-10 shadow-md border border-slate-300 rounded-xl font-semibold">+ Add New Address</button>
				</div>
				<hr className="border-[rgb(8,43,61)] border" />
			</div>
			<div className="border w-1/2 h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
			<ConfirmationPopp isOpen={confirmPopupOpen} setIsOpen={setConfirmPopupOpen} heading="Wait, You're Deleting This Address! 😲" description="Whoa whoa whoaaa! It’s your boy Lupin here.
			You’re about to delete this address — are you sure? Like, really sure?
			If you’re 100% sure, hit confirm. If not, I’ll pretend this never happened 😅" onClick={(e) => { handleDeleteAddress(e, deleteItemId), setConfirmPopupOpen(false) }} />
		</div>
	)
}

export default ShopSettingSavedAddresses
