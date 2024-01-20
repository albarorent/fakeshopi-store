import React, { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { getCategories } from "../api/categories";
const ShopifyContext = createContext();

export const useShopify = () => {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error("useShopify must be used within a ShopifyProvider");
  }

  return context;
};

export function ShopifyProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductos = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const getCat = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  return (
    <ShopifyContext.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        getProductos,
        loading,
        setLoading,
        getCat,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
}
