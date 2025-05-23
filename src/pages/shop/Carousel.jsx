import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ carouselImg }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const intervalRef = useRef(null);

  const imageCount = carouselImg?.length || 0;

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [imageCount]);

  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 7000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    startTimer();
  };

  const goToNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % imageCount);
    resetTimer();
  };

  const goToPrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + imageCount) % imageCount);
    resetTimer();
  };

  const goToIndex = (i) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    resetTimer();
  };

  const slideVariants = {
    initial: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
      position: "absolute",
    }),
    animate: {
      x: "0%",
      opacity: 1,
      position: "absolute",
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 1,
      position: "absolute",
    }),
  };

  return (
    <div className="relative w-full overflow-hidden  border-b bg-white">
      <div className="relative h-52 sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[80vh]">
        <AnimatePresence custom={direction} initial={false}>
          <motion.img
            key={index}
            src={carouselImg[index]?.imgUrl}
            alt={carouselImg[index]?.alt || `Image ${index}`}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full object-fit"
          />
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button onClick={goToPrev} className="absolute hidden lg:block left-2 top-1/2 transform -translate-y-1/2 bg-black/40 h-10 w-10 rounded-full text-white z-10">
        <i className="fi fi-br-angle-left text-lg"></i>
      </button>
      <button onClick={goToNext} className="absolute hidden lg:block right-2 top-1/2 transform -translate-y-1/2 bg-black/40 h-10 w-10 rounded-full text-white z-10">
        <i className="fi fi-br-angle-right text-lg"></i>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-2 bg-black/25 py-1 px-2 rounded-2xl z-10">
        {carouselImg.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === i ? 'bg-white' : 'bg-black/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
