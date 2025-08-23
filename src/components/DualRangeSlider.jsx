import React, { useState, useRef, useEffect } from 'react';

const DualRangeSlider = ({ min, max, minValue, setMinValue, maxValue, setMaxValue}) => {
    let step = 50;
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(null); // 'min' or 'max' or null

  // Convert value to percentage relative to min/max
  const valueToPercent = (value) => ((value - min) / (max - min)) * 100;
  // Convert pixel position to value
  const pixelToValue = (pixelX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const relativeX = pixelX - rect.left;
    const percent = Math.min(Math.max(relativeX / rect.width, 0), 1);
    let val = min + percent * (max - min);
    // Snap to step
    val = Math.round(val / step) * step;
    return val;
  };

  const handlePointerDown = (thumb) => (e) => {
    e.preventDefault();
    setDragging(thumb);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    let newValue = pixelToValue(e.clientX);
    if (dragging === 'min') {
      if (newValue >= maxValue) newValue = maxValue - step;
      if (newValue < min) newValue = min;
      setMinValue(newValue);
    } else if (dragging === 'max') {
      if (newValue <= minValue) newValue = minValue + step;
      if (newValue > max) newValue = max;
      setMaxValue(newValue);
    }
  };

  const handlePointerUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    } else {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragging]);

  return (
    <div className="w-[148px] mx-auto select-none">
      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative h-[3px] mx-2 bg-gray-300 rounded"
        style={{ userSelect: 'none' }}
      >
        {/* Highlight Range */}
        <div
          className="absolute h-[3px] bg-[rgb(8,43,61)] rounded"
          style={{
            left: `${valueToPercent(minValue)}%`,
            right: `${100 - valueToPercent(maxValue)}%`,
          }}
        />

        {/* Min Thumb */}
        <div
          onPointerDown={handlePointerDown('min')}
          className="absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-[rgb(8,43,61)] rounded-full cursor-pointer touch-none"
          style={{ left: `${valueToPercent(minValue)}%`, transform: 'translate(-50%, -50%)' }}
        />

        {/* Max Thumb */}
        <div
          onPointerDown={handlePointerDown('max')}
          className="absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-[rgb(8,43,61)] rounded-full cursor-pointer touch-none"
          style={{ left: `${valueToPercent(maxValue)}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* <div className="flex justify-between mt-4 text-sm font-medium text-gray-700">
        <div>Min: {minValue}</div>
        <div>Max: {maxValue}</div>
      </div> */}
    </div>
  );
};

export default DualRangeSlider;
