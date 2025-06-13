import { useSelector } from 'react-redux';

function AccountPreference() {
    let { user } = useSelector(state => state.auth);

    const accountData = [
        {
            name: "Account Type & Status",
            content: [
                {
                    key: "account Type:",
                    value: "User Account",
                    slug: ""
                },
                {
                    key: "membership status:",
                    value: "Free (Upgrade)",
                    slug: ""
                },
                {
                    key: "subscription plan & renewal data:",
                    value: "Basic (Free)",
                    slug: ""
                },
                {
                    key: "account creation date:",
                    value: `${user.timestamp.split(",")[0]}, ${user.timestamp.split(",")[1]}`,
                    slug: ""
                },
            ],
        },
        {
            name: "Linked Accounts & Third Parties Login",
            content: [
                {
                    key: "google:",
                    value: "view",
                    slug: ""
                },
                {
                    key: "Instagram:",
                    value: "view",
                    slug: ""
                },
                {
                    key: "facebook:",
                    value: "view",
                    slug: ""
                },
                {
                    key: "Twitter/X:",
                    value: "view",
                    slug: ""
                },
                {
                    key: "Linkedin:",
                    value: "view",
                    slug: ""
                }
            ],
        },
    ];

    return (
        <div className="w-full space-y-2">
            <div className="leading-[1] font-semibold h-10">Identity Deck 🪪<br />
                <p className="text-xs font-normal">This is your space - Adjust your profile, preferences, and cosmic controls</p>
            </div>
            <div className="space-y-4">
            {
                accountData.map((items,index) => (
                    <div key={index} className="border border-[rgb(8,43,61)] p-3 shadow-[0px_5px_10px_-6px_rgb(8,43,61)] rounded-xl">
                        <h3 className="font-bold tracking-wide text-lg capitalize">{items.name}</h3>
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

export default AccountPreference
