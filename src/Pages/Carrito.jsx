import React, { useEffect, useState } from "react";
import Catgorys from "../Components/Catgorys";
import { useShopify } from "../context/ShopifyContext";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

function Carrito() {
  const { setCar, car } = useShopify();

  let storedCar = [];

  const uniqueIds = {};

  const uniqueCars = car.filter((car) => {
    if (!uniqueIds[car.id]) {
      uniqueIds[car.id] = true;
      return true;
    }
    return false;
  });

  const [quantities, setQuantities] = useState(
    Array(uniqueCars.length).fill(1)
  );

  useEffect(() => {
    storedCar = JSON.parse(localStorage.getItem("car")) || [];
    setCar(storedCar);

    const initialQuantities = storedCar.map((item) => item.quantity || 1);
    setQuantities(initialQuantities);
  }, [setCar]);

  const sumClick = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const resClick = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(newQuantities[index] - 1, 1);
    setQuantities(newQuantities);
  };

  return (
    <>
      <div className="pt-5 border-b border-slate-300">
        <h3 className="text-2xl font-medium border-b-2 border-orange-500 inline-block pb-2">
          Carrito de Compras
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row py-4 justify-center">
        <div className="w-full sm:w-2/3">
          <div className="py-3 flex flex-col gap-3">
            {uniqueCars.map((cars, index) => (
              <div
                key={index}
                className="flex flex-col items-center sm:flex-row gap-3"
              >
                <div>
                  <img className="w-40" src={cars.images[0]} alt={cars.title} />
                </div>
                <div>
                  <div>
                    <h1 className="text-base text-blue-600 font-bold">
                      {cars.title}
                    </h1>
                    <p className="text-lg text-gray-700 font-medium">
                      S/.{cars.price}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <h1 className="text-lg text-gray-700 font-medium">
                      Cantidad:
                    </h1>
                    <div className="flex items-center justify-center">
                      <button
                        className="bg-slate-600 w-12 h-7 text-slate-50 rounded-l-xl"
                        onClick={() => resClick(index)}
                      >
                        <RiSubtractFill className="text-center text-xl" />
                      </button>
                      <input
                        type="text"
                        className="w-14 h-7 border border-slate-600 text-center"
                        value={quantities[index]}
                        disabled
                      />
                      <button
                        className="bg-slate-600 w-12 h-7 text-slate-50 rounded-r-xl"
                        onClick={() => sumClick(index)}
                      >
                        <IoMdAdd className="text-center text-xl" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start pt-2">
                    <button className="text-slate-50 w-20 bg-red-700 rounded-md">Quitar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>RESUMEN DE TU PEDIDO</h3>
          <div>
            <h1>Sub Total</h1>
            <h2>Envío</h2>
            <h3>TOTAL</h3>
          </div>
          <div>
            <button>Comprar</button>
          </div>
        </div>
      </div>
      <Catgorys />
    </>
  );
}

export default Carrito;
