import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import rocketGreen from "../assets/commonIcons/Track Rocket (Fill) Green.png";
import rocketYellow from "../assets/commonIcons/Track Rocket (Fill) Yellow.png";
import rocketPink from "../assets/commonIcons/Track Rocket (Fill) Pink.png";

export default function OrderProgressStepper({ steps, currentStep, currentState }) {
    const containerRef = useRef(null);
    const stepRefs = useRef([]);
    const [lineHeight, setLineHeight] = useState(0);
    const [lineTrackHeight, setLineTrackHeight] = useState("100%");


    useEffect(() => {
        const deliveredIndex = steps.findIndex(step => step.title.toLowerCase() === "delivered" || step.title.toLowerCase() === "cancelled");
        const cappedStep = deliveredIndex !== -1 ? Math.min(currentStep, deliveredIndex) : currentStep;

        if (stepRefs.current.length > 0) {
            const top = stepRefs.current[0]?.offsetTop ?? 0;

            // Full height of the gray line up to Delivered
            const deliveredBottom = stepRefs.current[deliveredIndex]?.offsetTop ?? 0;
            setLineTrackHeight(deliveredBottom - top);

            // Green progress height capped to current step or Delivered
            const currentBottom = stepRefs.current[cappedStep]?.offsetTop ?? 0;
            setLineHeight(currentBottom - top);
        }
    }, [currentStep, steps]);


    return (
        <div className="relative pl-8" ref={containerRef}>
            {/* Vertical progress background */}
            <div
                className="absolute top-2 left-[8.5px] w-[3px] bg-gray-300 overflow-hidden rounded"
                style={{ height: lineTrackHeight }}
            >
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: lineHeight }}
                    transition={{ duration: 1 }}
                    className="w-full bg-[rgb(38,165,65)]"
                />
            </div>

            <div>
                {steps.map((step, index) => {
                    const isActive = index <= currentStep;

                    return (
                        <div
                            key={index}
                            ref={(el) => (stepRefs.current[index] = el)}
                            className="relative mb-2"
                        >
                            {index === currentStep ? (
                                <motion.img
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 1 * ((index + 1) / steps.length),
                                    }}
                                    src={currentState === "Cancelled" ? rocketPink : currentState === "Delivered" ? rocketGreen : rocketYellow}
                                    alt=""
                                    className="h-5 absolute -left-[37px] top-1"
                                />
                            ) : (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 1 * ((index + 1) / steps.length),
                                    }}
                                    className={`absolute -left-[30px] top-[1px] w-4 h-4 ${currentStep === index
                                        ? "bg-[rgb(253,84,120)]"
                                        : "bg-white"
                                        } rounded-full border-4 mt-1 ${isActive
                                            ? "border-[rgb(38,165,65)]"
                                            : "border-gray-300"
                                        }`}
                                />
                            )}

                            <div>
                                <h3
                                    className={`font-semibold text-lg ${isActive ? index === currentStep ? currentState === "Cancelled" ? "text-[rgb(253,84,120)]" : currentState === "Delivered" ? "text-[rgb(34,197,94)]" : "text-[rgb(248,181,44)]" : "text-[rgb(34,197,94)]" : "opacity-40"
                                        }`}
                                >
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
