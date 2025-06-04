// import React, { useState, useEffect, useCallback } from 'react';

// const MultiImageCarousel = () => {
//     const images = [
//         'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
//         'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
//         'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
//     ];

//     let newImages = [...images, ...images];

//     // Minimum 5 images required
//     if (newImages.length < 5) {
//         throw new Error("Carousel requires at least 5 images");
//     }

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [transitionEnabled, setTransitionEnabled] = useState(true);

    // const moveToNext = useCallback(() => {
    //     setCurrentIndex(prev => {
    //         const nextIndex = prev + 1;

    //         if (nextIndex >= newImages.length - 4) {
    //             setTransitionEnabled(false);
    //             const newIndex = 0;
    //             setTimeout(() => {
    //                 setTransitionEnabled(true);
    //             }, 50);
    //             return newIndex;
    //         }
    //         return nextIndex;
    //     });
    // }, [newImages.length]);

    // useEffect(() => {
    //     const timer = setInterval(moveToNext, 4000);
    //     return () => clearInterval(timer);
    // }, [moveToNext]);

//     return (
//         <div className="w-full overflow-hidden relative h-32 xl:h-80 bg-gray-100">
//             <div
//                 className="flex h-full w-full"
//                 style={{
//                     transform: `translateX(-${currentIndex * (window.innerWidth >= 1280 ? 20 : 33.33)}%)`,
//                     transition: transitionEnabled ? 'transform 1s ease-in-out' : 'none',
//                 }}
//             >
//                 {newImages.map((image, index) => (
//                     <div
//                         key={`${index}-${image}`}
//                         className="w-1/3 xl:w-1/5 h-full flex-shrink-0 px-[1px]"
//                     >
//                         <div className="w-full h-full relative">
//                             <img
//                                 src={image}
//                                 alt={index}
//                                 className="w-full h-full object-cover rounded-lg shadow-sm"
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="h-full w-1/3 xl:w-2/5 bg-gradient-to-r from-[rgb(255,255,255,0.95)] to-[rgb(255,255,255,0.4)] absolute top-0 left-0"></div>
//             <div className="h-full w-1/3 xl:w-2/5 bg-gradient-to-l from-[rgb(255,255,255,0.95)] to-[rgb(255,255,255,0.4)] absolute top-0 right-0"></div>
//         </div>
//     );
// };

// export default MultiImageCarousel;

import React, { useState, useEffect, useCallback, useMemo } from 'react';

const MultiImageCarousel = () => {
    const images = [
        'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
        'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
        'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    ];

    const newImages = useMemo(() => [...images, ...images], [images]);

    if (newImages.length < 5) {
        throw new Error('Carousel requires at least 5 images');
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const visibleCount = windowWidth >= 1280 ? 5 : 3;
    const centerOffset = Math.floor(visibleCount / 2);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const moveToNext = useCallback(() => {
        setCurrentIndex(prev => {
            const nextIndex = prev + 1;
            if (nextIndex >= newImages.length - (visibleCount - 1)) {
                setTransitionEnabled(false);
                setTimeout(() => {
                    setCurrentIndex(0);
                    setTransitionEnabled(true);
                }, 50);
                return prev;
            }
            return nextIndex;
        });
    }, [newImages.length, visibleCount]);

    useEffect(() => {
        const timer = setInterval(moveToNext, 4000);
        return () => clearInterval(timer);
    }, [moveToNext]);

    return (
        <div className="w-full overflow-hidden relative h-32 xl:h-80 bg-gray-100">
            <div
                className="flex h-full w-full"
                style={{
                    transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                    transition: transitionEnabled ? 'transform 1s ease-in-out' : 'none',
                }}
            >
                {newImages.map((image, index) => {
                    const isCenter = index === currentIndex + centerOffset;
                    const isNeighbor =
                        index === currentIndex + centerOffset - 1 ||
                        index === currentIndex + centerOffset + 1;

                    let scaleClass = 'scale-75 opacity-10';
                    if (isCenter) scaleClass = 'scale-100';
                    else if (isNeighbor) scaleClass = 'scale-90 opacity-40';

                    return (
                        <div
                            key={`${index}-${image}`}
                            className={`w-1/3 xl:w-1/5 h-full flex-shrink-0 px-[1px] transition-transform duration-500 ease-in-out `}
                        >
                            <div
                                className={`w-full h-full relative transform ${scaleClass} transition-all duration-1000 ease-in-out overflow-hidden`}
                            >
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover rounded-xl shadow-sm border "
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Gradient overlays */}
            {/* <div className="h-full w-1/3 xl:w-2/5 bg-gradient-to-r from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.4)] absolute top-0 left-0 pointer-events-none" />
            <div className="h-full w-1/3 xl:w-2/5 bg-gradient-to-l from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.4)] absolute top-0 right-0 pointer-events-none" /> */}
        </div>
    );
};

export default MultiImageCarousel;
