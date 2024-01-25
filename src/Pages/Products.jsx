import { Link, useLocation } from "react-router-dom";
import Product from "../Components/Product";
import { useShopify } from "../context/ShopifyContext";
import { useEffect } from "react";
import { getCategoryProduct } from "../api/products";

function Products() {
  const { products, categories, setProducts, loading, setLoading, getCat } =
    useShopify();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("c");

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const getProductId = async () => {
        const res = await getCategoryProduct(categoryId);
        setProducts(res.data);
        setLoading(false);
      };
      getProductId();
    }

    const fetchCategories = async () => {
      await getCat();
    };
    fetchCategories();
  }, [categoryId]);

  return (
    <div className="grid grid-cols-5  gap-5">
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-10 py-5">
        <div className="sm:hidden">VIVA</div>
        <div className="hidden sm:flex flex-col gap-3 border border-slate-300">
          {categories.slice(0, 12).map((categorie) => (
            <div
              key={categorie.id}
              className="w-full border-b border-slate-300 p-3"
            >
              <Link to={`/productos/?c=${categorie.id}`}>
                <h1 className="text-sm">{categorie.name}</h1>
              </Link>
            </div>
          ))}
        </div>
        <div className="px-3 flex flex-col gap-2 w-52">
          <h1>Filtrar por precio</h1>
          <input type="range" />
        </div>
      </div>
      <div className="w-[150px] sm:w-full col-span-4 grid grid-cols-4 justify-items-center sm:justify-items-center md:justify-items-center lg:justify-items-center  gap-2 py-5">
        {products.length === 0 ? (
          <h1>No se encuentran productos...</h1>
        ) : loading ? (
          <h1>Loading...</h1>
        ) : (
          Array.isArray(products) &&
          products.slice(0, 16).map((product) => (
            <div key={product.id}>
              <Product
                id={product.id}
                title={product.title}
                img={product.images[0]}
                categorie={product.category.name}
                price={product.price}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
