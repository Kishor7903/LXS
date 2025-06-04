import AdminHeadings from '@/components/AdminHeadings'
import { getWorkWithUsInfo } from '@/firebase/auth'
import { useEffect, useState } from 'react'
import accountIcon from "../../assets/commonIcons/Account.png"

function AdminWorkWithUs() {
    let [workWithUs, setWorkWithUs] = useState([]);

    useEffect(() => {
        getWorkWithUsInfo().then((res) => {
            setWorkWithUs(res);
        })
    }, [])

    return (
        <div>
            <AdminHeadings title="Work With Us" >
                <div className="flex items-center gap-5">
                    <input type="text" className="h-10 w-72 rounded-full border border-[rgb(8,43,61,0.5)] px-4 outline-none" placeholder="Search" />
                    <div className="border border-[rgb(8,43,61,0.5)] text-sm rounded-full p-2 bg-white">
                        <label htmlFor="sort">Sort By: </label>
                        <select className="outline-none font-semibold">
                            <option>Newest First</option>
                            <option>Oldest First</option>
                        </select>
                    </div>
                </div>
            </AdminHeadings>

            <div className="p-8 flex flex-wrap gap-5 bg-white">
                {
                    workWithUs.map((item, index) => (
                        <div key={index} className='flex gap-2 w-full'>
                            <img src={accountIcon} alt="" className='h-10' />
                            <div key={index} className="border border-[rgb(8,43,61)] w-full rounded-xl px-4 pt-2 pb-4 space-y-2 relative">
                                <div className="flex justify-start items-center font-semibold ">
                                    <p className='mr-5'>{item.name}</p>|
                                    <p className='mr-5 ml-5'>{item.email}</p>|
                                    <p className='ml-5'>+91 {item.phone}</p>
                                </div>
                                <p className='font-medium text-sm'>Address: {item.address}</p>
                                <p className='font-medium text-sm'>Description: {item.describe}</p>
                                <p className='font-medium text-sm'>Skills: {item.skill}</p>
                                <span className='absolute bottom-1 right-2 text-xs font-medium opacity-70'>{item.timestamp}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AdminWorkWithUs
