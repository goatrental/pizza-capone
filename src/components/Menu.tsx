import React, { useState, useEffect } from "react";
import { Search, X, Plus, Minus, ShoppingCart } from "lucide-react";
import { MenuItem } from "./MenuItem";
import { ProductModal } from "./ProductModal";
import { useMenu } from "../hooks/useMenu";
import { Product, OrderItem } from "../types/menu";

export const Menu: React.FC = () => {
  const {
    categories,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useMenu();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleAddToOrder = (item: OrderItem) => {
    const existingItem = orderItems.find(
      (orderItem) =>
        orderItem.name === item.name &&
        orderItem.size === item.size &&
        JSON.stringify(orderItem.ingredients) ===
          JSON.stringify(item.ingredients)
    );

    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem === existingItem
            ? { ...orderItem, quantity: orderItem.quantity + item.quantity }
            : orderItem
        )
      );
    } else {
      setOrderItems([...orderItems, item]);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <section
        id="menu"
        className="py-20 bg-gradient-to-b from-amber-900/20 to-zinc-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
              Široká nabídka italských jídel
            </h2>
            <p className="text-xl text-amber-200 italic">
              Každý náš pokrm vypráví svůj vlastní příběh
            </p>
          </div>

          {/* Search Bar */}
          <div className="sticky top-20 bbg-zinc-900/95 backdrop-blur-md border border-amber-800/30 rounded-bot-2xl p-4 mb-8 z-30">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Vyhledat pokrm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-zinc-800/80 border border-amber-700/50 rounded-full text-amber-100 placeholder-amber-400/60 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-yellow-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <p className="text-center text-amber-400/80 text-sm mt-2 italic">
                  Nalezeno {filteredProducts.length} výsledků pro "{searchTerm}"
                </p>
              )}
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-yellow-400 text-zinc-900"
                  : "bg-zinc-800/80 text-amber-100 border border-amber-700/50 hover:bg-yellow-400 hover:text-zinc-900 hover:-translate-y-1"
              }`}
            >
              Vše
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-yellow-400 text-zinc-900"
                    : "bg-zinc-800/80 text-amber-100 border border-amber-700/50 hover:bg-yellow-400 hover:text-zinc-900 hover:-translate-y-1"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <MenuItem
                  key={`${product.categoryName}-${product.name}`}
                  product={product}
                  searchTerm={searchTerm}
                  onClick={() => setSelectedProduct(product)}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-yellow-400 mb-4">
                    Žádné výsledky
                  </h3>
                  <p className="text-amber-200 mb-6">
                    Pro hledaný výraz "{searchTerm}" nebyly nalezeny žádné
                    pokrmy.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="bg-gradient-to-r from-amber-600 to-yellow-500 text-zinc-900 px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Vymazat vyhledávání
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToOrder={handleAddToOrder}
        />
      )}
    </>
  );
};
