import AdminHeadings from "@/components/AdminHeadings"
import { getNewsletterInfo } from "@/firebase/auth"
import { useEffect, useState } from "react"


function AdminNewsletter() {
    let [newsletter, setNewsletter] = useState([]);

    useEffect(() => {
        getNewsletterInfo().then((res) => {
            setNewsletter(res);
        })
    }, [])

    return (
        <div>
            <AdminHeadings title="Response Deck" >
                <div className="border border-[rgb(8,43,61,0.5)] text-sm rounded-full p-2 bg-white">
                    <label htmlFor="sort">Sort By: </label>
                    <select className="outline-none font-semibold">
                        <option>Newest First</option>
                        <option>Oldest First</option>
                    </select>
                </div>
            </AdminHeadings>

            <div className="p-8 flex flex-wrap gap-5 bg-white">
                {
                    newsletter.map((item, index) => (
                        <div key={index} className="relative w-[49%] border border-[rgb(8,43,61)] h-32 overflow-y-scroll no-scrollbar px-4 py-2 rounded-xl">
                            <p className="font-semibold">{item.email}</p>
                            <span className="text-xs opacity-70 absolute right-2 bottom-1">{item.timestamp}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AdminNewsletter
