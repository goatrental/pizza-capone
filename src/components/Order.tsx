import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { OrderItem } from '../types/menu';

export const Order: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryType: '',
    deliveryAddress: '',
    deliveryTime: '',
    orderNotes: ''
  });
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickItems = [
    { name: 'Margherita della Nonna', price: 280 },
    { name: 'Don Capone Supreme', price: 420 },
    { name: 'Pepperoni Brotherhood', price: 300 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addToOrder = (name: string, price: number) => {
    const existingItem = orderItems.find(item => item.name === name);
    
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.name === name 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { name, price, quantity: 1 }]);
    }
  };

  const removeFromOrder = (name: string) => {
    const itemIndex = orderItems.findIndex(item => item.name === name);
    if (itemIndex > -1) {
      if (orderItems[itemIndex].quantity > 1) {
        setOrderItems(orderItems.map(item =>
          item.name === name 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ));
      } else {
        setOrderItems(orderItems.filter(item => item.name !== name));
      }
    }
  };

  const getTotalPrice = (): number => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderItems.length === 0) {
      alert('Prosím vyberte alespoň jednu položku do objednávky.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert('Objednávka byla úspěšně odeslána! Brzy vás budeme kontaktovat.');
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        deliveryType: '',
        deliveryAddress: '',
        deliveryTime: '',
        orderNotes: ''
      });
      setOrderItems([]);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="order" className="py-20 bg-gradient-to-b from-zinc-900 to-amber-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
            Objednávka
          </h2>
          <p className="text-xl text-amber-200 italic">
            Nabídka, kterou nemůžete odmítnout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-2xl p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="customerName" className="block text-yellow-400 font-medium mb-2">
                    Jméno a příjmení *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/60 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="customerPhone" className="block text-yellow-400 font-medium mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/60 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="customerEmail" className="block text-yellow-400 font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/60 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="deliveryType" className="block text-yellow-400 font-medium mb-2">
                    Typ objednávky *
                  </label>
                  <select
                    id="deliveryType"
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-amber-700/50 rounded-lg text-amber-100 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  >
                    <option value="">Vyberte možnost</option>
                    <option value="delivery">Rozvoz</option>
                    <option value="pickup">Vyzvednutí</option>
                  </select>
                </div>
              </div>

              {formData.deliveryType === 'delivery' && (
                <div className="mt-6">
                  <label htmlFor="deliveryAddress" className="block text-yellow-400 font-medium mb-2">
                    Adresa doručení *
                  </label>
                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    required={formData.deliveryType === 'delivery'}
                    rows={3}
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/60 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                  />
                </div>
              )}

              <div className="mt-6">
                <label htmlFor="deliveryTime" className="block text-yellow-400 font-medium mb-2">
                  Čas doručení/vyzvednutí *
                </label>
                <select
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-900/80 border border-amber-700/50 rounded-lg text-amber-100 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                >
                  <option value="">Vyberte čas</option>
                  <option value="asap">Co nejdříve</option>
                  <option value="30min">Za 30 minut</option>
                  <option value="1hour">Za 1 hodinu</option>
                  <option value="custom">Jiný čas</option>
                </select>
              </div>

              {/* Order Items */}
              <div className="mt-8 p-6 bg-zinc-900/60 rounded-xl border border-amber-800/30">
                <h4 className="font-serif text-xl text-yellow-400 mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Vaše objednávka
                </h4>
                
                {orderItems.length === 0 ? (
                  <p className="text-amber-300/80 text-center py-8 italic">
                    Zatím nemáte vybrané žádné položky
                  </p>
                ) : (
                  <div className="space-y-3">
                    {orderItems.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-amber-800/20">
                        <div className="flex-1">
                          <div className="font-medium text-amber-100">{item.name}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <button
                              type="button"
                              onClick={() => removeFromOrder(item.name)}
                              className="w-6 h-6 rounded-full bg-amber-700 text-white hover:bg-amber-600 transition-colors flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-amber-300 text-sm">{item.quantity}x</span>
                            <button
                              type="button"
                              onClick={() => addToOrder(item.name, item.price)}
                              className="w-6 h-6 rounded-full bg-amber-700 text-white hover:bg-amber-600 transition-colors flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-yellow-400 font-semibold">
                          {item.price * item.quantity} Kč
                        </div>
                      </div>
                    ))}
                    <div className="text-right pt-3 border-t border-amber-800/30">
                      <div className="text-xl font-bold text-yellow-400">
                        Celkem: {getTotalPrice()} Kč
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="orderNotes" className="block text-yellow-400 font-medium mb-2">
                  Poznámky k objednávce
                </label>
                <textarea
                  id="orderNotes"
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Speciální požadavky, alergie, atd."
                  className="w-full px-4 py-3 bg-zinc-900/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/60 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-gradient-to-r from-yellow-600 to-yellow-400 text-zinc-900 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {isSubmitting ? 'Odesílám objednávku...' : 'Odeslat objednávku'}
              </button>
            </form>
          </div>

          {/* Quick Order */}
          <div>
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-2xl p-6">
              <h4 className="font-serif text-xl text-yellow-400 text-center mb-6">
                Rychlá objednávka
              </h4>
              
              <div className="space-y-3">
                {quickItems.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => addToOrder(item.name, item.price)}
                    className="w-full p-4 bg-zinc-900/60 border border-amber-800/30 rounded-xl text-left transition-all duration-300 hover:bg-zinc-900 hover:border-yellow-400/50 hover:-translate-y-1 group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-amber-100 group-hover:text-yellow-400 transition-colors">
                        {item.name.split(' ').slice(-1)[0]}
                      </span>
                      <span className="text-yellow-400 font-semibold">
                        {item.price} Kč
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};