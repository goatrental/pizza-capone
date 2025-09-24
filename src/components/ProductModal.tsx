import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Product, OrderItem } from '../types/menu';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToOrder: (item: OrderItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToOrder,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product.sizes && Object.keys(product.sizes).length > 0) {
      setSelectedSize(Object.keys(product.sizes)[0]);
    } else {
      setSelectedSize('');
    }
    setSelectedIngredients([]);
    setQuantity(1);
  }, [product]);

  if (!isOpen) return null;

  const extractPrice = (priceString: string): number => {
    if (!priceString) return 0;
    const match = priceString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const getBasePrice = (): number => {
    if (selectedSize && product.sizes && product.sizes[selectedSize]) {
      return extractPrice(product.sizes[selectedSize]);
    }
    return extractPrice(product.price);
  };

  const getIngredientsPrice = (): number => {
    return selectedIngredients.reduce((total, ingredientName) => {
      const ingredient = product.ingredients?.find(ing => ing.name === ingredientName);
      return total + (ingredient ? extractPrice(ingredient.price) : 0);
    }, 0);
  };

  const getTotalPrice = (): number => {
    return (getBasePrice() + getIngredientsPrice()) * quantity;
  };

  const handleAddToOrder = () => {
    let itemName = product.name;
    if (selectedSize) {
      itemName += ` (${selectedSize})`;
    }
    if (selectedIngredients.length > 0) {
      itemName += ` + ${selectedIngredients.join(', ')}`;
    }

    const orderItem: OrderItem = {
      name: itemName,
      price: getTotalPrice() / quantity,
      quantity: quantity,
      size: selectedSize,
      ingredients: selectedIngredients,
    };

    onAddToOrder(orderItem);
    onClose();
  };

  const toggleIngredient = (ingredientName: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredientName)
        ? prev.filter(name => name !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-amber-700/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-amber-800/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-amber-300 hover:text-yellow-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="font-serif text-3xl font-bold text-yellow-400 pr-12">
            {product.name}
          </h2>
          <p className="text-amber-200 mt-2">{product.description}</p>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-amber-900/20 rounded-xl overflow-hidden border-2 border-yellow-400/30">
                <img
                  src="2pizza-cappone-placeholder-500x500.jpg"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size Selection */}
              {product.sizes && Object.keys(product.sizes).length > 0 && (
                <div>
                  <h4 className="font-serif text-xl text-yellow-400 mb-3">Velikost:</h4>
                  <div className="space-y-2">
                    {Object.entries(product.sizes).map(([size, price]) => (
                      <label
                        key={size}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedSize === size
                            ? 'border-yellow-400 bg-yellow-400/10'
                            : 'border-amber-700/50 bg-zinc-800/50 hover:border-yellow-400/50'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="size"
                            value={size}
                            checked={selectedSize === size}
                            onChange={() => setSelectedSize(size)}
                            className="mr-3 text-yellow-400"
                          />
                          <span className="text-amber-100 font-medium">{size}</span>
                        </div>
                        <span className="text-yellow-400 font-semibold">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients Selection */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h4 className="font-serif text-xl text-yellow-400 mb-3">Přidat ingredience:</h4>
                  <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                    {product.ingredients.map((ingredient) => (
                      <label
                        key={ingredient.name}
                        className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${
                          selectedIngredients.includes(ingredient.name)
                            ? 'border-yellow-400 bg-yellow-400/10'
                            : 'border-amber-700/50 bg-zinc-800/50 hover:border-yellow-400/50'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedIngredients.includes(ingredient.name)}
                            onChange={() => toggleIngredient(ingredient.name)}
                            className="mr-3 text-yellow-400"
                          />
                          <span className="text-amber-100 text-sm">{ingredient.name}</span>
                        </div>
                        <span className="text-yellow-400 font-semibold text-sm">
                          +{ingredient.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Display */}
              <div className="text-center py-4 bg-zinc-900/50 rounded-xl border border-amber-800/30">
                <div className="text-3xl font-bold text-yellow-400 font-serif">
                  {getTotalPrice()} Kč
                </div>
                <div className="text-amber-400 text-sm mt-1">
                  {quantity > 1 && `${getTotalPrice() / quantity} Kč × ${quantity}`}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-full bg-amber-700 text-white hover:bg-amber-600 disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-semibold text-amber-100 min-w-[3ch] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-amber-700 text-white hover:bg-amber-600 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToOrder}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-zinc-900 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                Přidat do košíku
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};