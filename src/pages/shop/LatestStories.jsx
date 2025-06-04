import HeadingText from "@/components/HeadingText"
import ViewAllIcon from "@/components/ViewAllIcon"


function LatestStories() {
    return (
        <div className='border-t mt-5 py-5'>
            <HeadingText name="Latest Stories" className="text-[40px]" />
            <div className="w-full px-16 flex flex-col">
                <ViewAllIcon navigate="#" className="hidden md:flex" />
                <div className="flex gap-10 h-[500px]">
                    <div className="w-1/2 h-full relative top-2">
                        <div className="h-[80%] w-full border border-[rgb(8,43,61)] rounded-[20px]"></div>
                        <div className="pl-2 pt-3">
                            <p className="text-sm opacity-65">February 15, 2025</p>
                            <h5 className="text-xl font-semibold">Inside Cipher's World - The Story Behind LUPIN & The LXS Universe</h5>
                            <p className="text-sm mt-2 leading-4">Deep dive into the story of Cipher(Lupin), his origins and how he becames the virtual owner of LXS Store. Explain how his multiverse mission connect with the brand's vision.</p>
                        </div>
                    </div>
                    <div className="w-1/2 h-full relative bottom-1">
                        <div className="h-1/3 flex gap-5 items-center">
                            <div className="h-36 w-36 rounded-2xl border border-[rgb(8,43,61)]"></div>
                            <div className="w-[75%]">
                                <h5 className="text-xl font-semibold ">Become a Seller on LXS Store - Step-by-step Guide</h5>
                                <p className="leading-[1.1] mt-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem adipisci vero pariatur mollitia aliquid reiciendis ipsum aliquam illo laborum perferendis.</p>
                                <p className="text-sm opacity-65 mt-2">February 16, 2025</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex gap-5 items-center">
                            <div className="h-36 w-36 rounded-2xl border border-[rgb(8,43,61)]"></div>
                            <div className="w-[75%]">
                                <h5 className="text-xl font-semibold ">Become a Seller on LXS Store - Step-by-step Guide</h5>
                                <p className="leading-[1.1] mt-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem adipisci vero pariatur mollitia aliquid reiciendis ipsum aliquam illo laborum perferendis.</p>
                                <p className="text-sm opacity-65 mt-2">February 16, 2025</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex gap-5 items-center">
                            <div className="h-36 w-36 rounded-2xl border border-[rgb(8,43,61)]"></div>
                            <div className="w-[75%]">
                                <h5 className="text-xl font-semibold ">Become a Seller on LXS Store - Step-by-step Guide</h5>
                                <p className="leading-[1.1] mt-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem adipisci vero pariatur mollitia aliquid reiciendis ipsum aliquam illo laborum perferendis.</p>
                                <p className="text-sm opacity-65 mt-2">February 16, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestStories
