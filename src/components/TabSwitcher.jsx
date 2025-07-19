import { motion } from "framer-motion";

function TabSwitcher({activeTab, setActiveTab, tabs, layoutId, className="h-12 md:h-16 p-[6px] lg:p-2 w-full md:w-5/6"}) {

    return (
        <div className={`relative flex bg-[#0F2C3E] rounded-full mx-auto ${className}`}>
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`relative flex-1 px-1 lg:px-5 py-2 font-semibold cursor-pointer transition-colors duration-300 z-20 flex justify-center items-center text-[10px] md:text-sm lg:text-xl ${activeTab === tab ? "text-[rgb(8,43,61)]" : "text-white"}`}
              onClick={() => setActiveTab(tab)}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 bg-white rounded-full z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-20">{tab}</span>
            </div>
          ))}
        </div>
      );
}

export default TabSwitcher
