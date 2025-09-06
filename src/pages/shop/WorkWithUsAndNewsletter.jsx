import DialogBox from "@/components/DialogBox";
import HoverButton from "@/components/HoverButton";
import RgbButton from "@/components/RgbButton";
import { saveNewsletterInfo, saveWorkWithUsInfo } from "@/firebase/auth";
import { useRef, useState } from "react"
import { useSelector } from "react-redux";
import flagIcon from "../../assets/commonIcons/Indian Flag (Fill).png"
import { useToast } from "@/components/ToastProvider";
import { uploadImage } from "@/firebase/admin";

let data = {
    name: "",
    phone: "",
    email: "",
    address: "",
    describe: "",
    skill: "",
    resume: null
}


function WorkWithUsAndNewsletter() {
    let [formData, setFormData] = useState(data);
    let [email, setEmail] = useState("");
    let { user } = useSelector(state => state.auth);
    let [isOpen, setIsOpen] = useState(false);
    let [open, setOpen] = useState(false);
    const toast = useToast();
    const fileInputs = useRef(null);

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleMobileNoChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
      
        // strip +91 if already present
        value = value.replace(/^\+91/, "").replace(/\D/g, "");
      
        if (value.length === 0) {
          setFormData({
            ...formData,
            [e.target.name]: "",
          });
        } else if (value.length <= 10) {
          setFormData({
            ...formData,
            [e.target.name]: `+91 ${value}`,
          });
        }
      };
      
      

    const workWithUsButton = (e) => {
        e.preventDefault();

        if (!user) {
            toast("Login Required.")
            return
        }

        if (!formData.name || !formData.phone || !formData.email || !formData.describe || !formData.skill || !formData.resume) {
            toast("Required All Fields!!")
            return
        }
        setIsOpen(true);
    }

    const handleWorkWithUsSubmit = (e) => {
        e.preventDefault();

        uploadImage(formData.resume, 'WorkWithUs').then((res) => {
            saveWorkWithUsInfo({...formData, resume: res}).then(() => {
                setIsOpen(false)
                toast("Info Send Successfully...");
                setFormData(data);
            })
        })

    }

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();

        if(!email){
            toast("All Fields Required !");
            return
        }

        saveNewsletterInfo({email, userId: user.id}).then(() => {
            setOpen(false)
            setEmail("");
            toast("Subscribed Successfully...")
        })
    }

    const handleResumeChange = (e) => {
        let files = e.target.files[0]

        if (files && files.type === "application/pdf") {
            setFormData({
                ...formData,
                resume: files
            })
        } else{
            toast("Please upload only pdf file.")
            if (fileInputs.current) {
                fileInputs.current.value = ""; // reset safely
            }
        }
        e.target.value = null;
    }

    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 lg:gap-10 px-5 md:px-8 lg:px-14 xl:px-24 py-5 lg:py-10 border-t">

            <div className="w-full md:w-7/12 lg:2/3 flex flex-col">
                <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-40 after:left-6 after:bottom-0 after:bg-[rgb(8,43,61)] after:rounded-full self-center'>Work with us!</h2>
                <form className="flex flex-col gap-4 mt-4 md:mt-8">
                    <div className="w-full flex gap-4 lg:gap-4">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-[70%] h-10 lg:h-12 bg-slate-100 rounded-[12px] lg:rounded-xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-md border border-slate-300" placeholder="Full Name" autoComplete="off" />
                        <input type="text" name="phone" value={formData.phone} onChange={handleMobileNoChange} className="w-[30%] h-10 lg:h-12 bg-slate-100 rounded-[12px] lg:rounded-xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-md border border-slate-300" placeholder="Phone No." autoComplete="off" />
                    </div>
                    <input name="email" value={formData.email} onChange={handleChange} className="w-full h-10 lg:h-12 bg-slate-100 rounded-[12px] lg:rounded-xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-md border border-slate-300" placeholder="Email" autoComplete="off" />
                    <input name="address" value={formData.address} onChange={handleChange} className="w-full h-10 lg:h-12 bg-slate-100 rounded-[12px] lg:rounded-xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-md border border-slate-300" placeholder="Full Address" autoComplete="off" />
                    <textarea name="describe" value={formData.describe} onChange={handleChange} className="w-full h-20 md:h-32 lg:h-40 bg-slate-100 rounded-[6px] lg:rounded-xl px-3 lg:px-5 text-xs md:text-base font-medium py-3 focus:outline-none placeholder:text-[rgb(8,43,61,0.6)] shadow-md border border-slate-300" placeholder="Describe!" cols="30" rows="10" autoComplete="off"></textarea>
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-4 w-3/4">
                            <input name="skill" value={formData.skill} onChange={handleChange} className="w-[60%] h-10 lg:h-12 bg-slate-100 rounded-[12px] lg:rounded-xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-md border border-slate-300" placeholder="Your Skills" autoComplete="off" />
                            <input
                                id='resume'
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                ref={(el) => (fileInputs.current = el)}
                                onChange={handleResumeChange}
                            />
                            <label htmlFor="resume" className={`h-10 lg:h-12 w-[200px] flex gap-2 justify-center items-center bg-slate-100 rounded-[12px] lg:rounded-xl px-3 lg:px-5 focus:outline-none text-xs lg:text-base font-medium placeholder:text-[rgb(8,43,61,0.6)] shadow-md border border-slate-300 cursor-pointer duration-200 line-clamp-1 ${formData.resume ? "text-[rgb(8,43,61)]" : "text-[rgb(8,43,61,0.6)]"}`}>
                                <p className="line-clamp-1">{formData.resume ? formData.resume.name : "Upload Resume"}</p><i className="fi fi-sr-file-upload relative top-[2px]"></i></label>
                        </div>
                        <div className="flex gap-5">
                            <button className="border border-slate-300 shadow-md px-4 h-10 rounded-xl font-semibold lg:hover:scale-[1.08] duration-200 lg:active:scale-[0.98]" onClick={(e) => {e.preventDefault(), setFormData(data)}}>Reset</button>
                            <HoverButton className="px-4 h-10 flex justify-center items-center font-semibold rounded-xl lg:hover:scale-[1.08] duration-200 lg:active:scale-[0.98] border-slate-300 shadow-md" onClick={workWithUsButton}>Submit</HoverButton>
                        </div>
                    </div>
                </form>
                <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[40vw] bg-white rounded-3xl flex flex-col items-center py-6 px-10 overflow-hidden" parentDivClassName="flex justify-center items-center">
                    <h2 className="text-center text-2xl rounded-2xl font-bold border-b border-slate-300 shadow-md uppercase p-4 flex gap-1 justify-center items-center bg-[rgb(8,43,61)] text-white w-80">
                        Work With Us !
                    </h2>
                    <div className="w-full flex flex-col">
                        <div className="flex space-x-5">
                            <div className="w-[70%] relative">
                                <label className="relative top-2 left-3 px-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Name</label>
                                <br />
                                <input type="text" value={formData.name} disabled className="border-slate-300 border px-3 rounded-xl h-10 w-full outline-none bg-white shadow-md" />
                            </div>
                            <div className="w-[30%] relative">
                                <label className="relative top-2 left-3 pl-1 pr-5 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Phone<img src={flagIcon} alt="" className="h-2 absolute top-1 right-0 pr-1" /></label>
                                <br />
                                <input type="text" value={formData.phone} disabled className="border-slate-300 border px-3 rounded-xl h-10 w-full outline-none bg-white shadow-md" />
                            </div>
                        </div>
                        <div className="flex space-x-5">
                            <div className="w-full relative">
                                <label className="relative top-2 left-3 px-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Email</label>
                                <br />
                                <input type="text" value={formData.email} disabled className="border-slate-300 border px-3 rounded-xl h-10 w-full outline-none bg-white shadow-md" />
                            </div>
                        </div>
                        <div className="">
                            <label className="relative top-2 left-3 px-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Address</label>
                            <br />
                            <input type="text" value={formData.address} disabled className="border-slate-300 border px-3 rounded-xl h-10 w-full outline-none bg-white shadow-md" />
                        </div>
                        <div className="">
                            <label className="relative top-2 left-3 px-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Describe</label>
                            <br />
                            <textarea value={formData.describe} disabled className="border-slate-300 border px-3 py-1 rounded-xl h-44 w-full outline-none bg-white shadow-md leading-5" ></textarea>
                        </div>
                        <div className="mb-4 flex gap-5 relative bottom-1.5">
                           
                            <div className="w-1/2 relative">
                                <label className="relative top-2 left-3 px-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Skill</label>
                                <br />
                                <input type="text" value={formData.skill} disabled className="border-slate-300 border px-3 rounded-xl h-10 w-full outline-none bg-white shadow-md" />
                            </div>

                            <div className="w-1/2 relative">
                                <label className="relative top-2 left-3 px-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Resume</label>
                                <br />
                                <input type="text" value={formData.resume?.name} disabled className="border-slate-300 border px-3 rounded-xl h-10 w-full outline-none bg-white shadow-md" />
                            </div>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <HoverButton onClick={() => setIsOpen(false)} className="px-6 py-2 border-2 font-semibold rounded-xl lg:hover:scale-[1.05] duration-200 lg:active:scale-[0.97]" >Cancel</HoverButton>
                            <RgbButton onClick={(e) => user ? handleWorkWithUsSubmit(e) : toast("Login First.")} className="text-base font-semibold px-6 py-2 rounded-xl lg:hover:scale-[1.05] duration-200 lg:active:scale-[0.97]" >Send</RgbButton>
                        </div>
                    </div>

                </DialogBox>

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
                    <p className="font-semibold">— Cipher (LUPIN)</p>
                </span>
                <form className="flex flex-col gap-4">
                    <textarea type="text" value={email} onChange={(e) => { e.preventDefault(), setEmail(e.target.value) }} className="h-9 xl:h-[128px] lg:h-10 w-full py-3 lg:px-5 mt-3 lg:mt-5 text-xs lg:text-base rounded-xl font-medium focus:outline-none placeholder:text-[rgb(8,43,61,0.4)] bg-slate-100 shadow-md border border-slate-300" placeholder="Cosmic Feedback..." ></textarea>
                    <HoverButton className="px-4 h-10 flex justify-center items-center font-semibold self-end rounded-xl lg:hover:scale-[1.08] duration-200 lg:active:scale-[0.98] border-slate-300 shadow-md" onClick={(e) => email ? (e.preventDefault(), setOpen(true)) : (e.preventDefault(), toast("Required field value"))}>Transmit</HoverButton>
                </form>
                <DialogBox isOpen={open} setIsOpen={setOpen} className="w-[40vw] bg-white rounded-3xl flex flex-col items-center py-6 px-10 overflow-hidden" parentDivClassName="flex justify-center items-center">
                    <h2 className="text-center text-2xl rounded-2xl font-bold shadow-md uppercase p-4 flex gap-1 justify-center items-center bg-[rgb(8,43,61)] text-white">
                        Uplink your Thoughts! 🔮📡
                    </h2>
                    <div className="w-full  flex flex-col gap-5">
                        <div className="">
                            <label className="relative top-2 left-3 px-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Feedback</label>
                            <br />
                            <textarea type="text" value={email} disabled className="border-slate-300 border px-3 rounded-xl h-56 w-full outline-none py-2 bg-white shadow-md leading-5" ></textarea>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <HoverButton onClick={() => setOpen(false)} className="px-6 py-2 border-2 font-semibold rounded-xl lg:hover:scale-[1.05] duration-200 lg:active:scale-[0.97]" >Cancel</HoverButton>
                            <RgbButton onClick={handleNewsletterSubmit} className="text-base font-semibold px-6 py-2 rounded-xl lg:hover:scale-[1.05] duration-200 lg:active:scale-[0.97]" >Send</RgbButton>
                        </div>
                    </div>

                </DialogBox>
            </div>


        </div>
    )
}

export default WorkWithUsAndNewsletter
