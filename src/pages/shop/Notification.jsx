import { Switch } from "@/components/ui/switch"
import { useState } from "react";


function Notification() {
    const [settings, setSettings] = useState({
        "Email Notification": {
            "order updates": false,
            "promotions & offers": false,
            "security Alerts": false,
        },
        "Push Notification": {
            "mobile App alerts": false,
            "browser notification": false,
        },
        "SMS & Whatsapp Notification": {
            "mobile App alerts": false,
            "browser notification": false,
        },
        "Newsletter Subscription": {
            "enable/disable marketing Emails": false,
            "select topic of interest(new arrival, trending, discount)": false,
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
        <div className="w-full space-y-3 font-medium">
            {Object.entries(settings).map(([category, options]) => (
                <div key={category} className="border border-[rgb(8,43,61)] px-4 py-2 rounded-xl">
                    <h3 className="font-bold tracking-wide text-lg capitalize">{category.replace('_', ' ')}</h3>
                    <div className="space-y-1 text-sm leading-3">
                        {Object.entries(options).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                                <span className="capitalize">{key.replace('_', ' ')}</span>
                                <Switch checked={value} onCheckedChange={() => toggleSetting(category, key)} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notification
