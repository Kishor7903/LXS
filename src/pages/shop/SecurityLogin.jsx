import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react'

function SecurityLogin() {
    let [IP, setIP] = useState("");

    const securityData = [
        {
            name: "Two Factor Authentication(2FA)",
            content: [
                {
                    key: "Authenticator app",
                    value: "False",
                    slug: ""
                },
                {
                    key: "SMS Verification",
                    value: "False",
                    slug: ""
                },
                {
                    key: "Email Verification",
                    value: "False",
                    slug: ""
                },
            ],
        },
        {
            name:"Logged In Device",
            subHeading: IP,
            content: [
                {
                    key: "Log out from All Devices:",
                    value: "View All"
                }
            ]
        }
    ]

    // const [security, setSecurity] = useState({
    //     // "password management": {
    //     //     "change password:": "change",
    //     //     "forgot password:": "forgot",
    //     // },
    //     "two factor authentication(2FA)": {
    //         "Authenticator app": false,
    //         "SMS Verification": false,
    //         "Email verification": false
    //     },
    //     "Logged In Devices": {
    //         "log out from all devices:": "view all",
    //     },
    // });

    const toggleSetting = (category, key) => {
        setSettings((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: !prev[category][key],
            },
        }));
    };

    useEffect(() => {
        const fetchIP = async () => {
          try {
            const res = await fetch("https://api.ipify.org?format=json");
            const data = await res.json();
            setIP(data.ip);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchIP();
      }, []);


    return (
        <div className="w-full space-y-2">
            <div className="leading-[1] font-semibold h-10">Guardian Console 🛡️<br />
                <p className="text-xs font-normal">Defend your data, verify your logins, and trace intrusions</p>
            </div>
            <div className="space-y-4">
            {
                securityData.map((items,index) => (
                    <div key={index} className="border border-slate-300 shadow-md bg-slate-100 p-3 rounded-xl">
                        <div className="flex gap-5 items-center justify-between">
                            <h3 className="font-bold tracking-wide text-lg capitalize">{items.name}</h3>
                            {
                                items?.subHeading && (
                                    <span className='text-sm font-semibold opacity-70'>(Detected IP 🌍: {items.subHeading})</span>
                                )
                            }
                        </div>
                        <div className="space-y-1 text-xs leading-3 mt-2 flex flex-col gap-1 font-medium ml-3">
                            {items.content.map((item,idx) => (
                                <div className="">
                                    <span key={idx} className="capitalize mr-3 ">{item.key}</span>
                                    <span to={item.slug} className="capitalize text-[rgb(240,85,120)] ">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default SecurityLogin
