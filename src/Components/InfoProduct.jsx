import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api/products";
import { useShopify } from "../context/ShopifyContext";
import { CiRepeat } from "react-icons/ci";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { TbShoppingCart } from "react-icons/tb";
import Catgorys from "./Catgorys";

function InfoProduct() {
  const { products, setProducts, loading, setLoading } = useShopify();
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
  return (
    <>
      {loading && products === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="grid grid-cols-2 p-14">
            {products ? (
              <>
                <div>
                  <img
                    className="w-[500px]"
                    src={products.images}
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
                    <p className="font-light text-xl py-2">
                      {products.description}
                    </p>
                  </div>
                  <div className="border-t py-3">
                    <button className="font-extralight text-neutral-500  flex items-center gap-2">
                      <CiRepeat />
                      Comparar
                    </button>
                  </div>
                  <div>
                    <h1 className="font-normal text-xl pb-7">
                      Comparte con tus amigos
                    </h1>
                    <Link
                      to={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/productos/${products.id}`}
                      target="popup"
                      className="bg-blue-700 p-3 rounded-full text-white font-medium"
                    >
                      Facebook
                    </Link>
                    <h1 className="pt-8 pb-5 text-4xl">S/.{products.price}</h1>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-5">
                      <h1 className="font-medium text-gray-800">Cantidad:</h1>
                      <div className="flex items-center">
                        <button className="text-2xl text-white bg-slate-500 w-10 p-2 border rounded-l-2xl rounded-r-none">
                          <RiSubtractFill />
                        </button>
                        <input
                          type="text"
                          value="1"
                          className="text-center p-2 w-12 bg-slate-100 border border-gray-200"
                          disabled
                        />
                        <button className="text-2xl text-white bg-slate-500 w-10 p-2 border rounded-r-2xl rounded-l-none">
                          <IoMdAdd />
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        className="p-3 w-32 bg-orange-600 rounded-full text-white flex items-center gap-2 justify-center font-medium"
                        style={{ backgroundColor: "#0400C3" }}
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
