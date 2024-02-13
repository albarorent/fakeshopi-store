import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShopifyProvider } from "./context/ShopifyContext";

// Importa tus componentes de manera dinámica
const Products = lazy(() => import("./Pages/Products"));
const Layaout = lazy(() => import("./Layout/Layaout"));
const Home = lazy(() => import("./Pages/Home"));
const InfoProduct = lazy(() => import("./Components/InfoProduct"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Carrito = lazy(() => import("./Pages/Carrito"));
const Pago = lazy(() => import("./Pages/Pago"));
const Comparar = lazy(() => import("./Pages/Comparar"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

function App() {
  return (
    <ShopifyProvider>
      <BrowserRouter>
        {/* Envuelve tu aplicación con Suspense y proporciona un componente de carga */}
          <Routes>
            <Route path="/" element={<Layaout />}>
              <Route index element={<Home />} />
              <Route path="/productos/" element={<Products />} />
              <Route path="/productos/:id" element={<InfoProduct />} />
              <Route path="/carrito/" element={<Carrito />} />
              <Route path="/comparar/" element={<Comparar />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/carrito/procesarpago" element={<Pago />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </ShopifyProvider>
  );
}

export default App;