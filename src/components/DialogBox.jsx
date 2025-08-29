import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function DialogBox({ isOpen, setIsOpen, className, children, parentDivClassName }) {
    const dialogRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleBackButton = (event) => {
            setIsOpen(false);
        };

        if (isOpen) {
            // Push a new state so that back button will trigger popstate
            window.history.pushState({ popupOpen: true }, "");
            window.addEventListener("popstate", handleBackButton);
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        }

        return () => {
            window.removeEventListener("popstate", handleBackButton);
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen absolute z-40">
            {isOpen && (
                <div className={`fixed inset-0 flex bg-[rgb(8,43,61)] bg-opacity-50 z-40 ${parentDivClassName}`}>
                    <motion.div
                        ref={dialogRef}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`min-h-40 min-w-60 shadow-md z-40 ${className}`}
                    >
                        {children}
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default DialogBox;
