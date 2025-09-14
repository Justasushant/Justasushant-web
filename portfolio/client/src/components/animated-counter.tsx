
import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  end: string | number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ end, duration = 2000, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Handle percentage
          if (typeof end === 'string' && end.includes('%')) {
            const numericEnd = parseInt(end.replace('%', ''));
            let startTime: number;
            
            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              
              setCount(Math.floor(progress * numericEnd));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }
          // Handle numbers with +
          else if (typeof end === 'string' && end.includes('+')) {
            const numericEnd = parseInt(end.replace('+', ''));
            let startTime: number;
            
            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              
              setCount(Math.floor(progress * numericEnd));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formatCount = () => {
    if (typeof end === 'string' && end.includes('%')) {
      return `${count}%`;
    } else if (typeof end === 'string' && end.includes('+')) {
      return `${count}+`;
    } else if (typeof end === 'string' && (end.includes('month') || end.includes('year'))) {
      return end; // Return the experience string as is
    }
    return count;
  };

  return (
    <div ref={elementRef} className={className}>
      {formatCount()}
    </div>
  );
}
