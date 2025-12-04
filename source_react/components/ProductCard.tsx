import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data';
import { useCart } from '../contexts/CartContext';
import gsap from 'gsap';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Entrance Animation
    gsap.fromTo(cardRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
        }
      }
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, { scale: 1.1, duration: 0.8, ease: "power2.out" });
    gsap.to(btnRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.8, ease: "power2.out" });
    gsap.to(btnRef.current, { y: 20, opacity: 0, duration: 0.3 });
  };

  return (
    <div 
      ref={cardRef}
      className="group relative flex flex-col gap-4 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white dark:bg-brand-900/40 border border-brand-100 dark:border-brand-800 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/10 dark:hover:shadow-black/40">
        <img 
          ref={imageRef}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center will-change-transform dark:opacity-90"
        />
        
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-800 dark:text-brand-100 bg-white/95 dark:bg-brand-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-100 dark:border-brand-800 shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Add Button - Hidden initially */}
        <div className="absolute bottom-4 right-4 overflow-hidden">
          <button 
            ref={btnRef}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-2 bg-brand-500 dark:bg-bee-500 text-white dark:text-brand-950 px-5 py-3 rounded-full opacity-0 translate-y-4 shadow-lg shadow-brand-500/30 dark:shadow-bee-500/30 hover:bg-brand-600 dark:hover:bg-bee-400 transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-wide">Add</span>
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      {/* Info */}
      <div className="space-y-1 px-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-serif text-2xl font-medium text-brand-950 dark:text-brand-50 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
            {product.name}
          </h3>
          <span className="font-sans text-lg font-bold text-brand-500 dark:text-bee-400">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed line-clamp-2 max-w-[90%]">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;