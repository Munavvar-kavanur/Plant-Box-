import React, { useEffect } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    id: 1,
    title: "The Healing Power of Raw Honey",
    excerpt: "Discover why unpasteurized honey has been a staple in Ayurvedic medicine for thousands of years.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
    date: "Oct 12, 2023",
    author: "Dr. A. Sharma",
    category: "Wellness"
  },
  {
    id: 2,
    title: "Sustainable Beekeeping Practices",
    excerpt: "How we protect our pollinators while harvesting nature's liquid gold. A look into our ethical sourcing.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop",
    date: "Sep 28, 2023",
    author: "Maya Lin",
    category: "Sustainability"
  },
  {
    id: 3,
    title: "Turmeric: The Golden Spice of Life",
    excerpt: "Beyond the kitchen: incorporating Musk Turmeric into your daily skincare routine for a natural glow.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop",
    date: "Sep 15, 2023",
    author: "Elena R.",
    category: "Skincare"
  }
];

const Blog: React.FC = () => {
  useEffect(() => {
    // Stagger animation for blog cards
    gsap.fromTo('.blog-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '#journal',
          start: 'top 70%',
        }
      }
    );
  }, []);

  return (
    <section id="journal" className="py-32 px-6 bg-brand-50 dark:bg-stone-950 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-text">
          <div>
            <span className="text-bee-500 font-bold tracking-widest uppercase text-xs mb-4 block">The Journal</span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-950 dark:text-brand-50">Stories from the Hive</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-brand-900 dark:text-brand-200 font-medium hover:text-bee-500 transition-colors mt-6 md:mt-0">
            View All Articles <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="blog-card group cursor-pointer flex flex-col h-full">
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-900 dark:text-brand-100 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl text-brand-950 dark:text-brand-50 mb-3 group-hover:text-bee-500 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-auto pt-4 border-t border-brand-100 dark:border-stone-800">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 dark:text-brand-200 group-hover:translate-x-2 transition-transform duration-300">
                  Read Article <ArrowRight size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <a href="#" className="inline-flex items-center gap-2 text-brand-900 dark:text-brand-200 font-medium hover:text-bee-500 transition-colors">
            View All Articles <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;