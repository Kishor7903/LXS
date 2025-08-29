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
                    value: "Basic (Free)",
                    slug: ""
                },
                // {
                //     key: "subscription plan:",
                //     value: "Basic (Upgrade)",
                //     slug: ""
                // },
                // {
                //     key: "renewal data:",
                //     value: "12 Aug, 2025",
                //     slug: ""
                // },
                {
                    key: "account creation date & time:",
                    value: `${user.timestamp}`,
                    slug: ""
                },
            ],
        },
        // {
        //     name: "Linked Accounts & Third Parties Login",
        //     content: [
        //         {
        //             key: "google:",
        //             value: "view",
        //             slug: ""
        //         },
        //         {
        //             key: "Instagram:",
        //             value: "view",
        //             slug: ""
        //         },
        //         {
        //             key: "facebook:",
        //             value: "view",
        //             slug: ""
        //         },
        //         {
        //             key: "Twitter/X:",
        //             value: "view",
        //             slug: ""
        //         },
        //         {
        //             key: "Linkedin:",
        //             value: "view",
        //             slug: ""
        //         }
        //     ],
        // },
    ];

    return (
        <div className="w-full h-full pl-5 flex gap-5 ">
            <div className="w-[60%] flex flex-col justify-between">
            <div className="leading-[1] font-semibold h-10">Identity Deck 🪪<br />
                <p className="text-xs font-normal">This is your space - Adjust your profile, preferences, and cosmic controls</p>
            </div>
            <div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
            {
                accountData.map((items,index) => (
                    <div key={index} className="border border-slate-300 shadow-md bg-slate-100 px-4 pt-2 pb-4 rounded-xl">
                        <h3 className="font-bold tracking-wide text-lg capitalize">{items.name}</h3>
                        <div className="space-y-1 text-xs leading-3 mt-2 flex flex-col gap-1 font-medium ml-3">
                            {items.content.map((item,idx) => (
                                <div key={idx} className="">
                                    <span key={idx} className="capitalize mr-3 ">{item.key}</span>
                                    <span to={item.slug} className="capitalize text-[rgb(253,84,120)] font-semibold">{item.value}</span>
                                </div>
                            ))}
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

export default AccountPreference
