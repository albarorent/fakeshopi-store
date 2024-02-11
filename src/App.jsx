import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import Layaout from "./Layout/Layaout";
import Home from "./Pages/Home";
import { ShopifyProvider } from "./context/ShopifyContext";
import InfoProduct from "./Components/InfoProduct";
import NotFound from "./Pages/NotFound";
import Carrito from "./Pages/Carrito";
import Pago from "./Pages/Pago";
import Comparar from "./Pages/Comparar";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <ShopifyProvider>
        <BrowserRouter>
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
    </>
  );
}

export default App;
