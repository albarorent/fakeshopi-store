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
      <div className="grid grid-cols-3 py-10">
        <div className="col-span-2">
          <h1 className="text-4xl">Carrito de compras</h1>
          <div className="py-3 flex flex-col gap-3">
            {uniqueCars.map((cars, index) => (
              <div key={index} className="flex gap-3">
                <div>
                  <img className="w-40" src={cars.images[0]} alt={cars.title} />
                </div>
                <div>
                  <div>
                    <h1>{cars.title}</h1>
                    <p>S/.{cars.price}</p>
                  </div>
                  <div>
                    <h1>Cantidad:</h1>
                    <button onClick={() => resClick(index)}><RiSubtractFill/></button>
                    <input type="text" value={quantities[index]} disabled />
                    <button onClick={() => sumClick(index)}><IoMdAdd/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">RESUMEN DE TU PEDIDO</div>
      </div>
      <Catgorys />
    </>
  );
}

export default Carrito;
