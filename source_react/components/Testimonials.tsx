import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white dark:bg-stone-950 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-24 reveal-text">
           <h2 className="font-serif text-4xl md:text-5xl text-brand-950 dark:text-brand-50 mb-6">Voices from the Wild</h2>
           <p className="text-stone-500 dark:text-stone-400">Join 10,000+ others rewilding their routine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {[
            {
              text: "I've tried countless organic brands, but Plant Box feels different. You can literally smell the forest in the turmeric jar. It's potent, raw, and absolutely beautiful.",
              author: "Elena R.",
              role: "Holistic Health Coach",
              product: "Musk Turmeric"
            },
            {
              text: "The beeswax block changed my DIY skincare game. It melts perfectly and has that subtle, sweet aroma that only comes from happy bees. A staple in my home.",
              author: "Marcus T.",
              role: "Artisan Maker",
              product: "Pure Beeswax"
            },
            {
              text: "Finally, coconut oil that actually tastes like fresh coconuts. I use it for everything—cooking, hair masks, and even on my dry skin. Pure magic in a bottle.",
              author: "Sarah J.",
              role: "Chef & Mom",
              product: "Virgin Coconut Oil"
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-6 reveal-text group">
              <div className="flex text-bee-400 gap-1 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="font-serif text-xl md:text-2xl text-brand-950 dark:text-brand-100 leading-relaxed italic">
                "{item.text}"
              </p>
              <div className="pt-4">
                <p className="font-bold text-sm text-brand-900 dark:text-brand-200 tracking-wide uppercase">{item.author}</p>
                <p className="text-xs text-stone-400 mt-1">{item.role}</p>
                <p className="text-xs text-bee-500 mt-2 font-medium">Verified Buyer • {item.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;