import AdminHeadings from '@/components/AdminHeadings';
import HoverButton from '@/components/HoverButton';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function AdminUsers() {
    let [user, setUser] = useState([]);
    let { users } = useSelector(state => state.admin);

    // useEffect(() => {
    //     setUser(() => )
    // }, [users])

    return (
        <div>
            <AdminHeadings title="Users" >
                <div className="border border-[rgb(8,43,61,0.5)] text-sm rounded-full p-2 bg-white">
                    <label htmlFor="sort">Sort By: </label>
                    <select className="outline-none font-semibold">
                        <option>Newest First</option>
                        <option>Oldest First</option>
                    </select>
                </div>
            </AdminHeadings>

            <div className="flex flex-wrap gap-5 mt-5 bg-white">
                {
                    [...users, ...users, ...users, ...users, ...users, ...users,].map((item, index) => (
                        <div key={index} className="p-4 w-[23.6%] min-h-48 border border-slate-300 shadow-md rounded-xl flex flex-col items-center gap-2">
                            <img src={item.profilePic} alt="" className='rounded-full shadow-md h-20' />
                            <span className='font-semibold'>{item.name}</span>
                            <div className='text-center'>
                                <p className='font-medium text-sm'>{item.email}</p>
                                <p className='font-medium text-sm'>+91 {item.phone}</p>
                            </div>
                            <HoverButton className="w-full h-10 rounded-xl border-2 mt-auto font-semibold">Message</HoverButton>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AdminUsers
