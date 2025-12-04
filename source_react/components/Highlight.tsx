import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bee3D from './Bee3D';
import Leaf3D from './Leaf3D';
import RealisticBee3D from './RealisticBee3D';

gsap.registerPlugin(ScrollTrigger);

const Highlight: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-12 px-4 md:px-8 relative">
      <div className="bg-brand-900 dark:bg-stone-900 rounded-[3rem] overflow-hidden text-brand-50 shadow-2xl shadow-brand-900/20 dark:shadow-black/50 relative transition-colors duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
          
          {/* Interactive 3D Element Side */}
          <div className="relative h-[500px] lg:h-auto overflow-hidden">
             <div className="absolute inset-0 z-0">
                <RealisticBee3D />
             </div>
             
             {/* Floating leaves overlay */}
             <Leaf3D size={150} className="bottom-10 left-10 blur-[2px] z-10 opacity-60" variant={2} rotation={20} depth={2} />
          </div>

          {/* Content Side */}
          <div className="p-12 md:p-24 flex flex-col justify-center space-y-10 relative">
            {/* Floating Bee for Highlight (Removed small decorative bee to avoid clutter with main bee) */}
            
            {/* Decorative Leaves on content side */}
            <Leaf3D size={60} className="-top-10 right-10 opacity-50" variant={3} rotation={135} delay={1.5} depth={0.4} />

            <div className="reveal-text relative z-10">
              <span className="inline-block px-4 py-2 rounded-full border border-bee-400/50 text-bee-400 text-xs font-bold tracking-widest uppercase mb-6 bg-bee-400/10">
                Editor's Pick
              </span>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] font-medium mb-6 text-white">
                Nature's <br/><span className="text-bee-400 italic">Architect.</span>
              </h2>
              <p className="text-xl text-brand-100/80 dark:text-stone-400 leading-relaxed max-w-md">
                Harvested only once a year during the full bloom of the Neelakurinji flowers. Our Wild Forest Honey isn't just a sweetener; it's a rare medicinal compound used in Ayurveda for centuries.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 reveal-text relative z-10">
              <div className="border-l border-brand-700 dark:border-stone-700 pl-6">
                <h4 className="text-3xl font-serif text-white mb-2">300+</h4>
                <p className="text-sm text-brand-300 dark:text-stone-500 uppercase tracking-wider">Medicinal Compounds</p>
              </div>
              <div className="border-l border-brand-700 dark:border-stone-700 pl-6">
                <h4 className="text-3xl font-serif text-white mb-2">0%</h4>
                <p className="text-sm text-brand-300 dark:text-stone-500 uppercase tracking-wider">Sugar Added</p>
              </div>
            </div>

            <div className="reveal-text pt-8 relative z-10">
              <a href="#products" className="inline-flex items-center gap-4 text-white hover:text-bee-300 transition-colors group">
                <span className="text-lg font-medium border-b border-white/30 pb-1 group-hover:border-bee-300">Purchase Limited Batch</span>
              </a>
            </div>
          </div>

        </div>
      </div>
      
      {/* Element spilling out of container */}
      <Leaf3D size={80} className="absolute -bottom-10 right-[10%] z-0" variant={1} rotation={-15} delay={0.5} depth={0.6} />
    </section>
  );
};

export default Highlight;