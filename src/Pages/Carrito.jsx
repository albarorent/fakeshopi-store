import React, { useEffect, useState } from "react";
import Catgorys from "../Components/Catgorys";
import { useShopify } from "../context/ShopifyContext";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

function Carrito() {
  const { setCar, car, setcantCar, cantCar } = useShopify();
  const [idCount, setIdCount] = useState({});

  const uniqueIds = {};
  const uniqueIdsCant = {};

  useEffect(() => {
    // Obtener el array de objetos desde el localStorage
    const storedCar = JSON.parse(localStorage.getItem("car")) || [];
    // Actualizar el estado 'car'
    setCar(storedCar);

    // Actualizar el estado 'idCount' después de que 'car' se ha actualizado
    const updatedIdCount = storedCar.reduce((acc, item) => {
      const itemId = item.id;
      return {
        ...acc,
        [itemId]: (acc[itemId] || 0) + 1,
      };
    }, {});

    setIdCount(updatedIdCount);
  }, [setCar, setIdCount]);

  const uniqueCars = car.filter((car) => {
    if (!uniqueIds[car.id]) {
      uniqueIds[car.id] = true;
      return true;
    }
    return false;
  });

  const sumClick = (productId) => {
    // Obtener el producto correspondiente al productId
    const productToAdd = car.find((item) => item.id === productId);

    // Agregar el producto al estado 'car'
    setCar((prevCar) => [...prevCar, productToAdd]);

    // Actualizar el estado 'idCount' después de agregar el producto
    setIdCount((prevIdCount) => ({
      ...prevIdCount,
      [productId]: (prevIdCount[productId] || 0) + 1,
    }));

    // Guardar 'car' en el localStorage
    localStorage.setItem("car", JSON.stringify([...car, productToAdd]));
  };

  const resClick = (productId) => {
    // Obtener el índice del producto a restar
    const productIndex = car.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      const currentCount = idCount[productId] || 0;

      // Verificar que el conteo sea mayor que uno antes de restar
      if (currentCount > 1) {
        // Crear una copia del estado 'car' y eliminar el producto
        const updatedCar = [...car];
        updatedCar.splice(productIndex, 1);

        // Actualizar el estado 'car'
        setCar(updatedCar);

        // Actualizar el estado 'idCount' después de restar el producto
        setIdCount((prevIdCount) => ({
          ...prevIdCount,
          [productId]: currentCount - 1,
        }));

        // Guardar la actualización en el localStorage
        localStorage.setItem("car", JSON.stringify(updatedCar));
      }
    }
  };

  const deleted = (productId) => {
    // Filtrar el estado 'car' para obtener todos los productos excepto los que tengan el mismo ID
    const updatedCar = car.filter((item) => item.id !== productId);

    // Obtener el conteo actual del producto
    const currentCount = idCount[productId] || 0;

    // Actualizar el estado 'car'
    setCar(updatedCar);

    // Actualizar el estado 'idCount' para eliminar el conteo del producto
    setIdCount((prevIdCount) => {
      const { [productId]: deletedCount, ...restIdCount } = prevIdCount;
      return restIdCount;
    });

    // Guardar la actualización en el localStorage
    localStorage.setItem("car", JSON.stringify(updatedCar));
    const cant = JSON.parse(localStorage.getItem("car")) || [];

    const uniqueCars = cant.filter((car) => {
      if (!uniqueIdsCant[car.id]) {
        uniqueIdsCant[car.id] = true;
        return true;
      }
      return false;
    });
    setcantCar(uniqueCars.length);
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
            {uniqueCars.length === 0 ? (
              <p>No tiene productos en su carrito.</p>
            ) : (
              uniqueCars.map((cars) => (
                <div
                  key={cars.id}
                  className="flex flex-col items-center sm:flex-row gap-3"
                >
                  <div>
                    <img
                      className="w-40"
                      src={cars.images[0]}
                      alt={cars.title}
                    />
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
                          onClick={() => resClick(cars.id)}
                        >
                          <RiSubtractFill className="text-center text-xl" />
                        </button>
                        <input
                          type="text"
                          className="w-14 h-7 border border-slate-600 text-center"
                          value={idCount[cars.id] || 0}
                          disabled
                        />
                        <button
                          className="bg-slate-600 w-12 h-7 text-slate-50 rounded-r-xl"
                          onClick={() => sumClick(cars.id)}
                        >
                          <IoMdAdd className="text-center text-xl" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start pt-2">
                      <button
                        className="text-slate-50 w-20 bg-red-700 rounded-md"
                        onClick={() => deleted(cars.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
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
