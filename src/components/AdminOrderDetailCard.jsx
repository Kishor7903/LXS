import { useState } from "react";

export default function AdminOrderDetailCard() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full mx-auto bg-white shadow-md rounded-lg border">
            {/* Clickable Header for Accordion */}
            <div className="flex justify-between items-center cursor-pointer shadow-sm">
                <div onClick={() => setIsOpen(!isOpen)} className="w-[74%] h-full p-6">
                    <h2 className="text-lg font-semibold">Wed, Aug 13, 2020, 4:34PM</h2>
                    <p className="text-gray-500 text-sm">#ID 3453012</p>
                </div>
                <div className="flex items-center gap-5 w-[26%]" >
                    <select className="border p-2 rounded">
                        <option>Change status</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    <i className={`fi fi-br-angle-small-down h-4 duration-300 ${isOpen ? "-rotate-180" : ""}`}></i>
                </div>
            </div>

            {isOpen && (
                <div className="m-6">
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        {/* Customer Info */}
                        <div>
                            <h3 className="font-semibold">Customer</h3>
                            <p>John Alexander</p>
                            <p>alex@example.com</p>
                            <p>+998 99 22123456</p>
                            <a href="#" className="text-blue-500">View profile</a>
                        </div>

                        {/* Delivery Info */}
                        <div>
                            <h3 className="font-semibold">Deliver to</h3>
                            <p><strong>City:</strong> Tashkent, Uzbekistan</p>
                            <p><strong>Street:</strong> Beruniy 369</p>
                            <p><strong>Address:</strong> Block A, House 123, Floor 2</p>
                            <a href="#" className="text-blue-500">Open map</a>
                        </div>
                    </div>
                    <table className="w-full mt-4 border-t">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="p-2">Product</th>
                                <th className="p-2">Quantity</th>
                                <th className="p-2">Unit Price</th>
                                <th className="p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2 text-blue-500">Supreme helinox chair one</td>
                                <td className="p-2">2</td>
                                <td className="p-2">$43.50</td>
                                <td className="p-2">$87.00</td>
                            </tr>
                            <tr>
                                <td className="p-2 text-blue-500">Gopro hero 7</td>
                                <td className="p-2">1</td>
                                <td className="p-2">$43.50</td>
                                <td className="p-2">$87.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <h3 className="font-semibold">Payment info</h3>
                            <p>💳 Master Card **** **** 4768</p>
                            <p><strong>Business name:</strong> Master Card, inc.</p>
                            <p><strong>Phone:</strong> +1 (800) 555-154-52</p>
                        </div>
                        <div className="text-right">
                            <p><strong>Subtotal:</strong> $973.35</p>
                            <p><strong>Shipping cost:</strong> $10.00</p>
                            <p className="text-xl font-bold">Total: $983.00</p>
                            <span className="bg-green-100 text-green-600 p-1 rounded">Payment made</span>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}
