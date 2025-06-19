import HeadingText from "@/components/HeadingText"
import { useNavigate } from "react-router-dom"


function AllBlogs() {
    let navigate = useNavigate();

    return (
        <div className="flex flex-col gap-10 px-16 py-5">
            <HeadingText name="Blog Vault" className="text-[40px]" />
            <div className="flex flex-col gap-5">
                {
                    [1, 2, 3, 4].map((_, idx) => (
                        <div key={idx} className="flex gap-10">
                            <div className="w-1/5 text-center cursor-pointer" onClick={() => navigate("/blog1")}>
                                <div className="border border-[rgb(8,43,61,0.6)] rounded-3xl h-40 "></div>
                                <h5 className="font-bold">Welcome To LXS</h5>
                                <p className="text-sm font-medium">15 February, 2025</p>
                            </div>
                            <div className="w-1/5 text-center cursor-pointer" onClick={() => navigate("/blog2")}>
                                <div className="border border-[rgb(8,43,61,0.6)] rounded-3xl h-40 "></div>
                                <h5 className="font-bold">The Future of Fashion</h5>
                                <p className="text-sm font-medium">15 February, 2025</p>
                            </div>
                            <div className="w-1/5 text-center cursor-pointer" onClick={() => navigate("/blog3")}>
                                <div className="border border-[rgb(8,43,61,0.6)] rounded-3xl h-40 "></div>
                                <h5 className="font-bold">Bringing AR & VR</h5>
                                <p className="text-sm font-medium">15 February, 2025</p>
                            </div>
                            <div className="w-1/5 text-center cursor-pointer" onClick={() => navigate("/blog")}>
                                <div className="border border-[rgb(8,43,61,0.6)] rounded-3xl h-40 "></div>
                                <h5 className="font-bold">Meet the Creators</h5>
                                <p className="text-sm font-medium">15 February, 2025</p>
                            </div>
                            <div className="w-1/5 text-center cursor-pointer" onClick={() => navigate("/blog")}>
                                <div className="border border-[rgb(8,43,61,0.6)] rounded-3xl h-40 "></div>
                                <h5 className="font-bold">Building a</h5>
                                <p className="text-sm font-medium">15 February, 2025</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllBlogs
