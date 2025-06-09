// PhoneLogin.jsx
import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase/FirebaseConfig";

const PhoneLogin = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmation, setConfirmation] = useState(null);

    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "normal",
                callback: () => {
                    console.log("Recaptcha resolved");
                },
                'expired-callback': () => {
                    console.warn("reCAPTCHA expired");
                  },
            });
        }
    }, []);

    const handleSendOTP = async () => {
        try {
            const appVerifier = window.recaptchaVerifier;
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmation(confirmationResult);
            alert("OTP sent!");
        } catch (err) {
            console.error(err);
            alert("Failed to send OTP");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            await confirmation.confirm(otp);
            alert("Phone verified and user signed in!");
        } catch (err) {
            console.error(err);
            alert("Invalid OTP");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto space-y-4 relative top-80">
            <div id="recaptcha-container"></div>

            <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 w-full"
            />

            <button onClick={handleSendOTP} className="bg-blue-500 text-white px-4 py-2 rounded">
                Send OTP
            </button>

            {confirmation && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="border p-2 w-full"
                    />
                    <button onClick={handleVerifyOTP} className="bg-green-500 text-white px-4 py-2 rounded">
                        Verify OTP
                    </button>
                </>
            )}
        </div>
    );
};

export default PhoneLogin;
