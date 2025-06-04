import AdminHeadings from "@/components/AdminHeadings"
import AdminOrderDetailCard from "@/components/AdminOrderDetailCard"


function AdminOrders() {
  return (
    <div>
      <AdminHeadings title="Orders" />
      <div className="bg-white p-5 flex flex-col gap-7">
      <div className="flex justify-between items-center">
        <input type="text" className="h-10 w-72 rounded-full border border-[rgb(8,43,61,0.5)] px-4" placeholder="Search order" />
        <div className="space-x-5">
          <select className="border border-[rgb(8,43,61,0.5)] rounded-[6px] px-1 py-2">
            <option>Change Status</option>
          </select>
        </div>
      </div>
        <AdminOrderDetailCard />
        <AdminOrderDetailCard />
      </div>
    </div>
  )
}

export default AdminOrders
