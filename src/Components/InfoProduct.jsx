import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api/products";
import { useShopify } from "../context/ShopifyContext";
import { CiRepeat } from "react-icons/ci";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { TbShoppingCart } from "react-icons/tb";
import Catgorys from "./Catgorys";
import LazyImage from "./LazyImage";
import SweetAlert from "../lib/SweetAlert";

function InfoProduct() {
  const {
    products,
    setProducts,
    loading,
    setLoading,
    setCar,
    cantidad,
    setCantidad,
    setcantCar,
    setCompare,
    compare,
  } = useShopify();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchProductId = async (id) => {
      if (id) {
        try {
          const res = await getProduct(id);
          setProducts(res.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchProductId(id);
  }, [id]);

  const sumClick = () => {
    if (cantidad >= 1) {
      setCantidad((prevCantidad) => prevCantidad + 1);
    }
  };

  const resClick = () => {
    if (cantidad > 1) {
      setCantidad((prevCantidad) => prevCantidad - 1);
    }
  };

  const handleOnclick = () => {
    if (products) {
      setCar((prevCar) => {
        const updatedCar = [...prevCar, ...Array(cantidad).fill(products)];
        const uniqueIds = new Set();
        const uniqueProducts = updatedCar.filter((product) => {
          if (!uniqueIds.has(product.id)) {
            uniqueIds.add(product.id);
            return true;
          }
          return false;
        });
        const cantidadDeProductos = uniqueProducts.length;
        setcantCar(cantidadDeProductos);
        localStorage.setItem("car", JSON.stringify(updatedCar));
        return updatedCar;
      });
      SweetAlert("producto agregado.");
    } else {
      console.error("Error: products no es un objeto válido");
    }
  };

  const handleCompareClick = () => {
    setCompare((prevCompare) => {
      // Verifica si el producto ya está en la lista de comparación
      const isProductInCompare = prevCompare.some(
        (compareProduct) => compareProduct.id === products.id
      );
      if (!isProductInCompare) {
        // Si el producto no está en la lista de comparación, agrégalo
        const updatedCompare = [...prevCompare, products];
        localStorage.setItem("compare", JSON.stringify(updatedCompare));
        SweetAlert("Producto agregado para comparar.");
        return updatedCompare;
      } else {
        // Si el producto ya está en la lista de comparación, no hagas ningún cambio
        SweetAlert("Ya se agrego el producto.","warning");
        return prevCompare;
      }
    });
  };

  return (
    <>
      {loading && products === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="grid grid-cols-1 py-8 w-full sm:grid-cols-1 md:grid-cols-1 sm:justify-items-center md:justify-items-center min-[1280px]:grid-cols-2">
            {products ? (
              <>
                <div>
                  <LazyImage
                    src={products.images}
                    w={"w-[500px]"}
                    alt={products.title}
                  />
                </div>
                <div>
                  <div className="pb-3">
                    {products.category && (
                      <small className="text-neutral-500">
                        {products.category.name}
                      </small>
                    )}
                    <h1 className="font-normal text-2xl py-2">
                      {products.title}
                    </h1>
                    <p className="font-light text-base py-2 sm:text-xl">
                      {products.description}
                    </p>
                  </div>
                  <div className="border-t py-3">
                    <button
                      className="font-extralight text-neutral-500  flex items-center gap-2"
                      onClick={handleCompareClick}
                    >
                      <CiRepeat />
                      Comparar
                    </button>
                  </div>
                  <div>
                    <h1 className="font-normal text-xl pb-7">
                      Comparte con tus amigos
                    </h1>
                    <Link
                      to={`https://www.facebook.com/sharer/sharer.php?u=https://fake-shoppistore.netlify.app/productos/${products.id}`}
                      target="popup"
                      className="bg-blue-700 p-3 rounded-full text-white font-medium"
                    >
                      Facebook
                    </Link>
                    <h1 className="pt-8 pb-5 text-4xl">S/.{products.price}</h1>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
                    <div className="flex gap-5">
                      <h1 className="font-medium text-gray-800">Cantidad:</h1>
                      <div className="flex items-center">
                        <button
                          className="text-2xl text-white bg-slate-500 w-10 p-2 border rounded-l-2xl rounded-r-none"
                          onClick={resClick}
                        >
                          <RiSubtractFill />
                        </button>
                        <input
                          type="text"
                          value={cantidad}
                          className="text-center p-2 w-12 bg-slate-100 border border-gray-200"
                          disabled
                        />
                        <button
                          className="text-2xl text-white bg-slate-500 w-10 p-2 border rounded-r-2xl rounded-l-none"
                          onClick={sumClick}
                        >
                          <IoMdAdd />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center ">
                      <button
                        className="p-3 w-32 bg-orange-600 rounded-full text-white flex items-center gap-2 justify-center font-medium"
                        style={{ backgroundColor: "#0400C3" }}
                        onClick={handleOnclick}
                      >
                        <TbShoppingCart className="text-xl" /> Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <h1>No se encontraron productos</h1>
            )}
          </div>
          <Catgorys />
        </>
      )}
    </>
  );
}

export default InfoProduct;
