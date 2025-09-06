import mainLogo from "../assets/commonIcons/Website Logo (TM) with tagline.png";
import accountIcon from "../assets/commonIcons/Account Icon White.png";
import viewPasswordIcon from "../assets/loginIcons/View Password.png";
import hidePasswordIcon from "../assets/loginIcons/Hide Password.png";
import { useEffect, useState } from "react";
import DialogBox from "./DialogBox";
import { loginUser, registerUser } from "@/firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/store/features/authSlice";
import { useToast } from "./ToastProvider";

let gender = ["Select Gender", "Male", "Female", "Non-Binary"];


let userData = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Select Gender",
    DOB: "",
    altPhone: "",
    profilePic: "",
    role: "user"
}

function LoginButtonAndDialogBox({ userState, setUserState, isOpen, setIsOpen }) {
    const [loginState, setLoginState] = useState("user-account")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(userData);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const toast = useToast();


    useEffect(() => {
        setLoginState("user-account");
        setFormData(userData);
        setShowPassword(false);
        setShowConfirmPassword(false);
    }, [isOpen, setIsOpen])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneNoChange = (e) => {
        if (e.target.value.length <= 10) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword || formData.gender === "Select Gender" || !formData.DOB) {
            toast("Required All Fields!!")
            return
        }

        if (formData.phone.length > 10 || formData.phone.length < 10) {
            toast("Phone Number is Invalid ...");
            return
        }

        if (formData.password !== formData.confirmPassword) {
            toast("Password and Confirm Password doesn't match..")
            return
        }

        registerUser(formData).then((res) => {
            if (res.id) {
                setFormData(userData);
                toast("User Created Successfully ...");
                setUserState("login");
            } else {
                if (res.message === "Firebase: Error (auth/email-already-in-use).")
                    toast("Email already Registered.")
            }
        })
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast("Required all fields!")
            return
        }

        loginUser(formData).then((res) => {
            if (res.id !== null) {
                dispatch(login(res))
                toast("Logged In Successfully.")
                if (res?.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/shop")
                }

                setIsOpen(false);
                setFormData(userData);
            }
            else {
                if (res.message === "Firebase: Error (auth/invalid-credential).") {
                    toast("Email or Password is Incorrect.");
                }
            }
        })
    }

    return (
        <>
            <button className="flex items-center gap-2 font-semibold bg-[rgb(8,43,61)] text-white px-2 border border-[rgb(8,43,61)] h-10 lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 text-sm lg:text-base rounded-xl" onClick={() => { setIsOpen(true), setUserState("login") }}>
                <img src={accountIcon} alt="" className="h-6 lg:h-7 lg:w-7 hidden md:block" />
                SignUp
            </button>
            {
                userState === "signup" ?
                    <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="h-[550px] lg:h-[700px] w-[320px] xl:w-[1100px] p-6 bg-slate-200 rounded-[30px] flex flex-col gap-5" parentDivClassName="flex justify-center items-center" >
                        {/* <div className="flex justify-between gap-1 text-base font-medium w-full h-[8%]">
                            <button name="user-account" onClick={() => setLoginState("user-account")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "user-account" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>User Account</button>
                            <button name="seller-account" onClick={() => setLoginState("seller-account")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "seller-account" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>Seller Account</button>
                            <button name="creator-collab" onClick={() => setLoginState("creator-collab")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "creator-collab" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>Creator Collab Account</button>
                            <button name="job-account" onClick={() => setLoginState("job-account")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "job-account" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>Job Account</button>
                            <button name="artist-account" onClick={() => setLoginState("artist-account")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "artist-account" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>Artist Account</button>
                        </div> */}
                        <div className="flex gap-8 w-full h-full">
                            <div className="w-1/2 h-full hidden lg:block bg-white font-bold rounded-3xl shadow-[0_0_10px_-3px_rgb(8,34,61)] p-5"></div>

                            <div className="w-full xl:w-1/2 h-full flex flex-col justify-between gap-8">
                                <div className="flex flex-col justify-center items-center gap-1">
                                    <img src={mainLogo} alt="" className="w-40 xl:w-40 mb-5" />
                                    <p className="font-bold text-[15px] xl:text-xl h-5">Became the Member of LXS Universe!</p>
                                    <p className="text-xs font-medium h-2 leading-[1.1] opacity-60 text-center mt-1">Unlock Personalised Shopping, Exclusive Rewards & a Seamless Experience</p>
                                    <div className="flex flex-col gap-1 mt-10 relative">
                                        <div id="recaptcha-container"></div>
                                        <form className="space-y-3 lg:space-y-4 flex flex-col text-xs lg:text-sm px-5" onSubmit={handleSignUpSubmit}>
                                            <div className="flex space-x-2 lg:space-x-3 text-[rgb(8,43,61)]">
                                                <input name="name" type="text" value={formData.name} onChange={handleChange} className="h-8 w-[65%] rounded-xl bg-white px-3 font-semibold placeholder:text-[rgb(8,43,61,0.5)] focus:outline-none shadow-md border border-slate-300 placeholder:opacity-70" autoComplete="off" placeholder="Full Name" />
                                                <div className="relative h-8 w-[35%] ">
                                                    <input name="phone" type="number" value={formData.phone} onChange={handlePhoneNoChange} className="h-full w-full rounded-xl bg-white pl-[42px] pr-3 font-semibold placeholder:text-[rgb(8,43,61,0.5)] focus:outline-none shadow-md border border-slate-300 placeholder:opacity-70" autoComplete="off" placeholder="Contact No." />
                                                    <p className="font-semibold absolute top-[6px] left-[8px]">+91</p>
                                                    <hr className="border w-8 absolute left-[20px] opacity-20 top-[15px] rotate-90 border-[rgb(8,43,61)]" />
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 lg:space-x-3 text-[rgb(8,43,61)]">
                                                <select name="gender" value={formData.gender} onChange={handleChange} className="h-8 w-[50%] rounded-xl bg-white pl-2 pr-5 font-semibold focus:outline-none shadow-md border border-slate-300">
                                                    {
                                                        gender.map((item, idx) =>
                                                            <option key={idx} value={item} disabled={idx === 0} className="font-semibold">{item}</option>
                                                        )
                                                    }
                                                </select>
                                                <div className="relative h-8 w-[50%] ">
                                                    <input name="DOB" type="date" value={formData.DOB} onChange={handleChange} className="h-full w-full rounded-xl bg-white px-3 font-semibold placeholder:text-[rgb(8,43,61,0.5)] focus:outline-none shadow-md border border-slate-300 placeholder:opacity-70 placeholder:uppercase" autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 lg:space-x-3">
                                                <input name="email" type="text" value={formData.email} onChange={handleChange} className="h-8 w-full rounded-xl bg-white px-3 font-semibold placeholder:text-[rgb(8,43,61,0.5)] focus:outline-none shadow-md border border-slate-300 placeholder:opacity-70" placeholder="Email" autoComplete="off" />
                                            </div>
                                            <input
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                autoComplete="off"
                                                className="h-8 w-full rounded-xl bg-white px-3 font-semibold placeholder:text-[rgb(8,43,61,0.5)] focus:outline-none shadow-md border border-slate-300 placeholder:opacity-70"
                                            />
                                            <input
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                autoComplete="off"
                                                className="h-8 w-full rounded-xl bg-white px-3 font-semibold placeholder:text-[rgb(8,43,61,0.5)] focus:outline-none shadow-md border border-slate-300 placeholder:opacity-70"
                                            />
                                            <button type="submit" className="h-8 lg:h-9 px-5 text-sm lg:text-lg rounded-full font-bold text-white bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] relative lg:top-2 self-center lg:hover:scale-[1.05] lg:active:scale-[0.9] duration-200">Create Account</button>
                                        </form>
                                        <p className="text-xs text-center mt-2 font-medium">Already have an Account? <button className="text-[rgb(253,84,120)] lg:hover:underline font-bold" onClick={() => {
                                            setUserState("login")
                                            setFormData(userData)
                                        }}>Log In</button></p>
                                        <button
                                            type="button"
                                            className="absolute right-7 top-[152px] "
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <img src={!showPassword ? viewPasswordIcon : hidePasswordIcon} alt="" className="h-5 relative top-[2px]" />
                                        </button>
                                        <button
                                            type="button"
                                            className="absolute right-7 top-[200px]"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            <img src={!showConfirmPassword ? viewPasswordIcon : hidePasswordIcon} alt="" className="h-5 relative top-[2px]" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-center ">By Creating an account you agree to LXS Store's <br /><Link onClick={() => setIsOpen(false)} to="/terms-and-conditions" className="font-bold lg:hover:underline active:underline">Terms and Conditions</Link> and <Link onClick={() => setIsOpen(false)} to="/privacy-policy" className="font-bold lg:hover:underline active:underline">Privacy Policy</Link></p>

                            </div>
                        </div>
                    </DialogBox> :
                    <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="h-[550px] lg:h-[700px] w-[320px] xl:w-[1100px] p-6 rounded-[30px] flex flex-col gap-5 bg-slate-200" parentDivClassName="flex justify-center items-center" >
                        {/* <div className="flex justify-between gap-1 text-base font-medium w-full h-[8%]">
                            <button name="user-account" onClick={() => setLoginState("user-account")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "user-account" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>User Account</button>
                            <button name="seller-account" onClick={() => setLoginState("seller-account")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "seller-account" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>Seller Account</button>
                            <button name="creator-collab" onClick={() => setLoginState("creator-collab")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "creator-collab" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>Creator Collab Account</button>
                            <button name="job-account" onClick={() => setLoginState("job-account")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "job-account" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>Job Account</button>
                            <button name="artist-account" onClick={() => setLoginState("artist-account")} className={`h-10 px-5 border border-[rgb(8,43,61)] hover:bg-[rgb(8,43,61)] hover:text-white rounded-full ${loginState === "artist-account" ? "bg-[rgb(8,43,61)] text-white" : ""}`}>Artist Account</button>
                        </div> */}
                        <div className="flex gap-8 w-full h-full">
                            <div className="w-1/2 h-full hidden lg:block bg-white font-bold rounded-3xl shadow-[0_0_10px_-3px_rgb(8,34,61)] p-5"></div>

                            <div className="w-full xl:w-1/2 h-full flex flex-col justify-between gap-8">
                                <div className="flex flex-col justify-center gap-1">
                                    <img src={mainLogo} alt="" className="w-40 xl:w-40 mb-5 self-center" />
                                    <p className="font-bold text-base xl:text-xl h-5 text-center">Welcome Back to our LXS Family!</p>
                                    <p className="text-xs font-medium h-2 leading-[1.1] opacity-60 mt-1 text-center">Continue to Explore, Experience and Express...</p>
                                    <div className="flex flex-col gap-2 px-5 mt-10">
                                        <form className="space-y-3 lg:space-y-4 flex flex-col items-center text-xs lg:text-sm w-full" onSubmit={handleLoginSubmit}>
                                            <input name="email" type="text" value={formData.email} onChange={handleChange} className="h-8 w-full rounded-xl px-3 font-semibold placeholder:text-[rgb(8,43,61,0.5)] focus:outline-none shadow-md border border-slate-300 placeholder:opacity-70" placeholder="Email" autoComplete="off" />
                                            <div className="relative h-8 w-full">
                                                <input
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password"
                                                    autoComplete="off"
                                                    className="h-8 w-full rounded-xl px-3 font-semibold placeholder:text-[rgb(8,43,61,0.5)] focus:outline-none shadow-md border border-slate-300 placeholder:opacity-70"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <img src={!showPassword ? viewPasswordIcon : hidePasswordIcon} alt="" className="h-5 relative top-[2px]" />
                                                </button>
                                            </div>
                                            <button className="h-8 lg:h-9 px-5 text-sm lg:text-lg rounded-full font-bold text-white bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] relative lg:top-2 self-center lg:hover:scale-[1.05] lg:active:scale-[0.9] duration-200" type="submit">Log In</button>
                                        </form>
                                        <div className="flex flex-col gap-1 items-center mt-5 ">
                                            <p className="text-xs font-medium">Don't have an Account? <button className="text-[rgb(253,84,120)] font-bold lg:hover:underline" onClick={() => {
                                                setUserState("signup")
                                                setFormData(userData)
                                            }}>Sign Up</button></p>
                                            <p className="text-xs font-medium">Lost Your Password?<Link className="text-[rgb(253,84,120)] font-bold lg:hover:underline"> Click to Reset</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-center mt-24 lg:mt-40 ">By Creating an account you agree to LXS Store's <br /><Link onClick={() => setIsOpen(false)} to="/terms-and-conditions" className="font-bold lg:hover:underline active:underline">Terms and Conditions</Link> and <Link onClick={() => setIsOpen(false)} to="/privacy-policy" className="font-bold lg:hover:underline active:underline ">Privacy Policy</Link></p>

                            </div>
                        </div>
                    </DialogBox>
            }
        </>
    )
}

export default LoginButtonAndDialogBox
