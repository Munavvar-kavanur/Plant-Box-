import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const OrganicSphere3D: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sphereGroupRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGCircleElement>(null);
  const innerHighlightRef = useRef<SVGCircleElement>(null);
  const outerHighlightRef = useRef<SVGEllipseElement>(null);
  const bubblesRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Idle Float Animation
      gsap.to(sphereGroupRef.current, {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Shadow breathes with the float
      gsap.to(shadowRef.current, {
        scale: 0.9,
        opacity: 0.15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // 2. Mouse Interaction
      const handleMouseMove = (e: MouseEvent) => {
        if (!wrapperRef.current) return;
        
        const rect = wrapperRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Normalize mouse position (-1 to 1)
        const x = (e.clientX - centerX) / (window.innerWidth / 2);
        const y = (e.clientY - centerY) / (window.innerHeight / 2);

        // Move the main sphere slightly (follow)
        gsap.to(sphereGroupRef.current, {
          x: x * 20,
          y: y * 20 - 15, // Keep the -15 offset from idle
          rotation: x * 5,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        });

        // Move inner bubbles MORE (Parallax effect for depth)
        gsap.to(bubblesRef.current, {
          x: x * 40,
          y: y * 40,
          duration: 1.2,
          ease: "power2.out"
        });

        // Move highlights OPPOSITE (Refraction/Surface effect)
        gsap.to([innerHighlightRef.current, outerHighlightRef.current], {
          x: -x * 15,
          y: -y * 15,
          duration: 0.8,
          ease: "power2.out"
        });

        // Move shadow opposite to light source logic
        gsap.to(shadowRef.current, {
          x: x * 30,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full min-h-[500px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-50/50 to-brand-100/50 dark:from-stone-900/50 dark:to-black/50 transition-colors duration-500">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[600px] max-h-[600px] drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Main Body Gradient (Golden/Amber) */}
          <radialGradient id="sphereGrad" cx="0.4" cy="0.4" r="0.8">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" /> {/* bee-400 */}
            <stop offset="60%" stopColor="#d97706" stopOpacity="0.95" /> {/* bee-600 */}
            <stop offset="100%" stopColor="#78350f" stopOpacity="1" /> {/* bee-900 */}
          </radialGradient>

          {/* Inner Glow Gradient */}
          <radialGradient id="innerGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>

          {/* Bubble Gradient */}
          <radialGradient id="bubbleGrad" cx="0.4" cy="0.4" r="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
          </radialGradient>
          
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Shadow (Separate from floating group) */}
        <ellipse 
          ref={shadowRef}
          cx="200" cy="340" rx="80" ry="15" 
          fill="black" opacity="0.2"
          className="blur-xl"
        />

        {/* Floating Group */}
        <g ref={sphereGroupRef}>
          {/* Main Sphere Body */}
          <circle 
            ref={coreRef}
            cx="200" cy="200" r="120" 
            fill="url(#sphereGrad)"
            className="drop-shadow-lg"
          />

          {/* Back Rim Light (Simulated refraction) */}
          <circle 
            cx="200" cy="200" r="116" 
            fill="none" 
            stroke="url(#innerGlow)" 
            strokeWidth="4"
            className="opacity-50"
          />

          {/* Suspended Bubbles (Parallax Layer) */}
          <g ref={bubblesRef}>
            <circle cx="180" cy="180" r="8" fill="url(#bubbleGrad)" />
            <circle cx="230" cy="210" r="12" fill="url(#bubbleGrad)" />
            <circle cx="190" cy="240" r="5" fill="url(#bubbleGrad)" />
            <circle cx="210" cy="160" r="6" fill="url(#bubbleGrad)" />
          </g>

          {/* Main Specular Highlight (Surface Reflection) */}
          <ellipse 
            ref={outerHighlightRef}
            cx="160" cy="140" rx="40" ry="25" 
            fill="white" opacity="0.3"
            transform="rotate(-45 160 140)"
            filter="url(#softGlow)"
          />
          
          {/* Sharp Hotspot */}
          <circle 
            ref={innerHighlightRef}
            cx="150" cy="130" r="10" 
            fill="white" opacity="0.8"
            filter="url(#softGlow)"
          />

          {/* Bottom Refracted Light (Caustics simulation) */}
          <ellipse 
            cx="200" cy="290" rx="60" ry="20" 
            fill="#fbbf24" opacity="0.3"
            className="blur-md mix-blend-overlay"
          />
        </g>
      </svg>
    </div>
  );
};

export default OrganicSphere3D;