import AddNewBlogPopup from '@/components/AddNewBlogPopup'
import AdminHeadings from '@/components/AdminHeadings'
import { deleteBlog, deleteImage } from '@/firebase/admin';
import { deleteABlog } from '@/store/features/adminSlice';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

let data = {
    heading: '',
    intro: '',
    sections: [
        {
            title: '',
            items: [
                {type: "subtitle", content: ''},
                {type: "description", content: ''},
                {type: "bullets", content: [""], heading: ""},
            ]
        },
    ],
}

function AdminBlogs() {
    let [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState(data);
    let [currentEditId, setCurrentEditId] = useState(null);
    let { blogs } = useSelector(state => state.admin);
    let dispatch = useDispatch();

    const handleEditButton = (e, item_id) => {
        e.preventDefault();

        let blog = blogs.find((i) => i.id === item_id);
        setForm({
            heading: blog.heading,
            intro: blog.intro,
            sections: blog.sections,
            img_url: blog.img_url,
            timestamp: blog.timestamp
        });
        setCurrentEditId(item_id)
        setIsOpen(true)
    }

    const handleDeleteButton = (e, item) => {
        e.preventDefault();
        console.log(item);

        deleteBlog(item).then(async () => {
            deleteImage(item.img_url).then(() => {
                dispatch(deleteABlog(item))
            })
        })
    }

    return (
        <div>
            <AdminHeadings title="Blogs" >
                <AddNewBlogPopup isOpen={isOpen} setIsOpen={setIsOpen} data={data} form={form} setForm={setForm} currentEditId={currentEditId} setCurrentEditId={setCurrentEditId} />
            </AdminHeadings>
            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5 lg:gap-x-6 lg:gap-y-6">
                {
                    blogs.map((item, index) => {
                        return (
                            <div key={index} className="h-[200px] md:h-[240px] lg:h-[300px] xl:h-[390px] w-[100%] rounded md:rounded-[10px] overflow-hidden duration-200 border-slate-300 border-[1px] shadow-lg pb-3">
                                <div className='w-full h-[50%] md:h-[55%] rounded-sm md:rounded overflow-hidden border-b'>
                                    <img src={item.img_url} alt="" className='h-full w-full object-fill' />
                                </div>
                                <div className="relative h-[50%] md:h-[45%] px-2 lg:px-5 py-[2px] flex flex-col justify-between">
                                    <div className="">
                                        <p className='text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] text-[rgb(253,84,120)] font-semibold'>{`${item.timestamp.split(" ")[1]} ${item.timestamp.split(" ")[2]} ${item.timestamp.split(" ")[3].split(",")[0]}`}</p>
                                        <h4 className="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] font-semibold leading-[1] mt-[2px] line-clamp-2">{item.heading}</h4>
                                        <p className='text-[8px] lg:text-[9px] xl:text-[11px] text-slate-500 tracking-tight leading-[1.2] font-medium mt-1 line-clamp-4 lg:line-clamp-5 xl:line-clamp-5 mb-1'>{item.intro}</p>
                                    </div>
                                    <div className="flex justify-between items-center gap-5">
                                        <button className="px-4 py-1 rounded-full bg-blue-400 text-white text-lg font-medium w-1/2 outline-none" onClick={(e) => handleEditButton(e, item.id)}>Edit</button>
                                        <button className="px-4 py-1 rounded-full bg-red-400 text-white text-lg font-medium w-1/2 outline-none" onClick={(e) => handleDeleteButton(e, item)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminBlogs
