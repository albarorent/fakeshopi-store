import { Suspense, lazy, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useShopify } from "../context/ShopifyContext";
import { Link } from "react-router-dom";
const LazyImage = lazy(() => import("../Components/LazyImage"));

function Catgorys() {
  const { categories, loading, getCat, setLoading } = useShopify();

  const itemsPerPage = 6;
  const longitud = categories.length > 6 ? 6 : categories.length;
  const pageCount = Math.ceil(longitud / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await getCat();
      setLoading(false);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % pageCount);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentPage, pageCount]);

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
        <h3 className="text-xl font-medium border-b-2 border-orange-500 inline-block pb-2">
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
                <div className="flex items-center  flex-col-reverse  sm:flex-row-reverse gap-5 group border text-center  sm:text-left border-slate-100 hover:bg-neutral-200 hover:shadow-lg hover:border-transparent p-5 rounded-md">
                  <div className="w-40">
                    <h1>{categoria.name}</h1>
                  </div>
                  <Suspense fallback={<div>Cargando...</div>}>
                    <LazyImage src={categoria.image} alt={categoria.name} />
                  </Suspense>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="flex p-4">
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            previousClassName="hidden"
            nextClassName="hidden"
          />
        </div>
      </div>
    </>
  );
}

export default Catgorys;
