import LXSHighlight from "./LXSHighlight"
import LatestStories from "./LatestStories"
import TopBlogPosts from "./TopBlogPosts"
import bgImage from "../../assets/Banners/Banner10.png"


function Blogs() {
    return (
        <>
            <div className="h-[250px] lg:h-[700px] flex gap-2 lg:gap-10" style={({backgroundImage: `url(${bgImage})`, backgroundPosition: "center", backgroundSize: "cover"})}>
                <div className="w-[58%] lg:w-[50%] pl-5 lg:pl-16 py-10 lg:py-20 flex flex-col">
                    <h2 className="text-xl lg:text-6xl font-extrabold leading-5 lg:tracking-wide">Explore the World's <br /><span className="text-orange-500">First </span>Virtual Store</h2>
                    <h3 className="text-xs lg:text-2xl font-bold mt-2 lg:mt-2"><span className="font-medium opacity-70">Owned By </span>Cipher( Lupin )</h3>
                    <p className="mt-5 lg:mt-16 text-[9px] lg:text-lg font-medium opacity-70 leading-3 lg:leading-6">The digital revolution is here, and it's reshaping how we interact with brands, shop, and experience the online world. But what if we told you there's a store that doesn’t just adapt to this new era—but defines it? A store where cutting-edge technology meets personalized experiences, where every product is tailored to your preferences, and where shopping feels less like a task and more like an immersive journey. Imagine a place that understands your style, anticipates your needs, and delivers not just goods, but delight—seamlessly, intuitively, and instantly. Welcome to the future of retail.</p>
                    <button className="self-center mt-6 lg:mt-16 rounded-full px-3 lg:px-20 py-1 lg:py-3 text-white bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-xs lg:text-2xl font-medium lg:font-semibold mr-5">Explore Now !</button>
                </div>
                <div className="w-[42%] lg:w-[50%] h-full flex flex-col lg:flex-row gap-5 lg:gap-10 pr-5 lg:pr-14 py-4 lg:py-8">
                    <div className="w-full lg:w-[60%] h-[60%] lg:h-full flex items-center justify-center">
                        <div className="h-full lg:h-[75%] w-[80%] border border-[rgb(8,43,61)] rounded-2xl lg:rounded-[40px] bg-white"></div>
                    </div>
                    <div className="w-full lg:w-[40%] h-[40%] lg:h-full flex flex-row lg:flex-col gap-3 lg:gap-8 ">
                        <div className="h-full lg:h-1/2 w-full rounded-xl lg:rounded-[30px] border border-[rgb(8,43,61)] bg-white"></div>
                        <div className="h-full lg:h-1/2 w-full rounded-xl lg:rounded-[30px] border border-[rgb(8,43,61)] bg-white"></div>
                    </div>
                </div>
            </div>
            <TopBlogPosts />
            {/* <LatestStories />
            <LXSHighlight /> */}
        </>
    )
}

export default Blogs
