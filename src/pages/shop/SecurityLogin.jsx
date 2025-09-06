import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react'

function SecurityLogin() {
    let [IP, setIP] = useState("");
    const [securityData, setSecurityData] = useState([
        {
            name: "Two Factor Authentication(2FA)",
            content: [
                { key: "Authenticator app", value: false, switch: true },
                { key: "SMS Verification", value: false, switch: true },
                { key: "Email Verification", value: false, switch: true },
            ],
        },
        {
            name: "Logged In Device",
            subHeading: true,
            content: [
                {
                    key: "Log out from All Devices:",
                    value: "View All",
                    switch: false,
                },
            ],
        },
    ]);

    const toggleSetting = (sectionIndex, itemIndex) => {
        setSecurityData((prev) => {
            const updated = [...prev];
            updated[sectionIndex] = { ...updated[sectionIndex] };
            updated[sectionIndex].content = [...updated[sectionIndex].content];
            updated[sectionIndex].content[itemIndex] = {
                ...updated[sectionIndex].content[itemIndex],
                value: !updated[sectionIndex].content[itemIndex].value,
            };
            return updated;
        });
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
        <div className="w-full h-full pl-5 flex gap-5 ">
            <div className="w-[60%] flex flex-col justify-between">
                <div className="leading-[1] font-semibold h-10">Guardian Console 🛡️<br />
                    <p className="text-xs font-normal">Defend your data, verify your logins, and trace intrusions</p>
                </div>
                <div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
                    {
                        securityData.map((items, index) => (
                            <div key={index} className="border border-slate-300 shadow-md bg-slate-100 px-4 pt-2 pb-4 rounded-xl">
                                <div key={index} className="flex gap-5 items-center justify-between">
                                    <h3 className="font-bold tracking-wide text-lg capitalize">{items.name}</h3>
                                    {
                                        IP && items.subHeading && (
                                            <span className='text-sm font-semibold opacity-70'>(Detected IP 🌍: {IP})</span>
                                        )
                                    }
                                </div>
                                <div className="text-xs leading-3 mt-2 flex flex-col gap-1 font-medium ml-3">
                                    {items.content.map((item, idx) =>
                                        item.switch ?
                                            <div key={idx} className="flex justify-between items-center">
                                                <span className="capitalize">{item.key}</span>
                                                <Switch
                                                    checked={item.value}
                                                    onCheckedChange={() => toggleSetting(index, idx)}
                                                    className="data-[state=unchecked]:bg-slate-100"
                                                />
                                            </div>
                                            :
                                            <div key={idx} className="">
                                                <span key={idx} className="capitalize mr-3 ">{item.key}</span>
                                                <span to={item.slug} className="capitalize text-[rgb(253,84,120)] ">{item.value}</span>
                                            </div>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="border w-[40%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>
    )
}

export default SecurityLogin
