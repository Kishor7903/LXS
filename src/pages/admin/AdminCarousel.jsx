import AddCarouselmageButton from '@/components/AddCarouselmageButton';
import AdminHeadings from '@/components/AdminHeadings'
import { useToast } from '@/components/ToastProvider';
import { deleteCarouselImg, getAllCarouselImages } from '@/firebase/admin';
import { deleteCarouselImage, getCarouselImgs } from '@/store/features/adminSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function AdminCarousel() {
    let [isOpen, setIsOpen] = useState(false);
    let [currentEditId, setCurrentEditId] = useState(null);
    let { carouselImg } = useSelector(state => state.admin);
    let dispatch = useDispatch();
    const toast = useToast();

    const handleCarouselImgDelete = (e,item) => {
        e.preventDefault();

        deleteCarouselImg(item).then((res) => {
            dispatch(deleteCarouselImage(res.imgPublicId));
            toast("Image Deleted Successfully ...");
        })
    }

    const handleCarouselImgEditButton = (e, item) =>{
        e.preventDefault();

        setCurrentEditId(item);
        setIsOpen(true);
    }

    useEffect(() => {
        getAllCarouselImages().then((res) => {
            dispatch(getCarouselImgs(res));
        })
    }, []);

    return (
        <div>
            <AdminHeadings title="Carousel Images" >
                <AddCarouselmageButton isOpen={isOpen} setIsOpen={setIsOpen} currentEditId={currentEditId} setCurrentEditId={setCurrentEditId} />
            </AdminHeadings>
            <div className="p-8 flex flex-wrap gap-10 bg-white">
                {
                    carouselImg && carouselImg.length > 0 ?
                    carouselImg.map((item, index) => (
                        <div key={index} className='h-48 w-[48%] relative rounded overflow-hidden z-20'>
                            <img src={item.imgUrl} alt="" className='h-full w-full border' />
                            <div className="absolute top-0 right-0 flex h-full w-2/6 bg-transparent flex-col justify-center items-end p-1 gap-5 text-gray-100 text-4xl shadow-[inset_-85px_0px_45px_-30px_rgb(0,0,0,0.5)]">
                                <i onClick={(e) => handleCarouselImgEditButton(e, item)} className="fi fi-rr-file-edit cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                                <i onClick={(e) => handleCarouselImgDelete(e, item)} className="fi fi-rs-trash cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
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

export default AdminCarousel
