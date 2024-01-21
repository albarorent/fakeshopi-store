import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api/products";
import { useShopify } from "../context/ShopifyContext";
import { FaFacebookSquare } from "react-icons/fa";

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
        <div className="grid grid-cols-2 p-10">
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
                <div>
                  {products.category && <small>{products.category.name}</small>}
                  <h1>{products.title}</h1>
                  <p>{products.description}</p>
                  <button>Comparar</button>
                </div>
                <div>
                  <h1>Comparte con tus amigos</h1>
                  <Link
                    to={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/productos/${products.id}`}
                    target="popup"
                  >
                    <FaFacebookSquare className="text-blue-600" />
                  </Link>
                  <h1>S/.{products.price}</h1>
                </div>
                <div className="flex">
                  <div>
                    <h1>Cantidad:</h1>
                    <button>-</button>
                    {/* <input type="text" value="1" /> */}
                    <button>+</button>
                  </div>
                  <div>
                    <button>Agregar</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1>No se encontraron productos</h1>
          )}
        </div>
      )}
    </>
  );
}

export default InfoProduct;
