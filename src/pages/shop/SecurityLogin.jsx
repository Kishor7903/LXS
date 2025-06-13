import { Switch } from '@/components/ui/switch';
import { useState } from 'react'

function SecurityLogin() {

    const [security, setSecurity] = useState({
        "password management": {
            "change password:": "change",
            "forgot password:": "forgot",
        },
        "two factor authentication(2FA)": {
            "Authenticator app": false,
            "SMS Verification": false,
            "Email verification": false
        },
        "Logged In Devices": {
            "log out from all devices:": "view all",
        },
    });

    const toggleSetting = (category, key) => {
        setSettings((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: !prev[category][key],
            },
        }));
    };


    return (
        <div className="w-full space-y-2">
            <div className="leading-[1] font-semibold h-10">Guardian Console 🛡️<br />
                <p className="text-xs font-normal">Defend your data, verify your logins, and trace intrusions</p>
            </div>
            <div className="space-y-4">
                {Object.entries(security).map(([category, options]) => (
                    <div key={category} className="border border-[rgb(8,43,61)] px-4 py-2 rounded-xl shadow-[0px_5px_10px_-6px_rgb(8,43,61)]">
                        <h3 className="font-bold tracking-wide text-lg capitalize">{category.replace('_', ' ')}</h3>
                        <div className="space-y-1 text-xs mt-2 ml-3">
                            {Object.entries(options).map(([key, value]) => (
                                <div key={key} className={`flex items-center font-medium ${value === true || value === false ? "justify-between" : " gap-3 "}`}>
                                    <span className="capitalize">{key.replace('_', ' ')}</span>
                                    {
                                        value === true || value === false ? (
                                            <Switch checked={value} onCheckedChange={() => toggleSetting(category, key)} />
                                        ) :
                                            (<span className="capitalize text-[rgb(240,85,120)]">{value}</span>)
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SecurityLogin
