export interface Ingredient {
  name: string;
  price: string;
}

export interface Product {
  name: string;
  description: string;
  image: string;
  url: string;
  price: string;
  sizes?: Record<string, string>;
  ingredients?: Ingredient[];
  sauces?: any[];
  attributes?: string;
}

export interface ProductWithCategory extends Product {
  categoryName: string;
}

export interface Category {
  name: string;
  image: string;
  url: string;
  products: Product[];
}

export interface MenuData {
  categories: Category[];
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size?: string;
  ingredients?: string[];
}