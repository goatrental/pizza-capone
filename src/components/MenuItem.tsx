import React from "react";
import { ProductWithCategory } from "../types/menu";

interface MenuItemProps {
  product: ProductWithCategory;
  searchTerm?: string;
  onClick: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  product,
  searchTerm = "",
  onClick,
}) => {
  const extractPrice = (priceString: string): string => {
    if (!priceString) return "0 Kč";
    return priceString;
  };

  const highlightText = (text: string, term: string): React.ReactNode => {
    if (!term) return text;

    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index} className="bg-yellow-400 text-zinc-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      onClick={onClick}
      className="group bg-zinc-800/80 backdrop-blur-sm border border-amber-800/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-zinc-800 hover:border-yellow-400/50 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-48 bg-amber-900/20 overflow-hidden">
        <img
          src="2pizza-cappone-placeholder-500x500.jpg"
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-serif text-xl font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors">
            {highlightText(product.name, searchTerm)}
          </h3>
          <span className="text-lg font-bold text-yellow-400 whitespace-nowrap ml-2">
            {extractPrice(product.price)}
          </span>
        </div>

        <p className="text-amber-200/80 text-sm leading-relaxed mb-4">
          {highlightText(product.description, searchTerm)}
        </p>

        {/* Sizes */}
        {product.sizes && Object.keys(product.sizes).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(product.sizes).map(([size, price]) => (
              <span
                key={size}
                className="text-xs bg-zinc-900/60 text-amber-300 px-2 py-1 rounded-full border border-amber-800/30"
              >
                {size}: {price}
              </span>
            ))}
          </div>
        )}

        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <span className="text-xs bg-amber-900/30 text-amber-400 px-3 py-1 rounded-full border border-amber-700/30">
            {product.categoryName}
          </span>
          <div className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">Klikněte pro detail →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
