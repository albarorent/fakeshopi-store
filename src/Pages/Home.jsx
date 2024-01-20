import { Link } from "react-router-dom";
import { useShopify } from "../context/ShopifyContext";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Home() {
  const { products, categories, getProductos, loading, setLoading, getCat } =
    useShopify();
  const itemsPerPage = 6;
  const pageCount = Math.ceil(12 / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      await getProductos();
      setLoading(false);
    };

    const fetchCategories = async () => {
      await getCat();
      setLoading(false);
    };

    fetchData();
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Cambiar automáticamente a la siguiente página después de 5 segundos
      setCurrentPage((prevPage) => (prevPage + 1) % pageCount);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentPage, pageCount]);

  if (products.length === 0) {
    return <h1>Loading...</h1>;
  }

  const isValidImageUrl = (imageUrl) => {
    return imageUrl && imageUrl.startsWith("http");
  };

  const slicedCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <>
      <div className="pt-5 border-b border-slate-300">
        <h3 className="text-xl font-normal border-b-2 border-orange-500 inline-block pb-2">
          Novedades de la Tienda
        </h3>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 min-[1280px]:grid-cols-3 gap-3 justify-items-center py-5 ">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          products.slice(0, 9).map((product) => (
            <Link key={product.id} to={`/productos/${product.id}`}>
              <div className="flex items-center flex-row-reverse gap-5 group border border-slate-100 hover:bg-neutral-200 hover:shadow-lg hover:border-transparent p-4 rounded-md">
                <div className="w-40">
                  <p className="text-xs text-neutral-500">
                    {product.category.name}
                  </p>
                  <h1 className="text-base text-blue-600 font-bold">
                    {product.title}
                  </h1>
                  <h2 className="text-lg text-gray-700 font-medium">
                    S/.{product.price}
                  </h2>
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
            </Link>
          ))
        )}
      </div>
      <div className="pt-5 border-b border-slate-300">
        <h3 className="text-xl font-normal border-b-2 border-orange-500 inline-block pb-2">
          Categorias de la Tienda
        </h3>
      </div>

      <div className="flex flex-col items-center">
        <div
          className={`grid sm:grid-cols-1 md:grid-cols-2 min-[1280px]:grid-cols-3 gap-3 justify-items-center py-5 ${
            currentPage !== 0 ? "page-transition" : ""
          }`}
        >
          {loading ? (
            <h1>Cargando...</h1>
          ) : (
            slicedCategories.map((categoria) => (
              <Link to={`/productos/?c=${categoria.id}`} key={categoria.id}>
                <div className="flex items-center flex-row-reverse gap-5 group border border-slate-100 hover:bg-neutral-200 hover:shadow-lg hover:border-transparent p-5 rounded-md">
                  <div className="w-40">
                    <h1>{categoria.name}</h1>
                  </div>
                  {isValidImageUrl(categoria.image) ? (
                    <img
                      className="w-52 h-52"
                      src={categoria.image}
                      alt={categoria.name}
                      onError={(e) => {
                        e.target.src = "../../public/no-image.svg";
                      }}
                    />
                  ) : (
                    <img
                      className="w-52"
                      src="../../public/no-image.svg"
                      alt="No Image"
                    />
                  )}
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="flex p-4">
          <ReactPaginate
            className="flex gap-4"
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
