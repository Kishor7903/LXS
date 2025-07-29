import AddEventGalleryButton from '@/components/AddEventGalleryButton';
import AdminHeadings from '@/components/AdminHeadings';
import { useToast } from '@/components/ToastProvider';
import { deleteEventGalleryImg, getAllEventGaleryImages } from '@/firebase/admin';
import { deleteEventGalleryImage, getEventGalleryImgs } from '@/store/features/adminSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function EventGallery() {
    let [isOpen, setIsOpen] = useState(false);
    let { eventGalleryImg } = useSelector(state => state.admin)
    let dispatch = useDispatch();
    const toast = useToast();

    const handleEventImgDelete = (e, item) => {
        e.preventDefault();

        deleteEventGalleryImg(item).then(() => {
            dispatch(deleteEventGalleryImage(item.imgPublicId))
            toast("Image Deleted Successfully ...");
        })
    }

    useEffect(() => {
        getAllEventGaleryImages().then((res) => {
            dispatch(getEventGalleryImgs(res))
        })
    }, [])

    return (
        <div>
            <AdminHeadings title="Event Gallery" >
                <AddEventGalleryButton isOpen={isOpen} setIsOpen={setIsOpen} />
            </AdminHeadings>
            <div className="p-8 grid grid-cols-4 gap-10 bg-white">
                {
                    eventGalleryImg && eventGalleryImg.length > 0 ?
                    eventGalleryImg.map((item, index) => (
                        <div key={index} className='h-72 w-full relative rounded overflow-hidden z-20'>
                            <img src={item.imgUrl} alt="" className='h-full w-full border' />
                            <div className="absolute top-0 right-0 flex h-full w-2/6 bg-transparent flex-col justify-end items-end p-1 gap-5 text-gray-100 text-4xl shadow-[inset_-85px_0px_35px_-40px_rgb(0,0,0,0.5)]">
                                <i onClick={(e) => handleEventImgDelete(e, item)} className="fi fi-rs-trash cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                            </div>
                        </div>
                    ))

                    :

                    <div className="h-20 flex justify-center mx-auto text-2xl opacity-70 font-extrabold">No Images Available...</div>
                }
            </div>
        </div>
    )
}

export default EventGallery
