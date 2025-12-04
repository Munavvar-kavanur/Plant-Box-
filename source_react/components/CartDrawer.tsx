import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../data';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API call
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col animate-slide-in-right transition-colors duration-300">
        <div className="p-6 flex items-center justify-between border-b border-stone-100 dark:border-stone-800">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">Your Basket</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full text-stone-500 dark:text-stone-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">Order Confirmed!</h3>
              <p className="text-stone-500 dark:text-stone-400 max-w-xs">
                Thank you for your purchase. Nature's goodness is on its way to your doorstep.
              </p>
              <button 
                onClick={() => { setIsSuccess(false); setIsCartOpen(false); }}
                className="mt-6 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-400">
                <ArrowRight size={32} />
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-lg">Your basket is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-brand-700 dark:text-brand-400 font-medium hover:underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-stone-900 dark:text-stone-100">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-stone-500 dark:text-stone-400 text-sm mb-3">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:border-stone-800 dark:hover:border-stone-500 text-stone-600 dark:text-stone-300 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center font-medium text-stone-900 dark:text-stone-100">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:border-stone-800 dark:hover:border-stone-500 text-stone-600 dark:text-stone-300 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && !isSuccess && (
          <div className="p-6 bg-stone-50 dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
              <span className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6 text-center">Shipping calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-brand-800 dark:bg-bee-500 hover:bg-brand-900 dark:hover:bg-bee-400 text-white dark:text-brand-950 py-4 rounded-xl font-medium shadow-lg shadow-brand-900/10 dark:shadow-black/20 transition-all flex justify-center items-center gap-2"
            >
              {isCheckingOut ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Checkout Securely <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;