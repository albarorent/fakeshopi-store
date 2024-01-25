import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import Layaout from "./Layout/Layaout";
import Home from "./Pages/Home";
import { ShopifyProvider } from "./context/ShopifyContext";
import InfoProduct from "./Components/InfoProduct";
import History from "./Pages/History";
import NotFound from "./Pages/NotFound";
import Carrito from "./Pages/Carrito";

function App() {
  return (
    <>
      <ShopifyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layaout />}>
              <Route index element={<Home />} />
              <Route path="/historia/" element={<History />} />
              <Route path="/productos/" element={<Products />} />
              <Route path="/productos/:id" element={<InfoProduct />} />
              <Route path="/carrito/" element={<Carrito />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ShopifyProvider>
    </>
  );
}

export default App;
