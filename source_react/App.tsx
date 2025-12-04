import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Process from './components/Process';
import ProductCard from './components/ProductCard';
import Highlight from './components/Highlight';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import CartDrawer from './components/CartDrawer';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import { products } from './data';
import { CartProvider } from './contexts/CartContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Global scroll animations
    const revealElements = gsap.utils.toArray('.reveal-text');
    revealElements.forEach((element: any) => {
      gsap.fromTo(element, 
        { y: 50, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Refresh ScrollTrigger to ensure positions are correct after DOM updates
    ScrollTrigger.refresh();
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen font-sans bg-brand-50 text-stone-800 selection:bg-bee-200 dark:bg-stone-950 dark:text-brand-50 transition-colors duration-300">
        <Navbar />
        <CartDrawer />
        
        <main>
          <Hero />
          
          {/* Philosophy Section */}
          <section id="about" className="py-32 px-6 dark:bg-stone-950 transition-colors duration-300">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="order-2 md:order-1 space-y-8 reveal-text">
                   <div className="w-16 h-[1px] bg-brand-900 dark:bg-brand-500"></div>
                   <h2 className="font-serif text-5xl md:text-7xl text-brand-950 dark:text-brand-50 leading-tight">
                     Rooted in <br/>
                     <span className="italic text-bee-500">Ancient Purity.</span>
                   </h2>
                   <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-md">
                     We don't just sell products; we curate elements of the earth. Every jar, bottle, and block is a testament to the unhurried wisdom of nature.
                   </p>
                   <div className="grid grid-cols-2 gap-8 pt-8">
                     <div>
                       <h4 className="font-bold text-brand-900 dark:text-brand-200 mb-2">100% Organic</h4>
                       <p className="text-sm text-stone-500 dark:text-stone-400">Certified sourcing from wild forests.</p>
                     </div>
                     <div>
                       <h4 className="font-bold text-brand-900 dark:text-brand-200 mb-2">Zero Additives</h4>
                       <p className="text-sm text-stone-500 dark:text-stone-400">Pure, potent, and untouched.</p>
                     </div>
                   </div>
                </div>
                <div className="order-1 md:order-2 relative group reveal-text">
                  <div className="absolute inset-0 bg-brand-200 dark:bg-brand-800 rounded-[2rem] rotate-3 group-hover:rotate-6 transition-transform duration-700 ease-out"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop" 
                    alt="Nature" 
                    className="relative rounded-[2rem] w-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* New Process Section */}
          <Process />

          {/* Marquee Separator */}
          <div className="w-full overflow-hidden bg-brand-950 py-10 border-y border-brand-800 dark:border-brand-900">
            <div className="flex">
               <div className="flex gap-16 min-w-full justify-around font-serif text-4xl md:text-6xl text-brand-50/20 items-center animate-marquee whitespace-nowrap px-8">
                 <span>ETHICAL</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
                 <span>SUSTAINABLE</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
                 <span>CONSCIOUS</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
                 <span>PURE</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
                 <span>WILD</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
               </div>
               <div className="flex gap-16 min-w-full justify-around font-serif text-4xl md:text-6xl text-brand-50/20 items-center animate-marquee whitespace-nowrap px-8">
                 <span>ETHICAL</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
                 <span>SUSTAINABLE</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
                 <span>CONSCIOUS</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
                 <span>PURE</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
                 <span>WILD</span>
                 <span className="w-3 h-3 rounded-full bg-bee-500"></span>
               </div>
            </div>
          </div>

          {/* Products Section */}
          <section id="products" className="py-32 px-6 bg-white dark:bg-stone-900 rounded-t-[3rem] -mt-10 relative z-10 transition-colors duration-300">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal-text">
                <div>
                  <span className="text-bee-500 font-bold tracking-widest uppercase text-xs mb-4 block">The Collection</span>
                  <h2 className="font-serif text-5xl md:text-6xl text-brand-950 dark:text-brand-50">Curated Essentials</h2>
                </div>
                <p className="text-stone-500 dark:text-stone-400 max-w-xs mt-6 md:mt-0">
                  Small batch production ensures the highest quality and potency in every item.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* New Highlight Section */}
          <Highlight />

          {/* New Testimonials Section */}
          <Testimonials />

          {/* New Blog Section */}
          <Blog />

          {/* CTA / Newsletter */}
          <section className="py-32 px-6 bg-brand-50 dark:bg-stone-950 border-t border-brand-200/50 dark:border-stone-800 transition-colors duration-300">
            <div className="container mx-auto max-w-4xl text-center reveal-text">
              <h2 className="font-serif text-5xl md:text-7xl text-brand-950 dark:text-brand-50 mb-8">Join the Hive</h2>
              <p className="text-xl text-stone-500 dark:text-stone-400 mb-12">Receive seasonal harvesting updates and exclusive wellness guides.</p>
              <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto relative z-10">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 rounded-full bg-white dark:bg-stone-900 border border-brand-200 dark:border-brand-800 focus:outline-none focus:border-bee-400 shadow-sm dark:text-white"
                />
                <button className="px-8 py-4 bg-brand-900 dark:bg-bee-500 text-white dark:text-brand-950 rounded-full font-bold hover:bg-brand-800 dark:hover:bg-bee-400 transition-colors shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </main>

        <Footer />
        <AIChat />
      </div>
    </CartProvider>
  );
};

export default App;