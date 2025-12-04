import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CurlyVine3DProps {
  className?: string;
  size?: number;
  delay?: number;
  variant?: 1 | 2;
  depth?: number;
  rotation?: number;
  opacity?: number;
}

const CurlyVine3D: React.FC<CurlyVine3DProps> = ({
  className = '',
  size = 100,
  delay = 0,
  variant = 1,
  depth = 0.5,
  rotation = 0,
  opacity = 0.6
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Idle Animation: gentle expansion/contraction
      gsap.to(innerRef.current, {
        rotation: `+=${5 + Math.random() * 5}`,
        scale: 1.05,
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });

      // Bobbing
      gsap.to(innerRef.current, {
        y: 10 + Math.random() * 5,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
      
      // Path drawing animation (subtle pulse)
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length });
        gsap.fromTo(pathRef.current, 
          { strokeDashoffset: 0 },
          { strokeDashoffset: 10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" }
        );
      }

    }, wrapperRef);

    // Mouse Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const moveFactor = 25 * depth;
      const x = (e.clientX / window.innerWidth - 0.5) * -moveFactor;
      const y = (e.clientY / window.innerHeight - 0.5) * -moveFactor;

      gsap.to(wrapperRef.current, {
        x: x,
        y: y,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [delay, depth]);

  const getPath = () => {
      if (variant === 1) {
          // Fiddlehead spiral
          return "M50,100 C50,70 10,60 30,30 C45,10 75,20 80,45 C82,55 70,65 60,60";
      } else {
          // Loose climbing tendril
          return "M40,100 C10,70 80,50 50,30 C35,20 45,5 55,10";
      }
  };

  return (
    <div
      ref={wrapperRef}
      className={`absolute pointer-events-none select-none z-0 ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      <div
        ref={innerRef}
        className="w-full h-full origin-bottom"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
           <defs>
             <linearGradient id={`vineGrad${variant}`} x1="0" y1="1" x2="0" y2="0">
               <stop offset="0%" stopColor="#2b7034" />
               <stop offset="100%" stopColor="#68c075" />
             </linearGradient>
           </defs>
           <path
            ref={pathRef}
            d={getPath()}
            stroke={`url(#vineGrad${variant})`}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
           {/* Decorative dots/buds */}
           {variant === 1 && (
               <circle cx="60" cy="60" r="3" fill="#68c075" />
           )}
           {variant === 2 && (
               <circle cx="55" cy="10" r="3" fill="#68c075" />
           )}
        </svg>
      </div>
    </div>
  );
};

export default CurlyVine3D;