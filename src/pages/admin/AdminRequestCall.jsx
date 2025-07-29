import AdminHeadings from '@/components/AdminHeadings';
import { useToast } from '@/components/ToastProvider';
import { getAllTalkToAgents, getUserInfo, removeUserFromTalkToAgents } from '@/firebase/auth'
import { useEffect, useState } from 'react'

function AdminRequestCall() {
  let [users, setUsers] = useState([]);
  const toast = useToast();

  const handleRemoveUser = (e, user_id) => {
    e.preventDefault();

    removeUserFromTalkToAgents(user_id).then(() => {
      toast("User Removed...");
    })
  }

  useEffect(() => {
    getAllTalkToAgents().then(async(res) => {
      const userInfoPromises = res.map(user => getUserInfo(user.user_id));
      const usersInfo = await Promise.all(userInfoPromises);
      setUsers(usersInfo)
    })
  }, [handleRemoveUser])

  return (
    <div>
      <AdminHeadings title="Talk to an Agent" />

      <div className="p-8 flex flex-wrap gap-5 bg-white">
        {
          users.map((item, index) => (
            <div key={index} className="relative w-[49%] border border-[rgb(8,43,61)] h-10 px-4 py-2 rounded-xl flex gap-10">
              <p className="font-semibold">{item.name}</p>
              <p className="font-semibold">{item.phone}</p>
              <button onClick={(e) => handleRemoveUser(e, item.uid)} className='absolute right-3 top-[6px] px-2 border rounded lg:hover:bg-slate-200'>X</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AdminRequestCall
