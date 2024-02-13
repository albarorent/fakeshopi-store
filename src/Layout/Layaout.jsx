import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Suspense } from "react";
function Layaout() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-10">
        <Suspense fallback={<div>Cargando...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default Layaout;
