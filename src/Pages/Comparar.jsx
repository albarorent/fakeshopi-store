import React, { Suspense, useEffect } from "react";
import { useShopify } from "../context/ShopifyContext";
import LazyImage from "../Components/LazyImage";
import Catgorys from "../Components/Catgorys";
import { IoCloseOutline } from "react-icons/io5";

function Comparar() {
  const { compare } = useShopify();

  useEffect(() => {
    console.log(compare);
  }, []);

  return (
    <>
      <div className="pt-5 border-b border-slate-300">
        <h3 className="text-2xl font-medium border-b-2 border-orange-500 inline-block pb-2">
          Comparar productos
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row py-6 justify-center gap-3">
        <div className="w-full flex items-center gap-3 border border-slate-300 rounded-md overflow-x-scroll">
          <div className="flex flex-col items-center justify-center w-32 md:w-full h-full gap-3 border-r border-slate-300">
            <div className="border-b border-slate-300 w-full pb-8 h-[218px] grid items-center justify-center">
              <h1 className="text-center">Producto</h1>
            </div>
            <div className="border-b border-slate-300 w-full grid items-center justify-center h-[30px]">
              <h1 className="text-center">Precio</h1>
            </div>
            <div className="border-b border-slate-300 w-full grid items-center justify-center h-[30px]">
              <h1 className="text-center">Quitar</h1>
            </div>
          </div>
          {compare.length === 0 ? (
            <p className="text-3xl text-center pt-3 text-red-600">
              No tienes productos para comparar
            </p>
          ) : (
            <div className="flex gap-3 w-36 md:w-[850px]">
              {compare.map((cars) => (
                <div
                  key={cars.id}
                  className="flex-shrink-0 w-44 flex flex-col items-center gap-3  p-4"
                >
                  <div className="h-[217px] border-b border-slate-300">
                    <Suspense fallback={<div>Cargando...</div>}>
                      <LazyImage
                        src={cars.images[0]}
                        alt={cars.title}
                        w={"w-40"}
                      />
                    </Suspense>
                    <h1 className="text-base text-blue-600 font-bold">
                      {cars.title}
                    </h1>
                  </div>

                  <div className="w-full border-b border-slate-300 h-[28px]">
                    <p className="text-lg text-gray-700 font-medium text-center">
                      S/.{cars.price}
                    </p>
                  </div>
                  <div className="w-full border-b border-slate-300 h-[30px] grid items-center justify-center">
                      <IoCloseOutline className="text-2xl"/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Catgorys />
    </>
  );
}

export default Comparar;
