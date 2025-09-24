import { useState, useEffect, useMemo } from 'react';
import { Category, ProductWithCategory } from '../types/menu';
import menuData from '../data/menuData.json';

export const useMenu = () => {
  const [categories] = useState<Category[]>(menuData.categories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allProducts: ProductWithCategory[] = useMemo(() => {
    return categories.flatMap(category =>
      category.products.map(product => ({
        ...product,
        categoryName: category.name
      }))
    );
  }, [categories]);

  const filteredProducts: ProductWithCategory[] = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.categoryName === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      products = products.filter(product => {
        const searchableText = [
          product.name,
          product.description,
          product.categoryName
        ].join(' ').toLowerCase();
        
        return searchableText.includes(searchTerm.toLowerCase());
      });
    }

    return products;
  }, [allProducts, selectedCategory, searchTerm]);

  return {
    categories,
    allProducts,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
};