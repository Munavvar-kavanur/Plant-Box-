import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Wild Forest Honey",
    price: 24.00,
    description: "Raw, unfiltered honey harvested from deep forest hives. Rich in antioxidants and natural enzymes.",
    benefits: ["Boosts immunity", "Natural sweetener", "Soothes sore throats"],
    image: "https://picsum.photos/seed/honey/600/600",
    category: "Edible"
  },
  {
    id: 2,
    name: "Pure Beeswax Block",
    price: 15.50,
    description: "100% natural cosmetic grade beeswax with a mild, sweet aroma. Perfect for DIY balms and candles.",
    benefits: ["Natural skin barrier", "Vitamin A rich", "Great for DIY projects"],
    image: "https://picsum.photos/seed/wax/600/600",
    category: "Craft & Care"
  },
  {
    id: 3,
    name: "Musk Turmeric Powder",
    price: 18.00,
    description: "Premium wild musk turmeric (Kasturi Manjal) known for its aromatic and skin-brightening properties.",
    benefits: ["Improves complexion", "Anti-inflammatory", "Treats acne"],
    image: "https://picsum.photos/seed/turmeric/600/600",
    category: "Skincare"
  },
  {
    id: 4,
    name: "Virgin Coconut Oil",
    price: 12.00,
    description: "Cold-pressed from fresh coconut milk. Crystal clear, unrefined, and packed with healthy fats.",
    benefits: ["Deeply moisturizing", "Promotes hair growth", "Edible grade"],
    image: "https://picsum.photos/seed/coconut/600/600",
    category: "Oils"
  },
  {
    id: 5,
    name: "Aloe Vera Gel",
    price: 14.50,
    description: "Pure soothing gel extracted from organic aloe vera leaves. No added colors or fragrances.",
    benefits: ["Soothes sunburn", "Hydrates skin", "Reduces redness"],
    image: "https://picsum.photos/seed/aloe/600/600",
    category: "Skincare"
  },
  {
    id: 6,
    name: "Dried Hibiscus Petals",
    price: 9.00,
    description: "Sun-dried hibiscus flowers perfect for herbal tea or natural hair care infusions.",
    benefits: ["Rich in Vitamin C", "Lowers blood pressure", "Hair conditioning"],
    image: "https://picsum.photos/seed/hibiscus/600/600",
    category: "Edible"
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};