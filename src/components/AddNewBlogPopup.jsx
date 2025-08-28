import DialogBox from './DialogBox';
import { useToast } from './ToastProvider';
import { addBlog, editBlog, uploadImage } from '@/firebase/admin';
import { useDispatch } from 'react-redux';
import { addNewBlog, editABlog } from '@/store/features/adminSlice';
import { useEffect, useRef, useState } from 'react';
import { uploadToCloudinary } from '@/firebase/cloudinary';


function AddNewBlogPopup({ isOpen, setIsOpen, data, form, setForm, currentEditId, setCurrentEditId }) {
    let toast = useToast();
    let dispatch = useDispatch();
    const [previews, setPreviews] = useState(null);
    const [files, setFiles] = useState(null);
    const fileInputs = useRef(null);

    const handleAddBlogButton = (e) => {
        e.preventDefault();
        setCurrentEditId(null);
        setForm(data);
        setIsOpen(true);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setPreviews(URL.createObjectURL(file));
            setFiles(file);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setPreviews(URL.createObjectURL(file));
            setFiles(file);
        }
    };

    const removeImage = () => {
        setPreviews(null);
        setFiles(null);
        if (fileInputs.current) {
            fileInputs.current.value = null;
        }
    };


    const handleChange = (e, sectionIndex, field, itemIndex = null, bulletIndex = null) => {
        const updated = JSON.parse(JSON.stringify(form))
        if (field === 'heading' || field === 'intro') {
            updated[field] = e.target.value;
        } else if (field === 'title') {
            updated.sections[sectionIndex].title = e.target.value;
        } else if (field === 'item') {
            updated.sections[sectionIndex].items[itemIndex].content = e.target.value;
        } else if (field === 'list-heading') {
            updated.sections[sectionIndex].items[itemIndex].heading = e.target.value;
        } else if (field === 'bullet-in-list') {
            updated.sections[sectionIndex].items[itemIndex].content[bulletIndex] = e.target.value;
        }

        setForm(updated);
    };


    const addSection = () => {
        setForm((prev) => ({
            ...prev,
            sections: [...prev.sections, { title: '', items: [] }],
        }));
    };

    const removeSection = (index) => {
        const updated = { ...form };
        updated.sections.splice(index, 1);
        if (updated.sections.length === 0) {
            updated.sections.push({ title: '', subtitle: '', descriptions: [''], bullets: [''] });
        }
        setForm(updated);
    };

    const addItem = (sectionIndex, type, position = null) => {
        const updated = { ...form };

        const newItem = type === 'list'
            ? { type: 'list', heading: '', content: [''] }
            : { type, content: '' };

        if (position === null) {
            updated.sections[sectionIndex].items.push(newItem);
        } else {
            updated.sections[sectionIndex].items.splice(position + 1, 0, newItem);
        }

        setForm(updated);
    };

    const addBulletToList = (sectionIndex, itemIndex) => {
        const updated = { ...form };
        updated.sections[sectionIndex].items[itemIndex].content.push('');
        setForm(updated);
    };

    const removeBulletFromList = (sectionIndex, itemIndex, bulletIndex) => {
        const updated = { ...form };
        updated.sections[sectionIndex].items[itemIndex].content.splice(bulletIndex, 1);
        if (updated.sections[sectionIndex].items[itemIndex].content.length === 0) {
            updated.sections[sectionIndex].items[itemIndex].content.push('');
        }
        setForm(updated);
    };

    const removeItem = (sectionIndex, itemIndex) => {
        const updated = { ...form };
        updated.sections[sectionIndex].items.splice(itemIndex, 1);
        setForm(updated);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.heading === "" || form.intro === "" || form.sections.length < 1) {
            toast("All Fields Required!!");
        }

        if (files) {
            let response = uploadImage(files, 'blogs')

            addBlog({...form, img_url: response,}).then((res) => {
                dispatch(addNewBlog(res))
                setIsOpen(false);
                setForm(data);
                toast("Blog added successfully.")
            })
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (form.heading === "" || form.intro === "" || form.sections.length < 1) {
            toast("All Fields Required!!");
        }

        let urls;
        if(form.img_url && previews && files === null){
            urls = form.img_url;
        }
        else if(form.img_url && previews === null && files === null){
            urls = null;
        }
        else if (form.img_url && files) {
            await uploadImage(files, 'blogs').then((res) => {
                urls = res
            })
        }
        editBlog(currentEditId, {...form, img_url: urls}).then(() => {
            dispatch(editABlog({...form, img_url: urls, id: currentEditId}))
            setIsOpen(false);
            setForm(data);
            toast("Blog edited successfully..")
        })
    }

    useEffect(() => {
        setFiles(null);
        if(currentEditId){
            setPreviews(form.img_url)
        }else{
            setPreviews(null);
        }
    }, [currentEditId])

    return (
        <div className='h-12'>
            <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-[6px] border items-end" onClick={handleAddBlogButton}>+ Create New</button>

            <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[50vw] max-h-[80vh] py-6 px-10 bg-white rounded-[30px] flex flex-col" parentDivClassName="flex justify-center items-center">
                <h2 className='text-center text-2xl font-semibold'>Create New Blog</h2>
                <hr className='border-[rgb(8,43,61)]' />
                <form className="overflow-y-scroll no-scrollbar pb-4">

                    <div
                        className="w-[98.5%] h-[200px]  rounded-2xl mt-5 flex items-center justify-center text-sm text-gray-400 cursor-pointer relative"
                        onDrop={(e) => handleDrop(e)}
                        onDragOver={handleDragOver}
                    >
                        <input
                            id='image'
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={(el) => (fileInputs.current = el)}
                            onChange={(e) => handleImageChange(e)}
                        />
                        {previews ? (
                            <>
                                <img
                                    src={previews}
                                    alt='Preview'
                                    className="w-full h-full object-fill rounded-2xl border border-[rgb(196,185,185)]"
                                />
                                <button
                                    className="absolute -top-2 -right-2 bg-black text-white text-lg rounded-full w-5 h-5 flex items-center justify-center shadow"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage();
                                    }}
                                >
                                    ×
                                </button>
                            </>
                        )

                            :

                            (
                                <label htmlFor="image" className="h-full w-full rounded-2xl flex flex-col justify-center items-center border-[2px] border-dashed border-[rgb(196,185,185)] cursor-pointer">
                                    <i className="fi fi-rs-cloud-upload text-[70px]"></i>
                                    <span className='text-xl'>Image</span>
                                </label>
                            )}
                    </div>

                    <div className="">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Heading</label>
                        <br />
                        <input type="text" value={form.heading} onChange={(e) => handleChange(e, null, 'heading')} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                    </div>

                    <div>
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Introduction</label>
                        <br />
                        <textarea
                            value={form.intro}
                            onChange={(e) => handleChange(e, null, 'intro')}
                            className="border-[rgb(196,185,185)] border px-3 py-2 leading-5 rounded-xl h-32 w-full outline-none"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Sections */}
                    {form.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="border-t border-[rgb(8,43,61)] pt-4 mt-5 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">Section {sectionIndex + 1}</h3>
                                {
                                    sectionIndex !== 0 &&
                                    <button onClick={() => removeSection(sectionIndex)} className='border-slate-300 border px-3 py-1 rounded'>Remove</button>
                                }
                            </div>

                            <div className="">
                                <label className="relative left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium z-20">Title</label>
                                <br />
                                <input type="text" value={section.title} onChange={(e) => handleChange(e, sectionIndex, 'title')} className="border-[rgb(196,185,185)] border relative bottom-2 px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                            </div>

                            <div className="space-y-5">
                                {section.items.map((item, itemIndex) => (
                                    item.type === 'list' ? (
                                        <div key={item.itemIndex} className="w-full space-y-4 border-2 border-slate-300 rounded-xl p-4 pb-8 relative border-dashed">
                                            <div className='relative'>
                                                <label className="absolute -top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium capitalize">
                                                    Bullet Heading
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.heading}
                                                    onChange={(e) => handleChange(e, sectionIndex, 'list-heading', itemIndex)}
                                                    className="border border-gray-300 rounded-xl px-3 h-10 w-full outline-none"
                                                /></div>
                                            {item.content.map((bullet, bulletIndex) => (
                                                <div key={bulletIndex} className="flex items-center gap-2 mb-2 relative">
                                                    <label className="absolute -top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium capitalize">
                                                        Bullet {bulletIndex + 1}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={bullet}
                                                        onChange={(e) =>
                                                            handleChange(e, sectionIndex, 'bullet-in-list', itemIndex, bulletIndex)
                                                        }
                                                        className="border border-gray-300 rounded-xl px-3 h-10 w-full outline-none"
                                                    />
                                                    <i
                                                        className="fi fi-sr-minus-circle text-lg text-slate-500 cursor-pointer"
                                                        onClick={() => bulletIndex !== 0 ? removeBulletFromList(sectionIndex, itemIndex, bulletIndex) : removeItem(sectionIndex, itemIndex)}
                                                    ></i>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addBulletToList(sectionIndex, itemIndex)}
                                                className="text-sm text-blue-500 absolute bottom-2"
                                            >
                                                + Add Bullet
                                            </button>
                                        </div>
                                    ) : (
                                        <div key={item.itemIndex}>
                                            {item.type === 'description' && (
                                                <div className='flex gap-2 items-center relative'>
                                                    <label className="absolute -top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium capitalize">
                                                        {item.type} {itemIndex + 1}
                                                    </label>
                                                    <textarea
                                                        value={item.content}
                                                        onChange={(e) => handleChange(e, sectionIndex, 'item', itemIndex)}
                                                        className="border border-gray-300 rounded-xl w-full h-24 px-3 py-2 outline-none"
                                                    />
                                                    <i
                                                        className="fi fi-sr-minus-circle text-lg text-slate-500 cursor-pointer"
                                                        onClick={() => removeItem(sectionIndex, itemIndex)}
                                                    ></i>
                                                </div>

                                            )}
                                            {(item.type === 'subtitle') && (
                                                <div className='flex gap-2 items-center relative'>
                                                    <label className="absolute -top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium capitalize">
                                                        {item.type} {itemIndex + 1}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.content}
                                                        onChange={(e) => handleChange(e, sectionIndex, 'item', itemIndex)}
                                                        className="border border-gray-300 rounded-xl w-full h-10 px-3 outline-none"
                                                    />
                                                    <i
                                                        className="fi fi-sr-minus-circle text-lg text-slate-500 cursor-pointer"
                                                        onClick={() => removeItem(sectionIndex, itemIndex)}
                                                    ></i>
                                                </div>
                                            )}
                                        </div>
                                    )
                                ))}
                                <div className="space-x-2">
                                    <button type="button" onClick={() => addItem(sectionIndex, 'subtitle', section.items.length - 1)} className="text-sm border px-3 py-1 rounded-[6px] border-slate-300">+ Subtitle</button>
                                    <button type="button" onClick={() => addItem(sectionIndex, 'description', section.items.length - 1)} className="text-sm border px-3 py-1 rounded-[6px] border-slate-300">+ Description</button>
                                    <button type="button" onClick={() => addItem(sectionIndex, 'list', section.items.length - 1)} className="text-sm border px-3 py-1 rounded-[6px] border-slate-300">+ List</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </form>
                <div className='flex justify-between gap-10 pt-2 border-t border-[rgb(8,43,61)]'>
                    <button onClick={addSection} className='bg-red-500 text-white rounded h-11 px-10' >Add Section</button>
                    <div className="space-x-7">
                        <button onClick={() => { setIsOpen(false), setForm(data) }} className='bg-slate-800 text-white rounded h-11 px-10' >Cancel</button>
                        <button onClick={(e) => currentEditId ? handleEditSubmit(e) : handleSubmit(e)} className='bg-blue-600 text-white rounded h-11 px-10' >Upload</button>
                    </div>
                </div>
            </DialogBox>

        </div >
    )
}

export default AddNewBlogPopup
