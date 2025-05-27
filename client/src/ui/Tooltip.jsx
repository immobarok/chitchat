import { useState, useRef, useEffect } from "react";

export const Tooltip = ({
  content,
  children,
  position = "top",
  delay = 200,
  disabled = false
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({});
  const tooltipRef = useRef(null);
  const childRef = useRef(null);
  let timeout;

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const showTooltip = () => {
    if (disabled) return;
    timeout = setTimeout(() => {
      const childRect = childRef.current.getBoundingClientRect();
      setCoords({
        left: childRect.left + window.scrollX,
        top: childRect.top + window.scrollY,
      });
      setVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setVisible(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={childRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {visible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 ${positions[position]} px-3 py-1.5 text-sm rounded-md bg-base-300 text-base-content shadow-lg border border-base-200 whitespace-nowrap transition-opacity duration-200`}
          style={{
            position: 'fixed',
            left: coords.left,
            top: coords.top,
          }}
        >
          {content}
          <div className={`absolute w-2 h-2 bg-base-300 transform rotate-45 ${position === 'top' ? 'bottom-[-0.25rem] left-1/2 -translate-x-1/2' :
              position === 'bottom' ? 'top-[-0.25rem] left-1/2 -translate-x-1/2' :
                position === 'left' ? 'right-[-0.25rem] top-1/2 -translate-y-1/2' :
                  'left-[-0.25rem] top-1/2 -translate-y-1/2'
            }`} />
        </div>
      )}
    </div>
  );
};