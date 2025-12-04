import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Leaf, Sun, Moon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const { setIsCartOpen, cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initial animation for navbar
    gsap.fromTo("nav", 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Initialize Theme - Default to Dark
    // Only set to light if the user has explicitly saved 'light' preference previously.
    if (localStorage.theme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      // Default case (includes no preference or 'dark' preference)
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 pt-6 px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        
        {/* Logo */}
        <div className="bg-white/90 dark:bg-brand-950/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg shadow-brand-900/5 dark:shadow-black/20 border border-brand-100 dark:border-brand-800 flex items-center gap-3 cursor-pointer group hover:bg-white dark:hover:bg-brand-900 transition-all duration-300">
          <div className="bg-brand-50 dark:bg-brand-900 p-1.5 rounded-full group-hover:bg-brand-100 dark:group-hover:bg-brand-800 transition-colors">
             <Leaf size={18} className="text-brand-600 dark:text-brand-400 fill-brand-600 dark:fill-brand-400" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-brand-950 dark:text-brand-50">
            PLANT BOX
          </span>
        </div>

        {/* Desktop Links - Floating Pill */}
        <div className="hidden md:flex items-center gap-8 px-8 py-3 bg-white/90 dark:bg-brand-950/80 backdrop-blur-xl rounded-full shadow-lg shadow-brand-900/5 dark:shadow-black/20 border border-brand-100 dark:border-brand-800 text-sm font-medium tracking-wide text-brand-900 dark:text-brand-100">
          <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#products" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors relative group">
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors relative group">
            Story
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#footer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-white/90 dark:bg-brand-950/80 backdrop-blur-xl p-3 rounded-full text-brand-950 dark:text-brand-100 shadow-lg border border-brand-100 dark:border-brand-800 hover:scale-105 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Cart */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-brand-900 dark:bg-bee-400 text-white dark:text-brand-950 p-3 rounded-full hover:bg-brand-800 dark:hover:bg-bee-500 transition-all shadow-xl hover:shadow-2xl hover:scale-105 relative group border border-brand-800 dark:border-bee-500"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-bee-400 dark:bg-brand-900 text-brand-950 dark:text-brand-50 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand-50 dark:border-bee-400 shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden bg-white/90 dark:bg-brand-950/80 backdrop-blur-xl p-3 rounded-full text-brand-950 dark:text-brand-100 shadow-lg border border-brand-100 dark:border-brand-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brand-50/95 dark:bg-stone-950/95 backdrop-blur-sm z-40 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden flex flex-col items-center justify-center pointer-events-auto`}>
        <div className="flex flex-col gap-8 text-center">
          <a href="#" className="font-serif text-4xl text-brand-900 dark:text-brand-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#products" className="font-serif text-4xl text-brand-900 dark:text-brand-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Collection</a>
          <a href="#about" className="font-serif text-4xl text-brand-900 dark:text-brand-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
          <a href="#footer" className="font-serif text-4xl text-brand-900 dark:text-brand-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;