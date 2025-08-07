import DialogBox from './DialogBox'

function KnowMorePopup({ isOpen, setIsOpen }) {
    return (
        <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="max-w-[40vw] bg-white rounded-xl flex flex-col overflow-hidden" parentDivClassName="flex justify-center items-center">
            <h2 className="text-center text-xl font-bold border-b border-[rgb(8,43,61,0.4)] p-4 flex gap-1 justify-center items-center bg-slate-100 ">
                Platform Fee – Why It’s Important
            </h2>
            <p className='mt-4 text-sm px-10'>At <span className='font-semibold'>LXS Store</span>, we apply a small <span className='font-semibold'>platform fee of ₹15</span> (inclusive of GST) to every order. This nominal charge helps us maintain and enhance your overall shopping experience. It supports the behind-the-scenes operations that make our store reliable, secure, and easy to use.
            </p>
            <span className='mt-3 text-sm px-10'>Your contribution through the platform fee enables us to:</span>
            <ul className='list-disc pl-20 text-sm pr-10'>
                <li><span className='font-semibold'>Maintain and upgrade our website</span> for faster browsing and smoother checkouts.</li>
                <li><span className='font-semibold'>Provide secure payment gateways</span> to keep your transactions safe.</li>
                <li><span className='font-semibold'>Offer responsive customer support</span> for any questions or issues you may face.</li>
                <li><span className='font-semibold'>Continuously develop new features</span> like product previews, virtual try-ons, and multiverse-inspired experiences.</li>
                <li><span className='font-semibold'>Ensure order accuracy and tracking</span>, so you stay updated from purchase to delivery.</li>
            </ul>
            <p className='mt-4 text-sm px-10 mb-4'>By paying this fee, you're directly supporting the mission of LXS Store — blending fashion with futuristic storytelling and delivering quality, creativity, and innovation to your doorstep.</p>
        </DialogBox>
    )
}

export default KnowMorePopup
