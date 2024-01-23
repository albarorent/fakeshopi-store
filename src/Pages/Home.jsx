import { Link } from "react-router-dom";
import { useShopify } from "../context/ShopifyContext";
import { useEffect } from "react";
import Catgorys from "../Components/Catgorys";
import { TbShoppingCart } from "react-icons/tb";

function Home() {
  const { products, getProductos, loading, setLoading,car,setCar } =
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

  const handleOnclick = () => {
    // if (products) {
    //   const numberOfTimesToAddProduct = 1;
    //   setCar([...car, ...Array(numberOfTimesToAddProduct).fill(products)]);
    // } else {
    //   console.error("Error: products no es un objeto válido");
    // }
  };

  const HandleClick = () =>{
    console.log("clik")
  }

  console.log(car);
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
            // <Link key={product.id} to={`/productos/${product.id}`}>
              <div className="flex items-center flex-col-reverse  sm:flex-row-reverse  gap-5 group border border-slate-100 hover:bg-neutral-200 hover:shadow-lg hover:border-transparent p-4 rounded-md" key={product.id} onClick={HandleClick}>
                <div className="w-40">
                  <p className="text-xs text-neutral-500">
                    {product.category && <small>{product.category.name}</small>}
                  </p>
                  <h1 className="text-base text-blue-600 font-bold">
                    {product.title.length > 20 ? `${product.title.slice(0, 20)}...` : product.title}
                  </h1>
                  <div className="flex justify-between pr-4">
                    <h2 className="text-lg text-gray-700 font-medium">
                      S/.{product.price}
                    </h2>
                    <button onClick={handleOnclick} className="rounded-full p-2 text-white" style={{backgroundColor:"#0400C3"}}>
                      <TbShoppingCart className="text-xl" />
                    </button>
                  </div>
                </div>
                {isValidImageUrl(product.images[0]) ? (
                  <img
                    className="w-52"
                    src={product.images[0]}
                    alt={product.title}
                  />
                ) : (
                  <img
                    className="w-52"
                    src="../../public/no-image.svg"
                    alt="No Image"
                  />
                )}
              </div>
            // </Link>
          ))
        )}
      </div>
      <Catgorys />
    </>
  );
}

export default Home;
