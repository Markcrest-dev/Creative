import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 500
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const childRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate tooltip position
  useEffect(() => {
    if (isVisible && childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      switch (position) {
        case 'top':
          setTooltipPosition({
            x: rect.left + rect.width / 2 + scrollLeft,
            y: rect.top + scrollTop - 10
          });
          break;
        case 'bottom':
          setTooltipPosition({
            x: rect.left + rect.width / 2 + scrollLeft,
            y: rect.bottom + scrollTop + 10
          });
          break;
        case 'left':
          setTooltipPosition({
            x: rect.left + scrollLeft - 10,
            y: rect.top + rect.height / 2 + scrollTop
          });
          break;
        case 'right':
          setTooltipPosition({
            x: rect.right + scrollLeft + 10,
            y: rect.top + rect.height / 2 + scrollTop
          });
          break;
      }
    }
  }, [isVisible, position]);

  // Handle mouse events
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Arrow classes for tooltip
  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-orange-500',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-orange-500',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-orange-500',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-orange-500'
  };

  return (
    <div
      className="inline-block relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={childRef}
    >
      {children}

      {isVisible && (
        <motion.div
          className="fixed z-50 px-3 py-2 text-sm text-white bg-orange-500 rounded-lg shadow-lg"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: position === 'top' || position === 'bottom'
              ? 'translateX(-50%)'
              : position === 'left' || position === 'right'
                ? 'translateY(-50%)'
                : 'none'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {content}
          <div
            className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;