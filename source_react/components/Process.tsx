import React, { useEffect } from 'react';
import { Mountain, Sprout, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bee3D from './Bee3D';

gsap.registerPlugin(ScrollTrigger);

const Process: React.FC = () => {
  useEffect(() => {
    // Add simple staggered reveal if not handled by global script properly for new components
    gsap.fromTo('.process-item', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: '.process-container', start: 'top 80%' } }
    );
  }, []);

  return (
    <section className="py-24 px-6 bg-brand-50 dark:bg-stone-950 border-t border-brand-100/50 dark:border-stone-800 process-container relative overflow-hidden transition-colors duration-300">
      {/* Decorative Bee */}
      <div className="absolute top-10 left-[10%] z-0 opacity-80">
        <Bee3D size={80} delay={1} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 reveal-text">
          <span className="text-bee-500 font-bold tracking-widest uppercase text-xs mb-4 block">The Process</span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-950 dark:text-brand-50">From Soil to Soul</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-brand-200/50 dark:bg-brand-800/50 -z-10 transform scale-x-75"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center group reveal-text process-item">
            <div className="w-24 h-24 bg-white dark:bg-brand-900/50 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 border border-brand-50 dark:border-brand-800">
              <Mountain size={32} className="text-bee-500" />
            </div>
            <h3 className="font-serif text-2xl text-brand-900 dark:text-brand-100 mb-4">Wild Harvest</h3>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">
              We trek into protected biospheres to harvest ingredients that grow wild, free from pesticides and human interference.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center group reveal-text process-item" style={{ transitionDelay: '100ms' }}>
            <div className="w-24 h-24 bg-white dark:bg-brand-900/50 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 border border-brand-50 dark:border-brand-800 relative">
              <Sprout size={32} className="text-bee-500" />
              {/* Small Bee interacting with icon */}
              <Bee3D size={40} className="absolute -top-4 -right-4" delay={0.5} />
            </div>
            <h3 className="font-serif text-2xl text-brand-900 dark:text-brand-100 mb-4">Gentle Curing</h3>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">
              Ingredients are sun-dried or cold-pressed within hours of harvest to lock in the potent enzymes and natural vitality.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center group reveal-text process-item" style={{ transitionDelay: '200ms' }}>
            <div className="w-24 h-24 bg-white dark:bg-brand-900/50 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 border border-brand-50 dark:border-brand-800">
              <HeartHandshake size={32} className="text-bee-500" />
            </div>
            <h3 className="font-serif text-2xl text-brand-900 dark:text-brand-100 mb-4">Conscious Trade</h3>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">
              We pay our partner farmers 30% above fair trade premiums, ensuring the guardians of the forest thrive alongside us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;