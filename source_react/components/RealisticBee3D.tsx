import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const RealisticBee3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterGroupRef = useRef<SVGGElement>(null);
  const leftWingRef = useRef<SVGPathElement>(null);
  const rightWingRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const antennaLeftRef = useRef<SVGPathElement>(null);
  const antennaRightRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hover / Bobbing Motion
      gsap.to(masterGroupRef.current, {
        y: -20,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Shadow breathes with the hover
      gsap.to(shadowRef.current, {
        scale: 0.85,
        opacity: 0.15,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // 2. Wing Flutter (High speed blur simulation)
      const wingSpeed = 0.08;
      
      gsap.to(rightWingRef.current, {
        scaleY: 0.2, // Compress to simulate flap
        skewX: 10,
        rotation: -5,
        transformOrigin: "10% 90%",
        duration: wingSpeed,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });

      gsap.to(leftWingRef.current, {
        scaleY: 0.2,
        skewX: -10,
        rotation: 5,
        transformOrigin: "90% 90%",
        duration: wingSpeed,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: 0.01 // Slight offset
      });

      // 3. Antennae Twitch
      gsap.to(antennaLeftRef.current, {
        rotation: 10,
        duration: 0.2,
        yoyo: true,
        repeat: 3,
        repeatDelay: 2,
        ease: "power1.inOut",
        transformOrigin: "bottom center"
      });

      gsap.to(antennaRightRef.current, {
        rotation: -10,
        duration: 0.2,
        yoyo: true,
        repeat: 3,
        repeatDelay: 2.5,
        ease: "power1.inOut",
        transformOrigin: "bottom center"
      });

      // 4. Mouse Interaction (Parallax & Tilt)
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Normalize (-1 to 1)
        const x = (e.clientX - centerX) / (window.innerWidth / 2);
        const y = (e.clientY - centerY) / (window.innerHeight / 2);

        // Body tilt and follow
        gsap.to(masterGroupRef.current, {
          x: x * 40,
          y: (y * 30) - 20, // maintain hover offset
          rotation: x * 15, // Z-axis rotation (banking)
          rotationY: x * 10, // Y-axis (turning)
          rotationX: -y * 10, // X-axis (pitching)
          duration: 1,
          ease: "power2.out"
        });

        // Head parallax (Head moves slightly differently than body)
        gsap.to(headRef.current, {
          x: x * 5,
          y: y * 5,
          duration: 1,
          ease: "power2.out"
        });

        // Shadow moves opposite to simulate light source consistency
        gsap.to(shadowRef.current, {
          x: x * 50,
          y: 350, // Fixed floor Y
          duration: 0.8,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-50/50 to-brand-100/50 dark:from-stone-900/50 dark:to-black/50 transition-colors duration-500 perspective-[1000px]">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-[600px] max-h-[600px] drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Fur Texture Filter */}
          <filter id="fuzzy">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>

          {/* Wing Iridescence */}
          <linearGradient id="wingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.3" />
          </linearGradient>

          {/* Gold Body Gradient */}
          <radialGradient id="goldBody" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#fbbf24" /> {/* Light Gold */}
            <stop offset="60%" stopColor="#d97706" /> {/* Amber */}
            <stop offset="100%" stopColor="#78350f" /> {/* Dark Brown */}
          </radialGradient>
          
          {/* Furry Black Gradient */}
          <radialGradient id="furBlack" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#44403c" />
            <stop offset="100%" stopColor="#1c1917" />
          </radialGradient>

          {/* Eye Gradient (Compound Eye look) */}
          <radialGradient id="eyeGrad" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#1e1e1e" />
            <stop offset="80%" stopColor="#000000" />
          </radialGradient>
        </defs>

        {/* Floor Shadow */}
        <ellipse 
          ref={shadowRef}
          cx="250" cy="380" rx="100" ry="20" 
          fill="black" opacity="0.2"
          className="blur-xl"
        />

        {/* Master Group */}
        <g ref={masterGroupRef} transform="translate(0, 0)">
          
          {/* --- Back Wings (Translucent) --- */}
          <path 
            ref={leftWingRef}
            d="M220 200 C 150 120, 50 100, 20 180 C 10 220, 100 250, 220 220 Z"
            fill="url(#wingGrad)"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          <path 
            ref={rightWingRef}
            d="M280 200 C 350 120, 450 100, 480 180 C 490 220, 400 250, 280 220 Z"
            fill="url(#wingGrad)"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />

          {/* --- Legs (Middle & Back) --- */}
          <g stroke="#292524" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
             {/* Back Left */}
             <path d="M230 300 Q 210 330 190 350" />
             {/* Back Right */}
             <path d="M270 300 Q 290 330 310 350" />
             {/* Mid Left */}
             <path d="M220 280 Q 180 300 170 320" />
             {/* Mid Right */}
             <path d="M280 280 Q 320 300 330 320" />
          </g>

          {/* --- Abdomen (Striped) --- */}
          <g>
            {/* Main Shape */}
            <ellipse cx="250" cy="300" rx="65" ry="90" fill="url(#goldBody)" />
            
            {/* Stripes (Curved for 3D effect) */}
            <path d="M195 280 Q 250 310 305 280" stroke="#292524" strokeWidth="18" fill="none" filter="url(#fuzzy)" opacity="0.9" />
            <path d="M200 330 Q 250 360 300 330" stroke="#292524" strokeWidth="14" fill="none" filter="url(#fuzzy)" opacity="0.9" />
            
            {/* Stinger */}
            <path d="M245 385 L 250 410 L 255 385" fill="#1c1917" />
          </g>

          {/* --- Thorax (Furry Middle) --- */}
          <circle cx="250" cy="220" r="55" fill="url(#furBlack)" filter="url(#fuzzy)" />

          {/* --- Head Group --- */}
          <g ref={headRef}>
            <circle cx="250" cy="160" r="45" fill="url(#furBlack)" />
            
            {/* Eyes */}
            <ellipse cx="225" cy="155" rx="15" ry="22" fill="url(#eyeGrad)" transform="rotate(-10 225 155)" />
            <ellipse cx="275" cy="155" rx="15" ry="22" fill="url(#eyeGrad)" transform="rotate(10 275 155)" />
            
            {/* Highlight on Eyes */}
            <circle cx="230" cy="148" r="4" fill="white" opacity="0.6" />
            <circle cx="270" cy="148" r="4" fill="white" opacity="0.6" />

            {/* Antennae */}
            <path ref={antennaLeftRef} d="M230 130 Q 210 80 190 90" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path ref={antennaRightRef} d="M270 130 Q 290 80 310 90" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Mandibles */}
            <path d="M240 195 Q 250 210 260 195" stroke="#292524" strokeWidth="2" fill="none" />
          </g>

          {/* --- Front Legs --- */}
           <g stroke="#292524" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
             <path d="M230 230 Q 200 250 190 270" />
             <path d="M270 230 Q 300 250 310 270" />
           </g>

        </g>
      </svg>
    </div>
  );
};

export default RealisticBee3D;