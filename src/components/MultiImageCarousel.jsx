import React, { useState, useEffect, useCallback, useMemo } from 'react';

const MultiImageCarousel = ({images}) => {
    const newImages = useMemo(() => [...images, ...images, ...images, ...images, ...images.slice(0, 5)], [images]);

    if (images.length < 5) {
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
        setCurrentIndex(prev => prev + 1);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            moveToNext();
        }, 4000);
        return () => clearInterval(timer);
    }, [moveToNext]);

    // Reset when reaching end
    useEffect(() => {
        if (currentIndex === newImages.length-5) {
            setTimeout(() => {
                setTransitionEnabled(false);
                setCurrentIndex(0);
                setTimeout(() => {
                    setTransitionEnabled(true);
                }, 50);
            }, 1000); // wait for transition to complete
        }
    }, [currentIndex, images.length]);

    const isTransitioning = !transitionEnabled;

    return (
        <div className="w-full overflow-hidden relative h-32 xl:h-80">
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

                    let scaleClass = `h-[210px] w-[210px] opacity-40`;

                    if (!isTransitioning) {
                        if (isCenter) scaleClass = "h-[300px] w-[300px]";
                        else if (isNeighbor) scaleClass = `h-[250px] w-[250px] opacity-40`;
                    }

                    return (
                        <div
                            key={`${index}-${image}`}
                            className={`w-1/3 xl:w-1/5 h-full flex-shrink-0 px-[1px] transition-transform duration-1000 ease-in-out flex justify-center items-center`}
                        >
                            <div
                                className={`relative transform ${scaleClass} ${
                                    index === currentIndex + centerOffset - 1 ? "mr-9" : ""
                                } ${index === currentIndex + centerOffset + 1 ? "ml-9" : ""} transition-all duration-1000 ease-in-out overflow-hidden`}
                            >
                                <img
                                    src={image.imgUrl}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-fit rounded-xl shadow-sm border"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultiImageCarousel;
