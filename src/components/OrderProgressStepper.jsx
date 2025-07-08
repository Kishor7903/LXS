import { motion } from "framer-motion";
import rocket from "../assets/commonIcons/Track Rocket (Fill).png"

export default function OrderProgressStepper({ steps, currentStep }) {
    return (
        <div className="relative pl-8">
            <div className={`absolute top-2 left-2 w-1 bg-gray-300 overflow-hidden rounded ${currentStep !== 0 ? currentStep !== 4 ? "h-[94%]" : "h-[87%]" : "h-[89%]"}`}>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(currentStep / (steps.length - (currentStep === 4 ? 1 : 1.5))) * 100}%` }}
                    transition={{ duration: 1 }}
                    className="w-full bg-[rgb(240,85,120)]"
                ></motion.div>
            </div>


            <div>
                {steps.map((step, index) => {
                    const isActive = index <= currentStep;

                    return (
                        <div key={index} className="relative mb-2">
                            {
                                index === currentStep ? (
                                    <img src={rocket} alt="" className="h-5 absolute -left-[37px] top-1" />
                                )
                                    :
                                    (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 1 * ((index + 1) / steps.length),
                                            }}
                                            className={`absolute -left-[30px] top-[1px] w-4 h-4 ${currentStep === index ? "bg-[rgb(240,85,120)]" : "bg-white"} rounded-full border-4 mt-1 ${isActive ? "border-[rgb(240,85,120)]" : "border-gray-300"
                                                }`}
                                        ></motion.div>
                                    )
                            }


                            <div>
                                <h3 className={`font-semibold text-lg ${isActive ? "opacity-100" : "opacity-40"} ${index === currentStep ? "text-[rgb(240,85,120)]" : ""}`}>
                                    {step.title}
                                </h3>
                                <div className="mt-1">
                                    {isActive && step.details && step.details.length > 0 && (
                                        <div className="flex flex-col gap-2">
                                            {step.details.map((detail, i) => (
                                                <p
                                                    key={i}
                                                    className="text-[rgb(8,43,61,0.8)] font-medium text-[13px] leading-4"
                                                >
                                                    {detail.text}
                                                    {detail.timestamp && (
                                                        <>
                                                            <br />
                                                            <span>{detail.timestamp}</span>
                                                        </>
                                                    )}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
