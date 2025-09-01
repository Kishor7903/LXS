

function AdminHeadings({title, children}) {
  return (
    <div className="flex justify-between items-center my-5">
        <h2 className="text-3xl font-bold">{title}</h2>
        {children}
    </div>
  )
}

export default AdminHeadings
