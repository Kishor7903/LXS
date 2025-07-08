import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext();

let toastId = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = toastId++;
    const newToast = { id, message };
    setToasts((prev) => [...prev, newToast]); // Add at END

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center z-50">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout // 👈 enables smooth reposition
              initial={{ opacity: 0, y: 20, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.7 }}
              transition={{ duration: 0.15, ease: "easeInOut", type: "spring", stiffness: 400, damping: 25 }}
              className="bg-gray-800 text-white px-4 py-3 rounded-[6px] shadow-lg max-w-96 text-center"
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
