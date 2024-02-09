import React from "react";
import { useShopify } from "../context/ShopifyContext";

function Pago() {
  const { idCount, subtotal } = useShopify();
  

  return (
    <div>
      <div className="pt-5 border-b border-slate-300">
        <h3 className="text-2xl font-medium border-b-2 border-orange-500 inline-block pb-2">
          Datos del Cliente
        </h3>
      </div>

      <form action="#" className="flex flex-col">
        <label htmlFor="name">Nombres</label>
        <input id="name" type="text" />
        <label htmlFor="lastname">Apellidos</label>
        <input id="lastname" type="text" />
        <label htmlFor="address">Dirección</label>
        <input id="address" type="text" />

      </form>
    </div>
  );
}

export default Pago;
