import HeadingText from "@/components/HeadingText"
import { saveNewsletterInfo, saveWorkWithUsInfo } from "@/firebase/auth";
import { useState } from "react"
import { toast } from "react-toastify";

let data = {
    name: "",
    phone: "",
    email: "",
    describe: "",
    skill: ""
}


function WorkWithUsAndNewsletter() {
    let [formData, setFormData] = useState(data);
    let [email, setEmail] = useState("");

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleMobileNoChange = (e) => {
        e.preventDefault();

        if (e.target.value.length <= 10) {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleWorkWithUsSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.email || !formData.describe || !formData.skill) {
            toast.error("Required All Fields!!")
            return
        }

        saveWorkWithUsInfo(formData).then(() => {
            toast.success("Info Send Successfully...");
            setFormData(data);
        })
    }

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();

        saveNewsletterInfo(email).then(() => {
            setEmail("");
            toast.success("Subscribed Successfully...")
        })
    }

    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 lg:gap-10 px-5 md:px-8 lg:px-14 xl:px-24 py-5 lg:py-10 border-t">

            <div className="w-full md:w-7/12 lg:2/3 flex flex-col">
                <HeadingText name="Work With Us!" />
                <form className="flex flex-col gap-4 mt-4 md:mt-8">
                    <div className="w-full flex gap-4 lg:gap-8">
                        <input name="name" value={formData.name} onChange={handleChange} className="w-1/2 h-10 lg:h-12 bg-[rgb(210,224,232)] rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)]" placeholder="Full Name" autoComplete="off" />
                        <input name="phone" value={formData.phone} onChange={handleMobileNoChange} className="w-1/2 h-10 lg:h-12 bg-[rgb(210,224,232)] rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)]" placeholder="Phone No." autoComplete="off" />
                    </div>
                    <input name="email" value={formData.email} onChange={handleChange} className="w-full h-10 lg:h-12 bg-[rgb(210,224,232)] rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)]" placeholder="Email" autoComplete="off" />
                    <textarea name="describe" value={formData.describe} onChange={handleChange} className="w-full h-20 md:h-32 lg:h-40 bg-[rgb(210,224,232)] rounded-[6px] lg:rounded-3xl px-3 lg:px-5 text-xs md:text-base font-medium py-2 focus:outline-none placeholder:text-[rgb(8,43,61,0.6)]" placeholder="Describe!" cols="30" rows="10" autoComplete="off"></textarea>
                    <div className="flex gap-4">
                        <input name="skill" value={formData.skill} onChange={handleChange} className="w-full h-10 lg:h-12 bg-[rgb(210,224,232)] rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)]" placeholder="Your Skills" autoComplete="off" />
                        <button type="submit" onClick={handleWorkWithUsSubmit} className="h-10 lg:h-12 w-28 lg:w-40 text-sm lg:text-base self-center lg:self-start font-semibold lg:hover:bg-[rgb(8,43,61)] active:bg-[rgb(233,232,232)] lg:hover:text-white border border-[rgb(8,43,61)] text-[rgb(8,43,61)] rounded-3xl ">Submit</button>
                    </div>
                </form>

            </div>

            <div className="w-full md:w-5/12 lg:1/3 bg-[rgb(210,224,232)] rounded-2xl px-6 lg:px-8 py-5 lg:py-6 flex flex-col">
                <p className="text-base lg:text-xl font-semibold">Subscribe To</p>
                <h2 className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-3 tracking-tight lg:tracking-normal relative bottom-1">Our Newsletter!</h2>
                <p className="text-[10px] md:text-[12px] lg:text-sm leading-[1.3] md:leading-[1.2] tracking-tight lg:tracking-normal">Stay connected to the exciting world of LXS Store by subscribing to our newsletter! As a valued member of our community, you'll receive exclusive updates on our latest product launches, special promotions, and insider access to all things LXS. Be the first to discover our newest designs, dive into behind-the-scenes stories, and explore the creative journey that fuels our vision. Plus, enjoy personalized content, sneak peeks of upcoming collections, and exclusive offers available only to our subscribers. Don't miss the chance to be part of the LXS universe - sign up today and stay ahead of the trends!</p>
                <form>
                    <input type="email" value={email} onChange={(e) => { e.preventDefault(), setEmail(e.target.value) }} className="h-9 xl:h-10 lg:h-10 w-full px-3 lg:px-5 mt-3 lg:mt-5 text-xs lg:text-base rounded-[12px] lg:rounded-3xl font-medium focus:outline-none placeholder:text-[rgb(8,43,61,0.6)]" placeholder="Email" />
                    <p className="text-[8px] lg:text-[10px] text-right mr-0 lg:mr-5">We respect your privacy. <span className="font-bold">Unscbscribe Anytime</span></p>
                    <button onClick={handleNewsletterSubmit} className="h-10 lg:h-12 w-32 lg:w-40 text-sm lg:text-base self-center bg-transparent border border-[rgb(8,43,61)] lg:hover:text-white lg:hover:bg-[rgb(8,43,61)] text-[rgb(8,43,61)] active:bg-[rgb(189,200,207)] rounded-3xl mt-3 lg:mt-5 font-semibold">Subscribe</button>
                </form>
            </div>


        </div>
    )
}

export default WorkWithUsAndNewsletter
