import { useState } from 'react'

function AccountPreference() {

    const [account, setAccount] = useState({
        "Account Type & Status": {
            "account Type:": "User Account",
            "membership status:": "Free (Upgrade)",
            "subscription plan & renewal data:": "Basic (Free) 25.10.2024",
            "account creation date": "25.10.2024",
        },
        "Linked Accounts & Third Parties Login": {
            "google:": "Link",
            "Instagram": "Link",
            "facebook:": "Link",
            "Twitter/X": "Link",
            "Linkedin": "Link"
        },
    });

    return (
        <div className="w-full space-y-4">
            {Object.entries(account).map(([category, options]) => (
                <div key={category} className="border border-[rgb(8,43,61)] px-4 py-2 rounded-xl">
                    <h3 className="font-bold tracking-wide text-lg capitalize">{category.replace('_', ' ')}</h3>
                    <div className="space-y-1 text-xs leading-3 mt-2 flex flex-col gap-1 font-medium">
                        {Object.entries(options).map(([key, value]) => (
                            <div className="">
                                <span className="capitalize mr-3 ">{key.replace('_', ' ')}</span>
                                <span className="capitalize text-orange-500">{value.replace('_', ' ')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AccountPreference
