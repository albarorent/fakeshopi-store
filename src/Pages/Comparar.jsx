import React, { useEffect } from "react";
import { useShopify } from "../context/ShopifyContext";

function Comparar() {
  const { compare } = useShopify();

  useEffect(() => {
   console.log(compare);
  }, [])
  
  return (
    <div>
      <h1>Comparar</h1>
    </div>
  );
}

export default Comparar;
