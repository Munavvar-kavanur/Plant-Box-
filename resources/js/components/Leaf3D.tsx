import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Leaf3DProps {
  className?: string;
  size?: number;
  delay?: number;
  variant?: 1 | 2 | 3;
  depth?: number; // 0 to 1, where 1 is closer/moves more
  rotation?: number;
}

const Leaf3D: React.FC<Leaf3DProps> = ({ 
  className = '', 
  size = 40, 
  delay = 0, 
  variant = 1, 
  depth = 0.5,
  rotation = 0
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Idle Animation (Floating & Swaying) on Inner Ref
      gsap.to(innerRef.current, {
        rotation: `+=${10 + Math.random() * 10}`,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });

      gsap.to(innerRef.current, {
        y: 15 + Math.random() * 10,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    }, wrapperRef);

    // 2. Mouse Interaction (Parallax) on Wrapper Ref
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      
      // Calculate movement based on depth
      // Elements closer (higher depth) move more opposite to mouse? 
      // Actually standard parallax: 
      // Close elements move MORE than far elements against the camera movement.
      // Here we simulate "looking around", so mouse moving right = view moving right = elements move left.
      
      const moveFactor = 30 * depth; 
      
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
    switch (variant) {
      case 2: // Rounded/Monstera-ish hint
        return "M50 95 C 20 80, 0 40, 30 10 C 60 -10, 90 20, 80 60 C 70 85, 60 95, 50 95 Z";
      case 3: // Long thin leaf
        return "M50 95 Q 30 50 20 10 Q 50 0 80 10 Q 70 50 50 95 Z";
      default: // Standard leaf
        return "M50 95 C 10 70, 0 30, 50 5 C 100 30, 90 70, 50 95 Z";
    }
  };

  return (
    <div 
      ref={wrapperRef} 
      className={`absolute pointer-events-none select-none z-10 ${className}`} 
      style={{ width: size, height: size }}
    >
      <div 
        ref={innerRef} 
        className="w-full h-full"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id={`leafGrad${variant}_${size}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#68c075" /> {/* brand-400 */}
              <stop offset="100%" stopColor="#2b7034" /> {/* brand-700 */}
            </linearGradient>
            <filter id="glow">
               <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
               <feMerge>
                   <feMergeNode in="coloredBlur"/>
                   <feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
          </defs>
          <path 
            d={getPath()} 
            fill={`url(#leafGrad${variant}_${size})`} 
            opacity="0.9"
          />
          {/* Vein */}
          <path d="M50 95 Q 50 50 50 15" stroke="#0e2812" strokeWidth="1" strokeOpacity="0.2" fill="none" />
          
          {/* Highlight */}
          <path d="M50 95 Q 35 60 40 25" stroke="white" strokeWidth="2" strokeOpacity="0.1" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default Leaf3D;