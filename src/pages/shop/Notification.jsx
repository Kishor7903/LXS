import { Switch } from "@/components/ui/switch"
import { editUserDetails } from "@/firebase/auth";
import { updateUserInfo } from "@/store/features/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Notification() {
    let { user } = useSelector(state => state.auth);
    let [loading, setLoading] = useState(true);
    let [notification, setNotification] = useState(null);
    let dispatch = useDispatch();

    const toggleSetting = async (category, key) => {
        const currentValue = notification[category][key];
        const newValue = !currentValue;

        if (category === "push" && newValue === true) {
            const token = await requestPermissionAndGetToken();
            if (token && token !== user?.permissions?.push) {
                await editUserDetails({
                    ...user,
                    permissions: {
                        ...user.permissions,
                        push: token
                    }
                });
            }
        }

        editUserDetails({
            ...user,
            notifications: {
                ...notification,
                [category]: {
                    ...notification[category],
                    [key]: newValue
                }
            }
        }).then(() => {
            dispatch(updateUserInfo({
                ...user,
                notifications: {
                    ...notification,
                    [category]: {
                        ...notification[category],
                        [key]: newValue
                    }
                }
            }))
        });
    };

    useEffect(() => {
        setNotification(user.notifications);
        setLoading(false);
    }, [user])


    return (
        <div className="w-full h-full pl-5 flex gap-5 ">
            <div className="w-[60%] flex flex-col justify-between font-medium">
                <div className="leading-[1] font-semibold h-10">Comms Control 🔔<br />
                    <p className="text-xs font-normal">Customize how you receive transmissions from the LXS galaxy.</p>
                </div>
                {
                    !loading ?
                        <div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
                            {Object.entries(notification)
                                .sort(([a], [b]) => a.localeCompare(b)) // sort categories alphabetically
                                .map(([category, options]) => (
                                    <div
                                        key={category}
                                        className="border border-slate-300 shadow-md px-4 py-2 rounded-xl bg-slate-100"
                                    >
                                        <h3 className="font-bold tracking-wide text-lg capitalize">
                                            {category.replace('_', ' ')}
                                        </h3>
                                        <div className="space-y-1 text-xs leading-3 ml-3">
                                            {Object.entries(options)
                                                .sort(([a], [b]) => a.localeCompare(b)) // sort options alphabetically
                                                .map(([key, value]) => (
                                                    <div key={key} className="flex justify-between items-center">
                                                        <span className="capitalize">{key.replace('_', ' ')}</span>
                                                        <Switch
                                                            checked={value}
                                                            onCheckedChange={() => toggleSetting(category, key)}
                                                            className="data-[state=unchecked]:bg-slate-100"
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        :
                        <div className="space-y-4 animate-pulse">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-200 px-4 py-3 rounded-xl shadow-sm space-y-1"
                                >
                                    {/* Section Title */}
                                    <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>

                                    {/* Toggle Rows */}
                                    {[...Array(3)].map((_, j) => (
                                        <div key={j} className="flex justify-between items-center pl-3">
                                            <div className="h-3 bg-gray-300 rounded w-36"></div>
                                            <div className="h-5 w-10 bg-gray-300 rounded-full"></div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                }
            </div>
            <div className="border w-[40%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>

    )
}

export default Notification
