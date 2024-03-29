import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getTitleProduct, joinFilterProduct } from "../api/products";
import { useShopify } from "../context/ShopifyContext";
import { TbShoppingCart } from "react-icons/tb";
import { CiRepeat } from "react-icons/ci";
import { MdSearch, MdLocalPhone, MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { uniqueIds } from "../helpers/Utils";

function Header() {
  const { setProducts, setCar, cantCar, setcantCar, setCompare } = useShopify();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const location = useLocation();
  const { id } = useParams();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("c");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCar = JSON.parse(localStorage.getItem("car")) || [];
    setCar(storedCar);
    const comparedProducts = JSON.parse(localStorage.getItem("compare")) || [];
    setCompare(comparedProducts);

    const uniqueProducts = uniqueIds(storedCar);

    const cantidadDeProductos = uniqueProducts.length;
    setcantCar(cantidadDeProductos);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsNavOpen(false);
      }
    };

    // Agrega el evento de escucha al cambio de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = async (e) => {
    if (categoryId) {
      const res = await joinFilterProduct(e.target.value, "", "", categoryId);
      setProducts(res.data);
    } else if (id) {
      const res = await getTitleProduct(e.target.value);
      setProducts(res.data);
      navigate("/productos");
    } else {
      const res = await getTitleProduct(e.target.value);
      setProducts(res.data);
    }
  };
  return (
    <header style={{ backgroundColor: "#0400C3" }}>
      <div className="sm:flex justify-between px-14 hidden">
        <div className="pt-2">
          <Link to="/">
            <span className="text-slate-50 text-xs">
              Bienvendido a Shopify Store | Tienda online
            </span>
          </Link>
        </div>
        <div className="pt-2">
          <span className="text-slate-50 text-sm flex gap-2 items-center">
            <MdLocalPhone className="text-base" /> 954894132 &nbsp;&nbsp; |
            &nbsp;&nbsp; <MdOutlineEmail className="text-base" />{" "}
            ventas@ventas.pe
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between px-3 sm:px-14 p-5 gap-4 sm:gap-0">
        <div>
          <Link to="/">
            <img
              className="w-48"
              width="192px"
              height="79.55px"
              alt="portada"
              src="/shopify-app-store.png"
            />
          </Link>
        </div>
        <div className="w-2/4 sm:flex hidden">
          <input
            className="w-full p-2 rounded-l-2xl rounded-r-none"
            type="search"
            onChange={handleChange}
            placeholder="Escriba aquí para hacer una busqueda"
          />
          <button
            className="text-white text-2xl bg-cyan-950 rounded-r-2xl w-10 flex items-center justify-center"
            aria-label="buscar"
          >
            <MdSearch />
          </button>
        </div>
        <div className="flex gap-4 sm:gap-12">
          <button
            className="sm:hidden text-2xl text-white"
            aria-label="Buscar"
            onClick={() => setIsNavOpen(isNavOpen ? false : true)}
          >
            <MdSearch />
          </button>
          <button aria-label="carrito">
            <Link to="/carrito" className="flex items-end">
              <span className="text-2xl text-white">
                {" "}
                <TbShoppingCart />
              </span>
              <small className="text-white bg-gray-800 rounded-full py-1 w-5 text-xs">
                {cantCar}
              </small>
            </Link>
          </button>
          <button aria-label="comparar">
            <Link to="/comparar" aria-label="comparar">
              <span className="text-2xl text-white">
                <CiRepeat />
              </span>
            </Link>
          </button>
        </div>
        <div className={` ${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>
          <div className="flex w-11/12 justify-center">
            <input
              className="w-10/12 p-2 border border-gray-600 rounded-l-2xl rounded-r-none"
              type="search"
              onChange={handleChange}
              placeholder="Escriba aquí para hacer una busqueda"
            />
            <button className="text-white text-2xl bg-cyan-950 rounded-r-2xl w-10 flex items-center justify-center">
              <MdSearch />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
