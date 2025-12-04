export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
