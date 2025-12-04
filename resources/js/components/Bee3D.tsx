import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Bee3DProps {
  className?: string;
  size?: number;
  delay?: number;
  depth?: number; // For parallax intensity
}

const Bee3D: React.FC<Bee3DProps> = ({ className = '', size = 64, delay = 0, depth = 1 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Idle Animation (Floating & Bobbing) - Applied to Inner Ref
      gsap.to(innerRef.current, {
        y: -15,
        rotation: 5,
        duration: 2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
      
      gsap.to(innerRef.current, {
        x: 10,
        duration: 3 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    }, wrapperRef);

    // 2. Mouse Interaction (Parallax) - Applied to Wrapper Ref
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      
      // Bees move more significantly if they are "closer" (higher depth)
      const moveFactor = 40 * depth; 

      const x = (e.clientX / window.innerWidth - 0.5) * -moveFactor;
      const y = (e.clientY / window.innerHeight - 0.5) * -moveFactor;

      gsap.to(wrapperRef.current, {
        x: x,
        y: y,
        duration: 1.2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [delay, depth]);

  return (
    <div 
      ref={wrapperRef} 
      className={`relative select-none pointer-events-none ${className}`} 
      style={{ width: size, height: size }}
    >
      <div ref={innerRef} className="w-full h-full">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xl"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="20" y1="50" x2="80" y2="50">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="stripeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <radialGradient id="wingGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Back Wing */}
          <path
            d="M60 40 C 90 10, 90 -10, 50 20 Z"
            fill="url(#wingGrad)"
            className="origin-bottom-left animate-flutter"
            style={{ animationDelay: '0.1s' }}
          />

          {/* Body */}
          <ellipse cx="50" cy="55" rx="30" ry="20" fill="url(#bodyGrad)" />
          
          {/* Stripes */}
          <path d="M40 37 Q 45 55 40 73" stroke="url(#stripeGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M55 36 Q 60 55 55 74" stroke="url(#stripeGrad)" strokeWidth="6" strokeLinecap="round" />
          
          {/* Stinger */}
          <path d="M80 55 L 90 55 L 80 55 Z" stroke="#451a03" strokeWidth="2" />

          {/* Eye */}
          <circle cx="35" cy="50" r="3" fill="#1e1e1e" />
          <circle cx="36" cy="49" r="1" fill="white" />

          {/* Front Wing */}
          <path
            d="M50 40 C 80 0, 20 -10, 40 40 Z"
            fill="url(#wingGrad)"
            className="origin-bottom-right animate-flutter"
          />
          
          {/* Antennae */}
          <path d="M30 40 Q 25 30 20 35" stroke="#451a03" strokeWidth="1.5" fill="none" />
          <path d="M35 38 Q 35 25 30 28" stroke="#451a03" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default Bee3D;