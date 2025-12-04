import React, { useEffect, useRef } from 'react';
import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react';
import Bee3D from './Bee3D';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-brand-950 dark:bg-black text-brand-50 pt-32 pb-12 rounded-t-[3rem] relative overflow-hidden transition-colors duration-500">
      {/* Footer Bee */}
      <div className="absolute top-20 right-[20%] opacity-50 pointer-events-none">
        <Bee3D size={150} delay={1.5} />
      </div>

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brand-900 dark:bg-stone-900 rounded-lg">
                <Leaf className="text-bee-400" size={28} />
              </div>
              <span className="font-serif text-3xl font-bold">PLANT BOX</span>
            </div>
            <p className="text-brand-200/60 dark:text-stone-500 text-lg leading-relaxed">
              We exist to bridge the gap between modern living and ancient wellness. 
              Simple, effective, and always straight from the source.
            </p>
          </div>
          
          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="font-sans font-bold text-white mb-6 uppercase tracking-wider text-xs">Shop</h4>
              <ul className="space-y-4 text-brand-200/60 dark:text-stone-500 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Edibles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skincare</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bundles</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-sans font-bold text-white mb-6 uppercase tracking-wider text-xs">Company</h4>
              <ul className="space-y-4 text-brand-200/60 dark:text-stone-500 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-900 dark:border-stone-900 flex flex-col md:flex-row justify-between items-center text-sm text-brand-200/30 dark:text-stone-700 gap-4">
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>
          <div className="flex gap-8">
             <p>© {new Date().getFullYear()} PLANT BOX.</p>
             <a href="#" className="hover:text-white">Privacy</a>
             <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
        
        {/* Big Text Overlay */}
        <div className="mt-16 text-center opacity-5 pointer-events-none">
          <h1 className="text-[15vw] font-serif font-black leading-none tracking-tight text-white dark:text-stone-800">NATURAL</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;