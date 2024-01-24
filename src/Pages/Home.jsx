import { Link } from "react-router-dom";
import { useShopify } from "../context/ShopifyContext";
import { useEffect } from "react";
import Catgorys from "../Components/Catgorys";
import { TbShoppingCart } from "react-icons/tb";
import { getProduct } from "../api/products";

function Home() {
  const { products, getProductos, loading, setLoading, car, setCar,setcantCar } =
    useShopify();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      await getProductos();
      setLoading(false);
    };

    fetchData();
  }, []);

  const isValidImageUrl = (imageUrl) => {
    return imageUrl && imageUrl.startsWith("http");
  };

  const handleOnclick = async (productId) => {
    try {
      const product = await getProduct(productId);
      setCar((prevCar) => {
        const updatedCar = [...prevCar, ...Array(1).fill(product.data)];
        setcantCar(updatedCar.length);
        localStorage.setItem("car", JSON.stringify(updatedCar));
        return updatedCar;
      });
     
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <>
      <div className="pt-5 border-b border-slate-300">
        <h3 className="text-xl font-normal border-b-2 border-orange-500 inline-block pb-2">
          Novedades de la Tienda
        </h3>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 min-[1280px]:grid-cols-3 gap-3 justify-items-center py-5 ">
        {loading || products.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          Array.isArray(products) &&
          products.slice(0, 9).map((product) => (
            <div
              key={product.id}
              className="flex items-center flex-col-reverse  sm:flex-row-reverse  gap-5 group border border-slate-100 hover:bg-neutral-200 hover:shadow-lg hover:border-transparent p-4 rounded-md"
            >
              <div className="w-40">
                <p className="text-xs text-neutral-500">
                  <Link to={`/productos/${product.id}`}>
                    {product.category && <small>{product.category.name}</small>}
                  </Link>
                </p>
                <h1 className="text-base text-blue-600 font-bold">
                  <Link to={`/productos/${product.id}`}>
                    {product.title.length > 20
                      ? `${product.title.slice(0, 20)}...`
                      : product.title}
                  </Link>
                </h1>
                <div className="flex justify-between pr-4">
                  <h2 className="text-lg text-gray-700 font-medium">
                    <Link to={`/productos/${product.id}`}>
                      S/.{product.price}
                    </Link>
                  </h2>
                  <button
                    onClick={() => handleOnclick(product.id)}
                    className="rounded-full p-2 text-white"
                    style={{ backgroundColor: "#0400C3" }}
                  >
                    <TbShoppingCart className="text-xl" />
                  </button>
                </div>
              </div>
              {isValidImageUrl(product.images[0]) ? (
                <Link to={`/productos/${product.id}`}>
                  <img
                    className="w-52"
                    src={product.images[0]}
                    alt={product.title}
                  />
                </Link>
              ) : (
                <Link to={`/productos/${product.id}`}>
                  <img
                    className="w-52"
                    src="../../public/no-image.svg"
                    alt="No Image"
                  />
                </Link>
              )}
            </div>
          ))
        )}
      </div>
      <Catgorys />
    </>
  );
}

export default Home;
