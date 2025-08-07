// components/GlobalDropdown.jsx
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const GlobalDropdown = ({
  options = [],
  selected,
  onSelect,
  renderLabel = (val) => val,
  className = '',
  dropdownClass = '',
  placeholder = 'Select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const openDropdown = (e) => {
    e.stopPropagation();
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    setIsOpen(true);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !triggerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const dropdown = (
    <div
      ref={dropdownRef}
      className={`dropdown-portal absolute z-[9999] text-center rounded-[6px] overflow-hidden bg-white border border-[rgb(8,43,61)] shadow-md ${dropdownClass}`}
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((val, index) => (
        <div
          key={index}
          onClick={() => {
            onSelect(val);
            setIsOpen(false);
          }}
          className={`px-2 py-1 text-sm font-semibold cursor-pointer hover:bg-[rgb(8,43,61)] hover:text-white`}
        >
          {renderLabel(val)}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        key={selected}
        className={`bg-[rgb(8,43,61)] rounded-full pl-2 pr-1 py-[3px] text-[11px] font-bold cursor-pointer flex items-center gap-1 ${className}`}
        onClick={openDropdown}
      >
        <span>{placeholder} : {renderLabel(selected)}</span>
        <i className="fi fi-br-angle-small-down relative top-[2px]"></i>
      </div>
      {isOpen && ReactDOM.createPortal(dropdown, document.body)}
    </>
  );
};

export default GlobalDropdown;
