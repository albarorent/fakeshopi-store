import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getTitleProduct, joinFilterProduct } from "../api/products";
import { useShopify } from "../context/ShopifyContext";
import { TbShoppingCart } from "react-icons/tb";
import { CiRepeat } from "react-icons/ci";
import { MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";

function Header() {
  const { setProducts, car, setCar, cantCar, setcantCar } = useShopify();
  const location = useLocation();
  const { id } = useParams();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("c");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCar = JSON.parse(localStorage.getItem("car")) || [];
    setCar(storedCar);
    const uniqueIds = new Set();
    const uniqueProducts = storedCar.filter((product) => {
      if (!uniqueIds.has(product.id)) {
        uniqueIds.add(product.id);
        return true;
      }
      return false;
    });
    const cantidadDeProductos = uniqueProducts.length;
    setcantCar(cantidadDeProductos);
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
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "#0400C3" }}>
      <div className="sm:flex justify-between px-14 hidden">
        <div className="pt-2">
          <Link to="/">
            <span className="text-slate-50 text-xs">
              Bienvendido a Shopify Store | Tienda online
            </span>
          </Link>
        </div>
        <div className="pt-2">
          <span className="text-slate-50 text-sm">
            954894132 &nbsp;&nbsp; | &nbsp;&nbsp; ventas@ventas.pe
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between px-14 p-5 gap-4 sm:gap-0">
        <div>
          <Link to="/">
            <img className="w-48" src="/shopify-app-store.png" />
          </Link>
        </div>
        <div className="w-2/4 sm:flex hidden">
          <input
            className="w-full p-2 rounded-l-2xl rounded-r-none"
            type="search"
            onChange={handleChange}
            placeholder="Search Products"
          />
          <button className="text-white text-2xl bg-cyan-950 rounded-r-2xl w-10 flex items-center justify-center">
            <MdSearch />
          </button>
        </div>
        <div className="flex gap-6 sm:gap-12">
          <button>
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
          <button>
            <span className="text-2xl text-white">
              <CiRepeat />
            </span>
          </button>
        </div>
      </div>
    </div>
   
  );
}

export default Header;
