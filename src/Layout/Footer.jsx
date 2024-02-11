import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div style={{ backgroundColor: "#0400C3" }}>
        <div className="flex px-16 gap-2">
          <img
            src="/arrow.png"
            className="w-16 h-16 sm:w-20 sm:h-20"
            alt="arrow"
          />
          <h2 className="text-white py-2 text-lg  sm:text-2xl">
            La mejor publicidad es la que hacen los clientes satisfechos{" "}
            <small>
              <i>Philip Kotler</i>
            </small>
          </h2>
        </div>
      </div>
      <div
        className=" p-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 justify-items-start sm:justify-items-center"
        style={{ backgroundColor: "#333e48" }}
      >
        <div>
          <img
            className="w-48"
            width="12rem"
            height="79.55px"
            src="/shopify-app-store.png"
            alt="portada"
          />
          <p className="text-white pt-8 font-bold">Información de Contacto</p>
          <p className="text-white text-base">
            CAL. SIMON BOLIVAR NRO. 1100 -CENTRO DE CHICLAYO
          </p>
          <p className="text-white text-sm">
            <span className="font-bold">E-mail:</span> ventas@gmail.com
          </p>
        </div>
        <div>
          <h1 className="text-white ">Acerca de</h1>

          <Link to="/productos">
            <p className="text-white pt-2">Tienda</p>
          </Link>
        </div>
        <div>
          <h1 className="text-white">Servicio al cliente</h1>
          <p className="text-white  pt-4">Contacto</p>
        </div>
      </div>
      <div className="bg-gray-500">
        <h1 className="text-white text-center text-sm py-2">
          Copyright © 2024 Tienda Online. Todos los derechos reservados{" "}
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
