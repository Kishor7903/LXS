import HeadingText from "@/components/HeadingText"
import HoverButton from "@/components/HoverButton";
import { saveNewsletterInfo, saveWorkWithUsInfo } from "@/firebase/auth";
import { useState } from "react"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

let data = {
    name: "",
    phone: "",
    email: "",
    address: "",
    describe: "",
    skill: ""
}


function WorkWithUsAndNewsletter() {
    let [formData, setFormData] = useState(data);
    let [email, setEmail] = useState("");
    let { user } = useSelector(state => state.auth);

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

        if (user){
            saveWorkWithUsInfo(formData).then(() => {
                toast.success("Info Send Successfully...");
                setFormData(data);
            })
        }
        else{
            toast.error("Login Required!!");
        }
        
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
                <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-40 after:left-6 after:bottom-0 after:bg-[rgb(8,43,61)] after:rounded-full self-center'>Work with us!</h2>
                <form className="flex flex-col gap-4 mt-4 md:mt-8">
                    <div className="w-full flex gap-4 lg:gap-8">
                        <input name="name" value={formData.name} onChange={handleChange} className="w-1/2 h-10 lg:h-12 bg-slate-200 rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-[inset_0px_0px_12px_-2px_rgb(8,43,61)]" placeholder="Full Name" autoComplete="off" />
                        <input name="phone" value={formData.phone} onChange={handleMobileNoChange} className="w-1/2 h-10 lg:h-12 bg-slate-200 rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-[inset_0px_0px_12px_-2px_rgb(8,43,61)]" placeholder="Phone No." autoComplete="off" />
                    </div>
                    <input name="email" value={formData.email} onChange={handleChange} className="w-full h-10 lg:h-12 bg-slate-200 rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-[inset_0px_0px_12px_-2px_rgb(8,43,61)]" placeholder="Email" autoComplete="off" />
                    <input name="address" value={formData.address} onChange={handleChange} className="w-full h-10 lg:h-12 bg-slate-200 rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-[inset_0px_0px_12px_-2px_rgb(8,43,61)]" placeholder="Full Address" autoComplete="off" />
                    <textarea name="describe" value={formData.describe} onChange={handleChange} className="w-full h-20 md:h-32 lg:h-40 bg-slate-200 rounded-[6px] lg:rounded-3xl px-3 lg:px-5 text-xs md:text-base font-medium py-3 focus:outline-none placeholder:text-[rgb(8,43,61,0.6)] shadow-[inset_0px_0px_12px_-2px_rgb(8,43,61)]" placeholder="Describe!" cols="30" rows="10" autoComplete="off"></textarea>
                    <div className="flex gap-4">
                        <input name="skill" value={formData.skill} onChange={handleChange} className="w-[85%] h-10 lg:h-12 bg-slate-200 rounded-[12px] lg:rounded-3xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-[inset_0px_0px_12px_-2px_rgb(8,43,61)]" placeholder="Your Skills" autoComplete="off" />
                        <HoverButton className="px-4 h-12 flex justify-center items-center font-semibold self-end" onClick={handleWorkWithUsSubmit}>Submit 🚀</HoverButton>
                    </div>
                </form>

            </div>

            <div className="w-full md:w-5/12 rounded-3xl px-6 lg:px-8 flex flex-col">
                <p className="text-base lg:text-xl font-semibold">Response Deck </p>
                <h2 className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-3 tracking-tight lg:tracking-normal relative bottom-1">Uplink your Thoughts! 🔮📡</h2>
                <span className="text-[10px] md:text-[12px] lg:text-sm tracking-tight lg:tracking-normal space-y-1">
                    <p>Hey, it's me — Lupin, your guide through the LXS universe. </p>
                    <p>Your voice truly matters. Every idea, suggestion, or bit of feedback you share helps us improve and grow — not just for you, but for every explorer in our galaxy. </p>
                    <p>Whether it’s a cool feature you’d love to see, something we can do better, or just your honest thoughts — I’m all ears. This journey isn’t one-way; it’s a collaboration. Together, we’re shaping a smarter, more creative universe. 💫 </p>
                    <p>Drop your thoughts below — and let’s keep building something extraordinary, side by side.
                        I’m listening. Always. 🚀</p>
                    <p className="font-semibold">— Lupin (Cipher)</p>
                </span>
                <form className="flex flex-col gap-4">
                    <textarea type="text" value={email} onChange={(e) => { e.preventDefault(), setEmail(e.target.value) }} className="h-9 xl:h-[128px] lg:h-10 w-full py-3 lg:px-5 mt-3 lg:mt-5 text-xs lg:text-base rounded-2xl font-medium focus:outline-none placeholder:text-[rgb(8,43,61,0.4)] bg-slate-200 shadow-[inset_0px_0px_12px_-2px_rgb(8,43,61)]" placeholder="Cosmic Feedback..." ></textarea>
                    <HoverButton className="px-4 h-12 flex justify-center items-center font-semibold self-end" onClick={handleNewsletterSubmit}>Transmit 🛰️</HoverButton>
                </form>
            </div>


        </div>
    )
}

export default WorkWithUsAndNewsletter
