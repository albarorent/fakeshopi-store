import { Link, useLocation } from "react-router-dom";
import { getTitleProduct, joinFilterProduct } from "../api/products";
import { useShopify } from "../context/ShopifyContext";
import { TbShoppingCart } from "react-icons/tb";
import { CiRepeat } from "react-icons/ci";
import { MdSearch } from "react-icons/md";

function Header() {
  const { setProducts } = useShopify();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("c");

  const handleChange = async (e) => {
    if (categoryId) {
      const res = await joinFilterProduct(e.target.value, "", "", categoryId);
      setProducts(res.data);
    } else {
      const res = await getTitleProduct(e.target.value);
      setProducts(res.data);
    }
  };

  return (
    <div style={{backgroundColor:"#0400C3"}}>
      <div className="flex justify-between px-14">
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
      <div className="flex items-center justify-between px-14 p-5">
        <div>
          <Link to="/">
            <img className="w-48" src="../../public/shopify-app-store.png" />
          </Link>
        </div>
        <div className="w-2/4 flex">
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
        <div className="flex gap-12">
          <button>
            <span className="text-2xl">
              {" "}
              <TbShoppingCart />
            </span>
          </button>
          <button>
            <span className="text-2xl">
              <CiRepeat />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
