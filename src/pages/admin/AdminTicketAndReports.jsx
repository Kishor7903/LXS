import AdminHeadings from '@/components/AdminHeadings'
import { getAllReportAndIssue } from '@/firebase/auth';
import React, { useEffect, useState } from 'react'

function AdminTicketAndReports() {
  let [issues, setIssues] = useState([]);

  useEffect(() => {
    getAllReportAndIssue().then((res) => {
      setIssues(res)
    })
  }, [])

  return (
    <div>
      <AdminHeadings title="Report & Issues" />

      <div className="p-8 flex flex-wrap gap-5 bg-white">
        {
          issues.map((item, index) => (
            <div key={index} className="relative w-full border border-[rgb(8,43,61)] px-4 py-2 rounded-xl flex gap-10">
              <div className="w-2/3">
                <h6 className='text-xl font-semibold mb-2'>Issue: <span className=''>{item.title}</span></h6>
                <p>Date : <span className='font-semibold'>{item.timestamp}</span></p>
                <p>Description: <span className='font-semibold'>{item.description}</span></p>
              </div>
              <div className="flex justify-end gap-1 w-1/3">
                {
                  item.images.map((img, idx) => (
                    img && (
                      <img key={idx} src={img} alt="" className='w-1/4 rounded' />
                    )
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AdminTicketAndReports
