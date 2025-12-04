import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bee3D from './Bee3D';
import Leaf3D from './Leaf3D';
import CurlyVine3D from './CurlyVine3D';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Image Parallax (Slow, subtle depth)
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 2. Text Parallax (Moves slightly faster than scroll to fade out upward)
      gsap.to(textRef.current, {
        y: -100,
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 60%", // Fades out before bottom
          scrub: true
        }
      });

      // 3. Floating Elements Parallax (Multi-plane effect)
      // We select elements by class and read data-speed
      const elements = gsap.utils.toArray<HTMLElement>('.parallax-element');
      
      elements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.2');
        
        gsap.to(el, {
          y: (i, target) => {
             // Movement = ScrollDistance * Speed
             return speed * 300; 
          },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Text Entrance Animation (Initial Load)
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
      
      tl.from(".hero-word", {
        y: 150,
        opacity: 0,
        rotate: 5,
        stagger: 0.2,
        duration: 1.2
      })
      .from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 1
      }, "-=0.8")
      .from(".hero-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8
      }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[110vh] w-full overflow-hidden bg-brand-50 dark:bg-brand-950 transition-colors duration-700">
      {/* Parallax Background Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-60 transition-opacity duration-700"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1471193945509-9adadd0974ce?q=80&w=2070&auto=format&fit=crop")',
          backgroundPosition: 'center 40%'
        }}
      ></div>
      
      {/* Gradient Overlay - Adapts to connect with body color (brand-50 or stone-950) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/60 to-brand-50 dark:via-brand-950/60 dark:to-stone-950 transition-colors duration-700"></div>

      {/* --- Floating Elements Layer --- */}
      
      {/* Foreground - Faster Movement */}
      <div className="absolute top-[20%] right-[10%] z-20 hidden md:block parallax-element" data-speed="1.5">
        <Bee3D size={120} depth={1.2} />
      </div>

      <div className="absolute bottom-[10%] right-[15%] z-20 parallax-element" data-speed="1.2">
        <Leaf3D size={100} className="blur-[2px] opacity-70" variant={3} rotation={-15} delay={2} depth={1.5} />
      </div>

      {/* Midground - Normal/Slightly Faster Movement */}
      <div className="absolute top-[15%] left-[10%] parallax-element" data-speed="0.8">
         <Leaf3D size={80} className="blur-[1px]" variant={2} rotation={-45} depth={0.5} />
      </div>
      
      <div className="absolute bottom-[30%] left-[5%] parallax-element" data-speed="0.6">
        <Leaf3D size={60} className="opacity-60" variant={1} rotation={15} delay={1} depth={0.8} />
      </div>

      {/* Background - Slower Movement (Vines) */}
      <div className="absolute bottom-[10%] left-[20%] parallax-element" data-speed="-0.2">
        <CurlyVine3D size={160} className="opacity-40 blur-[1px]" variant={1} rotation={-20} depth={0.2} />
      </div>

      <div className="absolute top-[10%] right-[25%] parallax-element" data-speed="-0.1">
        <CurlyVine3D size={120} className="opacity-50" variant={2} rotation={45} depth={0.3} delay={1} />
      </div>

      <div className="absolute -bottom-[5%] right-[5%] parallax-element" data-speed="-0.3">
        <CurlyVine3D size={200} className="opacity-30 blur-sm" variant={1} rotation={10} depth={0.6} />
      </div>
      
      <div className="absolute top-[30%] right-[30%] parallax-element" data-speed="0.3">
        <Leaf3D size={40} className="opacity-40" variant={1} rotation={90} delay={0.5} depth={0.3} />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 pt-20">
        <h1 className="flex flex-col items-center justify-center font-serif text-[12vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter relative transition-colors duration-700">
          <span className="hero-word block text-brand-950 dark:text-brand-50 dark:mix-blend-overlay">PURE.</span>
          <div className="relative">
            <span className="hero-word block text-brand-600 dark:text-bee-400">WILD.</span>
            {/* Small bee interacting with text on mobile - slight parallax */}
            <div className="absolute -right-16 -top-4 md:hidden parallax-element" data-speed="1.2">
               <Bee3D size={60} depth={0.8} />
            </div>
          </div>
          <span className="hero-word block text-brand-950 dark:text-brand-50 dark:mix-blend-overlay">LIVING.</span>
        </h1>
        
        <p className="hero-sub mt-12 text-xl md:text-2xl text-brand-900/80 dark:text-brand-100/80 max-w-lg font-light tracking-wide leading-relaxed transition-colors duration-700">
          Reconnecting you with nature through ethically sourced, raw organic essentials.
        </p>
        
        <div className="hero-btn mt-12">
          <a 
            href="#products"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-900 dark:bg-bee-400 text-brand-50 dark:text-brand-950 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="relative z-10 font-bold tracking-wider text-sm uppercase mr-2">Explore Shop</span>
            <div className="bg-white/20 dark:bg-white/40 rounded-full p-1 group-hover:rotate-90 transition-transform duration-500">
               <ArrowDown size={16} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;