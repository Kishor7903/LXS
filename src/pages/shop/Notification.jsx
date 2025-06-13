import { Switch } from "@/components/ui/switch"
import { useState } from "react";


function Notification() {
    const [settings, setSettings] = useState({
        "Push Notification": {
            "order updates": false,
            "promotions & offers": false,
            "security Alerts": false,
        },
        "SMS Notification": {
            "order updates": false,
            "promotions & offers": false,
            "security Alerts": false,
        },
        "Whatsapp Notification": {
            "order updates": false,
            "promotions & offers": false,
            "security Alerts": false,
        },
        "Email Notification": {
            "order updates": false,
            "promotions & offers": false,
            "security Alerts": false,
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
        <div className="w-full space-y-2 font-medium">
            <div className="leading-[1] font-semibold h-10">Comms Control 🔔<br />
                <p className="text-xs font-normal">Customize how you receive transmissions from the LXS galaxy.</p>
            </div>
            <div className="space-y-4">
                {Object.entries(settings).map(([category, options]) => (
                    <div key={category} className="border border-[rgb(8,43,61)] px-4 py-2 rounded-xl shadow-[0px_5px_10px_-6px_rgb(8,43,61)]">
                        <h3 className="font-bold tracking-wide text-lg capitalize">{category.replace('_', ' ')}</h3>
                        <div className="space-y-1 text-xs leading-3 ml-3">
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
        </div>
    )
}

export default Notification
